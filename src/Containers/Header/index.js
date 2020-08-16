import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        height: '10%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '8vh',
    },
});

const Header = ({ title }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {title}
        </div>
    )
};

export default Header;