'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a.link-conversion');

    links.forEach(a => {
        const rep = a.getAttribute('data-replace');  // e.g. "#", "*", "&"
        let href = a.getAttribute('href');

        if (rep === '#') href = href.replace('#', '-ld-l@');
        else if (rep === '*') href = href.replace('*', '-coordination-l@');
        else if (rep === '&') href = href.replace('&', '-cta-l@');

        // common replacements
        href = href.replace('/', 'in2p3.fr').replace('email', 'mailto:gammapy');

        a.setAttribute('href', href);
    });
});

