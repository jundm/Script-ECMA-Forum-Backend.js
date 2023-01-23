import express, {NextFunction, Request, Response} from 'express';
import morgan from "morgan";
import {AppDataSource} from "./data-source";

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(morgan("dev"));


app.get('/', (req: Request, res: Response, Next: NextFunction) => {
  res.send('welcome!');
});

let port = 8080;

app.listen(port,() => {
  console.log(`
  ################################################
      env: ${process.env.NODE_ENV}
  🛡️  Server listening on port: ${port}🛡️
      http://localhost:${port}
  ################################################  `);


  AppDataSource.initialize().then(() => {

    console.log("database initialize!")

  }).catch(error => console.log(error))

});