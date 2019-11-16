const express = require('express');
const snippetService = require('./snippetService');
const bodyParser = express.json();
const { requireAuth } = require('../../services/jwtService');
const snippetRoute = express.Router();

snippetRoute
    .route('/')
    .get(requireAuth, (req, res, next) => {
        const db = req.app.get('db');
        const { id } = req.user[0];

        try {
            const snippets = await snippetService.getSnippets(db, id);
            return res.send(snippets);
        }

        catch (error) {
            next(error);
        }
    })