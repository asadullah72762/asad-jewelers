# 💎 Asad Jewelers - Full Stack E-Commerce Project

A premium jewelry e-commerce web application built with modern DevOps practices.
Live demo runs on `http://localhost` after a single command.

![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED)
![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-D24939)
![Nginx](https://img.shields.io/badge/Nginx-Proxy-009639)

---

## 🛍️ Features

- Beautiful Dark Green & Gold premium UI
- Browse jewelry collection with category filters
- Product detail pages with full description
- Shopping cart with order summary
- Customer testimonials section
- Fully responsive design
- REST API backend with Express
- Containerized with Docker
- CI/CD pipeline with Jenkins
- Nginx reverse proxy

---

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React.js | User interface |
| **Backend** | Node.js + Express | REST API server |
| **Web Server** | Nginx | Reverse proxy |
| **Container** | Docker + Docker Compose | Containerization |
| **CI/CD** | Jenkins | Automated pipeline |
| **Version Control** | Git + GitHub | Source code management |

---

## 📁 Project Structure

```
asad-jewelers/
├── frontend/                  # React.js application
│   ├── src/
│   │   ├── App.js             # Main component with all pages
│   │   └── App.css            # Global styles
│   ├── public/
│   │   └── index.html         # HTML template
│   └── Dockerfile             # Frontend container recipe
│
├── backend/                   # Node.js API server
│   ├── server.js              # Main server file
│   ├── routes/
│   │   └── products.js        # Products API routes
│   ├── data/
│   │   └── products.json      # Products database
│   └── Dockerfile             # Backend container recipe
│
├── nginx/
│   └── nginx.conf             # Reverse proxy configuration
│
├── docker-compose.yml         # All services together
├── Jenkinsfile                # CI/CD pipeline definition
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

---

## ✅ Prerequisites

Make sure you have these installed on your system:

| Tool | Version | Check Command |
|------|---------|---------------|
| **Git** | Any | `git --version` |
| **Docker** | 20.0+ | `docker --version` |
| **Docker Compose** | 2.0+ | `docker compose version` |

> **Note:** Node.js is NOT required on your machine. Everything runs inside Docker!

---

## 🚀 Quick Start — Single Command Deploy

### Step 1 — Clone the repository
```bash
git clone https://github.com/asadullah72762/asad-jewelers.git
```

### Step 2 — Navigate to project folder
```bash
cd asad-jewelers
```

### Step 3 — Start everything with one command
```bash
docker compose up -d --build
```

### Step 4 — Open in browser
```
http://localhost
```

**That's it! The entire application is now running! 🎉**

---

## 🌐 Architecture — How It Works

```
User Browser
      ↓
http://localhost (Port 80)
      ↓
┌─────────────────┐
│  Nginx Proxy    │
│  (Port 80)      │
└────────┬────────┘
         ↓              ↓
┌────────────────┐   ┌──────────────────┐
│    Frontend    │   │     Backend      │
│  (React App)   │   │  (Node.js API)   │
│   Port 80      │   │   Port 5000      │
└────────────────┘   └────────┬─────────┘
                              ↓
                     ┌────────────────┐
                     │ products.json  │
                     │ (Data Storage) │
                     └────────────────┘
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check API status |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/products/category/:name` | Get products by category |

### Test API:
```bash
# Health check
curl http://localhost:5000/api/health

# Get all products
curl http://localhost:5000/api/products

# Get single product
curl http://localhost:5000/api/products/1

# Get by category
curl http://localhost:5000/api/products/category/Rings
```

---

## 🐳 Docker Services

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| `jewelers-frontend` | Custom React | 80 | Serves React app |
| `jewelers-backend` | Custom Node.js | 5000 | REST API |
| `jewelers-nginx` | nginx:alpine | 80 | Reverse proxy |

### Useful Docker Commands:
```bash
# See running containers
docker ps

# See live logs
docker compose logs -f

# See specific service logs
docker compose logs backend
docker compose logs frontend

# Stop everything
docker compose down

# Restart everything
docker compose up -d

# Rebuild after code changes
docker compose up -d --build
```

---

## ⚙️ Jenkins CI/CD Pipeline

The project includes a Jenkins pipeline with these stages:

```
Stage 1: Build        → Prepare application code
      ↓
Stage 2: Test         → Run all tests
      ↓
Stage 3: Deploy       → Deploy with Docker
      ↓
Stage 4: Health Check → Verify deployment success
```

### Setup Jenkins:
```bash
# Start Jenkins container
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts

# Open Jenkins in browser
http://localhost:8080
```

### Create Pipeline in Jenkins:
1. Open `http://localhost:8080`
2. Click **New Item**
3. Name: `asad-jewelers-pipeline`
4. Select **Pipeline**
5. Click **OK**
6. In Pipeline section, paste contents of `Jenkinsfile`
7. Click **Save**
8. Click **Build Now**

---

## 🔄 Making Changes and Redeploying

When you make changes to the code, follow this flow:

```
Edit code in VS Code
        ↓
git add .
        ↓
git commit -m "Your change description"
        ↓
git push
        ↓
docker compose up -d --build
        ↓
Changes are live at http://localhost ✅
```

### Commands:
```bash
# Save changes to Git
git add .
git commit -m "Description of your changes"
git push

# Rebuild and redeploy
docker compose up -d --build

# Verify everything is working
curl http://localhost/api/health
```

---

## 🛠️ Development Setup Without Docker

If you want to run locally without Docker for development:

### Run Backend:
```bash
cd backend
npm install
node server.js
# Backend runs on http://localhost:5000
```

### Run Frontend:
```bash
cd frontend
npm install
npm start
# Frontend runs on http://localhost:3000
```

> Make sure to add `"proxy": "http://localhost:5000"` in `frontend/package.json`

---

## 📦 Product Categories

| Category | Icon | Description |
|----------|------|-------------|
| Rings | 💍 | Gold & diamond rings |
| Necklaces | 📿 | Pearl & gold necklaces |
| Earrings | ✨ | Drop & stud earrings |
| Bangles | ⭕ | Pure gold bangle sets |
| Bracelets | 🌹 | Rose gold bracelets |
| Pendants | 💙 | Sapphire & gem pendants |
| Sets | 👑 | Complete bridal sets |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes
```bash
git commit -m "Add AmazingFeature"
```
4. Push to the branch
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request on GitHub

---

## 👨‍💻 Author

**Asad Ullah**
- GitHub: [@asadullah72762](https://github.com/asadullah72762)
- Project Link: [Asad Jewelers](https://github.com/asadullah72762/asad-jewelers)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <h3>💎 Asad Jewelers</h3>
  <p>Made with ❤️ in Pakistan</p>
  <p>Lahore, Pakistan © 2024</p>
</div>
