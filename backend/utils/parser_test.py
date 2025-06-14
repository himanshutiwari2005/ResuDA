import pdfplumber
import re

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

def clean_resume_text(text):
    # Basic cleanup: remove emails, links, symbols, etc.
    text = re.sub(r'\S+@\S+', '', text)  # emails
    text = re.sub(r'https?://\S+', '', text)  # urls
    text = re.sub(r'[^\w\s]', '', text)  # punctuation
    text = re.sub(r'\s+', ' ', text)  # extra whitespace
    return text.strip()

def parse_resume(pdf_path):
    raw_text = extract_text_from_pdf(pdf_path)
    cleaned = clean_resume_text(raw_text)
    return cleaned
