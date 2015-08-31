(function(util, d) {
  "use strict";

  var click_mobile = (function _click_mobile() {
    var button = d.getElementById('click_mobile');
    var aside = d.getElementsByTagName('aside')[0];
    var container = d.getElementsByClassName('container')[0];

    function move (e) {
      if (util.hasClass(aside, 'mobile')) {
        util.removeClass(aside, 'mobile');
        util.removeClass(button, 'mobile');
        util.removeClass(container, 'mobile');
      } else {
        util.addClass(aside, 'mobile');
        util.addClass(button, 'mobile');
        util.addClass(container, 'mobile');
      }
    }

    function init() {
      util.addEvent(button, 'click', move);
    }

    return {
      init: init
    };
  })();

  click_mobile.init();

})(require('./util'), document);

