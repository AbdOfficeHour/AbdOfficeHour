// 本文件由FirstUI授权予杨方安（手机号：18 9 3 86 3   1  59 3，身份证尾号： 184    931）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  data: {
    children: []
  },
  relations: {
    '../fui-swipe-action/fui-swipe-action': {
      type: 'descendant',
      linked: function (target) {
        this.data.children.push(target)
      }
    }
  },
  methods: {
    close() {
      this.data.children.forEach(child => {
        child.setData({
          isShow: false
        })
      })
    },
    closeAuto(child) {
      this.data.children.forEach(item => {
        if (item !== child) {
          item.setData({
            isShow: false
          })
        }
      })
    }
  }
})