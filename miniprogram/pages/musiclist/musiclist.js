// const { log } = require("console")

// pages/musiclist/musiclist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        musiclist: [],
        listInfo: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.clearStorage()
        // console.log(options.index)
        // let index=options.index
        let that=this
        let a=options.musicid
        wx.showLoading({
            title: '加载中',
        }),
        wx.cloud.database().collection('playlist').where({
            _id:a,
        }).get({
            success(res){
                // console.log(res)
                that.setData({
                    listInfo:res.data,
                    // musiclist:res.data
                })
            }
        })
            
        wx.cloud.callFunction({
            name: 'musiclist',
        }).then((res) => {
            this.setData({
                musiclist: res.result.data
            })
            this._setMusicLoadlist()
            wx.stopPullDownRefresh()
            wx.hideLoading()
        })
    //     wx.cloud.callFunction({
    //         name : "music",
    //         data:{
    //             start:0,
    //             count:2,
    //             $url:'playlist'
    //         }
    //     }).then((res) => {
    //         // console.log(res.result.data)
    //         this.setData({
    //             listInfo: res.result.data
    //         })
    //         
    //         wx.stopPullDownRefresh()
    //         wx.hideLoading()
    //     })
    },
    _setMusicLoadlist(){
        wx.setStorageSync('musiclist', this.data.musiclist)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})