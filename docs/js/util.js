'use strict';

var createElementUtil = {};
!function () {
  var pos = {
    'x': '0px',
    'y': '0px'
  };
  var currentWrapper = {};
  var ele = {};

  var MouseUtil = {
    type: 'zoom',
    init: function init(type) {
      this.type = type;
      this.onMouseDown();
    },
    onMouseDown: function onMouseDown() {
      pos = {
        x: event.clientX,
        y: event.clientY
      };
      $(document).on('mousemove', function () {
        MouseUtil.onMouseMove();
      }).on('mouseup', function () {
        MouseUtil.onMouseUp();
      });
    },
    onMouseMove: function onMouseMove() {
      var newPos = {
        x: event.clientX,
        y: event.clientY
      };
      var width = pos.x - newPos.x;
      var height = pos.y - newPos.y;
      if (this.type === 'zoom') {
        resetPosition(width, height);
      } else {
        setPosition(width, height);
      }
      pos = JSON.parse(JSON.stringify(newPos));
    },
    onMouseUp: function onMouseUp() {
      $(document).off('mousemove');
      $(document).off('mouseup');
    }
  };
  createElementUtil = {
    /** @description 将元素封装成可操作的元素 */
    createAnElement: function createAnElement(node, parent) {
      $('.wrapper').children('.operate').hide();
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
        MouseUtil.init('zoom');
      });
      $(document).on('mousedown', '.wrapper', function (event) {
        event.stopImmediatePropagation();
        ele = $(event.target);
        currentWrapper = ele.parent('.wrapper');
        MouseUtil.init('drag');
      });
      $(document).on('click', '.wrapper', function (event) {
        event.stopImmediatePropagation();
        var operateDiv = $(this).children('.operate');
        if (operateDiv.css('display') === 'none') {
          $('.operate').hide();
          operateDiv.css('display', 'block');
          currentWrapper = $(this);
        }
      });
    },
    /** @description 返回操作后元素的样式 */
    getStyle: function getStyle(wrapper) {
      currentWrapper = wrapper || currentWrapper;
      var styleObj = {};
      styleObj.width = currentWrapper.css('width');
      styleObj.height = currentWrapper.css('height');
      styleObj.left = currentWrapper.css('left');
      styleObj.top = currentWrapper.css('top');
      styleObj.border = currentWrapper.css('border');
      styleObj.background = currentWrapper.css('background');
      return styleObj;
    },
    getElementsStyles: function getElementsStyles() {
      var styleLists = [];
      var _this = this;
      var wrappers = $('.wrapper');
      $.each(wrappers, function (index, item) {
        var styleObj = _this.getStyle($(item));
        styleLists.push(styleObj);
      });
      return styleLists;
    },
    setStyle: function setStyle(key, value) {
      currentWrapper.css(key, value);
    }
  };
  /** 返回操作块的字符串 */
  function createOperationNode() {
    var operateContent = '<div class="operate">\n        <div class="circleArea tl operate_btn"></div>\n        <div class="circleArea bl operate_btn"></div>\n        <div class="circleArea tr operate_btn"></div>\n        <div class="circleArea br operate_btn"></div>\n        <div class="rectangleArea t operate_btn"></div>\n        <div class="rectangleArea l operate_btn"></div>\n        <div class="rectangleArea r operate_btn"></div>\n        <div class="rectangleArea b operate_btn"></div>\n         </div> ';
    return operateContent;
  }
  /** @description 设置缩放后位置 */
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
  /** @description 设置拖动后位置 */
  function setPosition(width, height) {
    var left = parseInt(currentWrapper.css('left'));
    var top = parseInt(currentWrapper.css('top'));
    currentWrapper.css({
      'left': left - width + 'px',
      'top': top - height + 'px'
    });
  }
}();