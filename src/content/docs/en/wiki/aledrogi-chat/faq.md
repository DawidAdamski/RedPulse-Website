---
title: FAQ and troubleshooting
description: Non-obvious AleDrogi Chat behaviour and the most common problems.
sidebar:
  order: 5
  label: FAQ
---

## How sending works

### Can I choose whether a message goes through Allegro or by email?

No, and this is not a missing feature. You send a message once, and Allegro delivers
it to the buyer on the site **and** notifies them by email. That is why the panel has
no channel picker and no mail settings.

### I sent a message but I can't see it in the conversation

Failed sends deliberately do not create a bubble, so the conversation shows only what
the buyer actually received. The reason for the failure is in
**Configuration → Logs**.

## Automation

### Why didn't the autoresponder reply?

The three usual causes:

1. **The thread is taken** by a person — automation stays out of the way.
2. **A template variable could not be filled** from the data. A message with a gap
   in it will not be sent.
3. **Polling is off** — check in Configuration whether it is running and whether it
   starts automatically after a restart.

### A buyer got a rating request although they had already rated

The app checks submitted ratings, but that needs a consent which may have been granted
later than the account connection itself. Reconnect the Allegro account
(**Configuration → Allegro account**).

## Discussions and complaints

### I clicked "End discussion" and the thread still isn't closed

That is how Allegro works: a discussion is not closed by one side. Clicking sends the
buyer a **request to end it**, and the thread gets an "End requested" badge. It is
fully closed only once the other side ends it too, or Allegro closes the case.

### A closed thread came back to the list

The buyer wrote again. The thread returns as "Waiting for you" with a "↻ reopened"
badge so that it doesn't get lost among the closed ones.

## Working as a team

### "Thread handled by someone else" — and I can't reply

That is a deliberate lock, so that two people don't reply to a buyer at the same time.
Whoever holds the thread can release it; administrators and managers can take it over
regardless.

## Activation

| Message | What to do |
| --- | --- |
| Allegro account not connected | Connect the account **before** activating the licence |
| Invalid key | Check that the whole key was pasted |
| Key used on another account | A key belongs to one seller account |
| This account already has a licence | Use "Renew" instead of "Activate" |

## Still not working

Write to [contact@redpulse.tech](mailto:contact@redpulse.tech) or
[book a call](https://calendly.com/dawid-adamski-redpulse/30min). If you can, include
the excerpt from **Configuration → Logs** covering the moment the problem appeared.
