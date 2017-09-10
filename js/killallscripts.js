(function() {
    var documents = [document];
    var scripts = [];

    var iframes = document.getElementsByTagName('iframe');

    iframes.forEach(function(i) {
        var innerDocument = i.contentDocument || i.contentWindow.document;
        documents.push(innerDocument);
    }, this);

    documents.forEach(function(d) {
        var script = d.getElementsByTagName('script');
        scripts.push(script);
        console.log(script);
    }, this);


})();