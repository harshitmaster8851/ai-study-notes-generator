import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import Response
import google.generativeai as genai
from dotenv import load_dotenv

from pdf_parser import extract_text_from_pdf
from prompts import SUMMARY_PROMPT, QUIZ_PROMPT, FLASHCARDS_PROMPT, EXPLAIN_PROMPT

# Load environment variables
load_dotenv()

# Initialize Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    print("WARNING: GEMINI_API_KEY not found in environment variables.")

router = APIRouter()

# In-memory storage for the latest extracted text (simplified for this scope)
# In a real app, you'd use a database and session/user IDs.
latest_extracted_text = {"text": ""}

def get_gemini_response(prompt_template: str, text: str) -> str:
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key is missing.")
    if not text.strip():
         raise HTTPException(status_code=400, detail="No text available to process.")
         
    try:
        model = genai.GenerativeModel('gemini-1.5-pro-latest')
        prompt = prompt_template.format(text=text)
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating AI response: {str(e)}")

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    try:
        contents = await file.read()
        extracted_text = extract_text_from_pdf(contents)
        
        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from the PDF. It might be scanned or empty.")
            
        latest_extracted_text["text"] = extracted_text
        return {"message": "PDF uploaded and text extracted successfully.", "filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process PDF: {str(e)}")

@router.post("/summary")
async def generate_summary():
    result = get_gemini_response(SUMMARY_PROMPT, latest_extracted_text["text"])
    return {"result": result}

@router.post("/quiz")
async def generate_quiz():
    result = get_gemini_response(QUIZ_PROMPT, latest_extracted_text["text"])
    return {"result": result}

@router.post("/flashcards")
async def generate_flashcards():
    result = get_gemini_response(FLASHCARDS_PROMPT, latest_extracted_text["text"])
    return {"result": result}

@router.post("/explain")
async def generate_explanation():
    result = get_gemini_response(EXPLAIN_PROMPT, latest_extracted_text["text"])
    return {"result": result}
