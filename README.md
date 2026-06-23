# Portfolio Full Stack — Production Build Guide

## Project Structure
```
potpolio/
├── backend/          ← Node.js + Express + MySQL API
│   ├── server.js     ← Main server (serves API + React build in prod)
│   ├── routes/       ← API routes
│   ├── config/db.js  ← MySQL connection
│   ├── database/     ← SQL schema
│   └── .env          ← Environment config
├── frontend/
│   ├── src/          ← React source code
│   └── dist/         ← ✅ Production build (ready to serve)
└── package.json      ← Root convenience scripts
```

---

## Quick Start — Development

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

---

## Production Build & Run (Single Server)

### Step 1 — Set up MySQL database
```bash
cd backend
npm run setup-db
```

### Step 2 — Configure environment
Edit `backend/.env`:
```
PORT=5000
NODE_ENV=production
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portfolio_db
```

### Step 3 — Build React frontend
```bash
cd frontend
npm run build
# Output: frontend/dist/
```

### Step 4 — Start production server
```bash
cd backend
npm run start:prod
# Serves BOTH API + React on http://localhost:5000
```

---

## Deploy to VPS / Linux Server (e.g. AWS EC2, DigitalOcean)

### 1. Upload files via SCP
```bash
scp -r ./potpolio ubuntu@YOUR_SERVER_IP:/var/www/portfolio
```

### 2. Install dependencies on server
```bash
cd /var/www/portfolio/backend && npm install --production
```

### 3. Set environment variables
```bash
cp backend/.env.example backend/.env
nano backend/.env   # Edit with real values
```

### 4. Setup MySQL
```bash
mysql -u root -p < backend/database/schema.sql
```

### 5. Start with PM2 (process manager)
```bash
npm install -g pm2
cd backend
NODE_ENV=production pm2 start server.js --name "portfolio"
pm2 save
pm2 startup
```

### 6. Nginx reverse proxy (optional, for port 80)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| GET | /api/profile | Portfolio owner info |
| GET | /api/skills | All skills (filter: ?category=frontend) |
| GET | /api/projects | All projects (filter: ?featured=true) |
| GET | /api/education | Education history |
| GET | /api/experience | Work experience |
| GET | /api/services | Services offered |
| GET | /api/testimonials | Client testimonials |
| GET | /api/all | All data in one request |
| POST | /api/contact | Submit contact form |

---

## Tech Stack
- **Frontend:** React 18 + Vite + CSS3
- **Backend:** Node.js + Express.js
- **Database:** MySQL 8
- **Security:** Helmet, CORS, Rate Limiting
