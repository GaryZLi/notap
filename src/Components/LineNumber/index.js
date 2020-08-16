import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        height: '100%',
        minWidth: 40,
        width: 40,
        userSelect: 'none',
        color: 'white'
    },
});

const LineNumber = ({number}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}
            unselectable="on"
        >
            {number}
        </div>
    )
};

export default LineNumber;
