var app=getApp();
var util=require("../../utils/util.js");
Page({
    data:{
      inTheaters:{},
      comingSoon:{},
      top250:{}
    },
    onLoad:function(){
        //var topurl="https://api.douban.com/v2/movie/top250";
        var top250Url=app.globalData.g_moviebase+"top250"+"?start=0&count=3";
        var inTheatersUrl=app.globalData.g_moviebase+"in_theaters"+"?start=0&count=3";
        var comingSoonUrl=app.globalData.g_moviebase+"coming_soon"+"?start=0&count=3";

        this.getMovieData(inTheatersUrl,"inTheaters","正在热映");
        this.getMovieData(comingSoonUrl,"comingSoon","即将上映");
        this.getMovieData(top250Url,"top250","豆瓣top250");
    },
    onMoreMovieTap:function(event){
      var category=event.currentTarget.dataset.category;
      wx.navigateTo({
        url:"movie-more/movie-more?category="+category
      })
    },
    getMovieData:function(url,settedkey,topTitle){
      var that=this;
      wx.request({
        url:url,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type":"application/x-www-form-urlencoded"
        }, 
        success: function(res){
          that.processMovieData(res.data.subjects,settedkey,topTitle);
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    },
    processMovieData:function(moviedata,settedkey,topTitle){
      var movies=[];
      for(var index in moviedata){
        var movieitem=moviedata[index];
        var title=movieitem.title;
        if(title.length>=6){
          title=title.substring(0,6)+"...";
        }
        var temp={
          title:title,
          average:movieitem.rating.average,
          coverImg:movieitem.images.large,
          movieId:movieitem.id,
          stars:util.convertToStarsArray(movieitem.rating.stars)
        }
        movies.push(temp);
        var readyData={};
        readyData[settedkey]={
          movies:movies,
          topTitle:topTitle
        }
        this.setData(readyData)
      }
    }
    

})