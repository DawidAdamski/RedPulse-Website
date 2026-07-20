---
title: Configuration
description: AleDrogi Chat settings — Allegro account, templates, rules, workflow, users.
sidebar:
  order: 4
---

## Allegro account

**Configuration → Allegro account.** This is where you connect the panel to your
seller account. The access token refreshes itself in the background; secrets stay
on the server and never reach the browser.

:::caution[The ratings permission was added later]
If your account was connected before the app started checking submitted ratings,
connect it again. Without the new consent the rating request still works, but it
cannot tell that the buyer already rated — and will ask a second time.
:::

## Variables and templates

**Templates → Variables.** Start with company details: name, dispatch hours, contact.
That keeps every message consistent and lets you change them in one place.

Variables come in three kinds:

| Kind | Where the value comes from |
| --- | --- |
| dynamic | from buyer, order or product data |
| list | a person picks before sending |
| free text | typed in by hand |

**Templates → editor.** A template can be general, pinned to a workflow stage (then
it is only suggested at that stage), or a **draft** — drafts appear neither in
suggestions nor in automatic sending, so you can work on the wording safely.

## Rules (autoresponders)

**Automation → Rules.** Every rule is a condition plus a template:

- **Always** — reacts to every message
- **First message in a thread** — the usual greeting
- **Keyword** — e.g. "return", "invoice"

Plus a mode — **Auto** sends by itself, **Suggested** offers the reply to a human —
and a priority for when more than one rule matches (lower number wins).

:::caution[Keep complaints on "Suggested"]
Discussions and complaints end in a decision that costs money. Rules for them should
suggest wording rather than send it on their own.
:::

## Workflow

**Automation → Workflow.** Six order stages, each with its own mode: automatic,
suggestion or manual. Status updates and the rating request are usually left on
automatic — that is where most of the reclaimed time comes from.

## Polling

**Configuration → Polling.** The app checks Allegro for new messages and order
changes at a set interval. You can change the interval, force a refresh now, and
enable automatic start after a server restart — without that last option automation
will not resume when the machine reboots.

## Users

**Configuration → Users** (administrator only). Three roles: Administrator, Manager,
Agent. Managers and administrators can take over a thread held by someone else;
agents cannot.

## Licence

**Configuration → Licence.** Activation by key, plus the licence type, number of
seats and expiry date. There is also an offline mode — the token can be exported
and imported by hand when the server has no internet access.

The Allegro account must be connected **before** activation, because the licence
binds to it.
