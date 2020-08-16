import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
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
        backgroundColor: '#25251C',
        color: '#7A7A7A'
    },
});

const Code = ({
    line,
    number,
    currentLineNumber,
    currentLineText,
    updateCurrentLineText,
    updateLineText,
    updateCurrentLineNumber,
}) => {
    const classes = useStyles();
    const containerRef = useRef();

    // useEffect(() => {
    //     console.log('changing')
    // }, [line.text]);

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

    }, [number, currentLineNumber, updateLineText, updateCurrentLineText, line, containerRef]);

    // useEffect(() => {
    //     const handlePaste = e => {
    //         let clipboardData, pastedData;

    //         // Stop data actually being pasted into div
    //         e.stopPropagation();
    //         e.preventDefault();

    //         // Get pasted data via clipboard API
    //         clipboardData = e.clipboardData || window.clipboardData;
    //         pastedData = clipboardData.getData('Text');

    //         axios.post('http://localhost:5000/process_text', {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Access-Control-Allow-Origin':  '*',
    //             },
    //             body: {
    //                 'str': pastedData,
    //                 'lst': pastedData.split(' ')
    //             }
    //         })
    //         .then(res => updateLineText(res.data.data, number))
    //         .catch(err => console.log(err));
    //     };

    //     document.addEventListener('paste', handlePaste);
    // }, [line, currentLineText, number, updateLineText]);

    
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
            {/* {line.text.map(word => {
                console.log(word, 'ehe')
                if (word.style) {
                    return <span style={word.style}>{word.word}</span>
                }
                return word
            })} */}

            {line.text && (
                <SyntaxHighlighter customStyle={{minHeight: 30, margin: '5px 0px 5px 0px'}} style={docco} language={line.language}>
                    {line.text}
                </SyntaxHighlighter>
            )}
        </div>
    )
};

const mapStateToProps = ({view}) => {
    return {
        currentLineNumber: view.currentLineNumber,
        currentLineText: view.currentLineText,
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
