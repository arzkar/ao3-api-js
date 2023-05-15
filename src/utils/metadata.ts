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

import { ArchiveOfOurOwn } from "fetch-ao3";

export function URL_VALIDATE(url: string) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

export async function fetchMetadata(query_url: string) {
  if (URL_VALIDATE(query_url)) {
    // extract work id from the url
    let ao3_works_id = query_url.match(new RegExp("\\d+", "gm"))?.[0];
    let ao3_url = "https://archiveofourown.org/works/" + ao3_works_id;

    let fic = new ArchiveOfOurOwn();
    const params: Object = {
      view_adult: "true",
      view_full_work: "true",
    };

    try {
      return await fic.fetchWorksMetadata(ao3_url, params);
    } catch (err) {
      console.error("Error in fetchWorksMetadata:", err);
      return null;
    }
  } else {
    console.log("Invalid query URL");
    return null;
  }
}
