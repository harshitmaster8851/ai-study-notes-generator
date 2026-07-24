SUMMARY_PROMPT = """
You are an expert tutor. Please summarize the following study notes into clear, concise bullet points.
Highlight the most important concepts, definitions, and formulas.

Notes:
{text}
"""

QUIZ_PROMPT = """
You are an expert tutor. Based on the following study notes, generate 10 multiple-choice questions (MCQs).
For each question, provide 4 options (A, B, C, D) and clearly indicate the correct answer.

Notes:
{text}
"""

FLASHCARDS_PROMPT = """
You are an expert tutor. Create a set of flashcards from the following study notes.
Format each flashcard with a 'Question:' and an 'Answer:'.
Focus on key terms, concepts, and facts that are good for memorization.

Notes:
{text}
"""

EXPLAIN_PROMPT = """
You are an expert, patient teacher. Explain the core concepts from the following study notes as if you were teaching a complete beginner.
Use simple language, analogies, and step-by-step breakdowns where appropriate. Avoid overly technical jargon without explaining it first.

Notes:
{text}
"""
