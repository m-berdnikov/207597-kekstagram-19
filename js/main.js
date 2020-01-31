'use strict';

var AUTHOR_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var COMMENTS = ['Всё отлично!', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'];
var DESCRIPTIONS = ['Красивое место', 'Давно хотел это увидеть'];
var PHOTOS_NUMBER = 25;

var picturesContainer = document.querySelector('.js-pictures-container');
var userPicture = document.querySelector('#picture');
var userPictureItem = userPicture.content.querySelector('.js-user-picture');

var photos = [];

var fragment = document.createDocumentFragment();

function getRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomDescription() {
  var descriptionIndex = DESCRIPTIONS.length;
  return DESCRIPTIONS[getRandomNumber(0, descriptionIndex - 1)];
}

function getRandomInfo() {
  var commentIndex = COMMENTS.length;
  var authorIndex = AUTHOR_NAMES.length;
  var userAvatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  var userMessage = COMMENTS[getRandomNumber(0, commentIndex - 1)];
  var userName = AUTHOR_NAMES[getRandomNumber(0, authorIndex - 1)];

  return {avatar: userAvatar, message: userMessage, name: userName};
}

function getCommentCollection() {
  var comments = [];
  for (var i = 0; i < getRandomNumber(1, 50); i++) {
    var randomInfo = getRandomInfo();

    comments.push(randomInfo);
  }

  return comments;
}

function createPhotos(photosCount) {
  for (var i = 1, photoInfo = []; i <= photosCount; i++) {
    photoInfo.push({
      url: 'photos/' + i + '.jpg',
      description: getRandomDescription(),
      likes: getRandomNumber(15, 200),
      comments: getCommentCollection(),
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
    elements.appendChild(renderPhoto(photos[i]));
  }
}

photos = createPhotos(PHOTOS_NUMBER);

addElements(fragment);

picturesContainer.appendChild(fragment);

