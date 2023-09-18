// 本文件由FirstUI授权予闫弘宇（手机号：1 3  510   00 1  5 53，身份证尾号： 033  6 1 2）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
Component({
  properties: {
    width: {
      type: String,
      optionalTypes:[Number],
      value: 640
    },
    height: {
      type: String,
      optionalTypes:[Number],
      value: 320
    },
    fileList: {
      type: Array,
      value:[],
      observer(vals){
        this.initData(vals)
      }
    },
    max: {
      type: String,
      optionalTypes:[Number],
      value: 1
    },
    addColor: {
      type: String,
      value: '#333'
    },
    addSize: {
      type: String,
      optionalTypes:[Number],
      value: 88
    },
    background: {
      type: String,
      value: '#eee'
    },
    radius: {
      type: String,
      optionalTypes:[Number],
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
    isView: {
      type: Boolean,
      value: false
    },
    progressColor: {
      type: String,
      value: '#465CFF'
    },
    delColor: {
      type: String,
      value: '#eee'
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
    compressed: {
      type: Boolean,
      value: true
    },
    sourceType: {
      type: Array,
      value:['album', 'camera']
    },
    maxDuration: {
      type: Number,
      value: 60
    },
    camera: {
      type: String,
      value: 'back'
    },
    extension: {
      type: Array,
      value:[]
    },
    size: {
      type: String,
      optionalTypes:[Number],
      value: 20
    },
    name: {
      type: String,
      value: 'file'
    },
    header: {
      type: Object,
      value:{}
    },
    formData: {
      type: Object,
      value:{}
    },
    param: {
      type: String,
      optionalTypes:[Number],
      value: 0
    }
  },
  data: {
    urls: [],
    //preupload、uploading、success、error
    status: [],
    progress: []
  },
  lifetimes:{
    attached:function(){
      this.initData(this.data.fileList)
    }
  },
  methods: {
    initData(urls) {
      urls = urls || []
      this.setData({
        status:[],
        progress:[]
      },()=>{
        let status = [];
        let progress = [];
        urls.forEach(item => {
          status.push('success')
          progress.push(100)
        })
        this.setData({
          urls:[...urls],
          status:status,
          progress:progress
        })
      })
    },
    reUpload(e) {
      const index = Number(e.currentTarget.dataset.index)
      if (this.data.progress[index] !== -99) return;
      this.data.status[index]='uploading';
      if (this.data.callUpload) {
        this.triggerEvent('reupload', {
          index
        })
      } else{
        this.data.progress[index] = 0
        this.setData({
          status:this.data.status,
          progress:this.data.progress
        })
        this.uploadVideo(index, this.data.urls[index]).then((res) => {
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
        status = ~this.data.status.indexOf('uploading') ? 'uploading' : 'success';
        if (status !== 'uploading' && ~this.data.status.indexOf("error")){
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
      this.setData({
        [`urls[${index}]`]:url
      },()=>{
        this.onComplete('upload')
      })
    },
    toast(text) {
      text && wx.showToast({
        title: text,
        icon: "none"
      });
    },
    chooseVideo() {
      wx.chooseVideo({
        sourceType: this.data.sourceType,
        compressed: this.data.compressed,
        maxDuration: this.data.maxDuration,
        camera: this.data.camera,
        success: (e) => {
          const path = e.tempFilePath
          if (this.data.extension.length > 0) {
            const format = path.split(".")[(path.split(".")).length - 1];
            if (format && this.data.extension.indexOf(format) == -1) {
              let text = `只能上传 ${this.data.extension.join(',')} 格式视频！`
              this.toast(text);
              return;
            }
          }
          if (Number(this.data.size) * 1024 * 1024 < e.size) {
            let err = `单个视频大小不能超过：${this.data.size}MB`
            this.toast(err);
            return;
          }
          this.data.urls.push(path)
          this.data.status.push(this.data.immediate ? 'uploading' : 'preupload')
          this.data.progress.push(this.data.immediate ? 0 : -1)
          this.setData({
            urls: this.data.urls,
            status:this.data.status,
            progress:this.data.progress
          })
          this.onComplete('choose')
          if (this.data.immediate) {
            this.uploadVideo(this.data.urls.length - 1, path).then((res) => {
              this._success(res)
            }).catch((res) => {
              this._error(res)
            })
          }
        }
      })
    },
    uploadVideo(index, videoUrl, url) {
      return new Promise((resolve, reject) => {
        const uploadTask = wx.uploadFile({
          url: this.data.url || url,
          name: this.data.name,
          header: this.data.header,
          formData: this.data.formData,
          filePath: videoUrl,
          success: (res) => {
            if (res.statusCode === 200) {
              this.data.status[index]='success'
              this.data.progress[index]=100
              this.setData({
                status:this.data.status,
                progress:this.data.progress
              })
              resolve({
                res,
                index
              })
            } else {
              this.data.status[index]='error'
              this.data.progress[index]=-99
              this.setData({
                status:this.data.status,
                progress:this.data.progress
              })
              reject({
                res,
                index
              })
            }
          },
          fail: (res) => {
            this.data.status[index]='error'
            this.data.progress[index]=-99
            this.setData({
              status:this.data.status,
              progress:this.data.progress
            })
            reject({
              res,
              index
            })
          }
        })
        uploadTask.onProgressUpdate((res) => {
          this.data.progress[index]=res.progress
          this.setData({
            progress:this.data.progress
          })
        });
      })
    },
    deleteVideo(e) {
      const index = Number(e.currentTarget.dataset.index)
      let status = this.getStatus()
      if (status === 'uploading') {
        this.toast('请等待上传结束再进行删除！')
      } else {
        if (this.data.confirmDel) {
          let _this = this
          wx.showModal({
            content: '确定将该视频删除吗？',
            showCancel: true,
            confirmText: "确定",
            success(res) {
              if (res.confirm) {
                _this.data.urls.splice(index, 1)
                _this.data.status.splice(index, 1)
                _this.data.progress.splice(index, 1)
                _this.setData({
                  urls:_this.data.urls,
                  status:_this.data.status,
                  progress:_this.data.progress
                })
                _this.onComplete('delete')
              }
            }
          })
        } else {
          this.data.urls.splice(index, 1)
          this.data.status.splice(index, 1)
          this.data.progress.splice(index, 1)
          this.setData({
            urls:this.data.urls,
            status:this.data.status,
            progress:this.data.progress
          })
          this.onComplete('delete')
        }
      }
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
          this.data.status[i]='uploading'
          this.data.progress[i]=0
          this.setData({
            status:this.data.status,
            progress:this.data.progress
          })
          this.uploadVideo(i, urls[i], this.data.url).then(res => {
            this._success(res)
          }).catch(error => {
            this._error(error)
          })
        }
      }
    },
    setProgress(progress, index) {
      let value=`progress[${index}]`
      this.setData({
        [value]:progress
      })
    },
    upload(callback, index) {
      // 传入一个返回Promise的文件上传的函数
      //V1.9.8+，新增此方法主要为了更好的扩展使用
      let urls = [...this.data.urls]
      if (index === undefined || index === null) {
        const len = urls.length
        for (let i = 0; i < len; i++) {
          if (urls[i].startsWith('https')) {
            continue;
          } else {
            let stus = `status[${i}]`
            let value = `progress[${i}]`
            this.setData({
              [stus]:'uploading',
              [value]:0
            })
            if (typeof callback === 'function') {
              callback(urls[i], i).then(res => {
                this.setData({
                  [stus]:'success',
                  [value]:100
                })
                this.result(res, i)
              }).catch(err => {
                this.setData({
                  [stus]:'error',
                  [value]:-99
                })
              })
            }
          }
        }
      } else {
        //如果传入index，则是重新上传时调用
        let stus = `status[${index}]`
        let value = `progress[${index}]`
        this.setData({
          [stus]:'uploading',
          [value]:0
        })
        if (typeof callback === 'function') {
          callback(urls[index], index).then(res => {
            this.setData({
              [stus]:'success',
              [value]:100
            })
            this.result(res, index)
          }).catch(err => {
            this.setData({
              [stus]:'error',
              [value]:-99
            })
          })
        }
      }
    }
  }
})