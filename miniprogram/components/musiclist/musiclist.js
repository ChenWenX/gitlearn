// components/musiclist.js
const app=getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        musiclist:Array
    },

    /**
     * 组件的初始数据
     */
    data: {
        playingId:-1
    },
    // pageLifetimes:{
    //     show(){
    //         this.setData({
    //             playingId:parseInt(app.getPlayMusicId())
    //         })
    //     }
    // },
    /**
     * 组件的方法列表
     */
    methods: {
        onSelect(event){
            // console.log(event)
            const ds=event.currentTarget.dataset
            const mid=ds.musicid
            // const musicid=ds.musicidthis.setData({
            //     playingId:musicid
            // })
            
            this.setData({
                playingId:mid
            })
            wx.navigateTo({
                url:`../../pages/bofang/bofang?playingId=${mid}&index=${ds.index}`,
            })
        }
    }
})
