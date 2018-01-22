'use strict';

var createElementUtil = {};
!function () {
  var pos = {
    'x': '0px',
    'y': '0px'
  };
  var currentWrapper = {};
  var ele = {};

  var ZoomUtil = {
    onMouseDown: function onMouseDown() {
      pos = {
        x: event.clientX,
        y: event.clientY
      };
      $(document).on('mousemove', this.onMouseMove).on('mouseup', this.onMouseUp);
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
      $(document).off('mousemove');
      $(document).off('mouseup');
    }
  };
  var DragUtil = {
    onMouseDown: function onMouseDown() {
      pos = {
        x: event.clientX,
        y: event.clientY
      };
      $(document).on('mousemove', this.onMouseMove).on('mouseup', this.onMouseUp);
    },
    onMouseMove: function onMouseMove() {
      var newPos = {
        x: event.clientX,
        y: event.clientY
      };
      var width = pos.x - newPos.x;
      var height = pos.y - newPos.y;
      setPosition(width, height);
      pos = JSON.parse(JSON.stringify(newPos));
    },
    onMouseUp: function onMouseUp() {
      $(document).off('mousemove');
      $(document).off('mouseup');
    }
  };
  createElementUtil = {
    createAnElement: function createAnElement(node, parent) {
      var wrapper = document.createElement('div');
      $(wrapper).addClass('wrapper');
      $(wrapper).append(node);
      currentWrapper = $(wrapper);
      var operateContent = createOperationNode();
      $(wrapper).append($(operateContent));
      parent.append(wrapper);
      $(document).on('mousedown', '.operate_btn', function (event) {
        event.stopImmediatePropagation();
        ele = $(event.target);
        currentWrapper = ele.parents('.wrapper');
        ZoomUtil.onMouseDown();
      });
      $(document).on('mousedown', '.wrapper', function (event) {
        event.stopImmediatePropagation();
        ele = $(event.target);
        currentWrapper = ele.parent('.wrapper');
        DragUtil.onMouseDown();
      });
    },
    getStyle: function getStyle() {
      var styleObj = {};
      styleObj.width = currentWrapper.css('width');
      styleObj.height = currentWrapper.css('height');
      styleObj.left = currentWrapper.css('left');
      styleObj.top = currentWrapper.css('top');
      styleObj.border = currentWrapper.css('border');
      return styleObj;
    }
  };
  function createOperationNode() {
    var operateContent = '<div class="operate">\n        <div class="circleArea tl operate_btn"></div>\n        <div class="circleArea bl operate_btn"></div>\n        <div class="circleArea tr operate_btn"></div>\n        <div class="circleArea br operate_btn"></div>\n        <div class="rectangleArea t operate_btn"></div>\n        <div class="rectangleArea l operate_btn"></div>\n        <div class="rectangleArea r operate_btn"></div>\n        <div class="rectangleArea b operate_btn"></div>\n         </div> ';
    return operateContent;
  }
  /** @description 设置缩放位置 */
  function resetPosition(width, height) {
    var eleClass = ele.attr('class').split(' ')[1];
    var oldWidth = currentWrapper.width();
    var oldHeight = currentWrapper.height();
    var oldTop = parseInt(currentWrapper.css('top'));
    var oldLeft = parseInt(currentWrapper.css('left'));
    switch (eleClass) {
      case 'tl':
        currentWrapper.css({
          'height': oldHeight + height + 'px',
          'width': oldWidth + width + 'px',
          'top': oldTop - height + 'px',
          'left': oldLeft - width + 'px'
        });
        break;
      case 'tr':
        currentWrapper.css({
          'height': oldHeight + height + 'px',
          'width': oldWidth - width + 'px',
          'top': oldTop - height + 'px'
        });
        break;
      case 'bl':
        currentWrapper.css({
          'height': oldHeight - height + 'px',
          'width': oldWidth + width + 'px',
          'left': oldLeft - width + 'px'
        });
        break;
      case 'br':
        currentWrapper.css({
          'height': oldHeight - height + 'px',
          'width': oldWidth - width + 'px'
        });
        break;
      case 't':
        currentWrapper.css({
          'height': oldHeight + height + 'px',
          'top': oldTop - height + 'px'
        });
        break;
      case 'b':
        currentWrapper.css({
          'height': oldHeight - height + 'px'
        });
        break;
      case 'l':
        currentWrapper.css({
          'width': oldWidth + width + 'px',
          'left': oldLeft - width + 'px'
        });
        break;
      case 'r':
        currentWrapper.css({
          'width': oldWidth - width + 'px'
        });
        break;
      default:
        break;
    }
    var wrapperWidth = currentWrapper.width();
    var wrapperHeight = currentWrapper.height();
    var rectWidth = 10;
    currentWrapper.find('.t').css({
      'left': wrapperWidth / 2 - rectWidth / 2
    });
    currentWrapper.find('.b').css({
      'left': wrapperWidth / 2 - rectWidth / 2
    });
    currentWrapper.find('.l').css({
      'top': wrapperHeight / 2 - rectWidth / 2
    });
    currentWrapper.find('.r').css({
      'top': wrapperHeight / 2 - rectWidth / 2
    });
  }
  /** @description 设置拖动位置 */
  function setPosition(width, height) {
    var left = parseInt(currentWrapper.css('left'));
    var top = parseInt(currentWrapper.css('top'));
    currentWrapper.css({
      'left': left - width + 'px',
      'top': top - height + 'px'
    });
  }
}();