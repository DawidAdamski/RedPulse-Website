# Dystrybucja treści — fundament

> Plan, nie implementacja. Osobne dokumenty per platforma:
> [LinkedIn](./LINKEDIN.md) · [Facebook](./FACEBOOK.md) · [X](./X.md) · [YouTube](./YOUTUBE.md)
> Spisane 2026-07-21.

## Zasada nadrzędna

**Blog na redpulse.tech jest źródłem prawdy, social to dystrybucja.** Tekst
powstaje raz, na Twojej domenie, gdzie pracuje na SEO i nie zniknie, gdy platforma
zmieni regulamin. Na profile idzie zajawka z linkiem.

To ma konsekwencję: nie budujemy niczego, co wymaga pisania treści bezpośrednio
w narzędziu do publikacji. Kolejka publikacji zawsze wskazuje na wpis, który już
istnieje w repo.

## Dwie różne rzeczy, które łatwo pomylić

| | Udostępnianie przez czytelnika | Publikacja automatyczna |
|---|---|---|
| Co to jest | przycisk „udostępnij" pod wpisem | Twój post pojawia się na profilu sam |
| Czy wymaga API | **nie** | tak, z aplikacją deweloperską i tokenami |
| Koszt utrzymania | zerowy | tokeny wygasają, regulaminy się zmieniają |
| Czas wdrożenia | godziny | dni, plus przeglądy po stronie platform |

Pierwsze zrobiłbym od razu. Drugie tylko tam, gdzie faktycznie będziesz publikować.

## Stan na dziś

**Jest:**
- OG image z twarzą i obietnicą, osobny dla PL i EN (`/og-image.png`, `/og-image-en.png`)
- `og:title`, `og:description`, `og:url`, `og:locale`, wymiary obrazu
- `twitter:card = summary_large_image`
- Kanały RSS: `/blog/rss.xml` i `/en/blog/rss.xml` — gotowy wyzwalacz dla automatyzacji
- **Przyciski udostępniania pod wpisami** (LinkedIn + Kopiuj link + udostępnianie
  natywne) — `src/components/ShareButtons.astro`, bez skryptów zewnętrznych i cookies
- **`article:author`** na wpisach (`ogType=article`); `article:published_time` już był

**Brakuje:**
- `twitter:site` / `twitter:creator` (potrzebny Twój handle X — brak konta, więc świadomie
  pominięte; TODO w `src/layouts/Layout.astro`)
- ponownego zaciągnięcia podglądu linku przez Facebooka i LinkedIn — **po zmianie
  pozycjonowania mają w cache stary opis i stary obraz** (Etap 2)

## Etap 1 — przyciski udostępniania (✅ zrobione 2026-07-21)

Nowy komponent pod treścią wpisu, bez żadnych skryptów zewnętrznych — same linki.
Żadnych ciasteczek, żadnego śledzenia, zero wpływu na wydajność i zgodę cookie.

| Platforma | Adres |
|---|---|
| LinkedIn | `https://www.linkedin.com/sharing/share-offsite/?url={URL}` |
| Facebook | `https://www.facebook.com/sharer/sharer.php?u={URL}` |
| X | `https://twitter.com/intent/tweet?url={URL}&text={TYTUŁ}` |
| dowolna | `navigator.share()` — natywne menu systemowe na telefonie |
| zawsze | „Kopiuj link" — najczęściej używana opcja, a prawie zawsze pomijana |

Uwaga: **YouTube nie jest celem udostępniania linku** — to platforma wideo, nie
czytnik. Nie dokładamy przycisku, który prowadzi donikąd.

Zrobione: komponent `ShareButtons.astro` z LinkedIn + Kopiuj link + udostępnianie
natywne (`navigator.share`, ukryte tam gdzie niewspierane), wstawiony na obu stronach
wpisu (PL/EN); `article:author` w `Layout.astro`. Zostaje `twitter:site`/`twitter:creator`
— dopiero gdy pojawi się handle X. Przyciski X/Facebook pominięte (prowadzisz tylko
LinkedIn) — dodanie później to jedna linijka każdy.

## Etap 2 — planowanie publikacji

Masz n8n, Baserow i Figmę. Podział ról, który się nie gryzie:

**Baserow — kalendarz treści.** Jedna tabela `Publikacje`:

| Pole | Typ | Uwagi |
|---|---|---|
| temat | tekst | roboczy tytuł |
| wpis | URL | link do artykułu na redpulse.tech |
| platforma | wybór | LinkedIn / Facebook / X / YouTube |
| treść posta | długi tekst | zajawka pod daną platformę |
| grafika | załącznik | eksport z Figmy |
| publikacja | data i godzina | |
| status | wybór | szkic → zatwierdzony → opublikowany → błąd |
| wynik | URL | link do posta po publikacji |
| log błędu | tekst | co odpowiedziało API |

Jeden wpis na blogu = kilka rekordów, po jednym na platformę. Ten sam tekst nigdy
nie idzie wszędzie — każda platforma czyta inaczej.

**n8n — wykonawca.** Dwa przepływy:

1. *Nowy wpis* — cron czyta RSS bloga, wykrywa nowy artykuł, tworzy w Baserow
   szkice dla wybranych platform (z podpowiedzią treści). Nic nie publikuje.
2. *Publikacja* — co 15 minut szuka w Baserow rekordów o statusie „zatwierdzony",
   których termin minął, publikuje, zapisuje link zwrotny albo błąd.

Rozdzielenie na dwa przepływy jest celowe: **nic nie wychodzi na zewnątrz bez
Twojego kliknięcia „zatwierdzony"**. Automat przygotowuje, człowiek zatwierdza —
tak samo jak w AleDrogi Chat.

**Figma — szablony graficzne.** Po jednym na format:

| Format | Wymiary | Gdzie |
|---|---|---|
| poziomy | 1200 × 630 | LinkedIn, Facebook, OG |
| kwadrat | 1080 × 1080 | Facebook, ewentualnie Instagram |
| miniatura wideo | 1280 × 720 | YouTube |

Warto oprzeć je na tokenach ze strony: papier `#faf8f5`, grafit `#1a1c20`,
czerwień `#c1272d`, nagłówki Fraunces, treść Inter. Skrypt, którym generuję OG
image (w historii repo, commit `0810353`), może posłużyć jako alternatywa dla
Figmy przy powtarzalnych grafikach z tekstem.

## Kolejność, którą rekomenduję

1. ~~**Przyciski udostępniania + brakujące metadane**~~ — ✅ zrobione (LinkedIn + Kopiuj
   link + udostępnianie natywne, `article:author`).
2. **Odświeżenie podglądów** w narzędziach Facebooka i LinkedIna — po repozycjonowaniu
   to konieczne, inaczej każdy udostępniony link pokazuje nieaktualną obietnicę.
3. **Baserow + n8n bez publikacji** — kalendarz i przygotowywanie treści, kopiujesz
   i wklejasz ręcznie. Zyskujesz cały porządek procesu bez ani jednego tokenu.
4. **Automatyczna publikacja** — dokładać platforma po platformie, zaczynając od
   tej, na której realnie jesteś. Kolejność wg trudności: X → Facebook → LinkedIn.

Punkt 3 jest ważniejszy, niż wygląda. Większość zysku z „planowania publikacji"
bierze się z tego, że masz kalendarz i gotowe teksty, a nie z tego, że robot
wciska przycisk.

## Czego ten plan świadomie nie obejmuje

- **Instagrama** — publikacja wymaga konta firmowego powiązanego ze stroną na
  Facebooku i nie przyjmuje linków w treści posta. Przy Twoim rodzaju treści
  (artykuły techniczne) to dużo pracy przy małym zwrocie.
- **Analityki** — ile osób weszło z których postów. To osobny temat i wymaga
  decyzji o narzędziu, a strona ma zgodę cookie tylko na kategorię analityczną.
- **Automatycznego pisania treści postów przez model** — da się, ale najpierw
  ustalmy proces ręczny; inaczej zautomatyzujemy bałagan.
