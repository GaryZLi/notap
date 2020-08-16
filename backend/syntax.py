# syntax.py

import sys

from PySide2 import QtCore, QtWidgets, QtGui


def format(color, style=""):
    """Return a QTextCharFormat with the given attributes.
    """
    _color = QtGui.QColor()
    _color.setNamedColor(color)

    _format = QtGui.QTextCharFormat()
    _format.setForeground(_color)
    if "bold" in style:
        _format.setFontWeight(QtGui.QFont.Bold)
    if "italic" in style:
        _format.setFontItalic(True)

    return _format


# Syntax styles that can be shared by all languages
STYLES = {
    "keyword": format("blue"),
    "operator": format("red"),
    "brace": format("darkGray"),
    "defclass": format("black", "bold"),
    "string": format("magenta"),
    "string2": format("darkMagenta"),
    "comment": format("darkGreen", "italic"),
    "self": format("black", "italic"),
    "numbers": format("brown"),
}

COLOR_STYLES = {
    "keyword": {"color": "blue"},
    "operator": {"color": "red"},
    "brace": {"color": "darkGray"},
    "defclass": {"color": "black"},
    "string": {"color": "magenta"},
    "string2": {"color": "darkMagenta"},
    "comment": {"color": "darkGreen", "fontStyle": "italic"},
    "self": {"color": "black", "fontStyle": "italic"},
    "numbers": {"color": "brown"},
}


class PythonHighlighter(QtGui.QSyntaxHighlighter):
    """Syntax highlighter for the Python language.
    """

    # Python keywords
    keywords = [
        "and",
        "assert",
        "break",
        "class",
        "continue",
        "def",
        "del",
        "elif",
        "else",
        "except",
        "exec",
        "finally",
        "for",
        "from",
        "global",
        "if",
        "import",
        "in",
        "is",
        "lambda",
        "not",
        "or",
        "pass",
        "print",
        "raise",
        "return",
        "try",
        "while",
        "yield",
        "None",
        "True",
        "False",
    ]

    # Python operators
    operators = [
        "=",
        # Comparison
        "==",
        "!=",
        "<",
        "<=",
        ">",
        ">=",
        # Arithmetic
        "\+",
        "-",
        "\*",
        "/",
        "//",
        "\%",
        "\*\*",
        # In-place
        "\+=",
        "-=",
        "\*=",
        "/=",
        "\%=",
        # Bitwise
        "\^",
        "\|",
        "\&",
        "\~",
        ">>",
        "<<",
    ]

    # Python braces
    braces = [
        "\{",
        "\}",
        "\(",
        "\)",
        "\[",
        "\]",
    ]

    def __init__(self, document):
        QtGui.QSyntaxHighlighter.__init__(self, document)

        # Multi-line strings (expression, flag, style)
        # FIXME: The triple-quotes in these two lines will mess up the
        # syntax highlighting from this point onward
        self.tri_single = (QtCore.QRegExp("'''"), 1, STYLES["string2"])
        self.tri_double = (QtCore.QRegExp('"""'), 2, STYLES["string2"])

        rules = []
        self.colors = []

        # Keyword, operator, and brace rules
        rules += [
            (r"\b%s\b" % w, 0, STYLES["keyword"]) for w in PythonHighlighter.keywords
        ]
        self.colors += [COLOR_STYLES["keyword"] for w in PythonHighlighter.keywords]
        rules += [
            (r"%s" % o, 0, STYLES["operator"]) for o in PythonHighlighter.operators
        ]
        self.colors += [COLOR_STYLES["operator"] for w in PythonHighlighter.operators]
        rules += [(r"%s" % b, 0, STYLES["brace"]) for b in PythonHighlighter.braces]
        self.colors += [COLOR_STYLES["brace"] for w in PythonHighlighter.braces]
        # All other rules
        rules += [
            # 'self'
            (r"\bself\b", 0, STYLES["self"]),
            # Double-quoted string, possibly containing escape sequences
            (r'"[^"\\]*(\\.[^"\\]*)*"', 0, STYLES["string"]),
            # Single-quoted string, possibly containing escape sequences
            (r"'[^'\\]*(\\.[^'\\]*)*'", 0, STYLES["string"]),
            # 'def' followed by an identifier
            (r"\bdef\b\s*(\w+)", 1, STYLES["defclass"]),
            # 'class' followed by an identifier
            (r"\bclass\b\s*(\w+)", 1, STYLES["defclass"]),
            # From '#' until a newline
            (r"#[^\n]*", 0, STYLES["comment"]),
            # Numeric literals
            (r"\b[+-]?[0-9]+[lL]?\b", 0, STYLES["numbers"]),
            (r"\b[+-]?0[xX][0-9A-Fa-f]+[lL]?\b", 0, STYLES["numbers"]),
            (r"\b[+-]?[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\b", 0, STYLES["numbers"]),
        ]
        self.colors += [
            COLOR_STYLES["self"],
            COLOR_STYLES["string"],
            COLOR_STYLES["string"],
            COLOR_STYLES["defclass"],
            COLOR_STYLES["defclass"],
            COLOR_STYLES["comment"],
            COLOR_STYLES["numbers"],
            COLOR_STYLES["numbers"],
            COLOR_STYLES["numbers"],
        ]

        # Build a QRegExp for each pattern
        self.rules = [(QtCore.QRegExp(pat), index, fmt) for (pat, index, fmt) in rules]

    def highlightBlock(self, text):
        """Apply syntax highlighting to the given block of text.
        """
        """
        Modify this function to take in text, and return the list of dictionaries
        that contain information about each block of text
        Main things left:
            - Grab the actual text that's being formatted
            - Compile everything into the format that we specified
              for the return value
        """

        returnList = []

        # Do other syntax formatting
        idx = 0
        for expression, nth, format in self.rules:
            index = expression.indexIn(text, 0)

            while index >= 0:
                # We actually want the index of the nth match
                index = expression.pos(nth)
                length = len(expression.cap(nth))
                print("expression.cap: " + " ' " + expression.cap(nth) + " ' ")
                print("index: {}".format(index))
                print("length: {}".format(length))
                print("color: {}".format(self.colors[idx]))
                returnList.append(
                    {"text": expression.cap(nth), "styles": self.colors[idx]}
                )
                self.setFormat(index, length, format)
                index = expression.indexIn(text, index + length)
            idx += 1

        self.setCurrentBlockState(0)

        # Do multi-line strings
        in_multiline = self.match_multiline(text, *self.tri_single)
        if not in_multiline:
            in_multiline = self.match_multiline(text, *self.tri_double)

        print(returnList)
        return returnList

    def match_multiline(self, text, delimiter, in_state, style):
        """Do highlighting of multi-line strings. ``delimiter`` should be a
        ``QRegExp`` for triple-single-quotes or triple-double-quotes, and
        ``in_state`` should be a unique integer to represent the corresponding
        state changes when inside those strings. Returns True if we're still
        inside a multi-line string when this function is finished.
        """
        # If inside triple-single quotes, start at 0
        if self.previousBlockState() == in_state:
            start = 0
            add = 0
        # Otherwise, look for the delimiter on this line
        else:
            start = delimiter.indexIn(text)
            # Move past this match
            add = delimiter.matchedLength()

        # As long as there's a delimiter match on this line...
        while start >= 0:
            # Look for the ending delimiter
            end = delimiter.indexIn(text, start + add)
            # Ending delimiter on this line?
            if end >= add:
                length = end - start + add + delimiter.matchedLength()
                self.setCurrentBlockState(0)
            # No; multi-line string
            else:
                self.setCurrentBlockState(in_state)
                length = len(text) - start + add
            # Apply formatting
            self.setFormat(start, length, style)
            # Look for the next match
            start = delimiter.indexIn(text, start + length)

        # Return True if still inside a multi-line string, False otherwise
        if self.currentBlockState() == in_state:
            return True
        else:
            return False
