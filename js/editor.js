'use strict';
(function () {
  var Message = {
    FIRST_SYMBOL: 'Хэш-тег должен начинаться с символа # (решётка)',
    NOT_ONLY_HASH: 'Хэш-тег не может состоять только из одной решётки',
    SPACE_REQUIRE: 'Хэш-теги должны разделяться пробелами',
    UNIQUE: 'Один и тот же хэш-тег не может быть использован дважды',
    MANY: 'Нельзя указать больше пяти хэш-тегов',
    LONG: 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
    SPEC: 'Хэш-тег должен состоять только из букв и чисел'
  };

  var uploadInput = document.querySelector('.js-upload-file');
  var editorBlock = document.querySelector('.js-editor');
  var editorClose = document.querySelector('.js-editor-cancel');
  var imgPreview = document.querySelector('.js-preview');
  var uploadImgForm = document.querySelector('.js-upload-form');
  var hashtagsInput = document.querySelector('.js-hashtags');
  var commentArea = document.querySelector('.js-editor-comment');
  var effectLevel = document.querySelector('.js-effect-level');
  var effectLevelPin = document.querySelector('.js-effect-level-pin');
  var effectLevelLine = document.querySelector('.js-effect-level-line');
  var effectLevelDepth = document.querySelector('.js-effect-level-depth');
  var effectLevelValue = document.querySelector('.js-effect-level-value');
  var uploadSubmit = document.querySelector('.js-upload-submit');
  var main = document.querySelector('.js-main');
  var successBlockTemplate = document.querySelector('#success');
  var successBlock = successBlockTemplate.content.querySelector('.js-success-block').cloneNode(true);
  var errorBlockTemplate = document.querySelector('#error');
  var errorBlock = errorBlockTemplate.content.querySelector('.js-error-block').cloneNode(true);


  function openEditor() {
    document.body.classList.add('modal-open');
    editorBlock.classList.remove('hidden');
    effectLevel.classList.add('hidden');
    document.addEventListener('keydown', openEditorEscPressHandler);
  }

  function closeEditor() {
    document.body.classList.remove('modal-open');
    editorBlock.classList.add('hidden');
    effectLevelValue.removeAttribute('value');
    if (imgPreview.dataset.type !== '') {
      imgPreview.classList.remove('effects__preview--' + imgPreview.dataset.type);
      imgPreview.dataset.type = '';
      imgPreview.style.filter = '';
    }
    document.removeEventListener('keydown', openEditorEscPressHandler);
  }

  function openEditorEscPressHandler(evt) {
    if (document.activeElement !== hashtagsInput && document.activeElement !== commentArea) {
      window.util.isEscEvent(evt, closeEditor);
    }
  }

  function sliderChangeHandler() {
    var effectLevelDepthValue = (effectLevelDepth.offsetWidth / effectLevelLine.offsetWidth).toFixed(2);
    effectLevelValue.setAttribute('value', effectLevelDepthValue * 100);
    if (imgPreview.dataset.type === 'none') {
      imgPreview.style.filter = '';
    } else if (imgPreview.dataset.type === 'chrome') {
      imgPreview.style.filter = 'grayscale(' + effectLevelDepthValue + ')';
    } else if (imgPreview.dataset.type === 'sepia') {
      imgPreview.style.filter = 'sepia(' + effectLevelDepthValue + ')';
    } else if (imgPreview.dataset.type === 'marvin') {
      imgPreview.style.filter = 'invert(' + effectLevelDepthValue * 100 + '%)';
    } else if (imgPreview.dataset.type === 'phobos') {
      imgPreview.style.filter = 'blur(' + (1 + 2 * effectLevelDepthValue) + 'px)';
    } else if (imgPreview.dataset.type === 'heat') {
      imgPreview.style.filter = 'brightness(' + (1 + 2 * effectLevelDepthValue) + ')';
    }
  }

  function filterChangeHandler(evt) {
    if (evt.target && evt.target.matches('.js-effect')) {
      if (effectLevel.classList.contains('hidden')) {
        effectLevel.classList.remove('hidden');
      }
      if (imgPreview.dataset.type !== '') {
        imgPreview.classList.remove('effects__preview--' + imgPreview.dataset.type);
      }
      if (evt.target.value === 'none') {
        effectLevel.classList.add('hidden');
        effectLevelValue.removeAttribute('value');
      }
      imgPreview.classList.add('effects__preview--' + evt.target.value);
      effectLevelValue.setAttribute('value', 100);
      effectLevelPin.style.left = '100%';
      effectLevelDepth.style.width = '100%';
      imgPreview.dataset.type = evt.target.value;
      imgPreview.style.filter = '';
    }
  }

  function validateInputHashtags(hashtags) {
    var result = hashtags.value.trim().toLowerCase().split(' ').filter(Boolean);
    for (var i = 0, k = 0; i < result.length; i++) {
      if (result[i].charAt(0) !== '#') {
        hashtags.setCustomValidity(Message.FIRST_SYMBOL);
        k = 1;
      } else if (result[i].length === 1 && result[i].charAt(0) === '#') {
        hashtags.setCustomValidity(Message.NOT_ONLY_HASH);
        k = 1;
      } else if (result[i].split('#').length > 2) {
        hashtags.setCustomValidity(Message.SPACE_REQUIRE);
        k = 1;
      } else if (window.util.isIdentical(result)) {
        hashtags.setCustomValidity(Message.UNIQUE);
        k = 1;
      } else if (result.length > 5) {
        hashtags.setCustomValidity(Message.MANY);
        k = 1;
      } else if (result[i].length > 20) {
        hashtags.setCustomValidity(Message.LONG);
        k = 1;
      } else if (result[i].slice(1).search(/[а-яА-ЯёЁa-zA-Z0-9]+$/g) !== 0) {
        hashtags.setCustomValidity(Message.SPEC);
        k = 1;
      } else if (result[i].length === 0) {
        k = 0;
      } else {
        k = 0;
      }
    }
    return k;
  }

  function showSuccessBlock() {
    closeEditor();
    main.appendChild(successBlock);
    var successButton = document.querySelector('.js-success-button');

    successBlock.addEventListener('click', closeSuccessBlock);
    successButton.addEventListener('click', closeSuccessBlock);
    document.addEventListener('keydown', openSuccessBlockEscPressHandler);
  }

  function closeSuccessBlock() {
    successBlock.removeEventListener('click', closeSuccessBlock);
    main.removeChild(successBlock);
    document.removeEventListener('keydown', openSuccessBlockEscPressHandler);
  }

  function openSuccessBlockEscPressHandler(evt) {
    window.util.isEscEvent(evt, closeSuccessBlock);
  }

  function showErrorBlock() {
    closeEditor();
    main.appendChild(errorBlock);
    var errorButton = document.querySelector('.js-error-button');

    errorBlock.addEventListener('click', closeErrorBlock);
    errorButton.addEventListener('click', closeErrorBlock);
    document.addEventListener('keydown', openErrorBlockEscPressHandler);
  }

  function closeErrorBlock() {
    errorBlock.removeEventListener('click', closeErrorBlock);
    main.removeChild(errorBlock);
    document.removeEventListener('keydown', openErrorBlockEscPressHandler);
  }

  function openErrorBlockEscPressHandler(evt) {
    window.util.isEscEvent(evt, closeErrorBlock);
  }

  hashtagsInput.addEventListener('input', function () {
    hashtagsInput.setCustomValidity('');
  });

  uploadSubmit.addEventListener('click', function () {
    validateInputHashtags(hashtagsInput);
  });

  editorClose.addEventListener('click', function () {
    closeEditor();
  });

  uploadInput.addEventListener('change', openEditor);

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
      effectLevelDepth.style.width = effectLevelPin.style.left;
      sliderChangeHandler();

      if ((effectLevelPin.offsetLeft - shift.x) <= 0) {
        document.removeEventListener('mousemove', onMouseMove);
      } else if ((effectLevelPin.offsetLeft - shift.x) >= 453) {
        document.removeEventListener('mousemove', onMouseMove);
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  uploadImgForm.addEventListener('change', filterChangeHandler);

  uploadImgForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(uploadImgForm), showSuccessBlock, showErrorBlock);
    evt.preventDefault();
  });

})();
