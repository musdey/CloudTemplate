import { Handler, Request, Response } from "express";

const allAccess: Handler = (req: Request, res: Response) => {
  return res.status(200).send("Public Content.");
};

const userBoard: Handler = (req: Request, res: Response) => {
  return res.status(200).json({ "data": "user" }).end();
};

const adminBoard: Handler = (req: Request, res: Response) => {
  return res.status(200).send("Admin Content.");
};

const moderatorBoard: Handler = (req: Request, res: Response) => {
  return res.status(200).send("Moderator Content.");
};

export { allAccess, userBoard, adminBoard, moderatorBoard }