# server.py
# flask server to process text

import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from PySide2 import QtWidgets
import syntax

app = Flask(__name__)
CORS(app)
qapp = QtWidgets.QApplication(sys.argv)


@app.route("/process_text", methods=["POST"])
def process_text():
    data = request.json
    print(data)
    editor = QtWidgets.QPlainTextEdit()
    highlighter = syntax.PythonHighlighter(editor.document())
    # processed code will be a dict where the keys are the tokens
    # {"token": {"styles": "blue"}}
    processed_code = highlighter.highlightBlock(data["body"]["str"])
    # using processed code, make a new list that has everythang using the array as order
    default_style = {"styles": "white"}
    styled_token_list = []
    for token in data["body"]["lst"]:
        style = processed_code.get(token, default_style)
        styled_token_list.append({"word": token, "style": {"color": style["styles"]}})
    return jsonify({"data": styled_token_list})
