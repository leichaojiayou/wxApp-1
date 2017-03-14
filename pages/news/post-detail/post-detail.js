var postData = require("../../../data/postData.js");
var app = getApp();
Page({
    data: {
        isPlayingMusic: false,
        shared:false
    },
    onLoad: function (options) {
        //获取文章详情数据
        var postID = options.id;
        this.data.nowID = postID;
        this.setData({
            postDetail: postData.postList[postID]
        })
        //读取\设置缓存记录文章收藏状态
        var postCollected = wx.getStorageSync("post-collected");
        if (postCollected) {
            var isCollected = postCollected[postID];
            this.setData({
                collected: isCollected
            })
        } else {
            var postCollected = {};
            postCollected[postID] = false;
            wx.setStorageSync('post-collected', postCollected);
        }
        if (app.globalData.g_isMusicPlaying) {
            this.setData({
                isPlayingMusic: true
            })
            // this.data.isPlayingMusic=true;
        }
        this.setMusicMonitor();
    },
    setMusicMonitor: function () {
        var that = this;
        wx.onBackgroundAudioPlay(function () {
            that.setData({
                isPlayingMusic: true
            });
            app.globalData.g_isMusicPlaying = true;
        })
        wx.onBackgroundAudioPause(function () {
            that.setData({
                isPlayingMusic: false
            });
            app.globalData.g_isMusicPlaying = false;
        })

    },
    collect: function () {
        var postCollected = wx.getStorageSync("post-collected");
        var isCollected = postCollected[this.data.nowID];
        isCollected = !isCollected;
        postCollected[this.data.nowID] = isCollected;
        wx.setStorageSync('post-collected', postCollected);
        this.setData({
            collected: isCollected
        })
        wx.showToast({
            title: isCollected ? "成功收藏" : "取消成功",
            duration: 1000
        })
    },
    //     onShareAppMessage: function () {
    //     return {
    //       title: '分享小程序',
    //       path: '/page/user?id=123'
    //     }
    //   }
    onMusicTap: function () {
        // console.log(this.data.nowID);
        var isPlayingMusic = this.data.isPlayingMusic;
        var musicDetail = postData.postList[this.data.nowID];
        // this.setData({
        //     musicDetail:postData.postList[this.data.nowID]
        // })
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            });
        } else {
            wx.playBackgroundAudio({
                dataUrl: musicDetail.music.url,
                title: musicDetail.music.title,
                coverImgUrl: musicDetail.music.coverImg
            });
            this.setData({
                isPlayingMusic: true
            });

        }
    },
    // onHide:function(){
    //     // this.setData({
    //     //      isPlayingMusic: false
    //     // })
    //     console.log("onHide")
    // },
    onUnload: function () {
        // this.setData({
        //      isPlayingMusic: false
        // })
        //当退出某篇文章(页面卸载)重置music图表样式
        app.globalData.g_isMusicPlaying = false;
        // console.log("onUnload")
    },
    onShareAppMessage: function (event) {
        return {
            title: postData.postList[this.data.nowID].title,
            path: '/page/user?id=' + this.data.nowID
        }
       console.log(event)
    },
    onShareTap: function(event) {
        var that=this;
        this.setData({
            shared:true
        });
        //TODO share分享功能不完善
        setTimeout(function(){
            that.setData({
                shared:false
            })
        },3000)
    },
})