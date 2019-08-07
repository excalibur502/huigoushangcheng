import {getStorageUserInfo,getStorageCollect} from "../../utils/storage"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    // 收藏的商品的数量
    collectLength:0
  },

 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = getStorageUserInfo();
    if(!userInfo){
      wx.navigateTo({
        url: '/pages/login/index'
      });
      return;
    }
    const collect = getStorageCollect()||[];
    this.setData({
      userInfo,
      collectLength:collect.length
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})