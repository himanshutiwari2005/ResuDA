import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import Ridge
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib

# Load dataset
df = pd.read_csv("resume-scorer\\backend\\model\\resume_dataset.csv")
X = df['resume']
y = df['score']

# Convert text to TF-IDF features
vectorizer = TfidfVectorizer()
X_vec = vectorizer.fit_transform(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X_vec, y, test_size=0.2, random_state=42)

# Train a regression model
model = Ridge()
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse:.4f}")

# Save model and vectorizer
joblib.dump(model, "resume-scorer\\backend\\model\\scorer.pkl")
joblib.dump(vectorizer, "resume-scorer\\backend\\model\\vectorizer.pkl")