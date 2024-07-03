from flask import Flask, request, jsonify
import pandas as pd
from io import BytesIO
from flask_cors import CORS
from process_marks import process_marks  # Ensure the process_marks function is in process_marks.py

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file:
        input_file = BytesIO(file.read())
        _, json_results = process_marks(input_file)
        return jsonify(json_results)

if __name__ == '__main__':
    app.run(debug=True)
