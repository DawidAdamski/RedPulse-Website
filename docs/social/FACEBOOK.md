# Facebook — plan

> Fundament i zasady wspólne: [README.md](./README.md). Spisane 2026-07-21.
> Meta zmienia zasady częściej niż pozostałe platformy — przed wdrożeniem
> zweryfikuj bieżącą dokumentację.

## Pytanie wstępne

**Czy masz stronę firmową na Facebooku?** Cały etap publikacji automatycznej stoi
na tym założeniu, bo **Facebook nie pozwala publikować na profilu osobistym przez
API** — możliwość ta została wycofana i nie ma obejścia. Jeśli strony nie ma,
zostaje etap 1 i 2, i to nie jest zła opcja.

Drugie pytanie: czy Twoi klienci są na Facebooku w kontekście zawodowym? Przy
kliencie handlowo-usługowym z Inowrocławia — całkiem możliwe, że tak, i wtedy
Facebook ma sens większy niż LinkedIn. Przy zapytaniach o architekturę IT —
raczej nie.

## Etap 1 — przycisk udostępniania (bez API)

```
https://www.facebook.com/sharer/sharer.php?u={URL_WPISU}
```

Bez tokenu, bez SDK, bez ciasteczek. **Nie dodawaj oficjalnego widżetu „Share"**
(`connect.facebook.net/…/sdk.js`) — to skrypt śledzący, który trzeba by objąć
zgodą cookie i który spowalnia stronę. Zwykły link robi to samo.

Podgląd budują tagi Open Graph, które już masz.

## Etap 2 — odświeżenie cache podglądu (zrób zaraz po deployu)

Facebook agresywnie cache'uje podgląd linku. Po repozycjonowaniu w podglądach
siedzi stary tytuł i stary obraz.

Narzędzie: **Sharing Debugger** — `https://developers.facebook.com/tools/debug/`.
Wklej adres, kliknij „Scrape Again". Zrób to dla:

- `https://redpulse.tech/`
- `https://redpulse.tech/en/`
- każdego istniejącego wpisu na blogu

Debugger pokaże też, czy nie brakuje wymaganych tagów.

## Etap 3 — publikacja automatyczna na stronę

### Co jest potrzebne

1. **Strona firmowa** na Facebooku, w której jesteś administratorem
2. **Aplikacja** w `developers.facebook.com` (typ: Business)
3. **Uprawnienia**: `pages_manage_posts`, `pages_read_engagement`
4. **Token strony (Page Access Token)** — krótkotrwały wymienia się na długotrwały;
   token systemowy (System User) w Business Managerze **nie wygasa** i to jest
   rozwiązanie, które polecam, bo eliminuje najczęstszą przyczynę awarii

### Pułapka z przeglądem aplikacji (App Review)

Zasada, która oszczędza tygodnie: **dopóki aplikacja jest w trybie deweloperskim,
a Ty jesteś administratorem strony, uprawnienia działają bez przeglądu Meta.**
App Review jest wymagany dopiero, gdy aplikacja ma działać na kontach osób
niezwiązanych z aplikacją. Przy publikacji na własną stronę — omijasz cały ten
proces.

To odwrotnie niż w LinkedInie i dlatego Facebook jest tu paradoksalnie łatwiejszy.

### Kroki

1. Załóż aplikację, dodaj produkt „Facebook Login" (potrzebny do wygenerowania tokenu).
2. W Graph API Explorerze pobierz token użytkownika z wymienionymi uprawnieniami.
3. Wymień go na długotrwały, potem na token strony — albo od razu utwórz System
   User w Business Managerze i wygeneruj token bezterminowy.
4. Publikacja to jedno wywołanie: `POST /{page-id}/feed` z polami `message` i `link`.
5. W n8n: węzeł Facebook Graph API. Wskaż wersję API jawnie (np. `v21.0`) —
   stare wersje są wyłączane po około dwóch latach i wtedy przepływ przestaje działać.

## Ryzyka

- **Wersjonowanie API** — najczęstsza cicha awaria. Zapisz w kalendarzu przegląd
  raz w roku
- Zasięg organiczny stron firmowych jest niski; bez budżetu reklamowego post
  zobaczy niewielka część obserwujących
- Meta potrafi zawiesić aplikację za nieaktywność albo brak uzupełnionych danych
  (polityka prywatności, ikona, kategoria) — uzupełnij profil aplikacji od razu

## Rekomendacja

Etap 2 zrób **niezależnie od wszystkiego** — masz w cache Facebooka nieaktualny
opis firmy, a to widzi każdy, kto wkleja Twój link w wiadomości. To dziesięć minut
pracy.

Etap 3 tylko wtedy, gdy strona firmowa istnieje i realnie na niej publikujesz.
Jeśli głównym kanałem ma być LinkedIn, Facebook zostaw na przyciskach udostępniania.
