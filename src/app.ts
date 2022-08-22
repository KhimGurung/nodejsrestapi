import express, { Application } from 'express';
import cors from 'cors';
// import https from 'https';
// import fs from 'fs';
// import path from 'path';
// import auth from './middleware/auth';
import connectDB from './database/db';
import errorHandler from './middleware/error_handler';
import userRoute from './routes/user_routes';
import authRoute from './routes/auth_routes';
import { getRefreshToken } from './controllers/refresh_token_controller';

const app: Application = express();

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "https://reactjs-metamask.herokuapp.com/");
//     res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
//     next();
//  });
// app.use(cors({
//     'origin': 'https://reactjs-metamask.herokuapp.com/'
// }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/users', userRoute);
app.use('/auth', authRoute);
app.post('/access-token', getRefreshToken)
app.use(errorHandler);

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;
app.listen(port, () => {
    console.log(`server is listening on port: ${port}`);
    connectDB();
});

// const sslServer = https.createServer({
//     key: fs.readFileSync(path.join(path.dirname(path.basename(__dirname)), 'cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(path.dirname(path.basename(__dirname)), 'cert', 'cert.pem'))
// }, app)
// sslServer.listen(port, () => {
//     console.log(`server is listening on port: ${port}`);
//     connectDB();
// })

