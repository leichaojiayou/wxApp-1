// pages/movies/movie-more/movie-more.js
var app=getApp();
var util=require("../../../utils/util.js");
Page({
  data: {
    navigateTitle:'',
    movies:{},
    requestUrl:"",
    totalCount:0,
    isEmpty:true
  },
  onLoad: function (options) {
    var category = options.category;
    this.setData({
      navigateTitle:category
    })
    var dataUrl="";
    switch(category){
      case "正在热映":
      dataUrl=app.globalData.g_moviebase+"in_theaters";
      break;
      case "即将上映":
      dataUrl=app.globalData.g_moviebase+"coming_soon";
      break;
      case "豆瓣top250":
      dataUrl=app.globalData.g_moviebase+"top250";
      break;
    }
    util.Http(dataUrl,this.processMoviesData);
     this.setData({
       requestUrl:dataUrl
     })
  },
  onScrollMore:function(event){
    var nextUrl=this.data.requestUrl+"?start="+this.data.totalCount+"&count=20";
    util.Http(nextUrl,this.processMoviesData);
    console.log("加载更多");
  },
  processMoviesData:function(moviedata){
    var movies=[];
      for(var index in moviedata.subjects){
        var movieitem=moviedata.subjects[index];
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
      }
      var totalMovies={}
      if(!this.data.isEmpty){
        totalMovies=this.data.movies.concat(movies);
      }else{
        totalMovies=movies;
        this.data.isEmpty=false;
      }
      this.data.totalCount+=20;
       this.setData({
          movies:totalMovies
        })
       
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  }

})