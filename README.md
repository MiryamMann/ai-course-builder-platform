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
Start the database using Docker

bash
Copy
Edit
docker-compose up
Run both server and client

bash
Copy
Edit
npm run dev
This will start both the backend (Express) and the frontend (React) simultaneously.

⚠️ Prisma does not require manual generation. The schema syncs automatically via Docker.

🧠 Features
🔐 JWT Authentication for secure login/register

🧠 Prompt Submission to AI (OpenAI)

📚 Learning History tracking per user

🧑‍💼 Admin Dashboard for managing users & prompts

🧾 Category + Subcategory content tagging

💬 Smart AI Chatbot:

Helps users craft better prompts

Allows bug reporting

Provides direct contact channel with the developer

🛠️ CLI Script (commit.sh) to streamline git workflow:

bash
Copy
Edit
./commit "your-commit-message"
🧪 Validation & Type Safety
Input validation is powered by zod, with full TypeScript integration:

Runtime validation for all inputs (body, params, query)

Compile-time safety using z.infer<typeof Schema>

🧰 Technologies
Layer	Stack
Frontend	React, TypeScript, Redux Toolkit, Tailwind CSS
Backend	Node.js (TypeScript), Express.js, JWT
ORM & DB	Prisma, PostgreSQL (via Docker)
DevOps	GitHub Actions (build + lint)
Other Tools	Axios, dotenv, bcrypt, React Router
![Architecture](./Public/architecture.png)

⚙️ GitHub Actions – CI
A GitHub Actions workflow automatically runs on push:

✅ Linting with ESLint

🏗 Build validation (client & server)

Easy to extend with tests or deployment scripts.

🌐 Deployment – Vercel
The frontend is deployed on Vercel, with automatic CI/CD from GitHub.
Just push to the main branch — Vercel takes care of the build and deployment.

🔗 Live Site

📄 .env Example
Create a .env file in the root directory:

env
Copy
Edit
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
JWT_SECRET=your_jwt_secret
📂 Project Structure
bash
Copy
Edit
/src
  /controllers     → Handles incoming requests
  /routes          → Express route definitions
  /services        → Business logic (e.g., DB access)
  /middlewares     → Auth & Zod-based validation
  /schemas         → Zod validation schemas
  /client          → React-based frontend
💬 Contact
📧 MiryamMann707@gmail.com
For bug reports, questions, or feedback.

This project was developed as part of a full-stack technical challenge. It demonstrates clean architecture, authentication, validation, OpenAI integration, and CI/CD deployment.

yaml
Copy
Edit

---

רוצה שאשמור את זה לקובץ `README.md` ואשלח לך כאן להורדה?







Do
