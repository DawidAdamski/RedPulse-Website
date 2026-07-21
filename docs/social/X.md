# X (dawniej Twitter) — plan

> Fundament i zasady wspólne: [README.md](./README.md). Spisane 2026-07-21.
> X zmienia warunki API i cennik częściej niż ktokolwiek — **zweryfikuj limity
> i ceny w dniu wdrożenia**, ta notatka może się zdezaktualizować w kilka tygodni.

## Pytanie wstępne

**Czy masz tam konto i czy zamierzasz go używać?** W repo nie ma po nim śladu —
w stopce i w danych strukturalnych są tylko LinkedIn i GitHub. Jeśli konta nie ma,
sensowna kolejność to: najpierw przycisk udostępniania (działa bez konta, bo
korzysta z konta czytelnika), a decyzja o publikacji dopiero potem.

## Etap 1 — przycisk udostępniania (bez API)

```
https://twitter.com/intent/tweet?url={URL}&text={TYTUŁ}
```

Adres `twitter.com/intent/…` nadal działa i przekierowuje. W przeciwieństwie do
LinkedIna **możesz podać własny tekst** — warto wstawić tytuł wpisu, żeby czytelnik
nie musiał nic pisać.

Nie dodawaj oficjalnego widżetu `platform.twitter.com/widgets.js` — to skrypt
śledzący, zwykły link wystarczy.

## Etap 2 — metadane

Masz już `twitter:card = summary_large_image`, `twitter:title`, `twitter:description`
i `twitter:image`. **Brakuje `twitter:site` i `twitter:creator`** — bez nich
w karcie nie pojawia się przypisanie do Twojego konta.

Do dodania w `src/layouts/Layout.astro`, gdy podasz handle:

```html
<meta name="twitter:site" content="@twoj_handle" />
<meta name="twitter:creator" content="@twoj_handle" />
```

X nie ma publicznego narzędzia do odświeżania cache podglądu (dawny Card Validator
został wyłączony) — karta odświeża się sama przy kolejnych udostępnieniach.

## Etap 3 — publikacja automatyczna

### Warunki dostępu

Stan na lipiec 2026, **do potwierdzenia przed wdrożeniem**:

| Poziom | Koszt | Co daje |
|---|---|---|
| Free | 0 zł | **publikowanie tak** (rząd wielkości: setki postów miesięcznie), czytanie praktycznie nie |
| Basic | ~200 USD/mc | czytanie i wyższe limity |

Dla naszego zastosowania — publikacja zajawek własnych artykułów — **darmowy
poziom w zupełności wystarcza**. To korzystniejsze niż u konkurencji: publikujemy
bez opłat i bez przeglądu aplikacji.

### Kroki

1. Konto deweloperskie na `developer.x.com`, projekt i aplikacja.
2. Uwierzytelnianie: **OAuth 2.0 z PKCE**, uprawnienia `tweet.write`, `users.read`,
   `offline.access` (to ostatnie daje token odświeżający — bez niego autoryzacja
   wygasa po dwóch godzinach).
3. Publikacja: `POST /2/tweets` z polem `text`.
4. Obraz wymaga osobnego wgrania (endpoint mediów) i dopiący identyfikatora do
   posta — dwa kroki, nie jeden. Sam link generuje kartę z OG image automatycznie,
   więc **przy udostępnianiu artykułów obraz nie jest potrzebny**.
5. W n8n jest gotowy węzeł X.

### Format, który tu działa

Krótko, konkretnie, jedna myśl. Wątek (kilka postów pod sobą) sprawdza się przy
treściach warstwowych — a Twój blog ma poziomy głębi, więc „powierzchnia" jako
wątek, z linkiem do pełnego tekstu na końcu, pasuje naturalnie.

## Ryzyka

- **Zmienność zasad** — największe ryzyko ze wszystkich platform. Limity i ceny
  zmieniały się tu kilkukrotnie w ciągu roku
- Zasięg bez płatnej weryfikacji jest ograniczony
- Konto bez regularnej aktywności ma marginalne zasięgi; automat publikujący raz na
  miesiąc nie zbuduje niczego

## Rekomendacja

Przycisk udostępniania — tak, od razu, kosztuje jedną linijkę. Publikacja
automatyczna — tylko jeśli faktycznie prowadzisz tam konto. Darmowy poziom API
sprawia, że technicznie to najtańsza integracja z całej czwórki, ale to nie jest
argument, żeby wchodzić na platformę, na której Cię nie ma.
