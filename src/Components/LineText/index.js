import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
    updateCurrentLineText,
    updateLineText,
} from '../../actions/view';

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        outline: 'none',
        border: 'none',
        backgroundColor: 'inherit',

        wordWrap: 'break-word',
        // cursor: 'default',
    },
});

const LineText = ({
    text,
    number,
    currentLineNumber,
    updateCurrentLineText,
    updateLineText,
}) => {
    const classes = useStyles();
    const containerRef = useRef();

    useEffect(() => {
        if (currentLineNumber === number) {
            containerRef.current.focus();
            updateCurrentLineText(text);
        }

    }, [number, currentLineNumber, updateCurrentLineText, text, containerRef]);

    const typing = e => {
        const text = e.target.innerText.trim();
        updateLineText(text, number);
        updateCurrentLineText(text);
    };
    

    return (
        <div className={classes.root}
            spellCheck='false'            
            ref={containerRef}
            suppressContentEditableWarning
            contentEditable
            onInput={typing}
        >
            {text}
        </div>
    );
};

const mapStateToProps = ({view}) => {
    return {
        currentLineNumber: view.currentLineNumber,
        currentLineText: view.currentLineText,
        lines: view.lines,
    };
};

const mapDispatchToProps = {
    updateCurrentLineText,
    updateLineText,
};

export default connect(mapStateToProps, mapDispatchToProps)(LineText);