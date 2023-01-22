import express, {NextFunction, Request, Response} from 'express';
import morgan from "morgan";

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
  🛡️  Server listening on port: ${port}🛡️
      http://localhost:${port}
  ################################################  `);
});