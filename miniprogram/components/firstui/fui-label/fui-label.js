// 本文件由FirstUI授权予闫弘宇（手机号：1   3510  0  01 5  53，身份证尾号：0 3   361 2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
let relations = {};
const children = [
  'fui-radio',
  'fui-checkbox',
  'fui-switch'
]
children.map((name) => {
  relations[`../${name}/${name}`] = {
    type: 'descendant',
    linked: function (target) {
      this.data.childrens.push(target)
    }
  }
})
Component({
  properties: {
    //padding值
    padding: {
      type: String,
      value: "0"
    },
    //margin值
    margin: {
      type: String,
      value: "0"
    },
    full: {
      type: Boolean,
      value: false
    },
    inline: {
      type: Boolean,
      value: false
    }
  },
  relations: {
    ...relations
  },
  data: {
    childrens: []
  },
  methods: {
    onClick() {
      if (this.data.childrens && this.data.childrens.length > 0) {
        for (let child of this.data.childrens) {
          child.labelClick()
        }
      }
    }
  }
})