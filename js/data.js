'use strict';

(function () {

  window.load(function (photos) {

    var photosOriginal = photos;

    window.photosOriginal = photosOriginal;

    var photosPopular = window.photosOriginal.slice();
    photosPopular.sort(function (first, second) {
      if (first.comments.length < second.comments.length) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });

    window.photosPopular = photosPopular;

    window.refreshRandomPhotos = function () {
      var photosCopy = window.photosOriginal.slice();
      var randomPhotos = [];
      for (var e = 0; e < 10; e++) {
        var index = window.util.getRandomNumber(1, photosCopy.length - 1);
        randomPhotos.push(photosCopy[index]);
        photosCopy.splice(index, 1);
      }

      window.randomPhotos = randomPhotos;
    };

    window.refreshRandomPhotos();
  });
})();

