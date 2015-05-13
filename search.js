// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);  //response; 
    document.getElementById('response').innerHTML += responseString;
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyCTR_8nHUGvIBrea2yPbqTLPqOy74Jf4yM');

    search();
}

function search() {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'id',
        kind: "youtube#video",
        q: "Future"
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(getLocations);
}

function getLocations(rJSON){

    /*extract video ids*/
    var rItems = rJSON.items;
    console.log(rItems);
    var rLength = rItems.length;
    console.log(rLength);
    var rIds =[];
    for (var i=0; i < rLength; i++){
        rIds.push(rItems[i].id.videoId);
    }
    console.log(rIds);
    
    /* get more information for each video id */
    var request = gapi.client.youtube.videos.list({
        id: rIds.join(),
        part: 'recordingDetails'
    });
    request.execute(convertLocations)
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    var rItems = response.items;
    console.log(rItems);
    var rLength = rItems.length;
    console.log(rLength);
    var rString ="";
     for (var i=0; i < rLength; i++){
         rString = rString + ", "+ rItems[i].id.videoId;
     }
     console.log(rString);
    //showResponse(rString);
}

function convertLocations(vJSON) {
    console.log(JSON.stringify(vJSON, '', 2)); 
    showResponse(vJSON)
}