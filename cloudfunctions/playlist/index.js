// 云函数入口文件
const cloud = require('wx-server-sdk')
    
cloud.init()
const db=cloud.database()
const rp=require('request-promise')
const URL='https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923'
// const URL='https://apis.imooc.com/personalized?icode=690E50C506FA87E7'

const playlistCollection=db.collection('playlist')
const MAX_LIMIT=10
// 云函数入口函数
exports.main = async (event, context) => {
    // const list=await playlistCollection.get()
    const countResult=await playlistCollection.count()
    const total=countResult.total
    const batchTimes=Math.ceil(total/ MAX_LIMIT)
    const tasks=[]
    for(let i=0;i<batchTimes;i++){
        let promise= playlistCollection.skip(i*MAX_LIMIT).limit(MAX_LIMIT).get()
        tasks.push(promise)
    }
    let list={data:[]}
    if(tasks.length>0){
       (await Promise.all(tasks)).reduce((acc,cur)=>{
           return{
               data:acc.data.concat(cur.data)
           }
       })
    }











    
    const playlist= await rp(URL).then((res)=>{
        return JSON.parse(res).songlist
    })
    console.log(playlist);
    const newData=[]
    for(let i=0,len1=playlist.length;i<len1;i++){
        let flag=true
        for(let j=0,len2=list.data.length;j<len2;j++){
            if(playlist[i].id===list.data[j].id){
                flag=false
                break
            }
        }
        if(flag){
            newData.push(playlist[i])
        }
    }
    for(let i=0,len=newData.length;i<len;i++){
        await playlistCollection.add({
            data:{
                ...newData[i],
                createTime:db.serverDate(),
            }
        }).then((res)=>{
            console.log('插入成功');
        }).catch((err)=>{
            console.error('插入失败');
        })
    }
    return newData.length}