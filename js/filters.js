'use strict';

(function () {

  var filters = document.querySelectorAll('.js-filters');

  function clearFilterButton() {
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

  var fillRandomPhotos = window.debounce(function () {
    window.refreshRandomPhotos();
    window.fillPage(window.randomPhotos);
    window.userPictureClickHandler(window.randomPhotos);
  });

  var fillOriginalPhotos = window.debounce(function () {
    window.fillPage(window.photosOriginal);
    window.userPictureClickHandler(window.photosOriginal);
  });

  var fillPopularPhotos = window.debounce(function () {
    window.fillPage(window.photosPopular);
    window.userPictureClickHandler(window.photosPopular);
  });

  filters.forEach(function (item) {
    item.addEventListener('click', function () {
      clearFilterButton();
      clearPage();
      item.classList.add('img-filters__button--active');
      if (item.id === 'filter-random') {
        fillRandomPhotos();

      } else if (item.id === 'filter-default') {
        fillOriginalPhotos();
      } else if (item.id === 'filter-discussed') {
        fillPopularPhotos();
      }
    });
  });
})();

