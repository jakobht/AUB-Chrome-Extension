
function renderStatus(statusText) {
  document.getElementById('status').innerHTML = statusText;
}

chrome.tabs.query({'active': true}, function(tabs) {
    var tab = tabs[0];

    var url = tab.url;
    var testRequest = new Request("https://content.aub.aau.dk/zorac/zoracjson.php?&url=" + url);
    renderStatus('Looking up');
    fetch(testRequest).then(function (response) {
        return response.json();
    })
    .then(function (body) {
        console.log(body.proxy);
        if(body.proxy == 1){
            renderStatus("Redirecting");
            var newurl = 'https://login.zorac.aub.aau.dk/login?qurl=' + encodeURIComponent(url);
            chrome.tabs.update(tab.id, {url: newurl});
        } else {
            renderStatus("No access");
        }
    }, function (error) {
        renderStatus("Error!<br />You are probably not on a http page.");
    });
});
