import express from 'express';

// IMPORTS
import { getQuotes, createNewQuote, deleteQuote, sortQuotes } from '../controllers/quotes_controller.js';

const quotes_router = express.Router();

quotes_router.route('/quotes')
.get(getQuotes);

quotes_router.route('/quotes/:limit/:keyword')
.get(sortQuotes);

quotes_router.route('/quotes/new')
.post(createNewQuote);

quotes_router.route('/quotes/delete/:id')
.post(deleteQuote);

export default quotes_router;