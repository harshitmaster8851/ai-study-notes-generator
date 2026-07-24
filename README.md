# 🧠 AI Study Notes Generator

![AI Study Notes Generator](https://img.shields.io/badge/Status-Completed-brightgreen?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

A full-stack AI-powered educational web application that empowers students by converting static PDF study notes into interactive, active-learning materials.

## ✨ Features

- 📄 **Intelligent PDF Parsing**: Instantly extract text from your PDF study notes.
- 📝 **AI Summary**: Get concise, bulleted summaries emphasizing core concepts.
- 🎯 **Quiz Generator**: Automatically create 10 Multiple-Choice Questions (MCQs) to test your knowledge.
- 📇 **Flashcard Engine**: Generate Question-Answer pairs optimized for spaced repetition learning.
- 🧠 **Explain Simply (ELI5)**: Breaks down complex jargon into beginner-friendly analogies.
- 🚀 **Dockerized**: Fully containerized for seamless "one-click" local setup.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS v4, React Markdown
- **Backend**: FastAPI (Python), Uvicorn
- **AI / LLM**: Google Gemini API (`gemini-flash-latest` model)
- **Document Processing**: PyMuPDF (`fitz`)
- **Deployment**: Docker & Docker Compose

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) & Docker Compose installed.
- A Google Gemini API Key. (Get one [here](https://aistudio.google.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harshitmaster8851/ai-study-notes-generator.git
   cd ai-study-notes-generator
   ```

2. **Set up the Environment Variables:**
   Navigate to the `backend` directory and add your API key to the `.env` file.
   ```bash
   # inside backend/.env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

3. **Run with Docker Compose:**
   From the root directory of the project, run:
   ```bash
   docker-compose up -d --build
   ```

4. **Access the Application:**
   - **Frontend UI**: Open your browser and go to `http://localhost:5173`
   - **Backend API Docs (Swagger)**: `http://localhost:8000/docs`

## 🏗️ Architecture

1. **Client (React)**: Provides a modern drag-and-drop UI and handles asynchronous API calls.
2. **Server (FastAPI)**: Exposes RESTful endpoints. Acts as the orchestrator.
3. **Data Pipeline**:
   - PDF is uploaded via `multipart/form-data`.
   - `PyMuPDF` extracts the raw text in-memory.
   - The text is injected into prompt templates.
   - The backend communicates securely with the **Google Gemini API**.
   - The streamed/returned response is rendered dynamically on the frontend using `react-markdown`.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/harshitmaster8851/ai-study-notes-generator/issues).

## 📝 License

This project is licensed under the MIT License.
