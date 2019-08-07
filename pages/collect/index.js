// pages/collect/index.js
import {getStorageCollect} from "../../utils/storage"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, title: "收藏的店铺", isActive: false },
      { id: 1, title: "收藏的商品", isActive: true },
      { id: 2, title: "关注的分类", isActive: false },
      { id: 3, title: "我的足迹", isActive: false }
    ],
    goodsList:[],
    isHidden:false
  },
  handleItemChange(e){
    const {index} = e.detail;
    const {tabs} = this.data;
    tabs.forEach(e=>e.id===index?e.isActive=true:e.isActive=false)
    this.setData({tabs});
  },
  // 收藏夹应有删除功能，待做，样式待美化
  onShow(){
    let goodsList = getStorageCollect()||[];
    let isHidden
    this.setData({goodsList});
    if(goodsList.length > 0){
      isHidden = true;
    }else {
      isHidden = false;
    }
    this.setData({isHidden})
  }
})