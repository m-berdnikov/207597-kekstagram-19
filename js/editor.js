'use strict';

var ESC_KEY = 'Escape';

var uploadInput = document.querySelector('.js-upload-file');
var editorBlock = document.querySelector('.js-editor');
var editorClose = document.querySelector('.js-editor-cancel');
var imgPreview = document.querySelector('.js-preview');
var uploadImgForm = document.querySelector('.js-upload-form');
var effectLevel = document.querySelector('.js-effect-level');
var effectLevelPin = document.querySelector('.js-effect-level-pin');
var effectLevelLine = document.querySelector('.js-effect-level-line');
var effectLevelDepth = document.querySelector('.js-effect-level-depth');
var effectLevelValue = document.querySelector('.js-effect-level-value');


function openEditor() {
  document.body.classList.add('modal-open');
  editorBlock.classList.remove('hidden');
  effectLevel.classList.add('hidden');
  effectLevelValue.removeAttribute('value');
  document.addEventListener('keydown', openEditorEscPressHandler);
}

function closeEditor() {
  document.body.classList.remove('modal-open');
  editorBlock.classList.add('hidden');
  document.removeEventListener('keydown', openEditorEscPressHandler);
}

function openEditorEscPressHandler(evt) {
  if (evt.key === ESC_KEY) {
    closeEditor();
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
    imgPreview.dataset.type = evt.target.value;
    imgPreview.style.filter = '';
  }
}

uploadInput.addEventListener('change', openEditor);

editorClose.addEventListener('click', function () {
  closeEditor();
});

uploadImgForm.addEventListener('change', filterChangeHandler);

effectLevelPin.addEventListener('mouseup', sliderChangeHandler);
