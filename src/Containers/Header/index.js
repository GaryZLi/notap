import React from 'react';
import { makeStyles } from '@material-ui/styles';
import logo from '../../picSrc/logo.png';

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
    logo: {
        maxHeight: '90%',
    }
});

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img className={classes.logo} src={logo} alt='logo'/>
        </div>
    )
};

export default Header;