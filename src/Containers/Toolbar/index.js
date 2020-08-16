import React from 'react';
import { makeStyles } from '@material-ui/styles';
import bold from '../../picSrc/Bold.png';
import color from '../../picSrc/Font_Color.png';
import highlight from '../../picSrc/Highlight_.png';
import italic from '../../picSrc/Italic.png';
import underline from '../../picSrc/Underline.png';

const useStyles = makeStyles({
    container: {
        height: '5%',
        width: '100%',
        backgroundColor: '#dbdbdb',
        display: 'flex',
        justifyContent: 'center',
    },
    root: {
        height: '100%',
        width: '60%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    tool: {
        maxHeight: '100%',
        maxWidth: 30,
        userSelect: 'none',
        '&:hover': {
            cursor: 'pointer',
        }
    },
});

const Toolbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.root}>
                <img className={classes.tool} src={bold} alt='bold'/>
                <img className={classes.tool} src={color} alt='color'/>
                <img className={classes.tool} src={highlight} alt='highlight'/>
                <img className={classes.tool} src={italic} alt='italic'/>
                <img className={classes.tool} src={underline} alt='underline'/>
            </div>
        </div>
    )
};

export default Toolbar;