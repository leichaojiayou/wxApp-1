var postData=require("../../data/postData.js");

Page({
    data:{
        content:[]
    },
    onLoad:function(){
    //  this.data.content=postData.postList;
    // console.log(this.data.content)
     this.setData({content:postData.postList})
     //console.log(this.data.content)
    }
})