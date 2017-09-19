// List of redirects. Add or update, but never remove!
var redirects = [
    {
        short: "gammapy-cta-1dc-docs",
        url: "https://nbviewer.jupyter.org/github/gammapy/gammapy-extra/blob/master/notebooks/cta_1dc_introduction.ipynb"
    },
    {
        short: "tutorials",
        url: "https://nbviewer.jupyter.org/github/gammapy/gammapy-extra/blob/master/index.ipynb"
    }
];

function add_links() {
    for (var i = 0; i < redirects.length; i++) {
        var msg = redirects[i].short;
        var a = $("<a>").attr('href', redirects[i].url).text(msg);
        $("#gotos").append($('<li/>').append(a));
    }
}

function execute_redirect() {
    var short  = document.URL.split('#')[1];
    var url = 'not found';

    for (var i = 0; i < redirects.length; i++) {
        if (redirects[i].short === short) {
            url = redirects[i].url;
        }
    }

    if (url === 'not found') {
        console.log('document.URL: ' + document.URL);
        console.log('short: ' + short);
        console.log('URL redirect not found!!!')
    } else {
        console.log('Execubing redirect now ...');
        console.log('url: ' + url);
        window.location.replace(url);
    }    
}


$( document ).ready(function() {
    add_links();
    execute_redirect();
});
