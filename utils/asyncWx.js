/**
 * promise 形式的wx.getSetting 获取授权信息
 */
export const getSetting = ()=> {
    return new Promise((resolve,reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        })  
    })
}
/**
 * promise 形式的wx.openSetting 打开授权页面
 */
export const openSetting =() => {
    return new Promise((resolve,reject)=> {
        wx.openSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
          
    })
}
/**
 * promise 形式的wx.chooseAddress 获取收货地址
 */
export const chooseAddress = () =>{
    return new Promise((resolve,reject)=> {
        wx.chooseAddress({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
          
    })
}

/**
 * promise 形式的wx.showModal 对话框
 * @param {object} content 要传递的参数
 */
export const showModal = ({content,title}) => {
    return new Promise((resolve,reject) => {
        wx.showModal({
            title: title||'提示',
            content: content,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              resolve(result);
            }
        });
          
    })
}

/**
 * promise 形式的wx.showToast 提示框
 * @param {object} title 要传递的参数
 */
export const showToast = ({title,icon})=> {
    return new Promise((resolve,reject) => {
        wx.showToast({
            title,
            icon: icon||"none",
            duration: 1500,
            mask: true,
            success: (result) => {
                resolve(result);
            }
        });
          
    })
}

/**
 * promise 形式的wx.login 
 */
export const login = () => {
    return new Promise((resolve,reject) => {
        wx.login({
            timeout:10000,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err);
            }
        });
          
    })
}

/**
 * 调用小程序内置的支付（真的会扣钱！）
 * @param {object} pay 微信支付必须的参数
 */
export const requestPayment = (pay) => {
    return new Promise((resolve,reject) => {
        wx.requestPayment({
            ...pay,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err);
            }
        });
          
    })
}