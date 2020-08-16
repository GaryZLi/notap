import React from 'react';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { makeStyles } from '@material-ui/styles';
import {
    updateCurrentLineText,
    updateLineText,
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
    updateCurrentLineText,
    updateLineText,
}) => {
    const classes = useStyles();

    const typing = e => {
        const text = e.target.innerText.trim();
        updateLineText(text, number);
        updateCurrentLineText(text);
    };

    return (
        <div className={classes.root}
            contentEditable
            suppressContentEditableWarning
            onInput={typing}
        >
            <SyntaxHighlighter customStyle={{minHeight: 30}} style={gruvboxDark} language={line.language}>
                {line.text}
            </SyntaxHighlighter>
        </div>
    )
};

const mapDispatchToProps = {
    updateCurrentLineText,
    updateLineText,
};

export default connect(null, mapDispatchToProps)(Code);