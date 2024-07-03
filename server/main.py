from flask import Flask, request, send_file, jsonify
import pandas as pd
from io import BytesIO
from process_marks import process_marks  
from flask_cors import CORS

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

        results = process_marks(input_file)
        return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
