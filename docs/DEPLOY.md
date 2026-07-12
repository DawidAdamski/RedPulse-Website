# Deployment — redpulse.tech

How code gets from a local commit to the live site at <https://redpulse.tech>.

The site is a **static Astro build** (`bun run build` → `dist/`) served by **nginx** inside a Docker image. GitHub Actions builds and pushes that image to Docker Hub on every push to `main`. **Going live is a manual step**: the owner pulls the new image and restarts the container on the mikr.us VPS.

---

## 1. Overview / architecture

```
  local commit
       │  git push origin main
       ▼
  GitHub (branch: main)
       │  triggers .github/workflows/docker.yml
       ▼
  GitHub Actions
       │  bun install → astro build → docker build
       │  push image to Docker Hub:
       │    <DOCKER_USERNAME>/redpulse.tech:latest
       │    <DOCKER_USERNAME>/redpulse.tech:<commit-sha>
       ▼
  Docker Hub  (image registry)
       │  ⟵ MANUAL: owner pulls + restarts container
       ▼
  mikr.us VPS  (Docker)
       │  container `redpulse` runs nginx, listens on :80
       ▼
  TLS terminated in front (see §5)  →  https://redpulse.tech
```

- **GitHub → Actions**: push to `main` starts the `Build and Push Docker Image` workflow.
- **Actions → Docker Hub**: the workflow builds the multi-stage `Dockerfile` (Bun build stage → `nginx:alpine` serve stage) and pushes two tags. It does **not** deploy.
- **Docker Hub → mikr.us**: the owner manually pulls and recreates the container. **New commits and blog posts only go live after this restart.**

---

## 2. One-time setup

### Docker Hub
1. Create a Docker Hub account.
2. Create a repository named **`redpulse.tech`** under your account. The workflow pushes to `<DOCKER_USERNAME>/redpulse.tech` (see `.github/workflows/docker.yml`), so the repo name must match exactly.
3. Create an **access token**: Docker Hub → Account Settings → Personal access tokens → Generate. Use this token as `DOCKER_TOKEN` below (not your account password).

### GitHub repo secrets
The workflow reads two secrets. Add them at **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
| --- | --- |
| `DOCKER_USERNAME` | your Docker Hub username |
| `DOCKER_TOKEN` | the Docker Hub **access token** (not the password) |

### mikr.us VPS
Prerequisites on the server:
- Docker installed and running.
- SSH access to the box.

Values you must supply (placeholders used throughout this doc):

| Placeholder | Meaning |
| --- | --- |
| `<DOCKER_USERNAME>` | your Docker Hub username |
| `<YOUR_SERVER>` | mikr.us hostname or IP for SSH |
| `<HOSTPORT>` | host port mapped to the container's port 80 (see §5 / your mikr.us proxy) |
| container name | this doc uses **`redpulse`** |

---

## 3. First deploy on the server

SSH in, then:

```bash
# Only needed if the Docker Hub repository is PRIVATE:
docker login -u <DOCKER_USERNAME>

# Pull the latest image built by CI:
docker pull <DOCKER_USERNAME>/redpulse.tech:latest

# Run it:
docker run -d \
  --name redpulse \
  -p <HOSTPORT>:80 \
  --restart unless-stopped \
  <DOCKER_USERNAME>/redpulse.tech:latest
```

- **`-p <HOSTPORT>:80`** — the container's nginx listens on port **80** (`EXPOSE 80` in the `Dockerfile`, `listen 80;` in `nginx.conf`). Map it to whatever host port your mikr.us setup expects in front of it.
- **`--restart unless-stopped`** — the container comes back automatically after a reboot or crash, unless you explicitly stop it.

### Alternative: docker-compose

`docker-compose.yml`:

```yaml
services:
  redpulse:
    image: <DOCKER_USERNAME>/redpulse.tech:latest
    container_name: redpulse
    ports:
      - "<HOSTPORT>:80"
    restart: unless-stopped
```

Bring it up:

```bash
docker compose up -d
```

---

## 4. Deploying an update (the routine you'll use most)

CI has already built and pushed the new image on push to `main`. **To make it live, pull and recreate the container:**

```bash
docker pull <DOCKER_USERNAME>/redpulse.tech:latest
docker stop redpulse && docker rm redpulse
docker run -d \
  --name redpulse \
  -p <HOSTPORT>:80 \
  --restart unless-stopped \
  <DOCKER_USERNAME>/redpulse.tech:latest
```

Or with compose (from the directory holding `docker-compose.yml`):

```bash
docker compose pull && docker compose up -d
```

This manual pull + restart is **the step that makes new commits and blog posts go live**. Skipping it means the site keeps serving the previously pulled image no matter how many times CI runs.

Tidy up old images occasionally:

```bash
docker image prune -f
```

---

## 5. TLS / domain

The container serves **plain HTTP on port 80** — there is no certificate or TLS inside the image. `nginx.conf` sets an HSTS header:

```
Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```

HSTS instructs browsers to use HTTPS only, so **HTTPS must be terminated in front of the container** — by a reverse proxy, the mikr.us proxy, or a service like Cloudflare that forwards to `<HOSTPORT>`.

The exact TLS mechanism is **not defined in this repo**. Confirm how TLS is terminated on your mikr.us setup and make sure `redpulse.tech` resolves to the front-facing endpoint, which forwards to the container on `<HOSTPORT>`.

---

## 6. Rollback

Every CI run also tags the image with the commit SHA (`<DOCKER_USERNAME>/redpulse.tech:<commit-sha>`). To roll back to a known-good build, run that tag instead of `:latest`:

```bash
docker pull <DOCKER_USERNAME>/redpulse.tech:<commit-sha>
docker stop redpulse && docker rm redpulse
docker run -d \
  --name redpulse \
  -p <HOSTPORT>:80 \
  --restart unless-stopped \
  <DOCKER_USERNAME>/redpulse.tech:<commit-sha>
```

Find a SHA in the repo's git history (`git log`) or on the Docker Hub repository's Tags page. With compose, set `image:` to the `:<commit-sha>` tag and run `docker compose up -d`.

---

## 7. Verifying a deploy

```bash
# Container is up and shows the expected image ID / recent "Up" time:
docker ps

# Serving locally on the host port:
curl -I http://localhost:<HOSTPORT>

# Public site (through TLS front):
curl -I https://redpulse.tech
```

Then open <https://redpulse.tech> in a browser and confirm the change (new page, blog post, etc.) is visible. A hard refresh helps — static assets are sent with `Cache-Control: public, immutable` and a 1-year expiry (`nginx.conf`), so cached JS/CSS/images can linger.

---

## 8. Troubleshooting

**Site not updating after a deploy**
- You didn't pull. `docker run` reuses the locally cached `:latest`. Always `docker pull` (or `docker compose pull`) first, then recreate.
- Confirm the intended image is running: `docker ps` and `docker inspect redpulse --format '{{.Image}}'`.
- Browser/CDN cache: hard refresh; if a proxy/Cloudflare sits in front, purge its cache.

**Container won't start**
- Port already in use: `Bind for 0.0.0.0:<HOSTPORT> failed: port is already allocated`. Find the holder (`docker ps`, or `sudo lsof -i :<HOSTPORT>`), stop it, or pick a different `<HOSTPORT>`.
- Check logs: `docker logs redpulse`.
- Name already taken (`Conflict. The container name "/redpulse" is already in use`): `docker rm -f redpulse`, then re-run.

**CI build failing**
- Missing/expired secrets: the `Login to Docker Hub` step fails if `DOCKER_USERNAME` / `DOCKER_TOKEN` are absent or the token has expired/been revoked. Regenerate the Docker Hub access token and update the GitHub secret.
- Build errors: inspect the failed run under the repo's **Actions** tab. A broken `astro build` (bad content/config) fails the `Build and push` step — reproduce locally with `bun run build`.
```
