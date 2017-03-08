var postData=require("../../data/postData.js");

Page({
    data:{
    },
    onLoad:function(){
     this.setData({content:postData.postList})
    },
    onPostTap:function(event){
        var postID=event.currentTarget.dataset.postid;
        wx.navigateTo({
          url:"./post-detail/post-detail?id="+postID
        })
    }
})