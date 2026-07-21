# Śledztwo: auto-deploy na mikr.us nie wchodzi na produkcję

> Do wykonania w osobnej sesji. Wymaga dostępu SSH do mikr.us — bez niego można
> zrobić tylko krok 0.
> Notatka spisana 2026-07-21 po wypchnięciu ośmiu commitów redesignu.

## Objaw — potwierdzony pomiarem

Po pushu na `main` CI buduje obraz, obraz ląduje na Docker Hubie, ale strona
serwuje starą wersję.

Dowód zebrany 2026-07-21:

| Co | Kiedy |
|---|---|
| Obraz opublikowany na Docker Hubie | `00:26:59Z` |
| Sprawdzenie produkcji | `08:53:59Z` — **8,5 godziny później** |
| `Last-Modified` plików serwowanych przez nginx | `2026-07-14 10:38:00 GMT` |
| Tytuł na produkcji | „stała opieka IT dla małych firm" (wersja sprzed redesignu) |

Przy cyklu 5-minutowym timer miał w tym oknie **około stu okazji**, żeby wykonać
podmianę. Nie wykonał żadnej. To wyklucza przypadek i zwykłe opóźnienie.

Ostatni skuteczny deploy to 14 lipca — czyli mechanizm działał wtedy, a przestał
gdzieś między 14 a 21 lipca. Warto sprawdzić, co się na serwerze działo w tym
okresie (aktualizacja Dockera? restart maszyny? wyczerpanie miejsca na dysku?).

## Co już wiadomo — i czego NIE trzeba sprawdzać

Zweryfikowane zdalnie 2026-07-21, przed rozpoczęciem śledztwa:

- **CI działa.** Run `29790286451` zakończony sukcesem o 00:27:29 UTC.
- **Obraz jest na Docker Hubie i jest świeży.** `anihilat/redpulse.tech:latest`,
  `last_updated = 2026-07-21T00:26:59Z`, digest `sha256:5ce01c8a2f5b…`.
- **Nazwa repozytorium się zgadza.** CI pushuje pod `${DOCKER_USERNAME}/redpulse.tech`,
  a `redpulse-update.sh` ciągnie `anihilat/redpulse.tech:latest` — te same współrzędne.
  (Gdyby sekret `DOCKER_USERNAME` wskazywał inne konto, ciągnęlibyśmy cudzy obraz.)

Czyli: **problem jest po stronie serwera**, między „obraz leży na Docker Hubie"
a „nginx serwuje nowe pliki".

## ⚠️ Metodyka na przyszłość

Timer chodzi w cyklu 5-minutowym (`OnUnitActiveSec=5min`). Sprawdzenie produkcji
minutę po zakończeniu builda **zawsze** pokaże starą wersję i niczego nie dowodzi —
odczekaj pełne 10 minut od `last_updated` obrazu. (Przy obecnej awarii to bez
znaczenia, bo odstęp wyniósł 8,5 godziny, ale przy weryfikacji poprawki ta zasada
wróci.)

Dodatkowo: **dodaj sobie do dysku ratunkowego jedną komendę**, która odpowiada na
pytanie „czy prod jest aktualny", żeby nie zgadywać po wyglądzie strony:

```bash
diff <(curl -s https://redpulse.tech/ | grep -oE '<title>[^<]*') \
     <(grep -oE '<title>[^<]*' dist/index.html)
```

## Krok 0 — ustal fakty bez logowania na serwer

```bash
# Kiedy powstały pliki, które realnie serwuje nginx (to mtime z wnętrza obrazu):
curl -sI https://redpulse.tech/ | grep -i last-modified

# Czy to stara treść? Stary tytuł zawiera „stała opieka IT dla małych firm",
# nowy — „projekty i diagnostyka IT":
curl -s https://redpulse.tech/ | grep -oE '<title>[^<]*</title>'

# Świeżość obrazu w rejestrze do porównania:
curl -s https://hub.docker.com/v2/repositories/anihilat/redpulse.tech/tags/latest \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['last_updated'])"
```

:warning: **Nie ufaj kodom HTTP.** nginx ma fallback na `index.html`, więc
`/wiki/` zwraca **200 nawet wtedy, gdy wiki w ogóle nie ma w obrazie** — dostajesz
stronę główną pod adresem wiki. Sprawdzaj `<title>`, nie status.

## Hipotezy — od najbardziej prawdopodobnej

Każda ma komendę rozstrzygającą i naprawę. Idź po kolei, nie na skróty.

### H1. Timer nie jest zainstalowany albo nie jest włączony

Najczęstsza przyczyna „nie działa": pliki są w repo, ale nigdy nie trafiły na serwer.

```bash
systemctl list-timers --all | grep -i redpulse
systemctl status redpulse-update.timer
systemctl is-enabled redpulse-update.timer
```

Naprawa: sekcja „Install" w `deploy/systemd/README.md`.

### H2. Skrypt się wykonuje, ale nigdy nie wykrywa nowego obrazu

To jest mój główny podejrzany. `redpulse-update.sh` rozpoznaje nowy obraz przez
**grep po tekście** wyjścia `docker pull`:

```bash
grep -q "Downloaded newer image" <<<"$out"
```

Nowsze wersje Dockera (zwłaszcza z magazynem obrazów opartym na containerd)
formatują to wyjście inaczej. Wtedy: pull się udaje, warstwy się pobierają,
ale warunek nigdy nie jest prawdziwy → `systemctl restart` nigdy nie leci →
kontener w nieskończoność chodzi na starym obrazie. Objaw idealnie pasuje.

```bash
docker version --format '{{.Server.Version}}'
docker pull anihilat/redpulse.tech:latest   # obejrzyj DOKŁADNE brzmienie ostatniej linii
journalctl -t redpulse-update --since '-2h'  # co loguje: „already up to date" czy „new image pulled"?
```

Jeśli w logu w kółko widnieje „already up to date", mimo że w rejestrze jest nowy
digest — to jest ta przyczyna.

Naprawa (odporna na format wyjścia — porównuje digesty zamiast czytać tekst):

```bash
LOCAL=$(docker image inspect --format '{{index .RepoDigests 0}}' "$IMAGE" 2>/dev/null || echo none)
docker pull -q "$IMAGE" >/dev/null || { logger -t redpulse-update "pull failed"; exit 0; }
REMOTE=$(docker image inspect --format '{{index .RepoDigests 0}}' "$IMAGE")
[ "$LOCAL" != "$REMOTE" ] && systemctl restart "$UNIT"
```

### H3. Limit anonimowych pobrań Docker Huba

Timer pyta rejestr **288 razy na dobę** z jednego IP, bez logowania. Docker Hub
limituje anonimowe pulle. Po przekroczeniu `docker pull` zwraca błąd, a skrypt
— przez `|| { logger …; exit 0; }` — **cicho kończy sukcesem**.

```bash
journalctl -t redpulse-update --since '-24h' | grep -c "pull failed"
docker pull anihilat/redpulse.tech:latest   # szukaj „toomanyrequests"
```

Naprawa: `docker login` na serwerze (limit dla konta jest wyższy) i/lub
rozluźnienie timera do 15 minut — deploy i tak nie musi być natychmiastowy.

### H4. Nazwa unitu się nie zgadza

`redpulse-update.sh` restartuje `redpulse.service`. Jeśli kontener chodzi pod inną
nazwą, restart leci w próżnię lub kończy się błędem.

```bash
systemctl list-unit-files | grep -i redpulse
systemctl status redpulse.service
```

### H5. Restart leci, ale kontener wstaje na starym obrazie

`redpulse.service` ma `ExecStartPre=docker pull`, więc powinien dociągnąć świeży.
Ale jeśli pull tam pada (sieć, limit), `ExecStartPre` bez `-` **przerywa start** —
i wtedy `Restart=always` wchodzi w pętlę restartów.

```bash
systemctl status redpulse.service
journalctl -u redpulse.service --since '-1h' | tail -50
docker ps --format '{{.Image}} {{.CreatedAt}} {{.Status}}'
docker image inspect --format '{{.Created}}' anihilat/redpulse.tech:latest
```

Jeśli `docker ps` pokazuje kontener utworzony dawno temu — restart nigdy nie
nastąpił (wracasz do H1/H2). Jeśli utworzony przed chwilą, a treść stara — obraz
lokalny jest stary (H3).

### H6. Timer chodzi, ale usługa kończy się błędem

```bash
systemctl status redpulse-update.service
journalctl -u redpulse-update.service --since '-24h' | tail -40
```

Uwaga na `set -euo pipefail`: brak `logger` w systemie albo brak uprawnień do
`systemctl` wywalą skrypt po cichu.

### H7. Journal nie jest trwały — mylące „pusto w logach"

Na małych VPS-ach journald bywa ustawiony na `Storage=volatile`, więc po restarcie
logi znikają i wygląda, jakby timer nigdy nie chodził.

```bash
journalctl --disk-usage
grep -i storage /etc/systemd/journald.conf
```

### H8. Specyfika mikr.us

Starsze maszyny mikr.us (OpenVZ) mają okrojony systemd — timery potrafią nie
działać mimo `enabled`. Nowsze (KVM) są w porządku.

```bash
systemd-detect-virt
systemctl --version
```

Jeśli to OpenVZ: zamiast timera systemd użyj crona
(`*/10 * * * * /usr/local/bin/redpulse-update.sh`).

## Kryterium zakończenia

Śledztwo jest zamknięte dopiero, gdy:

1. Push testowy na `main` → po maksymalnie ~10 minutach
   `curl -s https://redpulse.tech/ | grep -oE '<title>[^<]*'` pokazuje nowy tytuł,
   **bez** ręcznego `systemctl restart`.
2. W `journalctl -t redpulse-update` widać wpis „new image pulled -> restarting".
3. Poprawka jest wniesiona do `deploy/systemd/` w repo, a nie tylko na serwerze —
   inaczej przy następnej reinstalacji wróci ten sam błąd.

## Obejście na już

```bash
ssh mikrus 'systemctl restart redpulse'
```

Wymusza pull i podmianę natychmiast. Do czasu naprawy to jest sposób na deploy.
