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
import MongoDBClient from "./db";

export function insertData(data: any) {
    const metadata = MongoDBClient.db("ao3_db").collection("metadata");
    metadata.findOne({'worksId': data.worksId}).then((res: any)=> {
        if (res == null) {
            console.debug("Metadata not found! Inserting into the database")
            metadata.insertOne(data);
        }
        else console.debug("Metadata already exists!")
    })
}

export function deleteData(data: any) {
    const metadata = MongoDBClient.db("ao3_db").collection("metadata");
    metadata.deleteOne({"worksId": data.worksId});
}

export function updateData(data: any) {
    const metadata = MongoDBClient.db("ao3_db").collection("metadata");
    const updateObj = { $set: data };
    metadata.updateOne({"worksId": data.worksId}, updateObj, {});
}

export function fetchData(worksUrl: string) {
    const metadata = MongoDBClient.db("ao3_db").collection("metadata");
    return metadata.findOne({'worksUrl': worksUrl})
}
