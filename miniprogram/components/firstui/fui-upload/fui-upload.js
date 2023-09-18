// 本文件由FirstUI授权予杨方安（手机号： 1     89  386315 9 3，身份证尾号： 1 8  493 1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    width: {
      type: Number,
      optionalTypes: [String],
      value: 200
    },
    height: {
      type: Number,
      optionalTypes: [String],
      value: 200
    },
    fileList: {
      type: Array,
      value: [],
      observer(vals) {
        this.initData(vals)
      }
    },
    max: {
      type: Number,
      optionalTypes: [String],
      value: 9
    },
    isAdd: {
      type: Boolean,
      value: true
    },
    addColor: {
      type: String,
      value: '#333'
    },
    background: {
      type: String,
      value: '#eee'
    },
    custom:{
      type: Boolean,
      value: false
    },
    isDel: {
      type: Boolean,
      value: true
    },
    delColor: {
      type: String,
      value: 'rgba(0,0,0,.6)'
    },
    confirmDel: {
      type: Boolean,
      value: false
    },
    url: {
      type: String,
      value: ''
    },
    immediate: {
      type: Boolean,
      value: false
    },
    sizeType: {
      type: Array,
      value: ['original', 'compressed']
    },
    sourceType: {
      type: Array,
      value: ['album', 'camera']
    },
    suffix: {
      type: Array,
      value: []
    },
    size: {
      type: Number,
      optionalTypes: [String],
      value: 4
    },
    name: {
      type: String,
      value: 'file'
    },
    header: {
      type: Object,
      value: {}
    },
    formData: {
      type: Object,
      value: {}
    },
    param: {
      type: Number,
      optionalTypes: [String],
      value: 0
    }
  },
  data: {
    urls: [],
    //preupload、uploading、success、error
    status: []
  },
  lifetimes: {
    attached: function () {
      this.initData(this.data.fileList)
    }
  },
  methods: {
    initData(urls) {
      urls = urls || []
      let status = [];
      urls.forEach(item => {
        status.push('success')
      })
      this.setData({
        urls:urls,
        status: status
      })
    },
    reUpload(e) {
      let index = Number(e.currentTarget.dataset.index)
      let value = `status[${index}]`
      this.setData({
        [value]: 'uploading'
      })
      this.uploadImage(index, this.data.urls[index]).then((res) => {
        this._success(res)
      }).catch((res) => {
        this._error(res)
      })
    },
    getStatus() {
      if (this.data.status.length === 0) return '';
      let status = 'preupload';
      if (this.data.status.indexOf('preupload') === -1) {
        status = ~this.data.status.indexOf('uploading') ? 'uploading' : 'success'
        if (status !== 'uploading' && ~this.data.status.indexOf("error")) {
          // 上传失败
          status = 'error'
        }
      }
      return status
    },
    onComplete(action) {
      let status = this.getStatus()
      this.triggerEvent('complete', {
        status: status,
        urls: this.data.urls,
        action: action,
        param: this.data.param
      })
    },
    _success(res) {
      let status = this.getStatus()
      this.triggerEvent('success', {
        status: status,
        ...res,
        param: this.data.param
      })
    },
    _error(res) {
      let status = this.getStatus()
      this.triggerEvent('error', {
        status: status,
        ...res,
        param: this.data.param
      })
    },
    result(url, index) {
      if (!url || index === undefined) return;
      let uv = `urls[${index}]`
      this.setData({
        [uv]: url
      }, () => {
        this.onComplete('upload')
      })
    },
    toast(text) {
      text && wx.showToast({
        title: text,
        icon: "none"
      });
    },
    chooseImage() {
      let max = Number(this.data.max)
      wx.chooseImage({
        count: max === -1 ? 9 : max - this.data.urls.length,
        sizeType: this.data.sizeType,
        sourceType: this.data.sourceType,
        success: (e) => {
          let imageArr = [];
          let urls = []
          let status = []
          for (let i = 0; i < e.tempFiles.length; i++) {
            let len = this.data.urls.length;
            if (len >= max && max !== -1) {
              this.toast(`最多可上传${max}张图片`);
              break;
            }
            //过滤图片类型
            let path = e.tempFiles[i].path;

            if (this.data.suffix.length > 0) {
              let format = path.split(".")[(path.split(".")).length - 1];
              if (this.data.suffix.indexOf(format) == -1) {
                let text = `只能上传 ${this.data.suffix.join(',')} 格式图片！`
                this.toast(text);
                continue;
              }
            }

            //过滤超出大小限制图片
            let size = e.tempFiles[i].size;
            if (Number(this.data.size) * 1024 * 1024 < size) {
              let err = `单张图片大小不能超过：${this.data.size}MB`
              this.toast(err);
              continue;
            }
            imageArr.push(path)
            urls.push(path)
            status.push(this.data.immediate ? 'uploading' : 'preupload')
          }
          this.setData({
            urls: this.data.urls.concat(urls),
            status: this.data.status.concat(status)
          }, () => {
            this.onComplete('choose')
            let start = this.data.urls.length - imageArr.length
            if (this.data.immediate) {
              for (let j = 0; j < imageArr.length; j++) {
                let index = start + j
                this.uploadImage(index, imageArr[j]).then((res) => {
                  this._success(res)
                }).catch((res) => {
                  this._error(res)
                })
              }
            }
          })
        }
      })
    },
    uploadImage(index, imgUrl, url) {
      let value = `status[${index}]`
      return new Promise((resolve, reject) => {
        wx.uploadFile({
          url: this.data.url || url,
          name: this.data.name,
          header: this.data.header,
          formData: this.data.formData,
          filePath: imgUrl,
          success: (res) => {
            if (res.statusCode === 200) {
              this.setData({
                [value]: 'success'
              })
              resolve({
                res,
                index
              })
            } else {
              this.setData({
                [value]: 'error'
              })
              reject({
                res,
                index
              })
            }
          },
          fail: (res) => {
            this.setData({
              [value]: 'error'
            })
            reject({
              res,
              index
            })
          }
        })
      })
    },
    deleteImage(e) {
      let index = Number(e.currentTarget.dataset.index)
      let status = this.getStatus()
      if (status === 'uploading') {
        this.toast('请等待上传结束再进行删除！')
      } else {
        if (this.data.confirmDel) {
          let _this = this
          wx.showModal({
            content: '确定将该图片删除吗？',
            showCancel: true,
            confirmText: "确定",
            success(res) {
              if (res.confirm) {
                let urls = [..._this.data.urls]
                let status = [..._this.data.status]
                urls.splice(index, 1)
                status.splice(index, 1)
                _this.setData({
                  urls: urls,
                  status: status
                }, () => {
                  _this.onComplete('delete')
                })
              }
            }
          })

        } else {
          let urls = [...this.data.urls]
          let status = [...this.data.status]
          urls.splice(index, 1)
          status.splice(index, 1)
          this.setData({
            urls: urls,
            status: status
          }, () => {
            this.onComplete('delete')
          })
        }
      }
    },
    previewImage(e) {
      let index = Number(e.currentTarget.dataset.index)
      if (this.data.status.length === 0) return;
      wx.previewImage({
        current: this.data.urls[index],
        loop: true,
        urls: this.data.urls
      })
      this.triggerEvent('preview', {
        index: index,
        urls: this.data.urls
      })
    },
    start() {
      if (!this.data.url) {
        this.toast('请传入服务器接口地址！');
        return;
      }
      let urls = [...this.data.urls]
      const len = urls.length
      for (let i = 0; i < len; i++) {
        if (urls[i].startsWith('https')) {
          continue;
        } else {
          let value = `status[${i}]`
          this.setData({
            [value]: "uploading"
          })
          this.uploadImage(i, urls[i], this.data.url).then(res => {
            this._success(res)
          }).catch(error => {
            this._error(error)
          })
        }
      }
    }
  }
})