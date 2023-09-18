// 本文件由FirstUI授权予闫弘宇（手机号：1 35  1  0 0015 5   3，身份证尾号：  0 3 3 612）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    header: {
      type: Array,
      value:[],
      observer(val){
        this.handleHeader(val)
      }
    },
    show: {
      type: Boolean,
      value: true
    },
    size: {
      type: String,
      optionalTypes:[Number],
      value: 28
    },
    color: {
      type: String,
      value: '#7F7F7F'
    },
    fontWeight: {
      type: String,
      optionalTypes:[Number],
      value: 600
    },
    headerBgColor: {
      type: String,
      value: '#fff'
    },
    fixed: {
      type: Boolean,
      value: false
    },
    //数据集合
    itemList: {
      type: Array,
      value:[],
      observer(vals){
        this.handleData(vals)
      }
    },
    //总宽度 < 屏幕宽度- gap*2时，是否铺满
    full: {
      type: Boolean,
      value: false
    },
    //Table 的高度，默认为自动高度，单位rpx。
    height: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    //组件外层设置的左右padding值（距离屏幕左右侧距离），rpx
    gap: {
      type: String,
      optionalTypes:[Number],
      value: 0
    },
    //是否带有纵向边框
    border: {
      type: Boolean,
      value: true
    },
    //是否带有横向边框
    horBorder: {
      type: Boolean,
      value: true
    },
    //边框颜色
    borderColor: {
      type: String,
      value: '#eee'
    },
    //如果有固定项，不可设置透明
    background: {
      type: String,
      value: '#fff'
    },
    // 是否为斑马纹table
    stripe: {
      type: Boolean,
      value: false
    },
    //斑马纹颜色
    stripeColor: {
      type: String,
      value: '#F8F8F8'
    },
    textSize: {
      type: String,
      optionalTypes:[Number],
      value: 28
    },
    textColor: {
      type: String,
      value: '#333'
    },
    //单元格对齐方式:left/center/right
    align: {
      type: String,
      value: 'center'
    },
    //文字超出是否省略，默认换行
    ellipsis: {
      type: Boolean,
      value: false
    },
    //单元格上下padding值，单位rpx
    padding: {
      type: String,
      optionalTypes:[Number],
      value: 20
    },
    //是否添加多选框
    selection: {
      type: Boolean,
      value: false,
      observer(val){
        this.handleData(this.data.itemList)
      }
    },
    initEmitChange: {
      type: Boolean,
      value: false
    },
    //选择框选中后颜色
    checkboxColor: {
      type: String,
      value: ''
    },
    checkboxBorderColor: {
      type: String,
      value: '#eee'
    },
    checkmarkColor: {
      type: String,
      value: '#fff'
    }
  },
  data: {
    width: 0,
    //列宽度需要加上此值
    divideW: 0,
    hData: [],
    tableData: [],
    initTableData:[],
    totalW: 0,
    scrollH: 0,
		chkAll: false
  },
  lifetimes:{
    attached:function(){
      this.handleHeader(this.data.header)
    }
  },
  methods: {
    rpx2px(value){
      let sys=wx.getSystemInfoSync()
      return sys.windowWidth / 750 * value
    },
    getPx(value) {
      let val = parseInt(this.rpx2px(Number(value)))
      return val % 2 === 0 ? val : val + 1
    },
    getId(index) {
      return `${index}_tr_${Math.ceil(Math.random() * 10e5).toString(36)}`
    },
    handleHeader(header) {
      if (!header || header.length === 0) return;
      let vals = JSON.parse(JSON.stringify(header))
      if (this.data.selection) {
        vals.unshift({
          fixed: true,
          width: 100,
          type: 'selection'
        })
      }
      let winWidth = wx.getSystemInfoSync().windowWidth
      let width = 0,
        left = 0,
        right = 0;
      let len = vals.length
      vals.map((item, index) => {
        item.tdId = this.getId(index)
        item.width = this.getPx(item.width || 200)
        width += item.width
        if (item.fixed) {
          item.left = item.fixed !== 'right' ? left : 0;
          left += item.width
        }
        if (item.type === 3 && item.buttons) {
          item.buttons.map((btn, idx) => {
            btn.bId = this.getId(index)
          })
        }
        //空 默认排序，ascending-升序 descending-降序
        if (!item.sort) {
          item.sort = ''
        }
      })
      for (let i = 0; i < len; i++) {
        let item = vals[len - i - 1]
        if (item && item.fixed) {
          item.right = item.fixed === 'right' ? right : 0;
          right += item.width
        }
      }
      let gap = this.data.gap == 0 ? 0 : this.getPx(Number(this.data.gap) * 2)
      let totalW = width
      let totalWidth = winWidth - gap
      let maxWidth = width > totalWidth ? totalWidth : width
      let divideW = 0;
      if (this.data.full && totalWidth > maxWidth) {
       divideW = Math.floor((totalWidth - maxWidth) / len)
        let lastW = (totalWidth - maxWidth) % len
        let item = vals[len - 1]
        item.width += lastW
        let dw = divideW * len + lastW
        maxWidth += dw
        totalW += dw
      }
      this.setData({
        totalW:totalW,
        width:maxWidth,
        divideW:divideW,
        hData:vals
      })
    },
    handleData(vals) {
      if (!vals || vals.length === 0) return;
      let table = JSON.parse(JSON.stringify(vals))
      table.map(item => {
        item.is_disabled = item.is_disabled || false;
        item.is_selected = item.is_selected || false;
      })
      this.setData({
        tableData: table,
        initTableData:JSON.parse(JSON.stringify(table))
      })
      if (this.data.initEmitChange) {
        this.emitSelectionChange()
      }
    },
    handleTap(e) {
      let dataset=e.currentTarget.dataset;
      let index=Number(dataset.index)
      let idx=Number(dataset.idx)
      let item = this.data.tableData[index]
      this.triggerEvent('click', {
        item: item,
        index: index,
        buttonIndex: idx
      })
    },
    trClick(e) {
      let dataset=e.currentTarget.dataset;
      let index=Number(dataset.index)
      let item = this.data.tableData[index]
      this.triggerEvent('rowClick', {
        item: item,
        index: index
      })
    },
    selectionAll() {
      if (this.data.chkAll) {
        let data = this.data.tableData
        data.map(item => {
          if (!item.is_disabled) {
            item.is_selected = false
          }
        })
        this.setData({
          chkAll:false,
          tableData: data
        })
      } else {
        let data = this.data.tableData
        data.map(item => {
          if (!item.is_disabled) {
            item.is_selected = true
          }
        })
        this.setData({
          chkAll:true,
          tableData: data
        })

      }
      this.triggerEvent('selectAll', {
        is_selected: this.data.chkAll
      })
      setTimeout(() => {
        this.emitSelectionChange()
      }, 0)
    },
    emitSelectionChange() {
      const itemList = this.data.tableData.filter(item => item.is_selected === true && item.is_disabled !== true)
      let data = JSON.parse(JSON.stringify(itemList))
      data.forEach(item => {
        delete item.is_selected
        delete item.is_disabled
      })
      this.triggerEvent('selectionChange', {
        value: data
      })
    },
    checkSelectionAll() {
      if (!this.data.tableData || this.data.tableData.length === 0) return;
      const index = this.data.tableData.findIndex(item => item.is_selected === false && item.is_disabled !== true)
      if (~index) {
        this.setData({
          chkAll: false
        })
      } else {
        this.setData({
          chkAll: true
        })
      }
      setTimeout(() => {
        this.emitSelectionChange()
      }, 0)
    },
    selectionChangeView(e){
       const index = Number(e.currentTarget.dataset.index)
       this.selectionChange(index)
    },
    selectionChange(index, selected) {
      const data = this.data.tableData
      const item = data[index]
      if (item.is_disabled) return;
      if (selected === undefined || selected === null) {
        item.is_selected = !item.is_selected;
      } else {
        item.is_selected = selected;
      }
      this.setData({
        tableData: data
      })
      this.triggerEvent('select', {
        is_selected: item.is_selected,
        item: item,
        index: index
      })
      this.checkSelectionAll()
    },
    //用于多选表格，清空用户的选择
    clearSelection() {
      const data = this.data.tableData
      data.map(item => {
        if (!item.is_disabled) {
          item.is_selected = false
        }
      })
      this.setData({
        tableData:data,
        chkAll: false
      })
    },
    getRowIndex(row) {
      if (!row) return -1;
      const len = this.data.itemList.length;
      let index = -1;
      for (let i = 0; i < len; i++) {
        const item = this.data.itemList[i]
        if (JSON.stringify(item) === JSON.stringify(row)) {
          index = i;
          break;
        }
      }
      return index;
    },
    toggleRowSelection(row, selected) {
      const index = this.getRowIndex(row)
      if (index !== -1) {
        this.selectionChange(index, selected)
      }
    },
    toggleRowDisabled(row, disabled) {
      const index = this.getRowIndex(row)
      if (index !== -1) {
        const data = this.data.tableData
        const item = data[index]
        if (disabled === undefined || disabled === null) {
          item.is_disabled = !item.is_disabled;
        } else {
          item.is_disabled = disabled;
        }
        this.setData({
          tableData: data
        })
      }
    },
    //用于多选表格，切换所有行的选中状态（全选/取消）
    toggleAllSelection() {
      this.selectionAll()
    },
    handleTableSort(e){
        const index = Number(e.currentTarget.dataset.index)
        this.tableSort(index, false)
    },
    tableSort(index, sortOrder) {
      const tableData = this.data.tableData;
      if (!tableData || tableData.length === 0) return;
      const hData = this.data.hData;
      const item = hData[index]
      if (item.sortable) {
        // item.sortType='number/date/string'
        //ascending-升序 descending-降序
        let asc = false;
        if (sortOrder) {
          asc = sortOrder === 'ascending'
        } else {
          asc = !item.sort || item.sort === 'descending';
        }
        if (asc) {
          item.sort = 'ascending'
          if (item.sortType === 'number') {
            tableData.sort((a, b) => {
              return a[item.prop] - b[item.prop]
            });
          } else if (item.sortType === 'date') {
            tableData.sort((a, b) => {
              //日期格式字符串必须可以被转化为日期格式
              return new Date(a[item.prop].replace(/\-/g, '/')).getTime() - new Date(b[item.prop]
                .replace(/\-/g, '/')).getTime()
            });
          } else {
            tableData.sort((a, b) => {
              return a[item.prop].localeCompare(b[item.prop], 'zh-Hans-CN');
            });
          }
        } else {
          item.sort = 'descending'
          if (item.sortType === 'number') {
            tableData.sort((a, b) => {
              return b[item.prop] - a[item.prop]
            });
          } else if (item.sortType === 'date') {
            tableData.sort((a, b) => {
              //日期格式字符串必须可以被转化为日期格式
              return new Date(b[item.prop].replace(/\-/g, '/')).getTime() - new Date(a[item.prop]
                .replace(/\-/g, '/')).getTime()
            });
          } else {
            tableData.sort((a, b) => {
              return b[item.prop].localeCompare(a[item.prop], 'zh-Hans-CN');
            });
          }
        }
        hData.forEach((d, idx) => {
          if (index !== idx) {
            d.sort = ''
          }
        })
        this.setData({
          hData:hData,
          tableData: tableData
        })
        this.triggerEvent('sortChange', {
          itemList: tableData,
          sort: item.sort,
          prop: item.prop
        })
      }
    },
    //重置所有排序
    resetSort() {
      const hData = this.data.hData
      hData.forEach(item => {
        item.sort = ''
      })
      this.setData({
        hData:hData,
        tableData:JSON.parse(JSON.stringify(this.data.initTableData))
      })
    },
    //ascending-升序 descending-降序
    setSort(prop, sortOrder = 'ascending') {
      const index = this.data.hData.findIndex(item => item.prop === prop)
      if (index !== -1) {
        this.tableSort(index,sortOrder)
      }
    }
  }
})