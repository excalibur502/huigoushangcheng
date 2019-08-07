/* 
1 获取用户信息 button的功能来获取 
 */
import {login,showToast} from "../../utils/asyncWx"
import regeneratorRuntime from "../../lib/runtime/runtime"
import {getStorageToken, setStorageToken} from "../../utils/storage"
import {request} from "../../request/index"

// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleGetUserInfo(e){
    const {encryptedData,errMsg,rawData,signature,iv} = e.detail
    const {code} = await login();
    const postParams = {encryptedData,errMsg,rawData,signature,iv,code}
    const {token} = await request({url:"/users/wxlogin",method:"POST",data:postParams});
    setStorageToken(token);
    if(getStorageToken()){
      showToast({title:"授权成功"})
      console.log(getStorageToken())
      wx.navigateBack({
        delta: 1
      });
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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