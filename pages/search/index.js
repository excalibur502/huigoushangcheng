import regeneratorRuntime from "../../lib/runtime/runtime"
import {request} from '../../request/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    value:'',
    isShow:false
  },
  timeId:-1,
   handleSearchInput(e){
     this.setData({isShow:true});
    console.log(this.data.value)
    const {value} = e.detail;
    if(!value.trim()){
      return;
    }
    clearTimeout(this.timeId);
    this.timeId = setTimeout(()=>{
      this.getQuery(value);
    },1500)
  },
  async getQuery(query) {
    const goodsList = await request({url:"/goods/qsearch",data:{query} })
      this.setData({goodsList});
    console.log(this.data.goodsList)
  },
  handleCancel(){
    this.setData({
      value:'',
      isShow:false,
      goodsList:[]
    })
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