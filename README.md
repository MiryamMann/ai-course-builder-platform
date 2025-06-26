# 🎓 AI Learning Platform – Mini MVP
![Homepage Screenshot](./Public/HomePage.png)

A minimal yet production-grade learning platform driven by AI, built with a **full-stack TypeScript** architecture using Node.js, React, Redux Toolkit, Prisma, and PostgreSQL.  
Users can explore educational content by category, submit prompts to an AI engine, and track their learning history via a clean dashboard interface.

---

## 🚀 Getting Started

### 📦 Prerequisites

- Docker & Docker Compose  
- Node.js (v18+)  
- npm

### 🛠 Installation & Usage

1. **Clone the repository**
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. **Start the database using Docker**
```bash
docker-compose up
```

3. **Run both server and client**
```bash
npm run dev
```

> This will start both the backend (Express) and the frontend (React) simultaneously.

> ⚠️ Prisma does not require manual generation. The schema syncs automatically via Docker.

---

## 🧠 Features

- 🔐 **JWT Authentication** for secure login/register  
- 🧠 **Prompt Submission** to AI (OpenAI)  
- 📚 **Learning History** tracking per user  
- 🧑‍💼 **Admin Dashboard** for managing users & prompts  
- 🧾 **Category + Subcategory** content tagging  
- 💬 **Smart AI Chatbot**:
  - Helps users craft better prompts  
  - Allows bug reporting  
  - Provides direct contact channel with the developer  
- 🛠️ **CLI Script (`commit.sh`)** to streamline git workflow:
```bash
./commit "your-commit-message"
```

---

## 🧪 Validation & Type Safety

The platform uses [`zod`](https://zod.dev) for robust runtime validation with full TypeScript support:

- Validates all user input (body, params, query)
- Uses `z.infer` to ensure strict static types

---

## 🧰 Technologies

| Layer       | Stack                                               |
|-------------|-----------------------------------------------------|
| Frontend    | React, TypeScript, Redux Toolkit, Tailwind CSS     |
| Backend     | Node.js (TypeScript), Express.js, JWT              |
| ORM & DB    | Prisma, PostgreSQL (via Docker)                    |
| DevOps      | GitHub Actions (build + lint)                      |
| Other Tools | Axios, dotenv, bcrypt, React Router                |

![Architecture](./Public/architecture.png)

---

## ⚙️ GitHub Actions – CI

A GitHub Actions workflow runs automatically on push to main:

- ✅ Linting with ESLint  
- 🏗 Build checks for both frontend and backend  

> Easy to extend with tests and deployment scripts.

---

## 🌐 Deployment – Vercel

Frontend is deployed on **Vercel** with automatic CI/CD.  
Push to the `main` branch and Vercel handles the deployment.

🔗 [Live Site](https://ai-course-builder-platform.vercel.app/)

---

## 📄 .env Example

```env
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
JWT_SECRET=your_jwt_secret
```

---

## 📂 Project Structure

```bash
/src
  /controllers     → Handles incoming requests
  /routes          → Express route definitions
  /services        → Business logic (e.g., DB access)
  /middlewares     → Auth & Zod-based validation
  /schemas         → Zod validation schemas
  /client          → React-based frontend
```

---

## 💬 Contact

📧 **MiryamMann707@gmail.com**  
For bug reports, questions, or feedback.

---

> _This project was developed as part of a full-stack technical challenge. It demonstrates clean architecture, authentication, validation, OpenAI integration, and CI/CD deployment._
