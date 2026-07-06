#!/bin/bash
# ============================================================
#  Portfolio Full Deployment Script — AWS EC2 Ubuntu 22.04
#  Run this ONCE on your fresh EC2 instance
#  Usage: bash deploy.sh
# ============================================================

set -e  # Stop on any error

echo ""
echo "========================================="
echo "  🚀 Portfolio Deployment Starting..."
echo "========================================="
echo ""

# ─── CONFIG ───────────────────────────────────────────────
GITHUB_REPO="https://github.com/surendhitan/portfolio.git"
APP_DIR="/home/ubuntu/portfolio"
DB_NAME="portfolio_db"
DB_USER="portfoliouser"
DB_PASS="Portfolio@2025!"
# ──────────────────────────────────────────────────────────

echo "📦 Step 1: Updating system packages..."
sudo apt update && sudo apt upgrade -y

echo ""
echo "📦 Step 2: Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
echo "  ✅ Node.js $(node -v) installed"
echo "  ✅ npm $(npm -v) installed"

echo ""
echo "📦 Step 3: Installing PM2..."
sudo npm install -g pm2
echo "  ✅ PM2 installed"

echo ""
echo "📦 Step 4: Installing Nginx..."
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
echo "  ✅ Nginx installed and running"

echo ""
echo "📦 Step 5: Installing MySQL..."
sudo apt install -y mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql

# Create DB and user automatically
sudo mysql -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME};"
sudo mysql -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';"
sudo mysql -e "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"
echo "  ✅ MySQL installed, database '${DB_NAME}' created"

echo ""
echo "📦 Step 6: Configuring firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
echo "  ✅ Firewall configured (SSH, HTTP, HTTPS)"

echo ""
echo "📦 Step 7: Cloning your repository..."
if [ -d "$APP_DIR" ]; then
  echo "  Directory exists — pulling latest changes..."
  cd "$APP_DIR" && git pull
else
  git clone "$GITHUB_REPO" "$APP_DIR"
fi
echo "  ✅ Code ready at $APP_DIR"

echo ""
echo "📦 Step 8: Installing dependencies..."
cd "$APP_DIR"
cd backend && npm install --production
cd ../frontend && npm install
echo "  ✅ Dependencies installed"

echo ""
echo "📦 Step 9: Creating backend .env file..."
cat > "$APP_DIR/backend/.env" << EOF
# Server
PORT=5000
NODE_ENV=production

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASS}
DB_NAME=${DB_NAME}

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=your_email@gmail.com

# CORS
FRONTEND_URL=http://localhost
EOF
echo "  ✅ Backend .env created"

echo ""
echo "📦 Step 10: Setting up database schema..."
cd "$APP_DIR"
if [ -f "backend/database/schema.sql" ]; then
  mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < backend/database/schema.sql
  echo "  ✅ Database schema applied"
else
  echo "  ⚠️  No schema.sql found — skipping"
fi

echo ""
echo "📦 Step 11: Building React frontend..."
cd "$APP_DIR/frontend"
echo "VITE_API_URL=/api" > .env.production
npm run build
echo "  ✅ React build complete → frontend/dist/"

echo ""
echo "📦 Step 12: Configuring Nginx..."
PUBLIC_IP=$(curl -s http://checkip.amazonaws.com)

sudo tee /etc/nginx/sites-available/portfolio > /dev/null << NGINX
server {
    listen 80;
    server_name _;

    # React Frontend (serve built files)
    location / {
        root ${APP_DIR}/frontend/dist;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    # Node.js Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Uploads
    location /uploads {
        proxy_pass http://localhost:5000/uploads;
    }
}
NGINX

sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
echo "  ✅ Nginx configured for $SERVER_NAME"

echo ""
echo "📦 Step 13: Fixing file permissions..."
sudo chmod -R 755 "$APP_DIR"
sudo chown -R ubuntu:ubuntu "$APP_DIR"
echo "  ✅ Permissions set"

echo ""
echo "📦 Step 14: Starting app with PM2..."
cd "$APP_DIR/backend"
pm2 delete portfolio-backend 2>/dev/null || true
pm2 start server.js --name "portfolio-backend"
pm2 startup ubuntu -u ubuntu --hp /home/ubuntu
pm2 save
echo "  ✅ Backend running with PM2"

echo ""
echo "========================================="
echo "  ✅ DEPLOYMENT COMPLETE!"
echo "========================================="
echo ""
echo "  🌐 Your app is live at: http://$PUBLIC_IP"
echo ""
echo "  📋 NEXT STEPS FOR HTTPS:"
echo "  1. Go to https://duckdns.org and create a free subdomain"
echo "  2. Set the IP to: $PUBLIC_IP"
echo "  3. Run: sudo certbot --nginx -d YOUR_SUBDOMAIN.duckdns.org"
echo ""
echo "  🛠️  Useful commands:"
echo "     pm2 status              — check app status"
echo "     pm2 logs portfolio-backend — view logs"
echo "     pm2 restart portfolio-backend — restart app"
echo ""
