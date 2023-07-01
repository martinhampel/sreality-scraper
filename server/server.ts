import express, { Request, Response } from 'express';
import cors from 'cors';
import { Client } from 'pg';
import { DB_PASSWORD, DB_USERNAME } from './utils/config';

const app = express();
const port = 3003;

app.use(cors());

const client = new Client({
    host: 'db',
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'propertydb'
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database successfully');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
}

connectToDatabase();

app.get('/ping', (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: 'Server is running' });
});

app.get('/values/all', async (req: Request, res: Response) => {
    try {
        const values = await client.query('SELECT * FROM properties');
        res.json({ success: true, data: values.rows });
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ success: false, message: 'Error querying the database' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
