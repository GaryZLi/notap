import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        height: '100%',
        minWidth: 40,
        width: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const LineNumber = ({number}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {number}
        </div>
    )
};

export default LineNumber;