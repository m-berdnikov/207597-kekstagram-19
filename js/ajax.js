'use strict';

(function () {

  window.load = function (success) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      success(xhr.response);
    });
    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
    xhr.send();

  };
})();

