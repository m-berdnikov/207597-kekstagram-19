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

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.response);
      }
    });

    xhr.open('POST', 'https://js.dump.academy/kekstagram');
    xhr.send(data);
  };
})();
