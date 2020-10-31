'use strict';

(function () {

  var pictureCommentsLoader = document.querySelector('.js-comments-loader');
  var lostComments = '';

  function loadComment() {
    if (lostComments === '') {
      lostComments = window.currentComments.slice();
      lostComments.splice(0, 5);
    }

    if (lostComments.length <= 5) {
      window.addComments(lostComments);
      pictureCommentsLoader.classList.add('hidden');
      lostComments = '';
    } else {
      window.addComments(lostComments.splice(0, 5));
    }
  }

  pictureCommentsLoader.addEventListener('click', function () {
    loadComment();
  });
})();

