import { Request, Response, NextFunction } from 'express';
import { validateUser, passwordIsConfirmed } from '../lib/validation';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import 'dotenv/config';

import { db } from '../db/db';
import { user } from '../db/schema';

import { ErrorWithCode } from '../lib/custom-error';
import { eq } from 'drizzle-orm';

async function userIsExisted(username: string) {
  const userData = await db
    .select()
    .from(user)
    .where(eq(user.username, username));

  if (userData.length > 0) {
    return userData[0];
  }
  return null;
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmedPassword = req.body['confirm-password'];

  if (
    !validateUser(username, email, password) ||
    !passwordIsConfirmed(password, confirmedPassword)
  ) {
    return next(
      new ErrorWithCode(400, 'Please fill out and check all information')
    );
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const userInfo = {
    username,
    email,
    password: hashedPassword,
  };

  try {
    // check if username is existed
    const existingUser = await userIsExisted(userInfo.username);

    if (existingUser) {
      return next(new ErrorWithCode(400, 'Username existed!'));
    }

    await db.insert(user).values(userInfo);
    res.status(201).json({ message: 'Sign up successfully!' });
  } catch (error) {
    return next(new ErrorWithCode(500, 'An error ocurred signing up user'));
  }
}

export async function signin(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const existingUser = await userIsExisted(username);

    if (!existingUser) {
      return next(new ErrorWithCode(404, 'User not found'));
    }

    const storedPassword = existingUser.password;
    const passwordMatched = await bcryptjs.compare(password, storedPassword);

    if (!passwordMatched) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
      },
      process.env.JWT_SECRET!
    );
    return res
      .status(201)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json({ message: 'Sign in successfully!' });
  } catch (error) {
    return new ErrorWithCode(500, 'Error verifying user credentials');
  }
}

export function loginWithGoogle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send('Google Page');
}
