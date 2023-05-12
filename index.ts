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

import express, { Request, Express, Response } from 'express';
import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { fetchMetadata } from "./src/utils/metadata"
import * as crud from "./src/utils/crud";
import auth from "./src/middleware/auth";

const app: Express = express();
const port = process.env.PORT || 8080;

crud.initMongoDB()
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({
    API: "AO3 API",
    Author: "arzkar",
    "Search Example": {
      "Live Search": "https://localhost:8080/api/live/search?q=https://archiveofourown.org/works/15828654/chapters/36853599",
      "Archive Search": "https://localhost:8080/api/archive/search?q=https://archiveofourown.org/works/15828654/chapters/36853599",
    },
  });
});

app.post("/api/live/search", (req: Request, res: Response) => {
  if (req.query["q"])  {
    fetchMetadata(req.query["q"].toString())!.then((data: any) => {
      if (data) {
        res.send(JSON.stringify(data));
      }
      else res.send({
        err: "Data not found!"
      })
    })
    .catch((err: any) => res.send({
      err: err
    }));;
  }
});

app.post("/api/archive/search", (req: Request, res: Response) => {
  if (req.query["q"])  {
    const response = crud.fetchData(req.query["q"].toString())
    if (response) {
      response.then(data => {
        if (data) {
          res.send(data);
        }
        else res.send({
          err: "Data not found!"
        })
      })
      .catch((err: any) => res.send({
        err: err
      }));;
    }
  }
});

// admin operations
app.post("/api/archive/update", auth, (req: Request, res: Response) => {
  if (req.query["q"])  {
    fetchMetadata(req.query["q"].toString())!.then((data: any) => {
      if (data) {
        res.send(JSON.stringify(data));
      }
      else res.send({
        err: "Data not found!"
      })
    })
    .catch((err: any) => res.send({
      err: err
    }));;
  }
});

app.post("/api/archive/delete", auth, (req: Request, res: Response) => {
  if (req.query["q"])  {
    const response = crud.deleteData(req.query["q"].toString())
    if (response) {
      response.then(data => {
        if (data) {
          res.send({
            res: "Data deleted successfully!"
          })
        }
        else res.send({
          err: "Data not deleted successfully!"
        })
      })
      .catch((err) => res.send({
        err: err
      }));;
    }
  }
});


app.post("/api/auth", (req: Request, res: Response) => {
  const response = crud.fetchUser(req.body.user.toString())
  if (response) {
    response.then(data => {
      if (data) {
        if (req.body.password == data.password) {
          var token = sign({ user: req.body.user}, process.env.TOKEN_KEY!, {
            expiresIn: 1800 // expires in 30 mins
          });
          res.send({
            "token": token,
            "expiresIn": "1800"
          })
        }
      }
      else res.send({
        err: "User not found!"
      })
    })
    .catch((err) => res.send({
      err: err
    }));;
  }
});


app.listen(port, () => console.log(`Listening on port ${port}..`));
