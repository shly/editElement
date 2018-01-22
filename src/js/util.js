var createElementUtil = {}
!function() {
  var pos = {
    'x': '0px',
    'y': '0px'
  }
  let currentWrapper = {}
  let ele = {}
 
  var ZoomUtil = {
    onMouseDown: function () {
      pos = {
        x: event.clientX,
        y: event.clientY
      }
      $(document)
        .on('mousemove', this.onMouseMove)
        .on('mouseup', this.onMouseUp)
    },
    onMouseMove: function () {
      let newPos = {
        x: event.clientX,
        y: event.clientY
      }
      let width = pos.x - newPos.x
      let height = pos.y - newPos.y
      resetPosition(width, height)
      pos = JSON.parse(JSON.stringify(newPos))
    },
    onMouseUp: function () {
      $(document).off('mousemove')
      $(document).off('mouseup')
    }
  }
  var DragUtil = {
    onMouseDown: function () {
      pos = {
        x: event.clientX,
        y: event.clientY
      }
      $(document)
      .on('mousemove', this.onMouseMove)
        .on('mouseup', this.onMouseUp)
    },
    onMouseMove: function () {
      let newPos = {
        x: event.clientX,
        y: event.clientY
      }
      let width = pos.x - newPos.x
      let height = pos.y - newPos.y
      setPosition(width, height)
      pos = JSON.parse(JSON.stringify(newPos))
    },
    onMouseUp: function () {
      $(document).off('mousemove')
      $(document).off('mouseup')
    }
  }
  createElementUtil = {
    createAnElement: function (node, parent) {
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
        ZoomUtil.onMouseDown()
      })
      $(document).on('mousedown', '.wrapper', function (event) {
        event.stopImmediatePropagation()
        ele = $(event.target)
        currentWrapper = ele.parent('.wrapper')
        DragUtil.onMouseDown()
      })
    },
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
  /** @description 设置缩放位置 */
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
  /** @description 设置拖动位置 */
  function setPosition(width, height) {
    let left = parseInt(currentWrapper.css('left'))
    let top = parseInt(currentWrapper.css('top'))
    currentWrapper.css({
      'left': left - width + 'px',
      'top': top - height + 'px',
    })
  }
}()