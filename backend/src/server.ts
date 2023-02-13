import express, {NextFunction, Request, Response} from 'express';
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import {AppDataSource} from "@data-source";
import swaggerOptions from '@swagger';

process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'production' : 'development';
require('dotenv').config();
const app = express();
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

app.use(express.json());
app.use(morgan("dev"));


app.get('/', (req: Request, res: Response, Next: NextFunction) => {
    res.send('welcome!');
});

let port = 8080;

app.listen(port, () => {
    console.log(`
  ################################################
      env: ${process.env.NODE_ENV}
  🛡️  Server listening on port: ${port}🛡️
      http://localhost:${port}
  ################################################  `);


    AppDataSource.initialize().then(() => {

        console.log("database initialize!");

    }).catch((error: any) => console.log(error));

});