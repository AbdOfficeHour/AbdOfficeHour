// 本文件由FirstUI授权予闫弘宇（手机号： 1     35 10001 5  53，身份证尾号： 0 3  36 12）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    width: {
      type: String,
      optionalTypes: [Number],
      value: 200
    },
    height: {
      type: String,
      optionalTypes: [Number],
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
      type: String,
      optionalTypes: [Number],
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
    addSize: {
      type: String,
      optionalTypes: [Number],
      value: 88
    },
    background: {
      type: String,
      value: '#eee'
    },
    radius: {
      type: String,
      optionalTypes: [Number],
      value: 0
    },
    borderColor: {
      type: String,
      value: ''
    },
    //solid、dashed、dotted
    borderSytle: {
      type: String,
      value: 'solid'
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
    //V1.9.8+ 是否调用upload 方法进行上传操作
    callUpload: {
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
    tempFiles: [],
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
      let tempFiles = []
      urls.forEach(item => {
        status.push('success')
        tempFiles.push({
          path: item
        })
      })
      this.setData({
        urls,
        status,
        tempFiles
      })
    },
    reUpload(e) {
      let index = Number(e.currentTarget.dataset.index)
      let value = `status[${index}]`
      this.setData({
        [value]: 'uploading'
      })
      if (this.data.callUpload) {
        this.triggerEvent('reupload', {
          index
        })
      } else {
        this.uploadImage(index, this.data.urls[index]).then((res) => {
          this._success(res)
        }).catch((res) => {
          this._error(res)
        })
      }
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
          let tempFiles=[]
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
            tempFiles.push(e.tempFiles[i])
            status.push(this.data.immediate ? 'uploading' : 'preupload')
          }
          this.setData({
            urls: this.data.urls.concat(urls),
            tempFiles: this.data.tempFiles.concat(tempFiles),
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
                let tempFiles=[..._this.data.tempFiles]
                urls.splice(index, 1)
                status.splice(index, 1)
                tempFiles.splice(index, 1)
                _this.setData({
                  urls: urls,
                  tempFiles:tempFiles,
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
          let tempFiles=[...this.data.tempFiles]
          urls.splice(index, 1)
          status.splice(index, 1)
          tempFiles.splice(index, 1)
          this.setData({
            urls: urls,
            tempFiles:tempFiles,
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
    },
    upload(callback, index) {
      // 传入一个返回Promise的文件上传的函数
      //V1.9.8+，新增此方法主要为了更好的扩展使用
      if (index === undefined || index === null) {
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
            if (typeof callback === 'function') {
              callback(this.data.tempFiles[i]).then(res => {
                this.setData({
                  [value]: "success"
                })
                this.result(res, i)
              }).catch(err => {
                this.setData({
                  [value]: "error"
                })
              })
            }
          }
        }
      } else {
        //如果传入index，则是重新上传时调用
        if (typeof callback === 'function') {
          let value = `status[${index}]`
          this.setData({
            [value]: "uploading"
          })
          callback(this.data.tempFiles[index]).then(res => {
            this.setData({
              [value]: "success"
            })
            this.result(res, index)
          }).catch(err => {
            this.setData({
              [value]: "error"
            })
          })
        }
      }
    }
  }
})