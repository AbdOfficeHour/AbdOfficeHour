// 本文件由FirstUI授权予杨方安（手机号：  1  89386  3 1 5 9 3，身份证尾号：  18493   1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    items: {
      type: Array,
      value: [],
      observer(val) {
        this.setData({
          itemList: val
        })
      }
    },
    height: {
      type: String,
      optionalTypes: [Number],
      value: 88
    },
    background: {
      type: String,
      value: '#fff'
    },
    isLine: {
      type: Boolean,
      value: true
    },
    lineColor: {
      type: String,
      value: '#eee'
    },
    color: {
      type: String,
      value: '#7F7F7F'
    },
    activeColor: {
      type: String,
      value: '#181818'
    },
    size: {
      type: String,
      optionalTypes: [Number],
      value: 28
    }
  },
  data: {
    itemList: []
  },
  lifetimes: {
    attached: function () {
      this.setData({
        itemList: this.data.items
      })
    }
  },
  methods: {
    handleData(index) {
      let list = this.data.itemList;
      list.forEach((item, idx) => {
        if (index !== idx && item.type !== 'filter' && item.type !== 'switch') {
          if (item.type === 'sort') {
            item.sort = 1;
          }
          item.active = false;
          item.value = ''
        }
      })
      this.setData({
        itemList: list
      })
    },
    handleClick(e) {
      let index = Number(e.currentTarget.dataset.index)
      //dropdown、filter需要设置value来确定是否选中
      let item = this.data.itemList[index]
      //dropdown、text、switch、sort、filter
      let type = item.type;
      let active = `itemList[${index}].active`
      let value = `itemList[${index}].value`
      let sort = `itemList[${index}].sort`
      let _switch = `itemList[${index}].switch`

      if (type === 'dropdown') {
        this.setData({
          [active]: !item.active
        })
        item.value && this.handleData(index);
      } else if (type === 'text') {
        if (item.active) return;
        this.setData({
          [active]: true,
          [value]: item.text
        })
        this.handleData(index);
      } else if (type === 'switch') {
        this.setData({
          [_switch]: item.switch === 2 ? 1 : 2,
          [active]: false
        })
      } else if (type === 'sort') {
        //初次选中时为升序
        let _sort = 1;
        if (item.value && item.sort) {
          _sort = item.sort === 2 ? 1 : 2
        }
        this.setData({
          [sort]: _sort,
          [value]: _sort === 1 ? 'asc' : 'desc'
        })
        this.handleData(index);
      }
      setTimeout(() => {
        this.triggerEvent('change', {
          index: index,
          items: this.data.itemList
        })
      }, 0)
    }
  }
})