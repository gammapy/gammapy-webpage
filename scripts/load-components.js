//  Licensed under the MIT license - see LICENSE

function loadComponent(componentId, componentPath) {
    fetch(componentPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(componentId).innerHTML = data;
        })
        .catch(error => console.error('Error loading component:', error));
}

// Load navbar and footer components
window.onload = function () {
    loadComponent('head-placeholder', 'header.html');
    loadComponent('navbar-placeholder', 'navbar.html');
    loadComponent('footer-placeholder', 'footer.html');
};
