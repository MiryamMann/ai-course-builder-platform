# AI Learning Platform – Mini MVP

This project is a minimal viable product (MVP) for an AI-driven learning platform, built with a modern full-stack architecture using **Node.js**, **React**, **Redux Toolkit**, **Prisma**, and **PostgreSQL**. The platform supports prompt-based learning and allows users to register, log in, and submit prompts to an AI model for responses.

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js (v18+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
Start the database using Docker:

bash
Copy
Edit
docker-compose up
Start the development server:

bash
Copy
Edit
npm run dev
⚠️ Prisma does not require manual generation. The database works directly via Docker.

🧠 Features
User registration and login (with JWT authentication)

Admin dashboard for viewing all users and their submitted prompts

Prompt history for each user

Protected routes for admin and user roles

AI virtual assistant (mini chatbot) that:

Suggests how to write effective prompts

Allows users to report bugs or contact the developer

Minimal CLI tool for developers (commit.sh):

Saves local changes

Prompts for commit message

Automatically pushes to GitHub

🛡️ Technologies
Frontend: React, TypeScript, Redux Toolkit, Tailwind CSS

Backend: Node.js, Express.js, JWT

Database: PostgreSQL (via Docker)

ORM: Prisma

DevOps: GitHub Actions (build & test)

Other: Axios, React Router, dotenv, bcrypt

⚙️ GitHub Actions
The project includes one GitHub Action that performs:

Linting

Building the application

(You can extend it for tests or deployment later.)

📧 Contact
For bug reports, feedback, or general support:
Email: MiryamMann707@gmail.com

This project was built as part of a technical assessment challenge and demonstrates authentication, protected routes, prompt/response history, and admin interface.

go
Copy
Edit
## 🌐 Deployment

The frontend of this project is deployed on [([https://vercel.com](https://ai-course-builder-platform.vercel.app/)), allowing for fast, serverless delivery and seamless CI/CD integration.

