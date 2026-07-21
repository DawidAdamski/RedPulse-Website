# YouTube i osadzanie treści — plan

> Fundament i zasady wspólne: [README.md](./README.md). Spisane 2026-07-21.

## YouTube to inna kategoria niż pozostałe trzy

LinkedIn, Facebook i X są **celami dystrybucji** — wysyłasz tam link do artykułu.
YouTube nim nie jest: nikt nie „udostępnia artykułu na YouTube". To **źródło
treści**, które sam produkujesz, i które można osadzić u siebie.

Dlatego nie dokładamy przycisku „udostępnij na YouTube" — prowadziłby donikąd.
Zamiast tego są dwa sensowne kierunki.

## Kierunek A — osadzanie wideo w treści (rekomendowany)

Nagranie wideo jako uzupełnienie artykułu: pokaz na żywo, przejście przez panel
AleDrogi Chat, wyjaśnienie trudnej awarii. Wideo mieszka na YouTube, ale ogląda
się je na Twojej stronie.

### Uwaga prawna, która jest tu najważniejsza

**Standardowy embed YouTube ustawia ciasteczka śledzące, zanim ktokolwiek kliknie
play.** Masz na stronie zgodę cookie (`vanilla-cookieconsent`) z kategorią
analityczną — zwykły `<iframe src="youtube.com/embed/…">` wstawiony w treść
**złamie tę zgodę**: strona deklaruje, że nie śledzi bez akceptacji, a śledzi.

Rozwiązanie, które to zdejmuje — tak zwana fasada:

1. W miejscu wideo wyświetlamy **miniaturę i przycisk play** (statyczny obraz,
   zero połączeń z Google).
2. Dopiero kliknięcie ładuje iframe z domeny **`youtube-nocookie.com`**.
3. Efekt uboczny: strona ładuje się szybciej, bo nie ciągnie ~1 MB skryptów
   odtwarzacza przy każdym wejściu.

To jest jedyny wariant, który polecam — i jednocześnie zgodny z tym, co strona
obiecuje w polityce prywatności.

### Do zrobienia

- Komponent `YouTubeEmbed.astro` — parametry: identyfikator wideo, tytuł, miniatura
- Obsługa w Markdown, żeby dało się wstawić wideo w treść wpisu bez pisania HTML-a
- Miniatura pobierana raz i trzymana lokalnie w `public/` (nie hotlinkujemy z Google,
  bo to znowu połączenie przed zgodą)
- Dopisanie akapitu o osadzonym wideo do polityki prywatności
- Rozszerzenie schematu wpisu w `content.config.ts`, jeśli wideo ma być polem
  wpisu, a nie wstawką w treści

Nakład: dzień pracy razem z komponentem, dokumentacją w CMS i polityką prywatności.

## Kierunek B — YouTube jako źródło dla pozostałych platform

Odwrotność zwykłego przepływu: publikujesz wideo, a automat rozsyła informację o nim.

- Każdy kanał YouTube ma **kanał RSS** (`https://www.youtube.com/feeds/videos.xml?channel_id=…`)
  — nie wymaga żadnego API, tokenu ani aplikacji
- n8n czyta ten RSS, tworzy w Baserow szkice postów na LinkedIn/Facebook/X
- Ten sam mechanizm, który opisałem dla bloga w [README](./README.md), tylko z innym źródłem

To jest tania integracja — jeden węzeł RSS i zero uwierzytelniania.

## Kierunek C — publikacja wideo przez API (raczej nie)

YouTube Data API v3 pozwala wgrywać wideo automatycznie. **Odradzam** na tym etapie:

- Wgranie kosztuje ~1600 jednostek z domyślnego limitu 10 000 dziennie
- Wymaga OAuth i przeglądu aplikacji, jeśli ma działać poza trybem testowym
- A przede wszystkim: przy tempie „kilka nagrań na kwartał" ręczne wgranie zajmuje
  mniej czasu niż utrzymanie integracji

Wróćmy do tego, jeśli publikacja wideo stanie się regularna.

## Czego potrzebuję od Ciebie

1. Czy kanał YouTube już istnieje, a jeśli tak — czy ma jakieś nagrania?
2. Czy wideo ma być **przy wpisach na blogu**, czy raczej **na stronie usług**
   (np. pokaz działania AleDrogi Chat przy opisie produktu)?
3. Czy to nagranie szkoleniowe, o którym wspominałeś, ma być kiedykolwiek linkowane
   ze strony — bo jeśli widać na nim uczestników, trzeba najpierw sprawdzić, na co
   dokładnie się zgadzali. Do czasu wyjaśnienia zostawiam je poza planem.

## Rekomendacja

Kierunek A ma sens **dopiero wtedy, gdy jest co osadzać**. Kierunek B jest tani
i warto go dołożyć przy okazji budowania kolejki publikacji. Kierunek C — nie teraz.
