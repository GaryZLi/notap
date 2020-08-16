import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        height: '100%',
        minWidth: 40,
        width: 40,
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        userSelect: 'none',
    },
});

const LineNumber = ({number}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}
            unselectable="on"
            // onSelect={e => e.preventDefault()}
        >
            {number}
        </div>
    )
};

export default LineNumber;