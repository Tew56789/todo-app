# 📝 Todo Web Application (Docker + CI/CD)

โปรเจกต์นี้คือ **Todo Web Application แบบ Full-Stack**  
พัฒนาด้วย **Frontend + Backend + MongoDB**  
รันด้วย **Docker & Docker Compose** และรองรับ **CI/CD ด้วย GitHub Actions**

---

## 🚀 Tech Stack

- **Frontend**: React + Nginx
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Container**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Image Registry**: Docker Hub

---

## 📦 ความสามารถของระบบ (Features)

- เพิ่ม / ลบ / แก้ไขสถานะ Todo
- ข้อมูลถูกเก็บใน MongoDB
- Frontend & Backend แยก container
- รันได้ทุกเครื่องที่มี Docker
- Build & Push Docker Image อัตโนมัติเมื่อมีการ Tag (CI/CD)

---

## ⚙️ สิ่งที่ต้องติดตั้งก่อน (Prerequisites)

- Docker  
- Docker Compose  
- Git  

> ❗ ไม่จำเป็นต้องติดตั้ง Node.js หรือ MongoDB ในเครื่อง

---

## 📥 วิธีติดตั้งและใช้งาน (Local)

### 1️⃣ Clone โปรเจกต์

```bash
git clone https://github.com/<username>/todo-app.git
cd todo-app
```

### 2️⃣ รันโปรเจกต์ด้วย Docker Compose

```bash
docker compose up -d
```

### 3️⃣ เข้าใช้งานระบบ

| ส่วน | URL |
|---|---|
| Frontend | http://localhost |
| Backend API | http://localhost:5000 |

---

## 📝 วิธีใช้งาน Todo App

1. เพิ่มรายการ Todo
2. ข้อมูลถูกบันทึกใน MongoDB
3. รีเฟรชหน้าเว็บ ข้อมูลยังอยู่

---

## 🔄 CI/CD Pipeline

- ใช้ GitHub Actions
- Build & Push Docker Image เมื่อมีการ Tag

---
