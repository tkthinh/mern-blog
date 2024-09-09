import express, { urlencoded } from 'express';
import CookieParser from 'cookie-parser';
import 'dotenv/config';

// middlewares
import { notFound as notFoundMiddleware } from './middlewares/not-found';
import { handleError as errorHandlerMiddleware } from './middlewares/error-handler';

// routes
import userRoutes from './routes/user-routes';
import authRoutes from './routes/auth-routes';
import postRoutes from './routes/post-routes';
import interactionRoutes from './routes/interaction-routes';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(CookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/ix', interactionRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
