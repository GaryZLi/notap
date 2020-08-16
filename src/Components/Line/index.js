import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import LineNumber from '../LineNumber';
import LineText from '../LineText';
import { updateCurrentLineNumber } from '../../actions/view';
// import cursor from '../../picSrc/cursor.png';\

const useStyles = makeStyles({
    default: {
        display: 'flex',
        minHeight: 30,
        width: '100%',
        alignItems: 'center',

        '&:hover': {
            backgroundColor: '#484848',
        }
    },
});

const Line = ({
    number,
    text,
    currentLineNumber,
    updateCurrentLineNumber,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.default}
            style={{backgroundColor: currentLineNumber === number? '#484848' : 'inherit'}}
            onMouseDown={() => updateCurrentLineNumber(number)}
        >
            <LineNumber number={number}/>
            <LineText text={text} number={number}/>
        </div>
    );
};

const mapStateToProps = ({view}) => {
    return {
        currentLineNumber: view.currentLineNumber,
    };
};

const mapDispatchToProps = {
    updateCurrentLineNumber,
};

export default connect(mapStateToProps, mapDispatchToProps)(Line);
