// Copyright 2023 Arbaaz Laskar

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//   http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction  } from 'express';
import dotenv from "dotenv";

dotenv.config();
const config = process.env;

export default function verifyToken(req: Request, res: Response, next: NextFunction){
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      err: "A token is required for authentication",
    });
  }
  try {
    verify(token, config.TOKEN_KEY!);
  } catch (err) {
    return res.status(401).send({
      err: "Invalid Token",
    });
  }
  return next();
};