# AI Study Notes Generator

A simple AI-powered web application where users upload study notes in PDF format and receive AI-generated summaries, quizzes, flashcards, and beginner-friendly explanations.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: FastAPI
- **LLM**: Google Gemini API
- **PDF Parser**: PyMuPDF
- **Deployment**: Docker, docker-compose

## Setup

1. Add your Google Gemini API key to a `.env` file in the `backend/` directory:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

2. Run with Docker Compose:
   ```bash
   docker-compose up -d --build
   ```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API Docs: http://localhost:8000/docs
