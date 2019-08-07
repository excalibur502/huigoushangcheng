/* 
1 onLoad 通过形参获取url上的参数
2 onShow 无法通过 形参获取url上的参数
 */
import {request} from "../../request/index"
import {getStorageToken} from "../../utils/storage"
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, title: "全部", isActive: true },
      { id: 1, title: "待付款", isActive: false },
      { id: 2, title: "待发货", isActive: false },
      { id: 3, title: "退款/退货", isActive: false }
    ],
    orderList:[]
  },
  // onload获取url中的type参数，这里使用页面栈获取，所以屏蔽
  // type:-1,
  handleItemChange(e){
    const {index} = e.detail;
    this.changeTitleByIndex(index);
    let type = index+1;
    this.getOrderList(type);
  },

  async getOrderList(type){
    const token = getStorageToken();
    const {orders} = await request({url:"/my/orders/all",
    header:{Authorization:token},data:{type}})
    orders.forEach(e=> {
      e.newdate = (new Date(e.create_time*1000)).toLocaleString();
    })
    this.setData({
      orderList:orders
    })
  },
  changeTitleByIndex(index){
    const {tabs} = this.data;
    tabs.forEach(v=>v.id === index ? v.isActive=true : v.isActive=false )
    this.setData({tabs})
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    /* 
    1 在小程序中 存在页面栈(数组)概念  最多只能打开10个页面 
      越晚打开的页面索引越大 
    2 可以获取到页面数组
    3 就可以拿到最晚的打开的页面 == 当前页面 
    4 当获取到页面 对象！！ 有一个属性 options 
     */

    //  0 判断有没有token
    const token = getStorageToken();
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
        return
    }
    // 获取页面传递过来的type对象，动态获取订单数据，可以在onload中获取，再传递到onshow中，也可以使用页面栈直接获取
    // console.log(this.type)
    let pagesList =  getCurrentPages();
    const currentPages = pagesList[pagesList.length-1];
    const {type} = currentPages.options;
    console.log(type)
      
    this.getOrderList(type);
    let index = type-1;
    this.changeTitleByIndex(index);
  },
  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
    // this.type = options.type;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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