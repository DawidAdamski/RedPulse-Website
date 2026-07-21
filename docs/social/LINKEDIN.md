# LinkedIn — plan

> Fundament i zasady wspólne: [README.md](./README.md). Spisane 2026-07-21.
> Wymagania platform zmieniają się często — przed wdrożeniem zweryfikuj bieżącą
> dokumentację. Ta notatka opisuje stan wiedzy z lipca 2026.

## Dlaczego akurat tu warto

To jedyna z czterech platform, gdzie Twoja grupa docelowa jest zawodowo, a treść
techniczno-biznesowa jest na miejscu. Masz dwa byty: profil osobisty
(`in/dawid-adamski`) i stronę firmową (`company/red-pulse-innovations`) — i one
mają **różne, niewymienne ścieżki API**.

## Etap 1 — przycisk udostępniania (bez API)

```
https://www.linkedin.com/sharing/share-offsite/?url={URL_WPISU}
```

Działa od ręki, nie wymaga niczego. **LinkedIn nie przyjmuje własnego tekstu
w tym adresie** — komentarz pisze osoba udostępniająca, a podgląd buduje się
wyłącznie z tagów Open Graph. Czyli jakość udostępnienia zależy w 100% od
`og:title`, `og:description` i `og:image`, które już masz.

## Etap 2 — odświeżenie cache podglądu (zrób zaraz po deployu)

LinkedIn trzyma podgląd linku w pamięci podręcznej **przez około 7 dni** i sam go
nie odświeży. Po repozycjonowaniu każdy udostępniony link pokazuje starą obietnicę
i stary obraz.

Narzędzie: **Post Inspector** — `https://www.linkedin.com/post-inspector/`.
Wklej `https://redpulse.tech/` i `https://redpulse.tech/en/`, kliknij „Inspect".
To wymusza ponowne pobranie. Powtarzaj po każdej zmianie tytułu, opisu lub OG image.

## Etap 3 — publikacja automatyczna

Tu robi się nierówno i trzeba o tym wiedzieć zawczasu.

### Profil osobisty — łatwiejsza droga

- Produkt w aplikacji: **Share on LinkedIn**, dostępny samoobsługowo
- Uprawnienie: `w_member_social`
- Publikujesz jako Dawid Adamski

### Strona firmowa — trudniejsza droga

- Uprawnienie: `w_organization_social`
- Wymaga produktu **Community Management API**, a ten przechodzi **przegląd po
  stronie LinkedIna** — trzeba opisać zastosowanie i czekać na decyzję
- Aplikacja musi zostać zweryfikowana przez administratora strony firmowej

### Kroki

1. Załóż aplikację na `developer.linkedin.com` i powiąż ją ze stroną firmową.
2. Zweryfikuj aplikację (LinkedIn wygeneruje link, który klikasz jako admin strony).
3. Dodaj produkt „Share on LinkedIn". Jeśli chcesz publikować jako firma — złóż
   wniosek o Community Management API.
4. Skonfiguruj OAuth 2.0. **Uwaga na cykl życia tokenów:** token dostępu żyje
   ~60 dni, token odświeżający ~365 dni. Czyli **raz do roku ktoś musi ręcznie
   przejść autoryzację, inaczej publikacja cicho przestanie działać.** Zaplanuj
   przypomnienie w kalendarzu — to najczęstsza przyczyna „automatyzacja działała
   pół roku i umarła".
5. W n8n: węzeł LinkedIn obsługuje publikację jako osoba i jako organizacja,
   z obrazem albo samym linkiem.

### Format posta, który tu działa

Link w treści posta obniża zasięg — platforma promuje treść trzymającą użytkownika
u siebie. Praktyka, która działa: **wartościowa treść w poście, link w pierwszym
komentarzu**. W n8n to dwa wywołania: publikacja, potem komentarz do zwróconego
identyfikatora. Warto uwzględnić to w projekcie przepływu od początku.

## Ryzyka

- Community Management API bywa odrzucane przy małych, jednoosobowych firmach —
  miej plan B w postaci publikacji z profilu osobistego
- Automatyczne publikacje bez kontekstu wyglądają jak spam; kolejka z ręcznym
  zatwierdzaniem (patrz README) jest tu szczególnie na miejscu
- Regulamin zabrania masowego publikowania identycznej treści z wielu kont — przy
  jednym profilu i jednej stronie to nie problem, ale nie skaluj tego w bok

## Rekomendacja

Etap 1 i 2 zrób od razu — to godziny pracy i natychmiastowy efekt. Etap 3 tylko
wtedy, gdy realnie publikujesz co najmniej raz w tygodniu. Przy rzadszym rytmie
kalendarz w Baserow z gotowym tekstem do wklejenia da Ci 90% korzyści za 10% pracy
i bez rocznego terminu ważności tokenu.
