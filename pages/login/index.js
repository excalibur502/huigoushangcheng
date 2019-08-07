// pages/login/index.js
import {setStorageUserInfo} from "../../utils/storage"
Page({
  handleGetUserInfo(e){
    const {userInfo} = e.detail;
    setStorageUserInfo(userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})