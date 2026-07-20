---
title: Konfiguracja
description: Ustawienia AleDrogi Chat — konto Allegro, szablony, reguły, workflow, użytkownicy.
sidebar:
  order: 4
---

## Konto Allegro

**Konfiguracja → Konto Allegro.** Tutaj łączysz panel ze swoim kontem sprzedawcy.
Token dostępu odświeża się sam w tle; sekrety zostają na serwerze i nigdy nie
trafiają do przeglądarki.

:::caution[Doszło uprawnienie do ocen]
Jeśli konto było połączone, zanim aplikacja zaczęła sprawdzać wystawione oceny,
połącz je ponownie. Bez nowej zgody prośba o ocenę zadziała, ale nie rozpozna,
że kupujący już ocenił — i poprosi drugi raz.
:::

## Zmienne i szablony

**Szablony → Zmienne.** Najpierw dane firmy: nazwa, godziny wysyłki, kontakt.
Dzięki temu wszystkie wiadomości brzmią spójnie i zmieniasz je w jednym miejscu.

Zmienne są trzech rodzajów:

| Rodzaj | Skąd wartość |
| --- | --- |
| dynamiczna | z danych kupującego, zamówienia lub produktu |
| lista | człowiek wybiera przed wysyłką |
| wolny tekst | wpisywana ręcznie |

**Szablony → edytor.** Szablon może być ogólny, przypięty do etapu workflow
(wtedy podpowiada się tylko na tym etapie) albo **roboczy** — roboczy nie pojawia
się ani w sugestiach, ani w auto-wysyłce, więc można nad nim spokojnie pracować.

## Reguły (autorespondery)

**Automatyzacja → Reguły.** Każda reguła to warunek i szablon:

- **Zawsze** — reaguje na każdą wiadomość
- **Pierwsza wiadomość w wątku** — typowe powitanie
- **Słowo kluczowe** — np. „zwrot", „faktura"

Do tego tryb — **Auto** wysyła samodzielnie, **Sugerowany** podpowiada człowiekowi —
oraz priorytet, gdy pasuje więcej niż jedna reguła (niższa liczba wygrywa).

:::caution[Reklamacje trzymaj na „Sugerowany"]
Dyskusje i reklamacje kończą się decyzją, która kosztuje. Reguły dla nich powinny
podpowiadać treść, a nie wysyłać ją samodzielnie.
:::

## Workflow

**Automatyzacja → Workflow.** Sześć etapów zamówienia, każdy z własnym trybem:
automatycznie, podpowiedź albo ręcznie. Komunikaty statusowe i prośbę o ocenę
zwykle zostawia się na „automatycznie" — to one dają najwięcej odzyskanego czasu.

## Odpytywanie

**Konfiguracja → Odpytywanie.** Aplikacja co pewien czas sprawdza w Allegro nowe
wiadomości i zmiany zamówień. Można ustawić interwał, wymusić odświeżenie „teraz"
i włączyć automatyczny start po restarcie serwera — bez tego ostatniego automatyzacja
nie wznowi się po ponownym uruchomieniu maszyny.

## Użytkownicy

**Konfiguracja → Użytkownicy** (tylko administrator). Trzy role: Administrator,
Manager, Agent. Manager i administrator mogą przejąć wątek obsługiwany przez kogoś
innego — agent nie.

## Licencja

**Konfiguracja → Licencja.** Aktywacja kluczem, podgląd rodzaju licencji, liczby
stanowisk i daty ważności. Jest też tryb offline — token można wyeksportować
i zaimportować ręcznie, gdy serwer nie ma dostępu do internetu.

Konto Allegro musi być połączone **przed** aktywacją, bo licencja wiąże się właśnie
z nim.
