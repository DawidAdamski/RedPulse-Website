---
title: Technical installation
description: Running AleDrogi Chat on your own server — for technical readers.
sidebar:
  order: 3
---

:::note[This page is for an IT person]
Normally I perform the installation as part of the deployment. These instructions
are for companies with their own IT person who prefer to set it up themselves.
:::

## Requirements

- A server with Podman or Docker (amd64 or arm64), permanently on
- A reverse proxy with a TLS certificate — the app marks its session cookie as
  `Secure`, so login will not work over plain HTTP
- The application image, which I provide after purchase (a `.tar` file)

## Starting it

```bash
# 1. Load the image you were given
podman load -i aledrogi-chat-amd64.tar

# 2. A volume for the database — it survives image updates
podman volume create shop-data

# 3. Start (port bound locally; the outside world goes through the TLS proxy)
podman run -d --name aledrogi --restart unless-stopped \
  -v shop-data:/data \
  --env-file .env \
  -p 127.0.0.1:3000:3000 \
  localhost/aledrogi-chat:latest
```

The entire application state is a single SQLite file under `/data` on the volume.
A backup of that volume is a backup of the whole application.

## First login

The starting account's password is generated at first start and printed **once**
to the log:

```bash
podman logs aledrogi
```

At first login the app forces a change. The minimum length is 12 characters.

## The order matters on a fresh install

The licence binds to your Allegro account, so:

1. Log in and change the starting password.
2. **Configuration → Allegro account → Connect** and complete the authorisation.
3. **Configuration → Licence** — paste the key you received and click "Activate".

## Updating

```bash
podman load -i aledrogi-chat-amd64.tar   # new image
podman stop aledrogi && podman rm aledrogi
# run again with the same parameters — the volume stays
```

Data survives, because the database lives on the volume rather than in the container.

## Test mode

The app can run on sample data without connecting to Allegro — useful for clicking
through the panel before a real account is attached. The mode is set in the
configuration provided at deployment.
