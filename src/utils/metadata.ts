import { ArchiveOfOurOwn } from "../adapters/adapter_archiveofourown";

var URL_VALIDATE= new RegExp("(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/[^\\s]*)?", 'gm')
export function fetchMetadata(query_url: string) {
    if (URL_VALIDATE.test(query_url)) 
    {
      // extract work id from the url
      let ao3_works_id = query_url.match(new RegExp("\\d+", 'gm'))?.[0];
      let ao3_url = "https://archiveofourown.org/works/"+ao3_works_id;
      
      let fic = new ArchiveOfOurOwn(ao3_url);
      fic.getWorksMetadata()
    }
}
