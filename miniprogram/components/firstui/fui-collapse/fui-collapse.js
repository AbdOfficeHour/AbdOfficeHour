// 本文件由FirstUI授权予闫弘宇（手机号：1351 00   0    15 5 3，身份证尾号：0 3  3 6 12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
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