---
title: Instalacja techniczna
description: Uruchomienie AleDrogi Chat na własnym serwerze — dla osób technicznych.
sidebar:
  order: 3
---

:::note[Ta strona jest dla informatyka]
Standardowo instalację wykonuję w ramach wdrożenia. Ta instrukcja jest dla firm,
które mają własnego informatyka i wolą postawić aplikację same.
:::

## Wymagania

- Serwer z Podmanem albo Dockerem (amd64 lub arm64), stale włączony
- Reverse proxy z certyfikatem TLS — aplikacja ustawia ciasteczko sesji jako
  `Secure`, więc po zwykłym HTTP logowanie nie zadziała
- Obraz aplikacji, który przekazuję po zakupie (plik `.tar`)

## Uruchomienie

```bash
# 1. Wczytaj przekazany obraz
podman load -i aledrogi-chat-amd64.tar

# 2. Wolumen na bazę — przeżywa aktualizacje obrazu
podman volume create sklep-data

# 3. Start (port wystawiony tylko lokalnie, na zewnątrz idzie przez proxy z TLS)
podman run -d --name aledrogi --restart unless-stopped \
  -v sklep-data:/data \
  --env-file .env \
  -p 127.0.0.1:3000:3000 \
  localhost/aledrogi-chat:latest
```

Cały stan aplikacji to jeden plik SQLite w `/data` na wolumenie. Kopia zapasowa
tego wolumenu jest kopią całej aplikacji.

## Pierwsze logowanie

Hasło konta startowego jest losowane przy pierwszym uruchomieniu i wypisywane
**jednorazowo** do logu:

```bash
podman logs aledrogi
```

Przy pierwszym logowaniu aplikacja wymusi jego zmianę. Minimalna długość to
12 znaków.

## Kolejność przy pierwszym uruchomieniu

Licencja wiąże się z kontem Allegro, więc kolejność ma znaczenie:

1. Zaloguj się i zmień hasło startowe.
2. **Konfiguracja → Konto Allegro → Połącz** i przejdź autoryzację.
3. **Konfiguracja → Licencja** — wklej otrzymany klucz i kliknij „Aktywuj".

## Aktualizacja

```bash
podman load -i aledrogi-chat-amd64.tar   # nowy obraz
podman stop aledrogi && podman rm aledrogi
# ponownie `podman run` z tymi samymi parametrami — wolumen zostaje
```

Dane nie znikają, bo baza leży na wolumenie, a nie w kontenerze.

## Tryb testowy

Aplikację można uruchomić na danych przykładowych, bez łączenia z Allegro —
przydatne, żeby przeklikać panel przed podłączeniem prawdziwego konta. Tryb
ustawia się w konfiguracji przekazywanej przy wdrożeniu.
