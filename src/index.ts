import express, {NextFunction, Request, Response} from 'express';

const app = express();

app.get('/welcome', (req: Request, res: Response, Next: NextFunction) => {
  res.send('welcome!');
});

app.listen('8080', () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 8080🛡️
      http://localhost:8080
  ################################################  `);
});