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

import express, { Express, Request, Response } from 'express';
import { fetchMetadata } from "./src/utils/metadata"

const app: Express = express();
const port = process.env.PORT || 8080;

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
  if (req.query["q"] != undefined) 
  fetchMetadata(req.query["q"].toString())!.then(data => {
    res.send(data);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}..`));
