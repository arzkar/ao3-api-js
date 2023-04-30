<h1 align="center">ao3-api</h1>

An API to scrape archiveofourown.org fanfiction metadata using NodeJS’s ExpressJS and CheerioJS. Currently it can search for archiveofourown.org works to get different metadata like author name, chapter count, word count, genre, ratings etc <br/><br/>

### Features:

- Fetch fanfiction works from archiveofourown.org
- Fetch the local metadata from the database

# Setup

## API

- Clone the repository & run `npm install`
- Run the development API server using `npm run dev`
- Run the production API server by:

```
npm build
npm start
```

## Database

Create a database "ao3_db" and the collections will be automatically created by the server

## Environment variables

Add the "TOKEN_KEY" for the API in a `.env` file in the project's root directory.<br>
An example file is present called `.env.ex`

# Endpoints & Parameters

- /api/live/search: To scrape an AO3 works by workUrl
- /api/archive/search: To search the database for an AO3 works by workUrl
- /api/archive/update:
  - To update a metadata in the database by workUrl
  - Requires a token to authenticate
  - Send the "token" in the body, query or the headers
- /api/archive/delete:
  - To delete a metadata in the database by workUrl
  - Requires a token to authenticate
  - Send the "token" in the body, query or the headers
- /api/auth:
  - To get the JWT token to authenticate /update & /delete endpoints
  - Send the "user" & "password" in the body and the token is returned
