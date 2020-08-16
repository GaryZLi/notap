import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Line from '../../Components/Line';
import { 
    updateLines,
    updateCurrentLineNumber
} from '../../actions/view';

const useStyles = makeStyles({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        overflowY: 'auto',
        justifyContent: 'center',
    },
    root: {
        height: '100%',
        width: '70%',
        backgroundColor: 'gray',
        cursor: 'default',
        outline: 'none',
    },
});

const TextEditor = ({
    lines,
    currentLineText,
    currentLineNumber,
    updateLines,
    updateCurrentLineNumber,
}) => {
    const classes = useStyles();

    useEffect(() => {
        const handleKeyPress = e => {
            if (e.key === 'Enter') {
                lines.splice(currentLineNumber, 0, []);
                // const a = lines.slice(0, currentLineNumber);
                // a.push([]);
                // const b = lines.slice(currentLineNumber);
                // updateLines([
                //     ...a,
                //     ...b
                // ]);

                updateLines(lines);
                updateCurrentLineNumber(currentLineNumber + 1);
            }
            else if (e.key === 'ArrowUp') {
                if (currentLineNumber > 1) {
                    updateCurrentLineNumber(currentLineNumber - 1);
                }
            }
            else if (e.key === 'ArrowDown') {

            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [lines, currentLineNumber, updateLines, updateCurrentLineNumber]);

    return (
        <div className={classes.container}>
            <div id='textContent' className={classes.root}>
                {lines.map((line, id) => (
                    <Line text={line} number={id + 1}/>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = ({view}) => {
    return {
        lines: view.lines,
        currentLineNumber: view.currentLineNumber,
    };
};

const mapDispatchToProps = {
    updateLines,
    updateCurrentLineNumber,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);