import { client } from "../server";
import type { Request, Response } from "express";

export const createNewMember = async (req: Request, res: Response) => {
  const { fullName, emailAddress } = req.body;

  try {
    const newMember = await client.query(
      `INSERT INTO blaqbyte_members (full_name,email_address) VALUES ($1, $2) RETURNING *`,
      [fullName, emailAddress]
    );

    if (newMember.rowCount === 1) {
      res.status(200).json({
        message: "Successfully created a new blaq byte member",
        data: newMember.rows[0],
      });
    } else {
      res.status(500).json({
        message: "Something went wrong with member subscription, please try again",
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};
