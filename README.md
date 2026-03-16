# SaaS Intelligence Vault

This project wraps your provided AI agent portfolio page in a small Flask service that is ready to run locally or under Docker Compose.

## Local run

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python app.py
```

The app listens on `http://127.0.0.1:8001` by default.

## Docker Compose run

```bash
cp .env.example .env
docker compose up -d --build
```

By default, Compose publishes the service publicly on port `8001`:

- Container port: `8001`
- Host port: `0.0.0.0:8001`

Port `8000` is not used by this app.

## Expose from the same VM

### Option 1: Existing reverse proxy on the VM

If you already terminate traffic with Nginx, proxy to `127.0.0.1:8001` or your VM IP on port `8001`.

An example server block is available in `deploy/nginx/saas-intelligence-vault.conf.example`.

Typical steps:

```bash
sudo cp deploy/nginx/saas-intelligence-vault.conf.example /etc/nginx/sites-available/saas-intelligence-vault.conf
sudo ln -s /etc/nginx/sites-available/saas-intelligence-vault.conf /etc/nginx/sites-enabled/saas-intelligence-vault.conf
sudo nginx -t
sudo systemctl reload nginx
```

Then point your DNS record, for example `vault.example.com`, to the VM.

### Option 2: Direct public port exposure

The current Compose file already exposes the service publicly on port `8001`:

```yaml
ports:
  - "${HOST_PORT:-8001}:8001"
```

If you want to limit access to reverse proxy only, change it to:

```yaml
ports:
  - "127.0.0.1:${HOST_PORT:-8001}:8001"
```

For public access, keep the current mapping and make sure port `8001` is allowed in your cloud security group.

## Health endpoint

The app exposes `GET /health` for a simple container or reverse proxy check.