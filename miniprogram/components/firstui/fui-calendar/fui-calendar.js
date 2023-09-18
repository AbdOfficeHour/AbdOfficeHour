// 本文件由FirstUI授权予闫弘宇（手机号：  1    35100  01  553，身份证尾号：0  3 3 61 2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import lunar from './index.js';
Component({
  properties: {
    type: {
      type: Number,
      optionalTypes: [String],
      value: 1
    },
    value: {
      type: Array,
      optionalTypes: [String],
      value: []
    },
    //v2.0.0+ 最多可选天数，type=2 || type=3有效
    maxDays: {
      type: Number,
      optionalTypes: [String],
      value: -1
    },
    minDate: {
      type: String,
      value: '2010-01-01'
    },
    maxDate: {
      type: String,
      value: '2030-12-31'
    },
    showLunar: {
      type: Boolean,
      value: false
    },
    language: {
      type: String,
      value: 'cn',
      observer(val) {
        this.setLang(val);
      }
    },
    isMultiple: {
      type: Boolean,
      value: true,
      observer(val){
        if (!val && this.data.monthArr.length > 0) {
          this.setData({
            singleMonth: this.data.monthArr[this.data.month - 1]
          })
				}
      }
    },
    vertical: {
      type: Boolean,
      value: true
    },
    width: {
      type: Number,
      optionalTypes: [String],
      value: 0,
      observer(val) {
        this.getWidth(val)
      }
    },
    background: {
      type: String,
      value: '#FFFFFF'
    },
    name: {
      type: String,
      value: 'roundright-fill'
    },
    arrowSize: {
      type: Number,
      optionalTypes: [String],
      value: 40
    },
    arrowColor: {
      type: String,
      value: '#7F7F7F'
    },
    yearsWidth: {
      type: Number,
      optionalTypes: [String],
      value: 200
    },
    yearsSize: {
      type: Number,
      optionalTypes: [String],
      value: 32
    },
    yearsColor: {
      type: String,
      value: '#181818'
    },
    titleColor: {
      type: String,
      value: '#181818'
    },
    lineColor: {
      type: String,
      value: '#EEEEEE'
    },
    color: {
      type: String,
      value: '#181818'
    },
    activeColor: {
      type: String,
      value: '#FFFFFF'
    },
    //选中日期背景色
    activeBackground: {
      type: String,
      value: '#465CFF'
    },
    rangeColor: {
      type: String,
      value: '#465CFF'
    },
    rangeBackground: {
      type: String,
      value: '#F1F4FA'
    },
    start: {
      type: String,
      value: '开始'
    },
    end: {
      type: String,
      value: '结束'
    },
    isToday: {
      type: Boolean,
      value: true
    },
    disabled: {
      type: Boolean,
      value: false
    },
    showBtn: {
      type: Boolean,
      value: false
    },
    btnText: {
      type: String,
      value: '确定'
    },
    btnBackground: {
      type: String,
      value: '#465CFF'
    },
    btnColor: {
      type: String,
      value: '#FFFFFF'
    }
  },
  data: {
    lang: [],
    header: [],
    monthArr: [],
    singleMonth: {
      weekdayArr: [],
      daysArr: []
    },
    descrArr:[],
    dateWidth: '100%',
    title: '',
    year: 0,
    month: 1,
    today: '',
    minArr: [],
    maxArr: [],
    values: [],
    defCurrent: 0,
    btnDisabled: false,
    itemWidth: '14.2857%'
  },
  lifetimes: {
    attached: function () {
      this.setLang(this.data.language);
      this.getWidth(this.data.width)
      this.init();
      this._btnDisabled(this.data.values);
    }
  },
  observers: {
    'values': function (vals) {
      this._btnDisabled(vals);
    },
    'type,minDate,maxDate,value,showLunar': function (type, minDate, maxDate, value, showLunar) {
      this.init();
    },
    'title':function(val){
      if (this.data.year === 0) return;
      this.setData({
        descrArr:[]
      })
      this.triggerEvent('dateChange', {
        year: this.data.year,
        month: this.data.month
      })
    }
  },
  methods: {
    _btnDisabled(vals) {
      if (this.data.type == 3 && vals.length < 2) {
        this.setData({
          btnDisabled: true
        })
      } else {
        this.setData({
          btnDisabled: false
        })
      }
    },
    setLang(val) {
      this.setData({
        header: lunar.lang[`h_${val}`] || lunar.lang.h_cn
      })
      this.setTitle()
    },
    rpx2px(value) {
      let sys = wx.getSystemInfoSync()
      return sys.windowWidth / 750 * value
    },
    getWidth(val) {
      //宽度值不宜太低
      let dw = Number(val);
      if (dw && dw >= 600) {
        dw = this.rpx2px(dw) + 'px'
      } else {
        dw = '100%'
      }
      this.setData({
        dateWidth: dw
      })
    },
    swiperChange(e) {
      let current = e.detail.current
      let month = current + 1
      let title = this.data.language === 'en' ? `${lunar.lang.m_en[month-1]} ${this.data.year}` :
        `${this.data.year}年${month}月`;
      this.setData({
        title: title,
        month: month
      })
    },
    getLunar(month, day) {
      let obj = lunar.solarTolunar(this.data.year, month, day);
      return obj.IDayCn;
    },
    initDate(date) {
      if (!date || date === true || date === 'true') return '';
      let fdate = date.replace(/\-/g, '/').split('/');
      return [Number(fdate[0] || -1), Number(fdate[1] || -1), Number(fdate[2] || -1)]
    },
    formatNum(num) {
      num = Number(num)
      return num < 10 ? '0' + Math.abs(num) : num + '';
    },
    compareDate(arr) {
      if (!arr && arr.length === 0) return -1;
      let timestamp = []
      let indexs = {}
      arr.forEach((item, index) => {
        let d = item.replace(/\-/g, '/');
        d = `${d} 00:00:00`
        let stamp = new Date(d).getTime()
        timestamp.push(stamp)
        indexs[stamp.toString()] = index
      })
      let newArr = []
      while (timestamp.length > 0) {
        let min = Math.min(...timestamp)
        let index = indexs[min.toString()]
        newArr.push(arr[index])
        timestamp.splice(timestamp.indexOf(min), 1)
      }
      return newArr;
    },
    toArray(start, end) {
      return Array.from(new Array(end + 1).keys()).slice(start);
    },
    getMonthDay(year, month) {
      let days = new Date(year, month, 0).getDate();
      return days;
    },
    getWeekday(year, month) {
      let date = new Date(`${year}/${month}/01 00:00:00`);
      return date.getDay();
    },
    _isSection(date, start, end) {
      let ts = new Date(date.replace(/\-/g, '/')).getTime();
      let s = new Date(start.replace(/\-/g, '/')).getTime();
      let e = new Date(end.replace(/\-/g, '/')).getTime();
      return ts > s && ts < e;
    },
    getColor(index, idx, values) {
      let color = this.data.color;
      if (!values || values.length === 0) return color;
      let month = this.formatNum(index + 1);
      let day = this.formatNum(idx + 1);
      let date = `${this.data.year}-${month}-${day}`
      let type = this.data.type;
      if (type == 3) {
        if (~values.indexOf(date)) {
          color = this.data.activeColor
        } else if (values[1] && this._isSection(date, values[0], values[1])) {
          color = this.data.rangeColor
        }
      } else {
        if (~values.indexOf(date)) {
          color = this.data.activeColor
        }
      }
      return color
    },
    getBackground(index, idx, values) {
      let background = 'transparent';
      if (!values || values.length === 0) return background;
      let month = this.formatNum(index + 1);
      let day = this.formatNum(idx + 1);
      let date = `${this.data.year}-${month}-${day}`
      let type = this.data.type;
      if (type == 3) {
        if (~values.indexOf(date)) {
          background = this.data.activeBackground
        } else if (values[1] && this._isSection(date, values[0], values[1])) {
          background = this.data.rangeBackground
        }
      } else {
        if (~values.indexOf(date)) {
          background = this.data.activeBackground
        }
      }
      return background
    },
    getText(index, idx) {
      let month = index + 1
      let day = idx + 1
      let text = '';
      let date = `${this.data.year}-${this.formatNum(month)}-${this.formatNum(day)}`;
      if (this.data.type == 3) {
        let values = this.data.values
        if (values.length > 0) {
          if (values[0] == date && values[0] != values[1]) {
            let st = this.data.start;
            text = st && st !== 'true' && st !== true ? st : '';
          } else if (values[1] == date) {
            let et = this.data.end;
            text = et && et !== 'true' && et !== true ? et : '';
          }
        }
      }
      if (!text) {
        text = this.data.showLunar ? this.getLunar(month, day) : ''
        if (this.data.isToday) {
          //今天 简繁同体
          let td = this.data.language === 'en' ? 'Today' : '今天'
          text = this.data.today === date ? td : text
        }
      }
      return text;
    },
    _isRadius(index, idx, start) {
      let radius = this.data.type != 3 ? true : false;
      if (this.data.type == 3 && this.data.values && this.data.values.length > 0) {
        let month = index + 1
        let day = idx + 1
        let date = `${this.data.year}-${this.formatNum(month)}-${this.formatNum(day)}`;
        if (start) {
          radius = date === this.data.values[0]
        } else {
          radius = date === this.data.values[1]
        }
      }
      return radius;
    },
    getMonthsArr(year) {
      let monthArr = []
      let showLunar = this.data.showLunar;
      for (let i = 0; i < 12; i++) {
        let month = i + 1;
        let daysArr = this.toArray(1, this.getMonthDay(year, month));
        let weekdayArr = this.toArray(1, this.getWeekday(year, month));
        weekdayArr = weekdayArr.map(item => {
          return `week_${i}_${item}`
        })
        daysArr = daysArr.map(item => {
          let lunarText = showLunar ? this.getLunar(month, item) : ''
          return {
            text: lunarText,
            value: item
          }
        })
        monthArr.push({
          key: `m_${month}`,
          weekdayArr,
          daysArr
        })
      }
      return monthArr
    },
    _isDisAbled(index, idx) {
      let bool = false;
      let date = `${this.data.year}/${index+1}/${idx+1}`;
      let min = this.data.minArr.join('/')
      let max = this.data.maxArr.join('/')
      let ts = new Date(date).getTime();
      if (ts < new Date(min).getTime() || ts > new Date(max).getTime()) {
        bool = true;
      }
      return bool;
    },
    setTitle() {
      if(this.data.year===0) return;
      let title = this.data.language === 'en' ? `${lunar.lang.m_en[this.data.month-1]} ${this.data.year}` :
        `${this.data.year}年${this.data.month}月`
      this.setData({
        title: title
      })
    },
    init() {
      const now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      this.setData({
        minArr: this.initDate(this.data.minDate) || [2010, 1, 1],
        maxArr: this.initDate(this.data.maxDate) || [2030, 12, 31],
        today: `${year}-${this.formatNum(month)}-${this.formatNum(day)}`
      })
      let value = this.data.value;
      let def = [-1]
      if (value && value.length > 0) {
        if (typeof value === 'string') {
          def = this.initDate(value) || [-1, -1, -1]
          value = [value]
        } else {
          const len = value.length
          if (len > 1) {
            value = this.compareDate(value)
          }
          if (this.data.type == 3 && value.length > 2) {
            value = [value[0], value[1]]
          }
          def = this.initDate(value[len - 1]) || [-1, -1, -1]
          if (def[0] !== -1) {
            year = def[0]
            month = def[1]
          }
        }
        value = value.map(item => {
          let arr = this.initDate(item)
          return `${arr[0]}-${this.formatNum(arr[1])}-${this.formatNum(arr[2])}`
        })
        this.setData({
          values: value
        })
      } else {
        this.data.year = year;
        if (this._isDisAbled(month - 1, day - 1)) {
          year = this.data.maxArr[0]
          month = this.data.maxArr[1]
        }
      }
      this.setData({
        year: year,
        month: month,
        monthArr: this.getMonthsArr(year)
      }, () => {
        if (!this.data.isMultiple) {
          this.setData({
            singleMonth:this.data.monthArr[month - 1]
          })
				} else {
          setTimeout(() => {
            this.setData({
              defCurrent: month - 1
            })
          }, 20)
				}
      })
      this.setTitle()
    },
    checkYear(year) {
      if (year < this.data.minArr[0] || year > this.data.maxArr[0]) {
        wx.showToast({
          title: '日期已超出可切换范围！',
          icon: 'none'
        });
        return false;
      }
      return true;
    },
    changeMonth(e) {
      let num = Number(e.currentTarget.dataset.index)
      let month = num + this.data.month;
      let year = 0;
      if (num > 0) {
        year = month > 12 ? this.data.year + 1 : this.data.year;
        month = month > 12 ? 1 : month;
      } else {
        year = month < 1 ? this.data.year - 1 : this.data.year;
        month = month < 1 ? 12 : month;
      }
      if (this.checkYear(year)) {
        this.setData({
          month:month,
          year:year,
          monthArr:this.getMonthsArr(year)
        },()=>{
          this.setTitle();
          this.setData({
            singleMonth:this.data.monthArr[this.data.month - 1]
          })
        })
      }
    },
    changeYear(e) {
      let num = Number(e.currentTarget.dataset.index)
      let year = num + this.data.year;
      if (this.checkYear(year)) {
        const monthArr = this.getMonthsArr(year);
					if (this.data.isMultiple) {
            this.setData({
              year: year,
              month: 1,
              defCurrent: 0,
              monthArr: monthArr
            })
					}else{
            this.setData({
              year: year,
              monthArr: monthArr,
              singleMonth: monthArr[this.data.month - 1]
            })
          }
        this.setTitle();
      }
    },
    getWeekText(date) {
      date = new Date(`${date.replace(/\-/g, '/')} 00:00:00`);
      let week = date.getDay();
      //英文
      let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      if (this.data.language === 'en') {
        weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      }
      return weeks[week];
    },
    dateClick(e) {
      let dataset = e.currentTarget.dataset
      let index = Number(dataset.index)
      let day = Number(dataset.sub)
      if (this.data.disabled) return;
      if (!this._isDisAbled(index, day - 1)) {
        let month = this.formatNum(index + 1);
        let date = `${this.data.year}-${month}-${this.formatNum(day)}`;
        let type = this.data.type;
        let values = [...this.data.values]
        if (type == 3) {
          let start = values[0]
          let sts = -1;
          if (start) {
            sts = new Date(start.replace(/\-/g, '/')).getTime()
          }
          let ets = new Date(date.replace(/\-/g, '/')).getTime()
          if (start && values.length === 1 && sts <= ets) {
            const dateMax = `${date} 23:59:59`
            const etsMill = new Date(dateMax.replace(/\-/g, '/')).getTime()
            const diff = etsMill - sts
            const diffDays = Math.ceil(diff / 1000 / 60 / 60 / 24)
            const maxDays = Number(this.data.maxDays)
            if ((maxDays && maxDays > 0 && diffDays > maxDays) || maxDays === 0) {
              wx.showToast({
                title: `最多可选${maxDays}天，当前已超出可选范围`,
                icon: 'none'
              });
              return;
            }
            values.push(date)
          } else {
            values = [date]
          }
        } else {
          let idx = values.indexOf(date)
          if (idx != -1) {
            values.splice(idx, 1)
          } else {
            const maxDays = Number(this.data.maxDays)
            if ((maxDays && maxDays > 0 && values.length >= maxDays) || maxDays === 0) {
              wx.showToast({
                title: `最多可选${maxDays}天`,
                icon: 'none'
              });
              return;
            }
            if (type == 2) {
              values.push(date)
            } else {
              values = [date]
            }
          }
        }
        this.setData({
          values: values
        }, () => {
          if (!this.data.showBtn) {
            this._change()
          }
        })
      }
    },
    _change() {
      let values = this.data.values
      let type = this.data.type;
      if (type == 3 && values.length < 2) return;
      let value = '';
      let week = '';
      let lunarArr = {};
      if (type == 1) {
        value = values[0] || ''
        if (value) {
          week = this.getWeekText(value)
          if (this.data.showLunar && this.data.language !== 'en') {
            let d = this.initDate(value)
            lunarArr = lunar.solarTolunar(d[0], d[1], d[2]);
          }
        }
      } else {
        value = values
        week = [];
        lunarArr = []
        value.forEach(item => {
          week.push(this.getWeekText(item))
          if (this.data.showLunar && this.data.language !== 'en') {
            let d = this.initDate(item)
            lunarArr.push(lunar.solarTolunar(d[0], d[1], d[2]))
          }
        })
      }

      this.triggerEvent('change', {
        value: value,
        week: week,
        today: this.data.today,
        lunar: lunarArr
      })
    },
    handleClick() {
      if (this.data.btnDisabled) return;
      this._change()
    },
    // 传入一个返回Promise的函数，设置当前日历数据描述
    //返回当前日历数据
    setDescr(callback) {
      const item = this.data.monthArr[this.data.month - 1]
      if (item && callback && typeof callback === 'function') {
        callback(this.data.year, this.data.month, item.daysArr).then(res => {
          this.setData({
            descrArr: res
          })
        }).catch(err => {
          this.setData({
            descrArr:[]
          })
        })
      }
    }
  }
})