var createElementUtil = {}
!function() {
  var pos = {
    'x': '0px',
    'y': '0px'
  }
  let currentWrapper = {}
  let ele = {}
 
  var MouseUtil = {
    type: 'zoom',
    init: function (type) {
      this.type = type
      this.onMouseDown()
    },
    onMouseDown: function () {
      pos = {
        x: event.clientX,
        y: event.clientY
      }
      $(document)
        .on('mousemove', function () {
          MouseUtil.onMouseMove()
        })
        .on('mouseup', function () {
          MouseUtil.onMouseUp()
        })
    },
    onMouseMove: function () {
      let newPos = {
        x: event.clientX,
        y: event.clientY
      }
      let width = pos.x - newPos.x
      let height = pos.y - newPos.y
      if (this.type === 'zoom') {
        resetPosition(width, height)
      } else {
        setPosition(width, height)
      }
      pos = JSON.parse(JSON.stringify(newPos))
    },
    onMouseUp: function () {
      $(document).off('mousemove')
      $(document).off('mouseup')
    }
  }
  createElementUtil = {
    /** @description 将元素封装成可操作的元素 */
    createAnElement: function (node, parent) {
      $('.wrapper').children('.operate').hide()
      let wrapper = document.createElement('div')
      $(wrapper).addClass('wrapper')
      $(wrapper).append(node)
      currentWrapper = $(wrapper)
      let operateContent = createOperationNode()
      $(wrapper).append($(operateContent))
      parent.append(wrapper)
      $(document).on('mousedown', '.operate_btn', function (event) {
        event.stopImmediatePropagation()
        ele = $(event.target)
        currentWrapper = ele.parents('.wrapper')
        MouseUtil.init('zoom')
      })
      $(document).on('mousedown', '.wrapper', function (event) {
        event.stopImmediatePropagation()
        ele = $(event.target)
        currentWrapper = ele.parent('.wrapper')
        MouseUtil.init('drag')
      })
      $(document).on('click', '.wrapper', function (event) {
        event.stopImmediatePropagation()
        let operateDiv = $(this).children('.operate')
        if (operateDiv.css('display')==='none') {
          $('.operate').hide()
          operateDiv.css('display', 'block')
          currentWrapper = $(this)
        }
      })
    },
    /** @description 返回操作后元素的样式 */
    getStyle () {
      let styleObj = {}
      styleObj.width = currentWrapper.css('width')
      styleObj.height = currentWrapper.css('height')
      styleObj.left = currentWrapper.css('left')
      styleObj.top = currentWrapper.css('top')
      styleObj.border = currentWrapper.css('border')
      return styleObj
    }
  }
  /** 返回操作块的字符串 */
  function createOperationNode() {
    var operateContent = `<div class="operate">
        <div class="circleArea tl operate_btn"></div>
        <div class="circleArea bl operate_btn"></div>
        <div class="circleArea tr operate_btn"></div>
        <div class="circleArea br operate_btn"></div>
        <div class="rectangleArea t operate_btn"></div>
        <div class="rectangleArea l operate_btn"></div>
        <div class="rectangleArea r operate_btn"></div>
        <div class="rectangleArea b operate_btn"></div>
         </div> `
    return operateContent
  }
  /** @description 设置缩放后位置 */
  function resetPosition(width, height) {
    let eleClass = ele.attr('class').split(' ')[1]
    let oldWidth = currentWrapper.width()
    let oldHeight = currentWrapper.height()
    let oldTop = parseInt(currentWrapper.css('top'))
    let oldLeft = parseInt(currentWrapper.css('left'))
    switch (eleClass) {
      case 'tl':
        currentWrapper.css({
          'height': oldHeight + height + 'px',
          'width': oldWidth + width + 'px',
          'top': oldTop - height + 'px',
          'left': oldLeft - width + 'px',
        })
        break;
      case 'tr':
        currentWrapper.css({
          'height': oldHeight + height + 'px',
          'width': oldWidth - width + 'px',
          'top': oldTop - height + 'px'
        })
        break;
      case 'bl':
        currentWrapper.css({
          'height': oldHeight - height + 'px',
          'width': oldWidth + width + 'px',
          'left': oldLeft - width + 'px',
        })
        break;
      case 'br':
        currentWrapper.css({
          'height': oldHeight - height + 'px',
          'width': oldWidth - width + 'px',
        })
        break;
      case 't':
        currentWrapper.css({
          'height': oldHeight + height + 'px',
          'top': oldTop - height + 'px'
        })
        break;
      case 'b':
        currentWrapper.css({
          'height': oldHeight - height + 'px',
        })
        break;
      case 'l':
        currentWrapper.css({
          'width': oldWidth + width + 'px',
          'left': oldLeft - width + 'px',
        })
        break;
      case 'r':
        currentWrapper.css({
          'width': oldWidth - width + 'px',
        })
        break;
      default:
        break;
    }
    let wrapperWidth = currentWrapper.width()
    let wrapperHeight = currentWrapper.height()
    let rectWidth = 10
    currentWrapper.find('.t').css({
      'left': wrapperWidth / 2 - rectWidth / 2
    })
    currentWrapper.find('.b').css({
      'left': wrapperWidth / 2 - rectWidth / 2
    })
    currentWrapper.find('.l').css({
      'top': wrapperHeight / 2 - rectWidth / 2
    })
    currentWrapper.find('.r').css({
      'top': wrapperHeight / 2 - rectWidth / 2
    })
  }
  /** @description 设置拖动后位置 */
  function setPosition(width, height) {
    let left = parseInt(currentWrapper.css('left'))
    let top = parseInt(currentWrapper.css('top'))
    currentWrapper.css({
      'left': left - width + 'px',
      'top': top - height + 'px',
    })
  }
}()