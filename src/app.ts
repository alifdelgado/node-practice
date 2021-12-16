import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import api from './routes';
import connection from './db/connection';

const PORT=3000;
const app: Application = express();

app.use(bodyParser.json());
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