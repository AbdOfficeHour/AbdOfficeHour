// 本文件由FirstUI授权予杨方安（手机号：1     89386  315  9 3，身份证尾号：  1 8  4931）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    // 是否开启手风琴效果
    accordion: {
      type: Boolean,
      value: false
    }
  },
  data: {
    children: []
  },
  relations: {
    '../fui-collapse-item/fui-collapse-item': {
      type: 'descendant',
      linked: function (target) {
        this.data.children.push(target)
      },
      linkChanged: function (target) {
        setTimeout(() => {
          target && target.init()
        }, 50)
      }
    }
  },
  methods: {
    collapseChange(obj, isOpen, idx) {
      if (this.data.accordion && isOpen) {
        this.data.children.forEach((item, index) => {
          if (item !== obj) {
            item.setData({
              isOpen: false
            })
          }
        })
      }
      this.triggerEvent('change', {
        index: idx,
        isOpen: isOpen
      })
    }
  }
})