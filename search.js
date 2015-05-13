// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var responseString = response; //JSON.stringify(response, '', 2); 
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
        q: "Mammals"
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(getLocations);
}

function getLocations(rJSON){
    var rItems = rJSON.items;
    console.log(rItems);
    var rLength = rItems.length;
    console.log(rLength);
    var rIds =[];
    for (var i=0; i < rLength; i++){
        rIds.push(rItems[i].id.videoId);
    }
    console.log(rIds);
    showResponse(rIds.toString());
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
    showResponse(rString);
}