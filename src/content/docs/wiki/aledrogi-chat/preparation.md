---
title: Przed wdrożeniem
description: Co przygotować, zanim AleDrogi Chat trafi na Twój sprzęt.
sidebar:
  order: 2
---

Instalację i konfigurację robimy razem — Ty przygotowujesz trzy rzeczy poniżej.

## 1. Miejsce, gdzie aplikacja będzie działać

Wystarczy mini-PC w firmie albo tani VPS. Aplikacja działa 24/7, więc maszyna
powinna być stale włączona i mieć stałe łącze.

Do panelu logujesz się przez przeglądarkę, więc potrzebny jest też **adres z HTTPS**
— czy to własna domena, czy adres udostępniony przez dostawcę VPS. Bez szyfrowanego
połączenia logowanie nie zadziała i jest to celowe zabezpieczenie, nie usterka.

## 2. Aplikacja OAuth w Allegro

To jedyny krok, który musisz wykonać na swoim koncie sprzedawcy — dzięki temu
**nie podajesz mi hasła do Allegro**. Aplikacja łączy się przez oficjalne API,
a zgodę nadajesz i cofasz sam.

1. Wejdź na `apps.developer.allegro.pl` i zaloguj się kontem sprzedawcy.
2. Zarejestruj nową aplikację typu „dostęp przez przeglądarkę / logowanie użytkownika".
3. Jako adres przekierowania wpisz adres, który podam przy wdrożeniu — musi się
   zgadzać co do znaku.
4. Zaznacz cztery uprawnienia:

| Uprawnienie | Do czego służy |
| --- | --- |
| `allegro:api:messaging` | wiadomości, wątki i załączniki |
| `allegro:api:orders:read` | odczyt zamówień — dane do szablonów i statusy |
| `allegro:api:disputes` | dyskusje i reklamacje |
| `allegro:api:ratings` | sprawdzanie, czy kupujący już wystawił ocenę |

5. Zaakceptuj regulamin REST API i zapisz. Client ID i Client Secret przekaż mi
   bezpiecznym kanałem — trafiają wyłącznie na Twój serwer.

:::caution[Sandbox to osobne konto]
Środowisko testowe Allegro ma własny portal i własną rejestrację. Klucze z sandboksa
nie działają na produkcji i odwrotnie.
:::

## 3. Kto będzie korzystał

Przygotuj listę osób i ich rolę:

- **Administrator** — pełne uprawnienia, zarządza użytkownikami i licencją
- **Manager** — jak agent, plus raporty i możliwość przejęcia cudzego wątku
- **Agent** — obsługuje rozmowy

Konta zakłada się w panelu po instalacji. Konto startowe dostaje losowe hasło,
które trzeba zmienić przy pierwszym logowaniu — nie ma żadnego domyślnego hasła.

## Czego nie musisz przygotowywać

Serwera pocztowego. Wiadomości idą przez Allegro, a Allegro samo powiadamia
kupującego mailem — nie ma osobnego kanału do konfigurowania.
