'use strict';

function createAnElement(name, parent) {
  var newObj = {
    element: {},
    style: {}
  };
  var wrapper = document.createElement('div');
  $(wrapper).addClass('wrapper');
  var ele = document.createElement(name);
  // $(ele).css({
  //   'background': 'blue',
  //   'position': 'absolute',
  //   'left': '0',
  //   'top': '0',
  //   'right': '0',
  //   'bottom': '0',
  //   'margin': 'auto',
  //   'width': '100px',
  //   'height': '100px'
  // })
  var operate = document.createElement('div');
  $(wrapper).append(ele);
  var operateContent = createOperationNode();
  $(wrapper).append($(operateContent));
  parent.append(wrapper);
  newObj.element = ele;
  newObj.style = wrapper.style;
  return newObj;
}
function createOperationNode() {
  var operateContent = '<div class="operate">\n      <div class="circleArea tl"></div>\n      <div class="circleArea bl"></div>\n      <div class="circleArea tr"></div>\n      <div class="circleArea br"></div>\n      <div class="rectangleArea t"></div>\n      <div class="rectangleArea l"></div>\n      <div class="rectangleArea r"></div>\n      <div class="rectangleArea b"></div>\n       </div> ';
  return operateContent;
}