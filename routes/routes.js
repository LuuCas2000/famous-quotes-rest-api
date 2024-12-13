import express from 'express';

// IMPORTS
import { getQuotes, createNewQuote, deleteQuote, sortByLimit, sortByKeyword } from '../controllers/quotes_controller.js';

const quotes_router = express.Router();

quotes_router.route('/quotes')
.get(getQuotes);

quotes_router.route('/quotes/limit=:limit')
.get(sortByLimit);

quotes_router.route('/quotes/key=:keyword')
.get(sortByKeyword);

quotes_router.route('/quotes/new')
.post(createNewQuote);

quotes_router.route('/quotes/delete/:id')
.post(deleteQuote);

export default quotes_router;