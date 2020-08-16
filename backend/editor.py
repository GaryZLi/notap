# editor.py
import sys

from PySide2 import QtGui, QtWidgets
import syntax

# new starts
# from pygments import highlight
# from pygments.lexers import PythonLexer
# from pygments.formatters import HtmlFormatter
# new ends

app = QtWidgets.QApplication(sys.argv)
editor = QtWidgets.QPlainTextEdit()

# old starts
highlight = syntax.PythonHighlighter(editor.document())
editor.show()
# old ends


# new starts
# code = 'print "Hello World"'
# print(highlight(code, PythonLexer(), HtmlFormatter()))
# new ends

# Load syntax.py into the editor for demo purposes
infile = open("text.py", "r")
editor.setPlainText(infile.read())


app.exec_()
