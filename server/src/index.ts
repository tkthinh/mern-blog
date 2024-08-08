import express, { urlencoded } from 'express';
import 'dotenv/config'

// middlewares
import { notFound as notFoundMiddleware } from './middlewares/not-found';
import { handleError as errorHandlerMiddleware } from './middlewares/error-handler';

// routes
import userRoutes  from './routes/user-routes'
import authRoutes  from './routes/auth-routes'
import postRoutes  from './routes/post-routes'

const app = express();

app.use(urlencoded({ extended: true }))
app.use(express.json());

app.use(userRoutes);
app.use('/api/auth', authRoutes);
app.use(postRoutes);

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
