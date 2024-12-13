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

export const sortByLimit = async (req, res) => {
    const { limit } = req.params;
    const limitSort = limit * 1;
    const [quotes] = await pool.query(`SELECT author, quote FROM quotes LIMIT ?`, [limitSort]);

    res.status(200).json({ quotes: quotes });
};

export const sortByKeyword = async (req, res) => {
    const { keyword } = req.params;
    
    const [quotes] = await pool.query(`SELECT author, quote FROM quotes WHERE author LIKE '%${keyword}%'`);

    res.status(200).json({ quotes });
};

export const deleteQuote = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM quotes WHERE id=?', [id]);
    res.status(204).json({ msg: 'quote deleted' });
};