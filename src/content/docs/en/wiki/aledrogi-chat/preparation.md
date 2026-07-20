---
title: Before deployment
description: What to prepare before AleDrogi Chat lands on your hardware.
sidebar:
  order: 2
---

Installation and setup are done together — you prepare the three things below.

## 1. Somewhere for the app to run

A mini-PC in the office or a cheap VPS is enough. The app runs 24/7, so the machine
should stay on and have a stable connection.

You reach the panel through a browser, so you also need an **HTTPS address** — your
own domain or one provided by your VPS host. Without an encrypted connection login
will not work; that is a deliberate safeguard, not a fault.

## 2. An Allegro OAuth application

This is the one step you perform on your own seller account, which is exactly why
**you never give me your Allegro password**. The app connects through the official
API, and you grant and revoke consent yourself.

1. Go to `apps.developer.allegro.pl` and sign in with your seller account.
2. Register a new application of the "browser access / user login" type.
3. As the redirect address, enter the one I provide at deployment — it must match
   character for character.
4. Tick four permissions:

| Permission | What it is for |
| --- | --- |
| `allegro:api:messaging` | messages, threads and attachments |
| `allegro:api:orders:read` | reading orders — template data and statuses |
| `allegro:api:disputes` | discussions and complaints |
| `allegro:api:ratings` | checking whether the buyer already left a rating |

5. Accept the REST API terms and save. Send me the Client ID and Client Secret over
   a secure channel — they go onto your server only.

:::caution[Sandbox is a separate account]
Allegro's test environment has its own portal and its own registration. Sandbox keys
do not work in production, or the other way round.
:::

## 3. Who will be using it

Prepare a list of people and their role:

- **Administrator** — full rights, manages users and the licence
- **Manager** — like an agent, plus reports and the ability to take over someone
  else's thread
- **Agent** — handles conversations

Accounts are created in the panel after installation. The starting account gets a
random password that must be changed at first login — there is no default password.

## What you don't need to prepare

A mail server. Messages go through Allegro, and Allegro notifies the buyer by email
itself — there is no separate channel to configure.
