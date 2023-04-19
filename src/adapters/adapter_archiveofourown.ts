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