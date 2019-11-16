const express = require('express');
const snippetService = require('./snippetService');
const bodyParser = express.json();
const snippetRoute = express.Router();

snippetRoute
    .route('/')
    .get((req, res, next) => {
        
    })