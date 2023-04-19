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

import rp from 'request-promise';
import $ from 'cheerio';

export class ArchiveOfOurOwn {
    BaseUrl: string;
    constructor(BaseUrl: string) {
        this.BaseUrl = BaseUrl;
      }

    getWorksMetadata() {
        console.log("Processing: ",this.BaseUrl)
        rp(this.BaseUrl)
        .then(function(html: string){
            this.ao3_works_name= $('[class$="title heading"]',html).text().trim();
        })
        .catch(function(err: string){
            console.log(err);
        });
    }  
}