/* 
1 页面的动态渲染 
2 上滑页面  滚动条触底 加载下一页数据功能 
  1 页面触底事件  onReachBottom 
  2 先判断 有没有下一页数据
    1 当前的页码 pagenum  和 总页数 比较 
      总页数 = Math.ceil(总条数  / 页容量 )
      总页数 = Math.ceil(21/10)= 3 
        总条数 ：21 
        页容量：10  

      当前的页码 >= 总页数 没有下一页数据 否则就相反
  3 在 onReachBottom 进行判断有没有下一页数据
    1 有数据
      1 页码 pagenum++ 
      2 直接发送请求获取数据
      3 数据回来后 对商品数组进行拼接 而不是全部替换
3 下拉刷新
  1 用户往下滑动页面的时候 开启下拉刷新效果  
    页面的json文件 加入一个允许下拉属性
  2 找到下拉刷新事件  onPullDownRefresh
  3 重置
    1 重置页码 pagenum=1;
    2 重置商品数组 data中的商品数组 进行重置 []
    3 重新发送请求 
    4 数据请求回来后 手动关闭 页面的下拉刷新效果 
4 异步请求的正在等待效果
  1 正在等待的效果 代码如何写
  2 这段代码 放哪里 比较省事 
    1 请求发送前 显示等待效果
    2 请求成功后 就关闭 
    3 放在 request 方法内部 
5 接口的代码 用es 7 async方式
  1 脚手架工具 把js es6 编译成es5 babel来转 
  2 后期 学到小程序的第三方框架
    mpvue 自带脚手架工具 就会帮我编译 es7 -> es5 
  3 原生小程序代码 没有什么工具帮我们直接编译代码 
  4 提供一种方案 可以让在原生小程序中直接使用 es7 async 
    0 兼容性最好的方案 就是不要在原生小程序中 使用 es7的方法。。
    1 会在某些低版本的手机或者微信中 还是会报错
    2 经理 当前的原生代码在我的手机上运行没有问题，就可以直接使用了


 */
import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, title: "综合", isActive: true },
      { id: 1, title: "销量", isActive: false },
      { id: 2, title: "价格", isActive: false }
    ],
    goodsList:[]
  },
  queryParams:{
    query:'',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  goodsData:{},
  totalPage:1,
  // tabs组件的事件
  handleItemChange(e){
    const {index} = e.detail;    // 获取传递过来的索引

    let {tabs} = this.data;    // 获取tabs数组
    // 循环修改tabs数组
    tabs.forEach((v,i)=> i === index ? v.isActive = true : v.isActive = false);
    this.setData({tabs})
  },
  async getGoodsData(){
    const result = await request({url:"/goods/search", data:this.queryParams})
      this.goodsData = result;
      this.totalPage = Math.ceil(result.total/this.queryParams.pagesize);
      const goods = result.goods;
      goods.map(v=> (
        {cat_id:v.cat_id,goods_name:v.goods_name,goods_small_logo:v.goods_small_logo,goods_price:v.goods_price,goods_id:v.goods_id
      }))
      this.setData({
        goodsList:[...this.data.goodsList,...goods]
      });
      wx.stopPullDownRefresh();
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 先判断有没有下一页
    if(this.queryParams.pagenum >= this.totalPage) {
      // 没有下一页数据
      wx.showToast({
        title:"咩有下一页了哦,去看看其他商品吧",
        icon: "none",
        mask: true
      })
    }else {
      this.queryParams.pagenum++;
      this.getGoodsData();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid;
    this.getGoodsData();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.queryParams.pagenum = 1;
    this.setData({
      goodsList:[]
    })
    this.getGoodsData();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})