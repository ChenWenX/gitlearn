// components/progress-bar.js
let movableAreaWidth = 0
let movableViewWidth = 0
const BackgroundAudioManager = wx.getBackgroundAudioManager()
let currentSec = -1
let duration = 0
let isMoving=false
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        showTime: {
            currentTime: '00:00',
            totalTime: '00:00',
        },
        movabeDis: 0,
        progress: 0,
    },
    lifetimes: {
        ready() {
            this._getMovableDis()
            this._bindBGMevent()
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onchange(event) {
            // console.log(event)
            if (event.detail.source == 'touch') {
                this.data.progress = event.detail.x / (movableAreaWidth - movableViewWidth) * 100
                this.data.movabeDis = event.detail.x
                isMoving=true
            }
        },
        onTouchEnd() {
            const currentTimeFmt = this._dateFormat * (Math.floor(BackgroundAudioManager.currentTime))
            this.setData({
                progress: this.data.progress,
                movabeDis: this.data.movabeDis,
                ['showTime.currentTime']: currentTimeFmt + ':' + currentTimeFmt.sec
            })
            BackgroundAudioManager.seek(duration * this.data.progress / 100)
            isMoving=false
        },
        _getMovableDis() {
            const query = this.createSelectorQuery()
            query.select('.movable-area').boundingClientRect()
            query.select('.movable-view').boundingClientRect()
            query.exec((rect) => {
                // console.log(rect)
                movableAreaWidth = rect[0].width
                movableViewWidth = rect[1].width
            })
        },
        _bindBGMevent() {
            BackgroundAudioManager.onPlay(() => {
                console.log('onPlay')
                isMoving=false
            })
            BackgroundAudioManager.onStop(() => {
                console.log('onStop')
            })
            BackgroundAudioManager.onPause(() => {
                console.log('Pause')
            })
            BackgroundAudioManager.onWaiting(() => {
                console.log('onWaiting')
            })
            BackgroundAudioManager.onCanplay(() => {
                console.log('onCanplay')
                console.log(BackgroundAudioManager.duration)
                if (typeof BackgroundAudioManager.duration != 'undefined') {
                    this._setTime()
                } else {
                    setTimeout(() => {
                        this._setTime()
                    }, 1000)
                }
            })
            BackgroundAudioManager.onTimeUpdate(() => {
                // console.log('onTimeUpdate')
                
                if(!isMoving){
                    const currentTime = BackgroundAudioManager.currentTime
                const duration = BackgroundAudioManager.duration
                const sec = currentTime.toString().split('.')[0]
                if (sec != currentSec) {
                    // console.log(currentTime)
                    const currentTimeFmt = this._dateFormat(currentTime)
                    this.setData({
                        movabeDis: (movableAreaWidth - movableViewWidth) * currentTime / duration,
                        progress: currentTime / duration * 100,
                        ['showTime.currentTime']: `${currentTimeFmt.min}:${currentTimeFmt.sec}`,
                    })
                }
                    currentSec = currentTime.toString().split(".")[0]
                }

            })
            BackgroundAudioManager.onEnded(() => {
                console.log('onEnded')
                this.triggerEvent('musicEnd')
            })
            BackgroundAudioManager.onError((res) => {
                console.error(res.errMsg)
                console.error(res.errCode)
                wx.showToast({
                    title: '错误：' + res.errCode,
                })
            })
        },
        _setTime() {
            duration = BackgroundAudioManager.duration
            // console.log(duration)
            const durationFmy = this._dateFormat(duration)
            // console.log(durationFmy)
            this.setData({
                ['showTime.totalTime']: `${durationFmy.min}:${durationFmy.sec}`
            })

        },
        _dateFormat(sec) {
            const min = Math.floor(sec / 60)
            sec = Math.floor(sec % 60)
            return {
                'min': this._parse0(min),
                'sec': this._parse0(sec)
            }
        },
        _parse0(sec) {
            return sec < 10 ? '0' + sec : sec
        }
    }
})