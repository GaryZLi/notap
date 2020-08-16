# server.py
# flask server to process text

import sys
from flask import Flask, request
from PySide2 import QtWidgets
import syntax

app = Flask(__name__)


@app.route("/process_text", methods=["POST"])
def process_text():
    data = request.json
    app = QtWidgets.QApplication(sys.argv)
    editor = QtWidgets.QPlainTextEdit()
    highlighter = syntax.PythonHighlighter(editor.document())
    processed_code = highlighter.highlightBlock(data["data"])
    del app
    return {"data": processed_code}
