---
title: FAQ i rozwiązywanie problemów
description: Nieoczywiste zachowania AleDrogi Chat i najczęstsze problemy.
sidebar:
  order: 5
  label: FAQ
---

## Jak działa wysyłka

### Czy mogę wybrać, czy wiadomość idzie przez Allegro, czy mailem?

Nie i nie jest to brak funkcji. Wiadomość wysyłasz raz, a Allegro dostarcza ją
kupującemu w serwisie **i** powiadamia go mailem. Dlatego w panelu nie ma wyboru
kanału ani osobnej konfiguracji poczty.

### Wysłałem wiadomość, ale nie widzę jej w rozmowie

Nieudane wysyłki celowo nie tworzą dymka, żeby historia rozmowy pokazywała tylko to,
co kupujący faktycznie dostał. Powód niepowodzenia znajdziesz w **Konfiguracja → Logi**.

## Automatyzacja

### Dlaczego autoresponder nie odpowiedział?

Trzy najczęstsze powody:

1. **Wątek jest przejęty** przez człowieka — automat wtedy nie wchodzi w drogę.
2. **Szablon ma nieuzupełnioną zmienną**, której nie da się pobrać z danych.
   Wiadomość z pustym miejscem nie zostanie wysłana.
3. **Odpytywanie jest wyłączone** — sprawdź w Konfiguracji, czy działa i czy ma
   włączony automatyczny start po restarcie.

### Kupujący dostał prośbę o ocenę, choć już ocenił

Aplikacja sprawdza wystawione oceny, ale wymaga do tego zgody, która mogła zostać
nadana później niż samo połączenie konta. Połącz konto Allegro ponownie
(**Konfiguracja → Konto Allegro**).

## Dyskusje i reklamacje

### Kliknąłem „Zakończ dyskusję", a wątek nadal nie jest zamknięty

Tak to działa po stronie Allegro: dyskusji nie zamyka jedna strona. Kliknięcie
wysyła kupującemu **prośbę o zakończenie**, a wątek dostaje odznakę „Zakończenie
zgłoszone". W pełni zamknięty będzie dopiero, gdy druga strona też zakończy albo
gdy Allegro domknie sprawę.

### Zamknięty wątek wrócił na listę

Kupujący napisał ponownie. Wątek wraca jako „Czeka na Ciebie" z odznaką
„↻ ponownie otwarte", żeby nie zginął wśród zamkniętych.

## Praca zespołowa

### „Wątek obsługuje ktoś inny" — i nie mogę odpisać

To celowa blokada, żeby dwie osoby nie odpisały kupującemu równocześnie. Osoba,
która trzyma wątek, może go zwolnić; administrator i manager mogą przejąć go mimo
wszystko.

## Aktywacja

| Komunikat | Co zrobić |
| --- | --- |
| Konto Allegro nie jest połączone | Połącz konto **przed** aktywacją licencji |
| Nieprawidłowy klucz | Sprawdź, czy klucz został wklejony w całości |
| Klucz użyty na innym koncie | Klucz jest przypisany do jednego konta sprzedawcy |
| To konto ma już licencję | Użyj „Odnów" zamiast „Aktywuj" |

## Nadal nie działa

Napisz na [kontakt@redpulse.tech](mailto:kontakt@redpulse.tech) albo
[umów rozmowę](https://calendly.com/dawid-adamski-redpulse/30min). Jeśli możesz,
dołącz fragment z **Konfiguracja → Logi** z momentu, w którym wystąpił problem.
