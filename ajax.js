/**
    Requests text from the server at the specified URL
    by sending args and forwarding the returned text
    to the callBackFunction.

    @param url The location of the requested resource.
    @param args The arguments sent to the resource.
    @param callbackFunc Function to call with the
        returned data.
*/
function loadData(url, args, callbackFunc) {
    // Create the request object
    var request;
    if (window.XMLHttpRequest){
        // IE7, Firefox, Mozilla, Safari, etc.
        request = new XMLHttpRequest()
    } else if (window.ActiveXObject){
        // Use ActiveX for IE5.x and IE6
        request = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        alert("Browser does not support Ajax");
        return;
    }

    // Set up the response
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                if (request.responseText) {
                    callbackFunc(request.responseText);
                } else if (request.responseXML) {
                    callBackFunc(request.responseXML);
                }
            } else {
                alert("Error code: " + request.status);
            }
        }
    }

    // Make the request
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");
    request.send(args);
}
