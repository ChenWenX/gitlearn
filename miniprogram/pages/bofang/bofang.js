// pages/bofang/bofang.js
let musiclist = []
let nowPlayingIndex = 0
const BackgroundAudioManager = wx.getBackgroundAudioManager()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        musiclist: [],
        picUrl: '',
        isPlaying: false,
        isLyricShow:false,
        lyric:" nkinoi"
    },
    onChangeLyricShow(){
        this.setData({
            isLyricShow:!this.data.isLyricShow,
            // pl:this.data.isLyricShow
        })
    },
    // onChangeLyricShowp(){
    //     this.setData({
    //         isLyricShow:!this.data.isLyricShow,
    //     })
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options)
        nowPlayingIndex = options.index
        musiclist = wx.getStorageSync('musiclist')
        this._loadMusicDetail()
        // console.log(options.gc)
    },
    _loadMusicDetail() {
        BackgroundAudioManager.stop()
        let music = musiclist[nowPlayingIndex]
        // console.log(music.gc)
        BackgroundAudioManager.src = music.src
        BackgroundAudioManager.title = music.name
        BackgroundAudioManager.coverImgUrl = music.pic
        BackgroundAudioManager.singer = music.gs
        BackgroundAudioManager.epname = music.zj
        wx.setNavigationBarTitle({
            title: music.name,
        })
        this.setData({
            picUrl: music.pic,
            isPlaying: true
        })
        wx.hideLoading()
        
        this.setData({
            lyric:music.gc
        })
        // if(music.gc){
        //     lyric=music.gc
        // }
        // wx.cloud.callFunction({
        //     name:'music',
        //     data:{
        //         $url:'lyric',
        //     }
        // }).then((res)=>{
        //     console.log(res)
        //     
            // const lrc=JSON.parse(res.result).lrc
            // if(lrc){
            //     lyric=lrc.lyric
            // }
        //     this.setData({
        //         lyric
        //     })
        // })
        // wx.cloud.database().collection()
        
    },
 

    toggleplaying() {
        if (this.data.isPlaying) {
            BackgroundAudioManager.pause()
        } else {
            BackgroundAudioManager.play()
        }
        this.setData({
            isPlaying: !this.data.isPlaying
        })
    },
    onprev() {
        nowPlayingIndex--
        if (nowPlayingIndex < 0) {
            nowPlayingIndex = musiclist.length - 1
        }
        this._loadMusicDetail()
    },
    onNext() {
        nowPlayingIndex++
        if (nowPlayingIndex > musiclist.length - 1) {
            nowPlayingIndex = 0
        }
        this._loadMusicDetail()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})