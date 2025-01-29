document.addEventListener('click', function (event) {
  var navbar = document.querySelector('.navbar-collapse');
  var button = document.querySelector('.navbar-toggler');
  if (
    navbar.classList.contains('show') &&
    !navbar.contains(event.target) &&
    !button.contains(event.target)
  ) {
    var collapseInstance = bootstrap.Collapse.getInstance(navbar);
    collapseInstance.hide();
  }
});
