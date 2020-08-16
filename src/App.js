import React from 'react';
import firebase from './Firebase';
import Container from './Containers';
import Header from './Containers/Header';
import Toolbar from './Containers/Toolbar';
import TextEditor from './Containers/TextEditor';

// const fs = firebase.firestore();

const App = () => {
    // const users = fs.collection('users');

    return (
        <Container>
            <Header title={'notap'}/>
            <Toolbar/>
            <TextEditor/>
        </Container>
    );
};

export default App;