from config import app
from flask import make_response, request

if __name__ == '__main__':
    app.run(port=5555, debug=True)