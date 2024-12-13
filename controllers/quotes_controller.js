import { pool } from "../server.js";

export const getQuotes = async (req, res) => {
    const [quotes] = await pool.query('SELECT * FROM quotes');
    res.status(200).json({ quotes: quotes });
};

export const createNewQuote = async (req, res) => {
    const { author, quote } = req.body;
    await pool.query('INSERT INTO quotes(author, quote) VALUES(?, ?)', [author, quote]);
    res.status(201).json({ msg: 'new quote added' });
};

export const sortQuotes = async (req, res) => {
    const { limit, keyword } = req.params;
    
    const [quotes] = await pool.query(`SELECT author, quote FROM quotes LIMIT ${limit === '0' ? 0 : (limit * 1)}; SELECT author, quote FROM quotes WHERE author LIKE '%${keyword}%'`);
    let quoteArr;

    if (quotes.length > 1) {
        quoteArr = quotes[0].concat(quotes[1]);
    };

    res.status(200).json({ quotes: quoteArr });
};

export const deleteQuote = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM quotes WHERE id=?', [id]);
    res.status(204).json({ msg: 'quote deleted' });
};