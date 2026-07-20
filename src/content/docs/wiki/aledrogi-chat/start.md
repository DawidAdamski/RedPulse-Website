---
title: Start
description: Czym jest AleDrogi Chat, dla kogo jest i co dokładnie robi.
sidebar:
  order: 1
---

AleDrogi Chat to panel obsługi kupujących dla sprzedawcy Allegro. W jednym miejscu
zbiera wiadomości, dyskusje i reklamacje, a powtarzalną część odpowiedzi bierze na
siebie — również wtedy, gdy nikt nie siedzi przy komputerze.

## Dla kogo

Dla firm sprzedających na Allegro, którym obsługa kupujących zaczyna zjadać dzień:
te same pytania o wysyłkę, ręczne pilnowanie próśb o ocenę, reklamacje ginące
w Centrum wiadomości.

Aplikacja działa **na Twoim sprzęcie** — mini-PC w firmie albo tani VPS. Historia
rozmów i dane kupujących zostają u Ciebie, nie w cudzej chmurze.

## Co robi

**Centrum rozmów.** Wszystkie wątki w jednym panelu, z podziałem na zwykłe wiadomości
i dyskusje/reklamacje. Po kolorze dymka od razu widać, co napisał człowiek, a co
automat: przychodzące są białe, wysłane ręcznie zielone, a wysłane przez autoresponder
bursztynowe z etykietą „Auto".

**Autorespondery.** Reguła to warunek i szablon: „zawsze", „pierwsza wiadomość
w wątku" albo konkretne słowo kluczowe. Każda reguła działa w jednym z dwóch trybów —
**Auto** wysyła sama, **Sugerowany** tylko podpowiada gotową odpowiedź nad polem
tekstowym, a wysyłkę zatwierdza człowiek.

**Workflow posprzedażowy.** Sekwencja sześciu etapów prowadzi kupującego przez
zamówienie: opłacone → oczekuje na nadanie → w drodze → w doręczeniu → odebrane →
prośba o ocenę. Każdy etap ma własny tryb: automatycznie, jako podpowiedź albo
całkiem ręcznie.

**Szablony ze zmiennymi.** `{{kupujacy}}`, `{{zamowienie}}`, `{{produkt}}` i podobne
uzupełniają się z danych zamówienia. Część zmiennych wybiera człowiek z listy przed
wysyłką — to celowe, przy trudniejszych sprawach.

**Leady.** Pytania sprzed zakupu są oznaczane osobno. Lead znika sam, kiedy pojawi
się zamówienie, i liczy się wtedy jako konwersja.

**Raporty.** Reklamacje: ile rozstrzygniętych, w jakim czasie, z jakim wynikiem i przy
których produktach najczęściej. Leady: ile aktywnych, ile skonwertowanych.

## Zasady, na których to stoi

:::tip[Człowiek ma pierwszeństwo]
Kiedy ktoś przejmie wątek, automat go omija. Reklamacje i dyskusje domyślnie tylko
podpowiadają odpowiedź — decyzję zawsze podejmuje człowiek.
:::

Aplikacja pracuje w tle, w stałym cyklu odpytywania Allegro. Nie musi być otwarta
przeglądarka, żeby autoodpowiedzi i etapy zamówienia szły dalej.

## Dalej

- [Przed wdrożeniem](/wiki/aledrogi-chat/preparation/) — co przygotować
- [FAQ](/wiki/aledrogi-chat/faq/) — rzeczy nieoczywiste, warto przeczytać przed startem
