'use strict';

(function () {
  var PHOTOS_NUMBER = 25;

  var picturesContainer = document.querySelector('.js-pictures-container');
  var userPicture = document.querySelector('#picture');
  var userPictureItem = userPicture.content.querySelector('.js-user-picture');
  var fragment = document.createDocumentFragment();


  function renderPhoto(photo) {
    var photoItem = userPictureItem.cloneNode(true);
    var picturesImg = photoItem.querySelector('.js-image');
    var picturesLike = photoItem.querySelector('.js-likes');
    var picturesComment = photoItem.querySelector('.js-comments');

    picturesImg.src = photo.url;
    picturesLike.textContent = photo.likes;
    picturesComment.textContent = photo.comments.length;

    return photoItem;
  }

  window.load(function (photos) {

    function addPhotos(photosItem) {
      for (var i = 0; i < PHOTOS_NUMBER; i++) {
        photosItem.appendChild(renderPhoto(photos[i]));
      }
      return photosItem;
    }

    addPhotos(fragment);

    picturesContainer.appendChild(fragment);
  });
})();

