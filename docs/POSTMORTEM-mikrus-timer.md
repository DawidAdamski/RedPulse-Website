# Post-mortem: auto-deploy stał przez tydzień

**Status: rozwiązane 2026-07-21.** Dokument opisuje, co się stało, jak to
ustaliliśmy i co z tego zostaje na przyszłość.

## Podsumowanie

Od 14 do 21 lipca żadna zmiana nie trafiała na produkcję automatycznie. Timer
systemd odpalał się co 5 minut i za każdym razem nie mógł uruchomić skryptu
aktualizującego. Około dwóch tysięcy nieudanych prób, zero sygnału na zewnątrz.

**Przyczyna źródłowa:** systemd nie był w stanie wykonać
`/usr/local/bin/redpulse-update.sh` — kod wyjścia **203 (`EXIT_EXEC`)**. Plik
istniał i miał poprawną treść, ale nie dało się go uruchomić (najprawdopodobniej
brak prawa wykonywania; wyjście `ls -l` nie zostało zapisane, więc nie potwierdzam
tego w stu procentach).

**Naprawa:** przywrócenie wykonywalności skryptu na serwerze. Efekt potwierdzony
tego samego dnia — poprawka CSP wypchnięta wieczorem weszła na produkcję **sama,
po około 90 sekundach** od zakończenia builda.

## Oś czasu

| Kiedy | Co |
|---|---|
| 14.07, 10:38 | ostatni obraz, który trafił na produkcję |
| 14.07, 10:47 | kontener wstaje — dziewięć minut po buildzie, czyli ręczny restart przy instalacji |
| 14.07 – 21.07 | timer odpala się co 5 min, za każdym razem exit 203; nic tego nie zgłasza |
| 21.07, 00:26 | osiem commitów redesignu ląduje na Docker Hubie; produkcja ich nie widzi |
| 21.07, 08:53 | pomiar: 8,5 h po publikacji obrazu produkcja serwuje build z 14 lipca |
| 21.07, ~12:53 | diagnoza: `Result=exit-code`, `ExecMainStatus=203` |
| 21.07 | naprawa na serwerze, redesign wchodzi na produkcję |
| 21.07, +90 s | kolejny push (CSP) deployuje się automatycznie — potwierdzenie naprawy |

## Jak to ustaliliśmy

Kolejność, która zadziałała — od najtańszego sprawdzenia do najdroższego:

1. **Zdalnie, bez dostępu do serwera:** porównanie znacznika czasu obrazu na Docker
   Hubie z nagłówkiem `Last-Modified` produkcji. To od razu wykluczyło CI, rejestr
   i niezgodność nazwy repozytorium — problem musiał być między rejestrem a nginksem.
2. **Odstęp czasowy jako dowód:** 8,5 godziny przy cyklu 5-minutowym to około stu
   nieudanych okazji. Wyklucza „po prostu wolno".
3. **Stan prosto z systemd:** `systemctl show redpulse-update.service -p Result
   -p ExecMainStatus` — to jedno polecenie dało odpowiedź. Nie zależy od logowania,
   więc działa nawet wtedy, gdy w journalu pusto.

## Czego się nauczyliśmy

**Pustka w logach to też informacja.** `journalctl -t redpulse-update` nie pokazywał
nic, co dawało się odczytać jako „timer nie chodzi". W rzeczywistości timer chodził
znakomicie — to skrypt nigdy nie ruszał, więc `logger` z jego wnętrza nie miał kiedy
się wykonać. Brak wpisów od procesu nie znaczy, że proces nie był wywoływany.

**Główna hipoteza była błędna.** Obstawiałem, że skrypt działa, ale nie rozpoznaje
nowego obrazu, bo sprawdza to grepem po treści wyjścia `docker pull`
(`"Downloaded newer image"`), a nowsze wersje Dockera formatują to inaczej.
Hipoteza była sensowna i pasowała do objawu — ale dowody ją obaliły. Co więcej,
późniejszy udany automatyczny deploy dowiódł, że **grep na tym serwerze działa
poprawnie**.

Wniosek: sprawdzenie tanie i rozstrzygające idzie przed sprawdzeniem sprytnym.
Prawdopodobieństwo hipotezy nie jest dowodem.

**Cicha awaria trwała tydzień.** Nic nie krzyknęło. Została zauważona przypadkiem,
przy okazji dużego wdrożenia.

## Co zostało do zrobienia

- [ ] **Wykrywanie nowego obrazu przez porównanie digestów.** Obecny grep działa na
      dzisiejszej wersji Dockera, ale zależy od formatu komunikatu, który nie jest
      częścią żadnego kontraktu. To nie jest pilne — to jest kruche. Gotowa wersja
      niżej.
- [ ] **Sygnalizacja awarii.** Dwa tysiące cichych porażek to główny problem tej
      historii, nie sam błąd 203. Minimum: comiesięczne sprawdzenie poleceniem
      z sekcji „Kontrola stanu" w `deploy/systemd/README.md`. Docelowo: `OnFailure=`
      w jednostce, wysyłające powiadomienie (n8n przyjmie webhooka).
- [ ] **Skrypt na serwerze jest starszy niż w repo.** Komunikaty logów różnią się od
      wersji wersjonowanej (`"up to date"` kontra `"already up to date"`). Każda
      poprawka w `deploy/systemd/` wymaga świadomego skopiowania na serwer — nic nie
      robi tego automatycznie.

### Propozycja odpornego wykrywania obrazu

```bash
LOCAL=$(docker image inspect --format '{{index .RepoDigests 0}}' "$IMAGE" 2>/dev/null || echo none)
docker pull -q "$IMAGE" >/dev/null || { logger -t redpulse-update "pull failed"; exit 0; }
REMOTE=$(docker image inspect --format '{{index .RepoDigests 0}}' "$IMAGE")
if [ "$LOCAL" != "$REMOTE" ]; then
  logger -t redpulse-update "new image ($REMOTE) -> restarting $UNIT"
  systemctl restart "$UNIT"
else
  logger -t redpulse-update "already up to date"
fi
```

Porównuje sumę kontrolną zamiast czytać komunikat po angielsku.

## Pułapki diagnostyczne

**Kod 200 z nginksa nic nie znaczy.** Konfiguracja ma fallback na `index.html`, więc
`/wiki/` zwracało 200 nawet wtedy, gdy wiki w ogóle nie było w obrazie — dostawaliśmy
stronę główną pod adresem wiki. Sprawdzaj `<title>`, nie status.

**Świeżość produkcji sprawdzaj mechanicznie, nie wzrokiem:**

```bash
curl -sI https://redpulse.tech/ | grep -i last-modified
curl -s https://redpulse.tech/ | grep -oE '<title>[^<]*'
```

**Nagłówki bezpieczeństwa nie istnieją na serwerze deweloperskim.** Osobna, ale
pokrewna historia z tego samego dnia: panel CMS pokazywał nazwy ikon zamiast ikon,
bo polityka CSP dla `/admin/` blokowała Google Fonts. Lokalnie wyglądał bez zarzutu,
bo `astro dev` nie wysyła tych nagłówków. Jeśli coś działa u Ciebie, a nie działa na
produkcji — sprawdź nagłówki i konsolę przeglądarki.
