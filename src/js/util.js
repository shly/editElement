function createAnElement(name, parent) {
  const newObj = {
    element: {},
    style: {}
  }
  const wrapper = document.createElement('div')
  $(wrapper).addClass('wrapper')
  const ele = document.createElement(name)
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
  const operate = document.createElement('div')
  $(wrapper).append(ele)
  const operateContent = createOperationNode()
  $(wrapper).append($(operateContent))
  parent.append(wrapper)
  newObj.element = ele
  newObj.style = wrapper.style
  return newObj
}
function createOperationNode() {
  var operateContent = `<div class="operate">
      <div class="circleArea tl"></div>
      <div class="circleArea bl"></div>
      <div class="circleArea tr"></div>
      <div class="circleArea br"></div>
      <div class="rectangleArea t"></div>
      <div class="rectangleArea l"></div>
      <div class="rectangleArea r"></div>
      <div class="rectangleArea b"></div>
       </div> `
  return operateContent
}