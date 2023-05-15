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
import { MongoClient, Db } from 'mongodb';
import { URL_VALIDATE } from "./metadata";

const isDocker = process.env.DOCKER === 'true';
const mongoUrl = isDocker ? 'mongodb://mongo:27017' : 'mongodb://127.0.0.1:27017';

const dbName = 'ao3_db';

let db: Db | null = null;
let client: MongoClient | null = null;

export async function initMongoDB() {
  try {
    client = await MongoClient.connect(mongoUrl);
    console.log('Connected successfully to MongoDB');

    db = client.db(dbName);

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((collection) => collection.name);

    if (!collectionNames.includes('metadata')) {
      await db.createCollection('metadata');
      console.log('Collection "metadata" created');
    }

    if (!collectionNames.includes('users')) {
      await db.createCollection('users');
      console.log('Collection "users" created');

      // Insert default admin user
      await db.collection('users').insertOne({
        user: process.env.DEFAULT_ADMIN_USER,
        password: process.env.DEFAULT_ADMIN_PWD,
      });
    }
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

export async function insertData(data: any) {
  if (!db) {
    console.error('MongoDB is not connected');
    return;
  }

  const metadataCollection = db.collection('metadata');
  metadataCollection.findOne({ worksId: data.worksId }).then((res: any) => {
    if (res == null) {
      console.debug('Metadata not found! Inserting into the database');
      metadataCollection.insertOne(data);
    } else {
      console.debug('Metadata already exists!');
    }
  });
}

export async function deleteData(worksUrl: string) {
  if (!db) {
    console.error('MongoDB is not connected');
    return;
  }

  const metadataCollection = db.collection('metadata');
  return metadataCollection.deleteOne({ worksUrl });
}

export async function updateData(data: any) {
  if (!db) {
    console.error('MongoDB is not connected');
    return;
  }

  const metadataCollection = db.collection('metadata');
  const updateObj = { $set: data };
  metadataCollection.updateOne({ worksId: data.worksId }, updateObj);
}

export async function fetchData(worksUrl: string) {
  if (!db) {
    console.error('MongoDB is not connected');
    return;
  }

  const metadataCollection = db.collection('metadata');
  if (URL_VALIDATE(worksUrl)) {
    return metadataCollection.findOne({ worksUrl });
  } else {
    return null; // Return null when the URL is not valid
  }
}

export async function fetchUser(user: string) {
  if (!db) {
    console.error('MongoDB is not connected');
    return;
  }

  const usersCollection = db.collection('users');
  return usersCollection.findOne({ user });
}

export async function closeMongoDBConnection() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
}