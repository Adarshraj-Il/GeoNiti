#!/bin/bash
set -e

echo "=========================================================="
echo "    Starting GeoNiti Deployment on VM (Caddy Network)     "
echo "=========================================================="

# 1. Setup production environment variables
if [ ! -f .env.vm ]; then
    echo "[1/3] Creating .env.vm for production deployment..."
    cp .env.example .env.vm
    
    # Generate new random password and JWT secret for production security
    DB_PASS=$(openssl rand -hex 16)
    JWT_SEC=$(openssl rand -base64 32)
    
    sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=${DB_PASS}/" .env.vm
    sed -i "s/JWT_SECRET=.*/JWT_SECRET=${JWT_SEC}/" .env.vm
    sed -i "s|CLIENT_URL=.*|CLIENT_URL=https://geoniti.duckdns.org|" .env.vm
    sed -i "s|VITE_API_URL=.*|VITE_API_URL=https://geoniti.duckdns.org|" .env.vm
    
    echo "      Generated secure DB_PASSWORD and JWT_SECRET in .env.vm"
else
    echo "[1/3] .env.vm already exists, using existing configuration."
fi

# 2. Make sure Caddyfile exists
if [ ! -f Caddyfile ]; then
    echo "ERROR: Caddyfile is missing! Please ensure it is present."
    exit 1
fi
echo "[2/3] Caddyfile found."

# 3. Build and start containers
echo "[3/3] Building and starting Docker containers..."
# Determine docker compose command (docker compose vs docker-compose)
if command -v docker compose &> /dev/null; then
    DOCKER_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
    DOCKER_CMD="docker-compose"
else
    echo "ERROR: Docker Compose is not installed."
    exit 1
fi

$DOCKER_CMD -f docker-compose.vm.yml --env-file .env.vm build
$DOCKER_CMD -f docker-compose.vm.yml --env-file .env.vm up -d

echo ""
echo "=========================================================="
echo "Deployment successful!"
echo "Your app is starting and will be available at:"
echo "👉  https://geoniti.duckdns.org"
echo ""
echo "Note:"
echo "- Caddy will automatically provision SSL certificates."
echo "- Ensure ports 80 and 443 are open on your VM's firewall."
echo "=========================================================="
