
/**
 * 获取缓存中的地址信息
 */
export const setStorageAddress = (obj) => {
    wx.setStorageSync("address", obj)
  }

/**
 * 把地址信息 存入到缓存中
 * @param {object} address 要存入的购物车对象
 */
export const getStorageAddress = () => {
    return wx.getStorageSync("address")    
}

/**
 * 设置分类商品数据到本地存储中
 * @param {Object} obj 要填充的数据
 */
export const setStorageCates = (obj) => {
    wx.setStorageSync("cates", obj)
}

/**
 * 获取本地存储中的分类商品数据
 */
export const getStorageCates = () => {
    return wx.getStorageSync("cates")    
}

/**
 * 把购物车存入到缓存中
 * @param {object} cart 要存入的购物车对象
 */
export const setStorageCart = (obj) => {
    wx.setStorageSync("cart", obj) 
}

/**
 * 获取缓存中的购物车数据
 */
export const getStorageCart = () => {
    return wx.getStorageSync("cart")
}

/**
 * 把 token 存入到缓存中
 * @param {object} token 要存入的token
 */
export const setStorageToken = (token) => {
    return wx.setStorageSync("token", token);
      
}

/**
 * 获取缓存中的token
 */
export const getStorageToken = () => {
    return wx.getStorageSync("token");
  }

  /**
 * 把 用户信息 存入到缓存中
 * @param {object} userinfo 要存入的 用户信息
 */
export const setStorageUserInfo = (userinfo) => {
    return wx.setStorageSync("userinfo", userinfo);
}

/**
 * 获取缓存中的userinfo
 */
export const getStorageUserInfo = () => {
    return wx.getStorageSync("userinfo");
  }

    /**
 * 把 收藏信息 存入到缓存中
 * @param {object} collect 要存入的 用户信息
 */
export const setStorageCollect = (collect) => {
    return wx.setStorageSync("collect", collect);
}

/**
 * 获取缓存中的收藏信息
 */
export const getStorageCollect = () => {
    return wx.getStorageSync("collect");
  }