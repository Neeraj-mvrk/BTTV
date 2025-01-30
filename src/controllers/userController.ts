import { Request, Response } from 'express';
import { getAllUsers, addUser } from '../services/userService';
import {scheduleTravelNotificationCron} from '../scheduler/cronJobs';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await addUser(req.body);
    res.status(201).json(newUser);
  }  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const startCron = async (req: Request, res: Response) => {
  try {
    const data = await scheduleTravelNotificationCron();
    res.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

