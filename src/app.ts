import express, { Application, Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import api from './routes';
import connection from './db/connection';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

dotenv.config();
const PORT: string = process.env.PORT!;
const app: Application = express();
app.use(cors({
    origin: [
        'http://localhost:3000'
    ]
}));
app.use(urlencoded({ extended: false }));
app.use(json());
app.get('/', (req: Request, res: Response) => res.sendFile(path.join(__dirname, 'views/index.html')));
api(app);

app.use((req: Request, res: Response) => {
    res.status(404).send('NOT FOUND');
});

connection()
    .then((result: boolean) => console.log(result ? 'connected' : 'not connected'))
    .catch(error => console.log(error));

app.listen(PORT, () => {
    console.log(`application listening on port ${PORT}`);
});