'use strict';

(function () {
  var DESCRIPTIONS = ['Красивое место', 'Давно хотел это увидеть'];
  var COMMENTS = ['Всё отлично!', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'];
  var AUTHOR_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  function getRandomInfo() {
    var commentIndex = COMMENTS.length;
    var authorIndex = AUTHOR_NAMES.length;
    var userAvatar = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
    var userMessage = COMMENTS[window.util.getRandomNumber(0, commentIndex - 1)];
    var userName = AUTHOR_NAMES[window.util.getRandomNumber(0, authorIndex - 1)];

    return {avatar: userAvatar, message: userMessage, name: userName};
  }

  window.data = {
    getRandomDescription: function () {
      var descriptionIndex = DESCRIPTIONS.length;
      return DESCRIPTIONS[window.util.getRandomNumber(0, descriptionIndex - 1)];
    },
    getCommentCollection: function () {
      var comments = [];
      for (var i = 0; i < window.util.getRandomNumber(1, 50); i++) {
        var randomInfo = getRandomInfo();
        comments.push(randomInfo);
      }

      return comments;
    }
  };
})();

