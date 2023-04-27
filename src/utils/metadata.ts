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

import { ArchiveOfOurOwn } from "../adapters/adapter_archiveofourown";

var URL_VALIDATE= new RegExp("(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/[^\\s]*)?", 'gm')
export function fetchMetadata(query_url: string) {
    if (URL_VALIDATE.test(query_url)) 
    {
      // extract work id from the url
      let ao3_works_id = query_url.match(new RegExp("\\d+", 'gm'))?.[0];
      let ao3_url = "https://archiveofourown.org/works/"+ao3_works_id;
      
      let fic = new ArchiveOfOurOwn(ao3_url);
      return fic.getWorksMetadata();
    }
    else return null
}
