import express, { Application } from 'express';
import cors from 'cors';
import connectDB from './database/db';
import errorHandler from './middleware/error_handler';
import userRoute from './routes/user_routes';
import authRoute from './routes/auth_routes';
import { getRefreshToken } from './controllers/refresh_token_controller';

const app: Application = express();

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
