// pages/movies/movie-detail/movie-detail.js
var app = getApp();
var util = require("../../../utils/util.js");
Page({
  data: {
    movie:{},
    navigateTitle:""
  },
  onLoad: function (options) {
    var movieUrl = app.globalData.g_moviebase + "subject/" + options.id;
    console.log(options);
    util.Http(movieUrl, this.processMoviesData);
    this.setData({
      navigateTitle:options.name
    })
    wx.showNavigationBarLoading();
  },
  processMoviesData: function (moviedata) {
    // console.log(moviedata)
    if (!moviedata) {
      return;
    }
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (moviedata.directors[0] != null) {
      if (moviedata.directors[0].avatars != null) {
        director.avatar = moviedata.directors[0].avatars.large
      }
      director.name = moviedata.directors[0].name;
      director.id = moviedata.directors[0].id;
    }
    var movie = {
      movieImg: moviedata.images ? moviedata.images.large : "",
      country: moviedata.countries[0],
      title: moviedata.title,
      originalTitle: moviedata.original_title,
      wishCount: moviedata.wish_count,
      year: moviedata.year,
      generes: moviedata.genres.join("、"),
      stars: util.convertToStarsArray(moviedata.rating.stars),
      score: moviedata.rating.average,
      director: director,
      casts: util.convertToCastString(moviedata.casts),
      castsInfo: util.convertToCastInfos(moviedata.casts),
      summary: moviedata.summary
    }
    this.setData({
      movie:movie
    })
    wx.hideNavigationBarLoading();
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})