// components/palylist/playlist.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        playlist: {
            type: Object
        }
    },
    observers: {
        ['playlist.playCount'](val) {
            this.setData({
                op: this.__tranNumber(val, 2)
            })
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        op: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        __tranNumber(num, point) {
            let numStr = num.toString().split('.')[0]
            if (numStr.length < 6) {
                return numStr
            } else if (numStr.length >= 6 && numStr.length <= 8) {
                let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
                return parseFloat(parseInt(num / 10000) + "." + decimal) + "万"
            } else if (numStr.length >= 8) {
                let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
                return parseFloat(parseInt(num / 100000000) + '.' + decimal) + "亿"
            }
        },
        
    }
})