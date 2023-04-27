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

import axios from 'axios';
import $ from 'cheerio';

export class ArchiveOfOurOwn {
    worksUrl: string;
    worksId: string = "None";
    worksName: string = "None";
    authorName: string = "None";
    authorUrl: string = "None";
    worksWarnings: string = "None";
    worksCategory: string = "None";
    worksFandom: string = "None";
    worksRelationships: string = "None";
    worksCharacters: string = "None";
    worksAdditionalTags: string = "None";
    worksLanguage: string = "None";
    worksSummary: string = "None";
    worksStatus: string = "None";
    worksLastUpdated: string = "None";
    worksPublished: string = "None";
    worksLength: string = "None";
    worksChapters: string = "None";
    worksRating: string = "None";
    worksKudos: string = "None";
    worksBookmarks: string = "None";
    worksComments: string = "None";
    worksHits: string = "None";

    constructor(worksUrl: string) {
        this.worksUrl = worksUrl;
      }

    getWorksMetadata() {
        console.log("Processing: ",this.worksUrl)
        return axios.get(this.worksUrl, {
            params: {
              "view_adult": 'true',
              'view_full_work': 'true'
        }})
        .then((html) =>{
            this.worksName = $('h2[class$="title heading"]',html.data).text().trim();
            
            this.worksId = this.worksUrl.match(new RegExp("\\d+", 'gm'))?.[0]!;
            
            this.authorName = $('h3[class$="byline heading"]',html.data).find("a").text().trim();
            
            this.authorUrl = "https://archiveofourown.org" + $('h3[class$="byline heading"]',html.data).find("a").attr("href")?.trim()!;
            
            this.worksWarnings = $('dd[class$="warning tags"]',html.data).find("a").text().trim();
            
            this.worksCategory = $('dd[class$="category tags"]',html.data).find("a").text().trim();
            
            this.worksFandom = $('dd[class$="fandom tags"]',html.data).find("a").text().trim();
            
            this.worksRelationships = $('dd[class$="relationship tags"]',html.data).find("a").text().trim();
            
            let worksCharactersList: Array<String> = []
            $('dd[class$="character tags"]',html.data).find("a").each((i,link) => {
                worksCharactersList.push($(link).text().trim());
            });
            this.worksCharacters = worksCharactersList.toString();
            
            let worksAdditionalTagsList: Array<String> = []
            $('dd[class$="freeform tags"]',html.data).find("a").each((i,link) => {
                worksAdditionalTagsList.push($(link).text().trim());
            });
            this.worksAdditionalTags = worksAdditionalTagsList.toString();
            
            this.worksLanguage = $('dd[class$="language"]',html.data).text().trim();
            
            this.worksSummary = $('div[class$="summary module"]',html.data).find("blockquote.userstuff").text().trim();
            
            this.worksStatus = $('dl[class$="stats"]',html.data).find('dt[class$="status"]').text().trim().replace(":","");

            try {
                this.worksLastUpdated = $('dl[class$="stats"]',html.data).find('dd[class$="status"]').text().trim();
            }
            catch(err) {  // if story last updated not found
                this.worksLastUpdated = $('dl[class$="stats"]',html.data).find('dd[class$="published"]').text().trim();
            }
            
            this.worksPublished = $('dl[class$="stats"]',html.data).find('dd[class$="published"]').text().trim();
            
            this.worksLength = $('dl[class$="stats"]',html.data).find('dd[class$="words"]').text().trim();
            
            this.worksChapters = $('dl[class$="stats"]',html.data).find('dd[class$="chapters"]').text().trim().match(new RegExp("\\d+", 'gm'))?.[0]!;
            
            this.worksRating = $('dd[class$="rating tags"]',html.data).find("a").text().trim();
            
            this.worksKudos = $('dl[class$="stats"]',html.data).find('dd[class$="kudos"]').text().trim();
            
            this.worksBookmarks = $('dl[class$="stats"]',html.data).find('dd[class$="bookmarks"]').text().trim();
            
            this.worksComments = $('dl[class$="stats"]',html.data).find('dd[class$="comments"]').text().trim();
            
            this.worksHits = $('dl[class$="stats"]',html.data).find('dd[class$="hits"]').text().trim();
            
            return JSON.stringify(this, null, 4);
        })
        .catch((err: Error) => {
            console.log(err);
            return err
        });
    }  
}