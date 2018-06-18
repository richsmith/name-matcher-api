import express from 'express';

import {NameCountController} from './controllers';

const app: express.Application = express();
const port: number = 8000;

app.use('/name-count', NameCountController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
