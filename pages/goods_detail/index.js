/* 
1 点击轮播图图片 放大预览
  1 绑定点击事件
  2 调用微信内置  wx.preivewimage
2 点击 加入购物车 
  1 思考好 购物车的数据如何存储 格式是怎么样  存本地存储中！！
    {
      华为的商品id:华为的商品信息,
      小米的商品id:小米的商品信息。。。
    }
  2 先获取本地存储中的购物车对象 || {}  cart
  3 给购物车对象 添加新属性和值
    cart.height=100;
    goodsid
    cart.100=200;
    cart[goodsid]=200;
  4 给本地存储 填写进去即可！！
3 修改商品详情 富文本中的图片格式
    1 获取到的数据 图片格式 webp
    2 有些iphone手机不支持
    3 最好的解决方式 是让后台统一修改
    4 但是后台 暂时改变了
    5 我们前端可以暂时先处理
    6 替换字符串的方式 来把 *.webp格式 统一修改为 *.jpg的格式
      1 前提是 后台 已经存在不同格式的图片
        1.webp 1.png 1.jpg 
 */
import {request} from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime"
import {setStorageCart,getStorageCart,getStorageCollect,setStorageCollect} from '../../utils/storage';
import {showToast} from "../../utils/asyncWx"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo:{},
    // 是否收藏
    isCollect:false
  },
  // 全局的商品对象
  goodsDetail:{},

  async getGoodsDetail(goods_id){
    const result = await request({url:"/goods/detail",data: {goods_id}});
    this.goodsDetail = result;
    let collect = getStorageCollect()||[];
    const isCollect = collect.some(v=>v.goods_id === this.goodsDetail.goods_id)
    this.setData({
      goodsInfo:{
        goods_name:result.goods_name,
        goods_price:result.goods_price,
        goods_introduce:result.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics:result.pics
      },
      isCollect
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsDetail(options.goods_id);
  },
// 浏览大图
  handleImage(e){
    const {index} = e.currentTarget.dataset;
    const urls = this.goodsDetail.pics.map(v=> v.pics_big);
    const current = urls[index];
    wx.previewImage({
      current,
      urls
    });
  },
  // 点击收藏
  handleCollect(){
    let collect = getStorageCollect()||[];
    let index = collect.findIndex(v=>v.goods_id === this.goodsDetail.goods_id );
    if(index === -1){
      collect.push(this.goodsDetail);
      showToast({title:"收藏成功",icon:"success"});
      this.setData({
        isCollect:true
      })
    }else {
      collect.splice(index,1);
      showToast({title:"取消成功",icon:"success"});
      this.setData({
        isCollect:false
      })
    }
    
    setStorageCollect(collect);
  },
// 加入购物车
  handleAddCart(){
     // 1 获取本地存储中的购物车对象
    let cart = getStorageCart() || {};
// 2 判断当前的商品是否已经购买
    if(cart[this.goodsDetail.goods_id]){
       // 2.1 已经存在旧数据
      cart[this.goodsDetail.goods_id].num++;
    } else {
        // 2.2 第一次添加
      cart[this.goodsDetail.goods_id] = this.goodsDetail;
      cart[this.goodsDetail.goods_id].num = 1;
      cart[this.goodsDetail.goods_id].checked = true;
    }
    // 3 把数据存入到本地存储中
    setStorageCart(cart);
    // 弹出提示
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
       // 遮罩层 蒙版
      //  mask：true 但是用户 点击 按钮的时候没有反应！！
      mask:true
    });
      
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