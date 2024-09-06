import { Request, Response, NextFunction } from 'express';
import { validateUser, passwordIsConfirmed } from '../lib/validation';
import { AuthenticatedRequest } from '../lib/authenticated-request';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import 'dotenv/config';

import { db } from '../db/db';
import { user } from '../db/schema';

import { ErrorWithCode } from '../lib/custom-error';
import { eq } from 'drizzle-orm';

async function userIsExisted(username: string) {
  const userData = await db.select().from(user).where(eq(user.username, username));

  if (userData.length > 0) {
    return userData[0];
  }
  return null;
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  const { username, email, password } = req.body;
  const confirmedPassword = req.body['confirm-password'];

  if (
    !validateUser(username, email, password) ||
    !passwordIsConfirmed(password, confirmedPassword)
  ) {
    return next(new ErrorWithCode(400, 'Please fill out and check all information'));
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
  const { username, password } = req.body;

  try {
    const existingUser = await userIsExisted(username);

    if (!existingUser) {
      return next(new ErrorWithCode(401, 'User not found'));
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

    const { password: userPassword, ...responseData } = existingUser;

    return res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json({ message: responseData });
  } catch (error) {
    return new ErrorWithCode(500, 'Error verifying user credentials');
  }
}

export async function signinWithGoogle(req: Request, res: Response, next: NextFunction) {
  const { email, name, photoUrl } = req.body;
  try {
    const existingEmail = await db.select().from(user).where(eq(user.email, email));

    if (existingEmail.length > 0) {
      const existingUser = existingEmail[0];

      const token = jwt.sign(
        {
          id: existingUser.id,
        },
        process.env.JWT_SECRET!
      );

      const { password: userPassword, ...responseData } = existingUser;

      return res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json({ message: responseData });
    } else {
      const tempPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(tempPassword, 10);

      const userInfo = {
        username:
          name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .split(' ')
            .join('') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        photoUrl: photoUrl,
      };

      const insertedUser = await db.insert(user).values(userInfo).returning();

      const newUser = insertedUser[0];

      const token = jwt.sign(
        {
          id: newUser.id,
        },
        process.env.JWT_SECRET!
      );

      const { password: userPassword, ...responseData } = newUser;

      return res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json({ message: responseData });
    }
  } catch (error) {
    return next(new ErrorWithCode(500, 'An error ocurred signing up user'));
  }
}

export async function changePassword(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return next(new ErrorWithCode(400, 'Invalid request'));
  }

  if (req.user.id !== req.params.userId) {
    return next(new ErrorWithCode(403, 'You are not allowed to update this user'));
  }

  const currentPassword = req.body['current-password'];
  const newPassword = req.body['new-password'];
  const confirmedPassword = req.body['confirm-password'];

  const storedPassword = (
    await db.select({ password: user.password }).from(user).where(eq(user.id, req.user.id))
  )[0].password;
  const passwordMatched = await bcryptjs.compare(currentPassword, storedPassword);

  if (!passwordMatched) {
    return next(new ErrorWithCode(400, 'Current password is incorrect'));
  }

  if (newPassword !== null) {
    if (newPassword.length < 6) {
      return next(new ErrorWithCode(400, 'Password must be longer than 6 characters'));
    }
  }

  if (!passwordIsConfirmed(newPassword, confirmedPassword)) {
    return next(new ErrorWithCode(400, 'Please check if the new password is matched'));
  }

  const newHashedPassword = bcryptjs.hashSync(newPassword, 10);
  try {
    await db.update(user).set({ password: newHashedPassword }).where(eq(user.id, req.user.id));

    const responseData = {
      message: {
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        photoUrl: req.body.photoUrl,
      },
    };

    res.status(200).json(responseData);
  } catch (error) {
    return next(new ErrorWithCode(500, 'Error changing user password'));
  }
}

export function signout(req: Request, res: Response, next: NextFunction) {
  try {
    return res.clearCookie('access_token').status(200).json('Signed out');
  } catch (error) {
    return next(new ErrorWithCode(500, 'Error signing out'));
  }
}
