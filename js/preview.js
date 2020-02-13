'use strict';

(function () {
  var pictureBlock = document.querySelector('.js-picture');
  var pictureClose = document.querySelector('.js-cancel');
  var pictureImg = document.querySelector('.js-picture-img');
  var pictureLikes = document.querySelector('.js-picture-likes');
  var pictureCommentsCount = document.querySelector('.js-comments-count');
  var pictureCommentsCountBlock = document.querySelector('.js-comments-count-block');
  var pictureCommentsBlock = document.querySelector('.js-social-comments');
  var pictureCommentsLoader = document.querySelector('.js-comments-loader');
  var pictureDesc = document.querySelector('.js-picture-description');

  function openPicture() {
    document.body.classList.add('modal-open');
    pictureBlock.classList.remove('hidden');
    document.addEventListener('keydown', openPictureEscPressHandler);
  }

  function closePicture() {
    document.body.classList.remove('modal-open');
    pictureBlock.classList.add('hidden');
    document.removeEventListener('keydown', openPictureEscPressHandler);
  }

  function openPictureEscPressHandler(evt) {
    window.util.isEscEvent(evt, closePicture);
  }

  function renderComment(userComment) {

    var commentItem = document.querySelector('.js-social-comment').cloneNode(true);
    var commentImg = commentItem.querySelector('.js-social-comment-picture');
    var commentText = commentItem.querySelector('.js-social-comment-text');

    commentImg.src = userComment.avatar;
    commentImg.alt = userComment.name;
    commentText.textContent = userComment.message;

    return pictureCommentsBlock.appendChild(commentItem);
  }

  function addComments(comment) {
    for (var i = 0; i < comment.length; i++) {
      renderComment(comment[i]);
    }
  }

  function renderPictureBlock(pictureInfo) {
    pictureImg.src = pictureInfo.url;
    pictureLikes.textContent = pictureInfo.likes;
    pictureCommentsCount.textContent = pictureInfo.comments.length;
    pictureDesc.textContent = pictureInfo.description;

    addComments(pictureInfo.comments);
  }

  function userPictureClickHandler(photos) {
    var userPictureItemAll = document.querySelectorAll('.js-user-picture');
    userPictureItemAll.forEach(function (item, index) {
      item.addEventListener('click', function () {
        openPicture();
        renderPictureBlock(photos[index]);
      });
    });
  }

  window.load(function (photos) {
    userPictureClickHandler(photos);
  });

  pictureCommentsCountBlock.classList.add('hidden');
  pictureCommentsLoader.classList.add('hidden');
  pictureClose.addEventListener('click', closePicture);
})();

