'use strict';

var createElementUtil = {};
!function () {
  var pos = {
    'x': '0px',
    'y': '0px'
  };
  var newObj = {
    element: {},
    style: {}
  };
  var wrapper = document.createElement('div');
  $(wrapper).addClass('wrapper');
  var ele = {};

  var MouseUtil = {
    onMouseDown: function onMouseDown() {
      pos = {
        x: event.clientX,
        y: event.clientY
      };
    },
    onMouseMove: function onMouseMove() {
      var newPos = {
        x: event.clientX,
        y: event.clientY
      };
      var width = pos.x - newPos.x;
      var height = pos.y - newPos.y;
      resetPosition(width, height);
      pos = JSON.parse(JSON.stringify(newPos));
    },
    onMouseUp: function onMouseUp() {
      $(event.target).off('mousemove');
      $(event.target).off('mouseup');
    }
  };
  createElementUtil = {
    createAnElement: function createAnElement(name, parent) {
      var newElement = document.createElement(name);
      $(wrapper).append(newElement);
      var operateContent = createOperationNode();
      $(wrapper).append($(operateContent));
      parent.append(wrapper);
      $('.operate .circleArea').on('mousedown', function () {
        ele = $(event.target);
        MouseUtil.onMouseDown();
        ele.on('mousemove', function () {
          MouseUtil.onMouseMove();
        });
        ele.on('mouseup', MouseUtil.onMouseUp);
        ele.on('mouseleave', MouseUtil.onMouseUp);
      });
      $('.operate .rectangleArea').on('mousedown', function (event) {
        ele = $(event.target);
        MouseUtil.onMouseDown(event);
        ele.on('mousemove', function (event) {
          MouseUtil.onMouseMove(event);
        });
        ele.on('mouseup', function (event) {
          MouseUtil.onMouseUp(event);
        });
        ele.on('mouseleave', function (event) {
          console.log('@@@@');
          MouseUtil.onMouseUp(event);
        });
      });
      newObj.element = ele;
      newObj.style = wrapper.style;
      return newObj;
    }
  };
  function createOperationNode() {
    var operateContent = '<div class="operate">\n        <div class="circleArea tl"></div>\n        <div class="circleArea bl"></div>\n        <div class="circleArea tr"></div>\n        <div class="circleArea br"></div>\n        <div class="rectangleArea t"></div>\n        <div class="rectangleArea l"></div>\n        <div class="rectangleArea r"></div>\n        <div class="rectangleArea b"></div>\n         </div> ';
    return operateContent;
  }
  function resetPosition(width, height) {
    var eleClass = ele.attr('class').split(' ')[1];
    if (eleClass === 'tl') {
      $(wrapper).css({
        'height': parseInt($(wrapper).css('height')) + height + 'px',
        'width': parseInt($(wrapper).css('width')) + width + 'px',
        'top': parseInt($(wrapper).css('top')) - height + 'px',
        'left': parseInt($(wrapper).css('left')) - width + 'px'
      });
    } else if (eleClass === 'tr') {
      $(wrapper).css({
        'height': parseInt($(wrapper).css('height')) + height + 'px',
        'width': parseInt($(wrapper).css('width')) - width + 'px',
        'top': parseInt($(wrapper).css('top')) - height + 'px'
      });
    } else if (eleClass === 'bl') {
      $(wrapper).css({
        'height': parseInt($(wrapper).css('height')) - height + 'px',
        'width': parseInt($(wrapper).css('width')) + width + 'px',
        'left': parseInt($(wrapper).css('left')) - width + 'px'
      });
    } else if (eleClass === 'br') {
      $(wrapper).css({
        'height': parseInt($(wrapper).css('height')) - height + 'px',
        'width': parseInt($(wrapper).css('width')) - width + 'px'
      });
    } else if (eleClass === 't') {
      $(wrapper).css({
        'height': parseInt($(wrapper).css('height')) + height + 'px',
        'top': parseInt($(wrapper).css('top')) - height + 'px'
      });
    } else if (eleClass === 'b') {
      $(wrapper).css({
        'height': parseInt($(wrapper).css('height')) - height + 'px'
      });
    } else if (eleClass === 'l') {
      $(wrapper).css({
        'width': parseInt($(wrapper).css('width')) + width + 'px',
        'left': parseInt($(wrapper).css('left')) - width + 'px'
      });
    } else if (eleClass === 'r') {
      $(wrapper).css({
        'width': parseInt($(wrapper).css('width')) - width + 'px'
      });
    }
    $('.t').css({
      'left': parseInt($(wrapper).css('width')) / 2 - parseInt($('.t').css('width')) / 2
    });
    $('.b').css({
      'left': parseInt($(wrapper).css('width')) / 2 - parseInt($('.t').css('width')) / 2
    });
    $('.l').css({
      'top': parseInt($(wrapper).css('height')) / 2 - parseInt($('.t').css('height')) / 2
    });
    $('.r').css({
      'top': parseInt($(wrapper).css('height')) / 2 - parseInt($('.t').css('height')) / 2
    });
  }
}();