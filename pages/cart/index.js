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
import {getSetting,openSetting,chooseAddress,showModal,showToast} from "../../utils/asyncWx";
import regeneratorRuntime from "../../lib/runtime/runtime"
import {setStorageAddress,getStorageAddress,setStorageCart,getStorageCart} from "../../utils/storage"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cartList:{},
    isAllChecked:false,
    totalPrice:0,
    totalNum:0,
    hasGoods:false
  },

// 获取收货地址
  async handleChooseAddress(){
    const res1 = await getSetting();
    const scopeAddress = res1.authSetting['scope.address']
    if(scopeAddress === true || scopeAddress === undefined){
    }else {
      await openSetting();
    }
      const res2 = await chooseAddress();
      res2.all = res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo;
      setStorageAddress(res2);
  },
  // 复选框状态改变事件
  handleChangeCheck(e){
    // 获取要修改的商品id
    const {key} = e.currentTarget.dataset;
    // 获取购物车数据
    let {cartList} = this.data;
    // 对当前商品勾选状态取反
    cartList[key].checked = !cartList[key].checked;
    // 把改变后的值存回data中
    this.setCart(cartList)
  },
  // 全选框状态改变事件
  handleCheckAll(e){
    let {isAllChecked,cartList} = this.data;
    isAllChecked = !isAllChecked;
    for (const key in cartList){
      if(cartList.hasOwnProperty(key)){
        cartList[key].checked = isAllChecked;
      }
    }
    this.setCart(cartList);
  },
  // 增加减少商品数量
  async handleChangeNum(e){
    let {cartList} = this.data;
    const {changenum,key} = e.currentTarget.dataset;
    // 如果当前数量为1并且点击的是减按钮，则执行删除判断
    if(cartList[key].num === 1 && changenum === -1){
      const res = await showModal({content:"确定要删除商品吗？"})
      if(res.confirm){
        delete cartList[key];
        this.setCart(cartList);
      }else {
        console.log("用户点击取消")
      }  
    }else {
      // 如果并非删除操作，则之久修改购物车数量并且默认勾选操作的商品
      cartList[key].num += changenum;
      cartList[key].checked = true;
      this.setCart(cartList);
    }
  },
  // 根据cart对象来计算总价格。。
  // 还需要把总价格设置到data中
  setCart(cartList){
     // 0 把对象转成数组 [].filter [].forEach ...
    // 把的对象中的值 提取出来 变成一个数组 
    let cartArr = Object.values(cartList);
    // 1 计算 全选 
    // every 会接收回调函数 数组循环的时候  这个回调函数都返回 true 
    // 那么 every 的返回值才是true 否则就是false 
    // let isAllChecked=cartArr.every(v=>v.checked);
    let isAllChecked = true;
    // 2 计算总的价格 
    let totalPrice = 0;
    // 计算购买的总数
    let totalNum = 0;
    cartArr.forEach(v=>{
      if(v.checked){
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      }else {
        isAllChecked = false;
      }
    })
    isAllChecked = cartArr.length === 0 ? false : isAllChecked;
    const hasGoods = cartArr.length ? true : false;
    this.setData({
      cartList,isAllChecked,totalPrice,totalNum,hasGoods
    })
    setStorageCart(cartList);
  },
  // 点击结算按钮
  handlePay(){
    if(!this.data.address.all){
      showToast({title:'请先添加收货地址'})
    }else if(this.data.totalNum <= 0){
      showToast({title:'没有要结算的商品哦'})
    }else {
      wx.navigateTo({
        url: '/pages/pay/index',
      });
        
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address = getStorageAddress() || {};
    const cartList = getStorageCart() || {};
    this.setData({
      address,
      cartList
    });
    this.setCart(cartList);
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