# server.py
# flask server to process text

import sys
from flask import Flask, request
from PySide2 import QtWidgets
import syntax

app = Flask(__name__)
qapp = QtWidgets.QApplication(sys.argv)


@app.route("/process_text", methods=["POST"])
def process_text():
    data = request.json
    editor = QtWidgets.QPlainTextEdit()
    highlighter = syntax.PythonHighlighter(editor.document())
    processed_code = highlighter.highlightBlock(data["data"])
    return {"data": processed_code}
