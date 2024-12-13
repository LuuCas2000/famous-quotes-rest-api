import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
import mysql from 'mysql2';
import helmet from 'helmet';
import cors from 'cors';

// IMPORTS
import quotes_router from './routes/routes.js';

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

// DATABASE
export const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    multipleStatements: true
}).promise();

const port = process.env.PORT;

app.use('/', quotes_router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});