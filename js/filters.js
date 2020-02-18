'use strict';

(function () {

  var filters = document.querySelectorAll('.js-filters');

  function clearFiltreButton() {
    filters.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
  }

  function clearPage() {
    var userImgs = document.querySelectorAll('.js-user-picture');

    userImgs.forEach(function (item) {
      item.remove();
    });
  }

  window.fillRandomPhotos = window.debounce(function () {
    window.refreshRandomPhotos();
    window.fillPage(window.randomPhotos);
    window.userPictureClickHandler(window.randomPhotos);
  });

  window.fillOriginalPhotos = window.debounce(function () {
    window.fillPage(window.photosOriginal);
    window.userPictureClickHandler(window.photosOriginal);
  });

  window.fillPopularPhotos = window.debounce(function () {
    window.fillPage(window.photosPopular);
    window.userPictureClickHandler(window.photosPopular);
  });

  filters.forEach(function (item) {
    item.addEventListener('click', function () {
      clearFiltreButton();
      clearPage();
      item.classList.add('img-filters__button--active');
      if (item.id === 'filter-random') {
        window.fillRandomPhotos();

      } else if (item.id === 'filter-default') {
        window.fillOriginalPhotos();
      } else if (item.id === 'filter-discussed') {
        window.fillPopularPhotos();
      }
    });
  });
})();

