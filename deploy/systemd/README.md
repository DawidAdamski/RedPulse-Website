# mikr.us deployment (systemd)

How the live site runs on the mikr.us VPS and how it auto-updates. Nothing here is
secret — it's just unit files. The Docker Hub image is `anihilat/redpulse.tech:latest`,
served by nginx on container port 80, mapped to host port `40288`.

## Files

| File | Installs to | Purpose |
|------|-------------|---------|
| `redpulse.tech.service` | `/etc/systemd/system/` | Runs the container (pull + run, foreground, `Restart=always`) |
| `redpulse-update.sh` | `/usr/local/bin/` | Pulls latest; restarts the unit only if the image changed |
| `redpulse-update.service` | `/etc/systemd/system/` | One-shot that runs the script |
| `redpulse-update.timer` | `/etc/systemd/system/` | Fires the check every 5 min |

## Install

```bash
# 1. Container unit (if not already installed)
sudo cp redpulse.tech.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now redpulse.tech.service

# 2. Auto-update helper
sudo cp redpulse-update.sh /usr/local/bin/
sudo chmod +x /usr/local/bin/redpulse-update.sh
sudo cp redpulse-update.service redpulse-update.timer /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now redpulse-update.timer
```

Confirm the unit name matches: `systemctl list-unit-files | grep -i redpulse`. If your
container unit is named differently, update `UNIT=` at the top of `redpulse-update.sh`.

## How a deploy flows

1. You publish in the CMS (or push to `main`) → GitHub Actions builds and pushes a new
   `:latest` image to Docker Hub.
2. Within ~5 min the timer runs `redpulse-update.sh`. It `docker pull`s while the old
   container keeps serving; if a **newer** image came down it runs
   `systemctl restart redpulse.tech`, so the swap costs ~1s of downtime, not the whole
   download.
3. If nothing changed, it does nothing.

**Deploy now, manually:** `sudo systemctl restart redpulse.tech`
**Watch it:** `journalctl -t redpulse-update -f` and `systemctl status redpulse-update.timer`

## Why not Watchtower

Watchtower stops the container and recreates it itself. This container is owned by
systemd with `Restart=always` and a foreground `docker run`, so the moment Watchtower
stops it, systemd relaunches it — the two race on the `redpulse` container name and
conflict. The systemd timer above respects systemd's ownership instead of fighting it,
and pre-pulls to minimise downtime.
