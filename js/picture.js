'use strict';

(function () {
  var PHOTOS_NUMBER = 25;

  var picturesContainer = document.querySelector('.js-pictures-container');
  var userPicture = document.querySelector('#picture');
  var userPictureItem = userPicture.content.querySelector('.js-user-picture');
  var fragment = document.createDocumentFragment();

  function createPhotos(photosCount) {
    for (var i = 1, photoInfo = []; i <= photosCount; i++) {
      photoInfo.push({
        url: 'photos/' + i + '.jpg',
        description: window.data.getRandomDescription(),
        likes: window.util.getRandomNumber(15, 200),
        comments: window.data.getCommentCollection(),
      });
    }
    return photoInfo;
  }

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

  function addElements(elements) {
    for (var i = 0; i < PHOTOS_NUMBER; i++) {
      elements.appendChild(renderPhoto(window.photos[i]));
    }
    return elements;
  }

  window.photos = createPhotos(PHOTOS_NUMBER);

  addElements(fragment);

  picturesContainer.appendChild(fragment);

})();

