import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import bold from '../../picSrc/Bold.png';
import color from '../../picSrc/Font_Color.png';
import highlight from '../../picSrc/Highlight_.png';
import italic from '../../picSrc/Italic.png';
import underline from '../../picSrc/Underline.png';
import code from '../../picSrc/code.png';
import center from '../../picSrc/Align_Center.png';
import left from '../../picSrc/Align_Left_.png';
import right from '../../picSrc/Align_Right.png';
import even from '../../picSrc/Align_Even.png';
import bullet from '../../picSrc/Bullet_List.png';
import number from '../../picSrc/Numbered_List.png';

import { 
    updateLines,
    updateLineType,
} from '../../actions/view';

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

const Toolbar = ({
    currentLineNumber,
    updateLines,
    updateLineType,
}) => {
    const classes = useStyles();

    const handleClick = type => {
        if (type === 'code') {
            updateLineType(currentLineNumber)
        } 
    }

    return (
        <div className={classes.container}>
            <div className={classes.root}>
                <img className={classes.tool} src={bold} alt='bold'/>
                <img className={classes.tool} src={color} alt='color'/>
                <img className={classes.tool} src={highlight} alt='highlight'/>
                <img className={classes.tool} src={italic} alt='italic'/>
                <img className={classes.tool} src={underline} alt='underline'/>
                <img className={classes.tool} src={left} alt='left'/>
                <img className={classes.tool} src={center} alt='center'/>
                <img className={classes.tool} src={right} alt='right'/>
                <img className={classes.tool} src={even} alt='even'/>
                <img className={classes.tool} src={bullet} alt='bullet'/>
                <img className={classes.tool} src={number} alt='number'/>
                <img className={classes.tool} src={code} alt='code' onClick={() => handleClick('code')}/>
            </div>
        </div>
    )
};

const mapStateToProps = ({view}) => {
    return {
        currentLineNumber: view.currentLineNumber,
    };
};

const mapDispatchToProps = {
    updateLines,
    updateLineType,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);