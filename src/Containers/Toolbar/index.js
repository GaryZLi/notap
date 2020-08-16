import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        height: '5%',
        width: '100%',
        backgroundColor: '#dbdbdb',
        display: 'flex',
        alignItems: 'center',
    },
});

const Toolbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>

        </div>
    )
};

export default Toolbar;