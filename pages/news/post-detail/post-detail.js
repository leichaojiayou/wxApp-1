var postData=require("../../../data/postData.js");
Page({
    data:{

    },
    onLoad:function(options){
        //获取文章详情数据
        var postID=options.id;
        this.data.nowID=postID;
        this.setData({
            postDetail:postData.postList[postID]
        })
        //读取\设置缓存记录文章收藏状态
        var postCollected=wx.getStorageSync("post-collected");
        if(postCollected){
            var isCollected=postCollected[postID];
            this.setData({
                collected:isCollected
            })
        }else{
            var postCollected={};
            postCollected[postID]=false;
            wx.setStorageSync('post-collected', postCollected);
        }
        
    },
    collect:function(){
        var postCollected=wx.getStorageSync("post-collected");
        var isCollected=postCollected[this.data.nowID];
        isCollected=!isCollected;
        postCollected[this.data.nowID]=isCollected;
        wx.setStorageSync('post-collected',postCollected);
        this.setData({
            collected:isCollected
        })
    }
})