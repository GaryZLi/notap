# server.py
# flask server to process text

import sys
from flask import Flask, request, jsonify
from PySide2 import QtWidgets
import syntax

app = Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type"
qapp = QtWidgets.QApplication(sys.argv)


@app.route("/process_text", methods=["POST"])
def process_text():
    data = request.json
    print(data)
    editor = QtWidgets.QPlainTextEdit()
    highlighter = syntax.PythonHighlighter(editor.document())
    # processed code will be a dict where the keys are the tokens
    # {"token": {"styles": "blue"}}
    processed_code = highlighter.highlightBlock(data["str"])
    # using processed code, make a new list that has everythang using the array as order
    default_style = {"styles": "white"}
    styled_token_list = []
    for token in data["lst"]:
        style = processed_code.get(token, default_style)
        styled_token_list.append({token: style})
    return jsonify({"data": styled_token_list})
