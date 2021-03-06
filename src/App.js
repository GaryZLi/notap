import React from 'react';
import Container from './Containers';
import Header from './Containers/Header';
import Toolbar from './Containers/Toolbar';
import TextEditor from './Containers/TextEditor';
import Export from './Containers/Export';

import axios from 'axios';

// const fs = firebase.firestore();

const App = () => {

    
    // const users = fs.collection('users');

    return (
        <Container>
            <Header/>
            <Export/>
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
