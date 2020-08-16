import React from 'react';

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
    return <a href={makeTextFile("# HELLO")} download={makeTextFile("# HELLO")}><button>Save File</button></a>;
  };

export default Export;
