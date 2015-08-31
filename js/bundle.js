(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{"./util":2}],2:[function(require,module,exports){
module.exports = (function () {
  return {
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
})();

},{}]},{},[1]);
