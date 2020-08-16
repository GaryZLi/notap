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
    currentLineNumber,
    updateLines,
    updateCurrentLineNumber,
}) => {
    const classes = useStyles();

    useEffect(() => {
        const handleKeyPress = e => {
            if (e.key === 'Enter') {
                if (window.getSelection().anchorOffset === window.getSelection().focusOffset) {
                    lines.splice(
                        currentLineNumber-1,
                        1,
                        lines[currentLineNumber-1].slice(0, window.getSelection().anchorOffset),
                        lines[currentLineNumber-1].slice(window.getSelection().anchorOffset)
                    );
                }
                else {
                    lines.splice(
                        currentLineNumber-1,
                        1,
                        '',
                    );
                }

                
                
                updateLines(lines);
                updateCurrentLineNumber(currentLineNumber + 1);
            }
            else if (e.key === 'ArrowUp') {
                if (currentLineNumber > 1) {
                    updateCurrentLineNumber(currentLineNumber - 1);
                }
            }
            else if (e.key === 'ArrowDown') {
                if (currentLineNumber < lines.length) {
                    updateCurrentLineNumber(currentLineNumber + 1);
                }
            }
            else if (e.key === 'Backspace' &&
                currentLineNumber > 1 &&
                window.getSelection().anchorOffset === 0 &&
                window.getSelection().anchorOffset === window.getSelection().focusOffset
            ) {
                const a = lines.slice(0, currentLineNumber - 2);
                const b = lines.slice(currentLineNumber);

                a.push(lines[currentLineNumber - 2].concat(lines[currentLineNumber - 1]));

                updateLines([
                    ...a,
                    ...b,
                ]);
                updateCurrentLineNumber(currentLineNumber - 1);
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [lines, currentLineNumber, updateLines, updateCurrentLineNumber]);

    return (
        <div className={classes.container}>
            <div id='textContent' className={classes.root} onMouseDown={() => console.log(window.getSelection())}>
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
        currentLinePosition: view.currentLinePosition,
    };
};

const mapDispatchToProps = {
    updateLines,
    updateCurrentLineNumber,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);