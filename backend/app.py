# backend/app.py
import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests

load_dotenv() # Load variables from .env file

app = Flask(__name__)
CORS(app) # Enable Cross-Origin Resource Sharing

NEWS_API_KEY = os.getenv('NEWS_API_KEY')
NEWS_API_URL = 'https://newsapi.org/v2/everything'

@app.route('/api/articles', methods=['GET'])
def get_articles():
    try:
        # Search for articles related to common crisis terms
        params = {
            'q': 'pandemic OR conflict OR climate OR disaster',
            'apiKey': NEWS_API_KEY,
            'language': 'en',
            'sortBy': 'publishedAt',
            'pageSize': 50
        }
        response = requests.get(NEWS_API_URL, params=params)
        response.raise_for_status() # Raise an exception for bad status codes
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002)