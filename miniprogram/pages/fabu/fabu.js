// pages/fabu/fabu.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        gs:'',
        name:'',
        pic:'',
        src:'',
        zj:'',
        method:'musiclist',
    },
    selectMethod(){
        let that = this;
        wx.showActionSheet({
          itemList: ['musiclist','musiclist1','musiclist2','musiclist3','musiclist4'],
          success(e){
            that.setData({
              method :e.tapIndex == 0 ? 'musiclist' : e.tapIndex == 1 ? 'musiclist1' :e.tapIndex == 2 ? 'musiclist2' :e.tapIndex == 3 ?'musiclist3':'musiclist4'
            })
        }
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    loginForm: function (e) {
        // console.log(e)
        // console.log(this.data.method)
        this.setData({
            gs:e.detail.value.gs,
            name:e.detail.value.name,
            pic:e.detail.value.pic,
            src:e.detail.value.src,
            zj:e.detail.value.zj,
        })
        const db=wx.cloud.database()
        db.collection(this.data.method).add({
            data:{
                gs:e.detail.value.gs,
            name:e.detail.value.name,
            pic:e.detail.value.pic,
            src:e.detail.value.src,
            zj:e.detail.value.zj,
            },susses(res){
                console.log("提交成功",res);
               
            },fail(err){
                console.log("失败",err);
            }
        })
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