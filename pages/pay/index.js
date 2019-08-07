/* 
1 给 收货地址按钮 添加点击事件 
  1 调用微信小程序自带 获取收货地址的api   wx.chooseAddress
  2 正常流程
    1 先调用 获取( wx.getSetting) 用户对小程序的授权的 接口 有返回值 scope  存放 用户对该应用的权限信息
    2 对权限scope 进行判断
      1 scope 可能是 undefined ： 用户从来没有点击过 收货地址按钮 
        1 直接获取用户的收货地址 
      2 scope 可能是 true ： 用户曾经给过应用 权限 
        1 直接获取用户的收货地址
      3 scope 可能是 false : 用户曾经点击 取消 授权
        1 先打开用户 授权页面(openSetting) 让用户自己 重新授权
        2 再去获取收货地址信息！！！
  3 把收货的地址信息 存入到本地存储中 方便获取 
    
 */
import {requestPayment,showToast} from "../../utils/asyncWx";
import regeneratorRuntime from "../../lib/runtime/runtime"
import {setStorageToken,getStorageToken,getStorageAddress,setStorageCart,getStorageCart} from "../../utils/storage"
import { request } from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cartList:{},
    totalPrice:0,
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address = getStorageAddress() || {};
    const cartList = getStorageCart() || {};
    let cartArr = Object.values(cartList);
    // 2 计算总的价格 
    let totalPrice = 0;
    // 计算购买的总数
    let totalNum = 0;
    cartArr.forEach(v=>{
      if(v.checked){
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      }
    })
    this.setData({
      address,
      cartList,
      totalPrice,
      totalNum
    });
  },

  async handlePay(){
    try{
      const {cartList} = this.data;
      const token = getStorageToken();
      if(!token){
        wx.navigateTo({
          url: '/pages/auth/index'
        });
      }else {
        const header = {Authorization:token};
        const order_price = this.data.totalPrice;
        const consignee_addr = this.data.address.all;
        let goods = [];
        for(let key in cartList){
          if(cartList.hasOwnProperty[key]){
            if(cartList[key].checked){
              goods.push({
                goods_id:cartList[key].goods_id,
                goods_number:cartList[key].num,
                goods_price:cartList[key].goods_price
              })
            }
          }
        }
        let orderParams = {order_price,consignee_addr,goods}
        const {order_number} = await request({url:"/my/orders/create",method:"POST",data:orderParams,header});
  
        const {pay} = await request({url:"/my/orders/req_unifiedorder",data:{order_number},method:"POST",header});
        const res = await requestPayment(pay);
        console.log(res);
  
        const payStatus = await request({url:"/my/orders/chkOrder",header,data:{order_number},method:"POST"})
        showToast({title:payStatus})
        // 支付完成要把商品从购物车删除
        // 思路：先获取商品的id也就是在cartList中的键,然后for in遍历对象，删除掉在cartList中key相同的
        wx.navigateTo({
          url: '/pages/order/index?type=3'
        });
          
      }
    } catch(error) {
      console.log(error);
      showToast({title:"支付失败"});
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})