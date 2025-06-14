import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))

from utils.parser_test import parse_resume
from utils.scorer_test import score_resume
from ipfs_utils import upload_text_to_ipfs
from contract_utils import store_resume_on_chain
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes

@app.route('/submit-resume', methods=['POST'])
def submit_resume():
    if 'resume' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['resume']
    
    # ✅ Save in current directory or subdir
    filename = file.filename
    save_path = os.path.join("uploads", filename)  # uploads/Resume.pdf

    os.makedirs("uploads", exist_ok=True)
    file.save(save_path)

    # ✅ Now pass the saved file to your pipeline
    parsed_text = parse_resume(save_path)
    score = score_resume(parsed_text)
    # print(f"Resume Score: {score}")
    ipfs_hash = upload_text_to_ipfs(parsed_text)
    tx_hash = store_resume_on_chain(ipfs_hash, int(score * 100))
    print("✅ Transaction sent:", tx_hash)

    return jsonify({
        "score": round(score, 2),
        "ipfs_cid": ipfs_hash,
        "tx_hash": tx_hash
    })


if __name__ == '__main__':
    app.run(debug=True)
