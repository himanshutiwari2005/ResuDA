import re

# You can tweak or expand this list based on what's important
KEYWORDS = ['python', 'machine learning', 'data analysis', 'flask', 'sql', 'pandas']

def score_resume(text):
    score = 0
    for keyword in KEYWORDS:
        if re.search(rf'\b{keyword}\b', text, re.IGNORECASE):
            score += 1
    return score / len(KEYWORDS)