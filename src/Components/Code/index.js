import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { makeStyles } from '@material-ui/styles';
import {
    updateCurrentLineText,
    updateLineText,
    updateCurrentLineNumber,
} from '../../actions/view';

const useStyles = makeStyles({
    root: {
        minHeight: 30,
        width: '100%',
    },
});

const Code = ({
    line,
    number,
    currentLineNumber,
    updateCurrentLineText,
    updateLineText,
    updateCurrentLineNumber,
}) => {
    const classes = useStyles();
    const containerRef = useRef();

    useEffect(() => {
        console.log('changing')
    }, [line.text]);

    const typing = e => {
        const text = e.target.innerText;
        updateLineText(text, number);
        updateCurrentLineText(text);
    };

    useEffect(() => {
        if (currentLineNumber === number) {
            containerRef.current.focus();
            updateCurrentLineText(line.text);
        }
        if (containerRef.current.innerText) {
            console.log(containerRef.current.innerText)
        }
        console.log()

    }, [number, currentLineNumber, updateLineText, updateCurrentLineText, line.text, containerRef]);

    return (
        <div className={classes.root}
            contentEditable
            suppressContentEditableWarning
            spellCheck='false'
            data-gramm_editor="false"
            onInput={typing}
            ref={containerRef}
            onMouseDown={() => updateCurrentLineNumber(number)}
        >
            <SyntaxHighlighter customStyle={{minHeight: 30, margin: 0}} style={gruvboxDark} language={line.language}>
                {line.text}
            </SyntaxHighlighter>
        </div>
    )
};

const mapStateToProps = ({view}) => {
    return {
        currentLineNumber: view.currentLineNumber,
    };
};

const mapDispatchToProps = {
    updateCurrentLineText,
    updateLineText,
    updateCurrentLineNumber,
};

export default connect(mapStateToProps, mapDispatchToProps)(Code);


// const textFile = null,
//   makeTextFile = function (text) {
//     const data = new Blob([text], {type: 'text/plain'});

//     // If we are replacing a previously generated file we need to
//     // manually revoke the object URL to avoid memory leaks.
//     if (textFile !== null) {
//       window.URL.revokeObjectURL(textFile);
//     }

//     textFile = window.URL.createObjectURL(data);

//     return textFile;
//   };

//   };

// export default Export;