//Page Object
import {request} from "../../request/index.js"

Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 分类导航
    navCateList: [],
    // 楼层数组
    floorList: []
  },

  // 获取轮播图数据
  getSwiperData(){
    request({ url: "/home/swiperdata" })
    .then(result => {
      this.setData({
        swiperList:result
      })
    })
  },
  // 获取分类菜单数据
  getNavCateData(){
    request({url: "/home/catitems"})
    .then(result => {
      this.setData({
        navCateList:result
      })
    })
  },
  // 获取商品楼层详情数据
  getFloorData(){
    request({url: "/home/floordata"})
    .then(result => {
      this.setData({
        floorList:result
      })
    })
  },
  //options(Object)
  onLoad: function(options) {
    this.getSwiperData();
    this.getNavCateData();
    this.getFloorData();
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  
