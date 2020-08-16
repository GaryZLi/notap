import React from 'react';
import firebase from './Firebase';
import Container from './Containers';
import Header from './Containers/Header';
import Toolbar from './Containers/Toolbar';
import TextEditor from './Containers/TextEditor';


import axios from 'axios';

// const fs = firebase.firestore();

const App = () => {

    
    // const users = fs.collection('users');

    return (
        <Container>
            <Header/>
            <Toolbar/>
            <TextEditor/>
            <div onClick={() => axios.post('http://localhost:5000/process_text', {'data': 'print(x)'})
    .then(res => res)}>
                hi
            </div>
        </Container>
    );
};

export default App;