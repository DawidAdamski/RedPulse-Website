#!/usr/bin/env bash
# Auto-update helper for the redpulse.tech container.
#
# Pulls the latest image FIRST (while the current container keeps serving), and
# only restarts the systemd unit when a genuinely newer image was downloaded.
# Pulling before the restart keeps downtime to the ~1s stop->start window instead
# of "down for the whole image download".
#
# Install to: /usr/local/bin/redpulse-update.sh   (chmod +x)
# Triggered by: redpulse-update.timer (see this folder).
set -euo pipefail

IMAGE="anihilat/redpulse.tech:latest"
UNIT="redpulse.tech.service"   # must match the installed container unit's name

out="$(docker pull "$IMAGE" 2>&1)" || { logger -t redpulse-update "pull failed"; exit 0; }

if grep -q "Downloaded newer image" <<<"$out"; then
  logger -t redpulse-update "new image pulled -> restarting $UNIT"
  systemctl restart "$UNIT"
else
  logger -t redpulse-update "already up to date"
fi
