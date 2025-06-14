import random

skills = ['python', 'machine learning', 'sql', 'django', 'flask', 'excel', 'pandas', 'tensorflow', 'communication', 'teamwork']
resumes = []
labels = []

for _ in range(1000):
    sample = random.sample(skills, k=random.randint(3, 7))
    text = "Experienced in " + ", ".join(sample) + "."
    label = sum(1 for s in sample if s in ['python', 'machine learning', 'flask', 'pandas']) / 4  # Custom logic
    resumes.append(text)
    labels.append(round(label, 2))

# Save to CSV
import pandas as pd
df = pd.DataFrame({'resume': resumes, 'score': labels})
df.to_csv('resume-scorer\\backend\\model\\resume_dataset.csv', index=False)