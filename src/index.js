import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import * as firebase from 'firebase/app'
import { fbKey } from './modules/hiddenKey'

import './index.css';

var firebaseConfig = {
    apiKey: fbKey,
    authDomain: "versions-6e60a.firebaseapp.com",
    databaseURL: "https://versions-6e60a.firebaseio.com",
    projectId: "versions-6e60a",
    storageBucket: "versions-6e60a.appspot.com",
    messagingSenderId: "900527886503",
    appId: "1:900527886503:web:6ccd54f0c08f1c23"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Router>
        <App />
    </Router>
    , document.getElementById('root')
);