var createElementUtil = {}
!function() {
  var pos = {
    'x': '0px',
    'y': '0px'
  }
  let newObj = {
    element: {},
    style: {}
  }
  let wrapper = document.createElement('div')
  $(wrapper).addClass('wrapper')
  let ele = {}
 
  var MouseUtil = {
    onMouseDown: function () {
      pos = {
        x: event.clientX,
        y: event.clientY
      }
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
  createElementUtil = {
    createAnElement: function (name, parent) {
      let newElement = document.createElement(name)
      $(wrapper).append(newElement)
      let operateContent = createOperationNode()
      $(wrapper).append($(operateContent))
      parent.append(wrapper)
      $(document).on('mousedown', '.operate_btn', function () {
        ele = $(event.target)
        MouseUtil.onMouseDown()
        $(document).on('mousemove', function () {
          MouseUtil.onMouseMove()
        }).on('mouseup', function () {
          MouseUtil.onMouseUp()
        })
      })
      newObj.element = ele
      newObj.style = wrapper.style
      return newObj
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
  function resetPosition(width, height) {
    let eleClass = ele.attr('class').split(' ')[1]
    let oldWidth = $(wrapper).width()
    let oldHeight = $(wrapper).height()
    let oldTop = parseInt($(wrapper).css('top'))
    let oldLeft = parseInt($(wrapper).css('left'))
    switch (eleClass) {
      case 'tl':
        $(wrapper).css({
          'height': oldHeight + height + 'px',
          'width': oldWidth + width + 'px',
          'top': oldTop - height + 'px',
          'left': oldLeft - width + 'px',
        })
        break;
      case 'tr':
        $(wrapper).css({
          'height': oldHeight + height + 'px',
          'width': oldWidth - width + 'px',
          'top': oldTop - height + 'px'
        })
        break;
      case 'bl':
        $(wrapper).css({
          'height': oldHeight - height + 'px',
          'width': oldWidth + width + 'px',
          'left': oldLeft - width + 'px',
        })
        break;
      case 'br':
        $(wrapper).css({
          'height': oldHeight - height + 'px',
          'width': oldWidth - width + 'px',
        })
        break;
      case 't':
        $(wrapper).css({
          'height': oldHeight + height + 'px',
          'top': oldTop - height + 'px',
        })
        break;
      case 'b':
        $(wrapper).css({
          'height': oldHeight - height + 'px',
        })
        break;
      case 'l':
        $(wrapper).css({
          'width': oldWidth + width + 'px',
          'left': oldLeft - width + 'px',
        })
        break;
      case 'r':
        $(wrapper).css({
          'width': oldWidth - width + 'px',
        })
        break;
      default:
        break;
    }
    let wrapperWidth = $(wrapper).width()
    let wrapperHeight = $(wrapper).height()
    let rectWidth = 10
    $('.t').css({
      'left': wrapperWidth / 2 - rectWidth / 2
    })
    $('.b').css({
      'left': wrapperWidth / 2 - rectWidth / 2
    })
    $('.l').css({
      'top': wrapperHeight / 2 - rectWidth / 2
    })
    $('.r').css({
      'top': wrapperHeight / 2 - rectWidth / 2
    })
  }
  
}()