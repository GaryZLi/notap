import React from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles({
    root: {
        color: "#3F91CF",
    }
});
const Export = () => {
  var textFile = null,
  makeTextFile = function (text) {
    const data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };
    const classes = useStyles();
    return <a href={makeTextFile("# HELLO")} download={makeTextFile("# HELLO")}><Button className={classes.root} style={{float: 'right', marginRight:'20px'}} variant="contained">Save File</Button></a>;
  };

export default Export;
