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
    },
    onChangeLyricShow(){
        this.setData({
            isLyricShow:!this.data.isLyricShow
        })
    },
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
        var lyric=" ";
        this.setData({
            lyric:this.sliceNull(this.parseLyric(music.gc))
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
    sliceNull: function (lrc) {

        var result = []
    
        for (var i = 0; i < lrc.length; i++) {
    
          if (lrc[i][1] == "") {
    
          } else {
    
            result.push(lrc[i]);
    
          }
    
        }
    
        return result
    
      },
    parseLyric: function (text) {

        //将文本分隔成一行一行，存入数组
    
        var lines = text.split('\n'),
    
          //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
    
          pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
    
          //保存最终结果的数组
    
          result = [];
    
        //去掉不含时间的行
    
        while (!pattern.test(lines[0])) {
    
          lines = lines.slice(1);
    
        };
    
        //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
    
        lines[lines.length - 1].length === 0 && lines.pop();
    
        lines.forEach(function (v /*数组元素值*/, i /*元素索引*/, a /*数组本身*/) {
    
          //提取出时间[xx:xx.xx]
    
          var time = v.match(pattern),
    
            //提取歌词
    
            value = v.replace(pattern, '');
    
          //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
    
          time.forEach(function (v1, i1, a1) {
    
            //去掉时间里的中括号得到xx:xx.xx
    
            var t = v1.slice(1, -1).split(':');
    
            //将结果压入最终数组
    
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
    
          });
    
        });
    
        //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    
        result.sort(function (a, b) {
    
          return a[0] - b[0];
    
        });
    
        return result;
    
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