export {};
import crypto from "crypto";
import { Request, Response } from "express";
import { confirmToken } from "./controllers/login-controller"

crypto.Hash

declare global {
    interface String {
      /**
       * Generate a hashcode in hexadecimal, using sha256.
       */
        sha256(): string;
    }
}

String.prototype.sha256 = function sha256() {
  return crypto.createHmac("SHA256", "userDefinedSecret").update(this as string).digest("hex");
}

/**
 * expect the request to contain userId and hash, check it with login-controller and see if the user is
 * already logged in, if not, send a 401 response.
 * @returns true if the user isn't logged in or the hash is invalid.
 */
export function isTokeninvalid(req: Request, res: Response) {
  const token = {
      userId: req.body.userId,
      hash: req.body.hash
  };
  if(!confirmToken(token.userId, token.hash)) {
      res.status(401).send("Access denied, Please login first.")
      return true;
  }
  return false;
}

export function requestPermission(res: Response, permission: string) {
  return res.status(401).send("Access denied, You need permission to " + permission + " .");
}