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
  return fetchMetadata(req.query["q"].toString());
});

app.listen(port, () => console.log(`Listening on port ${port}..`));
