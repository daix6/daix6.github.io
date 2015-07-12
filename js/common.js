;(function(d, undefined) {
  "use strict";

  var util = {
    addEvent: function(ele, event, handler) {
      if (ele.addEventListener) {
        ele.addEventListener(event, handler);
      } else {
        ele.attachEvent('on' + event, handler);
      }
    },
    hasClass: function(ele, classname) {
      if (ele.classList) {
        return ele.classList.contains(classname);
      } else {
        var reg = new RegExp('(\\s|^)' + classname + '(\\s|$)', 'g');
        return !!ele.classname.match(reg);
      }
    },
    addClass: function(ele, classname) {
      if (ele.classList) {
        ele.classList.add(classname);
      } else if (!hasClass(ele, classname)) {
        ele.className += ' ' + classname;
      }
    },
    removeClass: function(ele, classname) {
      if (ele.classList) {
        ele.classList.remove(classname);
      } else if (hasClass(ele, classname)) {
        var reg = new RegExp('(\\s|^)' + classname + '(\\s|$)', 'g');
        ele.className = ele.className.replace(reg, ' ');
      }
    }
  };

  var click_mobile = (function _click_mobile() {
    var button = document.getElementById('click_mobile');
    var aside = document.getElementsByTagName('aside')[0];
    var container = document.getElementsByClassName('container')[0];

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
}(document))
