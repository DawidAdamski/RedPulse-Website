# Redesign redpulse.tech — uwagi i backlog

> Źródło: analiza porównawcza redpulse.tech vs marcinkowski.ai (rozmowa z Claude, 2026-07-20).
> Status: w trakcie. Kolejność wg priorytetu w ramach sekcji.
> Zrobione (2026-07-21): A2–A4, B1–B3, C3, D1–D3. A1 tymczasowo (awatar 400×400).
> Otwarte: A1b (sesja), C1, C2 (czekają na materiał od Dawida).
>
> **Przepozycjonowanie (2026-07-21):** „stała opieka IT" wypadła z oferty, a wraz z nią
> zawężenie do małych firm. Strona mówi teraz o projektach i diagnostyce IT. Rozmowa jest
> płatna: konsultacja 200 zł netto / 30 min, diagnoza 300 zł netto / godz., koszt diagnozy
> odliczany od wyceny projektu. Uwagi w tym dokumencie sprzed tej daty odnoszą się do
> starego pozycjonowania.

## Kontekst / diagnoza

- Przewaga marcinkowski.ai jest niemal w całości **wizualna, nie tekstowa**: twarz w hero, edytorska typografia (szeryf), spokojna paleta (granat + złoto + krem), autorska narracja sekcji, brak ozdobników.
- Copy redpulse.tech jest **mocną stroną** — konkretne, ludzkie, z cenami i FAQ. Nie kopiować stylu Janusza (on pisze do zarządów, my do właścicieli małych firm).
- Wrażenie „pretensjonalności" u nas robi **sztafaż**, nie treść: nazwa „Innovations" w hero, angielskie motto, H1 = nazwa firmy, gadżety szablonu (terminal, siatka, SCROLL).

---

## A. Pierwsze wrażenie (hero) — priorytet 1

- [~] **A1. Zdjęcie Dawida w hero.** (tymczasowo: awatar 400×400 przy nagłówku — wystarcza, ale nie zastępuje sesji)
- [ ] **A1b. Docelowa sesja zdjęciowa.** Profesjonalna sesja, naturalna poza, wycięte tło. Bez tego pozostałe zmiany nie mają sensu — sprzedajemy „jedną osobę, która bierze odpowiedzialność", a strona nie pokazuje twarzy ani razu.
- [x] **A2. Zamiana hierarchii nagłówków.** H1 = „Twoje IT ma po prostu działać. Ja się tym zajmuję." Nazwa „RedPulse Innovations" zostaje tylko w logo. Obecnie najlepsze zdanie na stronie jest podtytułem.
- [x] **A3. Usunąć animowany terminal (Ansible/YAML) z hero.** Komunikuje „strona dla informatyków", a klient ma nie musieć być informatykiem. Miejsce zajmie zdjęcie z A1.
- [x] **A4. Wyciąć dekoracje szablonu:** czerwona siatka w tle, napis „SCROLL", pulsujące kropki. To one najbardziej robią wrażenie „template z ThemeForest".

## B. Design system — priorytet 2

- [x] **B1. Czerwień tylko jako akcent** (CTA, liczby, hover). Rozważyć ciemną, spokojną bazę (grafit/granat + złamana biel zamiast czystej bieli) — czerwień na takim tle wygląda „drogo" zamiast „głośno".
- [x] **B2. Typografia nagłówków z charakterem** — szeryf w nagłówkach (kierunek: edytorski, „magazynowy"), body zostaje sans. Mono tylko do drobnych etykiet, mniej UPPERCASE.
- [x] **B3. Pełna spójność językowa PL:** „Social media" → „Media społecznościowe"; motto „Make it simple and innovative" usunąć albo zepchnąć do stopki; przejrzeć wszystkie angielskie wtręty.

## C. Wiarygodność — priorytet 2

- [ ] **C1. Case studies jako osobne podstrony** — TODO, blokuje brak materiału.
  Potrzebne od Dawida, per case: branża i miasto klienta (bez nazwy, jeśli nie ma zgody),
  co się działo przed, co zrobiłeś, efekt **z liczbą** (godziny przestoju, koszt awarii,
  oszczędność), ile to trwało. Bez liczby case study jest tylko anegdotą.
  Kandydaci: „awaria, której nie znalazł serwis producenta", wieloletnia opieka nad firmą
  handlową, optymalizacja bazy. Technicznie: nowa kolekcja `caseStudies` + `/realizacje/[slug]`,
  ta sama mechanika co blog. Oryginalna notatka: w formacie: sytuacja → co zrobiłem → efekt (z liczbą: godziny przestoju, koszt awarii, oszczędność). Najmocniejszy materiał: „awaria, której nie znalazł serwis producenta".
- [ ] **C2. 2–3 opinie klientów** — TODO, blokuje brak zgód.
  Potrzebne: pisemna zgoda klienta na publikację (wystarczy mail), treść opinii oraz to,
  jak ma być podpisana — imię + firma, albo minimum „właściciel hurtowni, Bydgoszcz".
  Bez zgody nie publikujemy nawet zanonimizowanej opinii. Oryginalna notatka: z imieniem i firmą (min. branża + miasto, np. „właściciel hurtowni, Bydgoszcz"). Same liczby (24h, 4,67/5, 200+) bez twarzy działają o połowę słabiej.
- [x] **C3. Blog na stronie głównej** — sekcja z 2–3 ostatnimi wpisami (wzór: „Wybrane teksty" u Janusza). Buduje wrażenie „ten człowiek żyje tematem".

## D. Struktura i konwersja — priorytet 3

- [x] **D1. Jedna główna ścieżka CTA.** Obecnie: przycisk KONTAKT w nagłówku + link Kontakt w menu + „Napisz do mnie" + „Umów rozmowę". Rekomendacja: główne CTA = **„Umów rozmowę"** (niższy próg niż mail), reszta drugorzędna.
- [x] **D2. Sekcja „Jak wygląda współpraca"** — 3 kroki: rozmowa → diagnoza → opieka. Po przeczytaniu usług klient ma wiedzieć, co się stanie po kliknięciu.
- [x] **D3. OG image** (podgląd linku w Messengerze/WhatsApp) — z twarzą i obietnicą, nie z logo. Klienci z polecenia zobaczą najpierw tę miniaturę.

---

## E. Wiki dla aplikacji — szkielet postawiony (2026-07-21)

Starlight działa pod `/wiki` (PL) i `/en/wiki` (EN), z Pagefind i tokenami pod paletę strony.
Struktura pierwszej appki (AleDrogi Chat) jest pusta — czeka na treść z Obsidiana.

**Do uzupełnienia przez Dawida:** co robi AleDrogi Chat i dla kogo (dwa–trzy zdania prostym
językiem), wymagania i kroki instalacji, tabela ustawień, realne problemy do FAQ, pierwszy wpis
w changelogu.

**Uwagi techniczne:**
- Slugi stron muszą być identyczne w PL i EN (`installation`, `configuration`), inaczej Starlight
  dogeneruje zduplikowane strony EN z polską treścią. Tytuły w menu zostają po polsku.
- Starlight nie uruchomi się obok własnej konfiguracji `i18n` w Astro — locale bierze z niej.
- Nowa appka = katalog w `src/content/docs/wiki/` + wpis w `sidebar` w `astro.config.mjs`.

Stack strony to **Astro** → wiki na **Starlight** (oficjalny motyw dokumentacyjny Astro).

Decyzje:

- Lokalizacja: `redpulse.tech/wiki` — to samo repo i deploy, subpath zamiast subdomeny (SEO zostaje na głównej domenie).
- Treści w Markdown → pisanie/redagowanie w Obsidianie, wrzucanie niemal 1:1.
- Z pudełka: wyszukiwarka Pagefind (bez zewnętrznych usług), sidebar, dark mode, i18n PL/EN, bloki uwaga/ostrzeżenie.
- Ostylować tokeny Starlight pod design system strony (po zmianach z sekcji B), żeby wiki wyglądało jak część portalu.

Struktura per appka:

1. **Start** — co to jest i dla kogo
2. **Instalacja**
3. **Konfiguracja**
4. **FAQ / Rozwiązywanie problemów**
5. **Changelog** — ważny: pokazuje, że apki żyją; dowód, że opieka „od 800 zł/mc" ma pokrycie

---

## Proponowana kolejność implementacji

1. Sesja zdjęciowa (blokuje A1, D3) — jedyny punkt wymagający działania poza kodem
2. A2–A4 (szybkie zmiany w hero, bez zdjęcia)
3. B1–B3 (design system — przed budową wiki, żeby nie stylować dwa razy)
4. A1 + D3 (po otrzymaniu zdjęć)
5. D1–D2, C3
6. C1–C2 (wymaga zebrania zgód klientów na opinie)
7. E — scaffold Starlight + pierwsza appka
