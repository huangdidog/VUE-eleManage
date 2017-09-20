/* 登录 */
export const loginApp = async (item) => {
  try {
    let response = await fetch('http://cangdu.org:8001/admin/login',{
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      cache: "force-cache",
      mode: "cors",
    });
    let data = await response.json();
    return data;
  }catch(e) {
    console.log("Oops, error", e);
  }
}

/*获取今日api*/
export const getToDayApi = async (date) => {
	try {
	    let response = await fetch('http://cangdu.org:8001/statis/api/'+date+'/count');
	    let data = await response.json()
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);

    let response = await fetch('http://cangdu.org:8001/statis/api/'+date+'/count');
    let data = await response.json()
    return data;
	}
}

/*获取今日新用户*/
export const getNewUser = async (date) => {
	try {
	    let response = await fetch('http://cangdu.org:8001/statis/user/'+date+'/count');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}

/*获取今日新订单*/
export const getNewOrder = async (date) => {
	try {
	    let response = await fetch('http://cangdu.org:8001/statis/order/'+date+'/count');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}

/*获取今日新管理员*/
export const getNewAdmin = async (date) => {
	try {
	    let response = await fetch('http://cangdu.org:8001/statis/admin/'+date+'/count');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}



/*总api*/
export const getApi = async () => {
	try {
	    let response = await fetch('http://cangdu.org:8001/statis/api/count');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}
/*用户总量*/
export const getUser = async () => {
	try {
	    let response = await fetch('http://cangdu.org:8001/v1/users/count');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}
/*总订单*/
export const getOrder = async () => {
	try {
	    let response = await fetch('http://cangdu.org:8001/bos/orders/count');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}
/*总管理员*/
export const getAdmin = async () => {
	try {
	    let response = await fetch('http://cangdu.org:8001/admin/count');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}






/*获取用户列表*/
export const getUserList = async (start,end) => {
	try {
	    let response = await fetch('http://cangdu.org:8001/v1/users/list?offset='+start+'&limit='+end+'');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}

/*获取所选城市信息*/
export const getCity = async (id) => {
	try {
	    let response = await fetch('http://cangdu.org:8001/v1/cities/'+id);
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}


/*获取商家列表*/
export const getShopList = async (latitude,longitude,start,end) => {
	try {
	    let response = await fetch('http://cangdu.org:8001/shopping/restaurants?latitude='+latitude+'&longitude='+longitude+'&offset='+start+'&limit='+end+'');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}
/*获取餐馆数量*/

export const getShops = async () => {
	try {
	    let response = await fetch('http://cangdu.org:8001/shopping/restaurants/count');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}
/*删除餐馆*/

export const delShop = async (id) => {
	try {
	    let response = await fetch('http://cangdu.org:8001/shopping/restaurant/:'+id+'');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}

/*获取食品列表*/



export const getFoods = async (id,start,end) => {
	try {
	    let response = await fetch('http://cangdu.org:8001/shopping/v2/foods?offset='+start+'&limit='+end+'&restaurant_id='+undefined+'');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}

/*获取食品数量*/

export const getFoodsCount = async () => {
	try {
	    let response = await fetch('http://cangdu.org:8001/shopping/v2/foods/count');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}

/*获取订单列表*/

export const getOrderList = async (start,end) => {
	try {
	    let response = await fetch('http://cangdu.org:8001/bos/orders?offset='+start+'&limit='+end+'');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}

/*获取用户信息*/
export const getUserInfo = async (id) => {
	try {
	    let response = await fetch('http://cangdu.org:8001/v1/user/'+id+'');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}

/*获取地址*/
export const getAddressInfo = async (id) => {
	try {
	    let response = await fetch('http://cangdu.org:8001/v1/addresse/'+id+'');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}

/*获取订单详情*/
export const getOrderInfo = async (uid,oid) => {
	try {
	    let response = await fetch('http://cangdu.org:8001/bos/v1/users/'+uid+'/orders/'+oid+'/snapshot');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}

/*获取商家详情*/
export const getShopInfo = async (id) => {
	try {
	    let response = await fetch('http://cangdu.org:8001/shopping/restaurant/'+id+'');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}

/*获取所有订单数量*/

export const getOrderCount = async () => {
	try {
	    let response = await fetch('http://cangdu.org:8001/bos/orders/count');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}


/*获取管理员列表*/
export const getAdminList = async (start,end) => {
	try {
	    let response = await fetch('http://cangdu.org:8001/admin/all?offset='+start+'&limit='+end+'');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}
/*获取管理员数量*/

export const getAdminCount = async () => {
	try {
	    let response = await fetch('http://cangdu.org:8001/admin/count');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}


/*获取用户分布信息*/
export const getUserDis = async () => {
	try {
	    let response = await fetch('http://cangdu.org:8001/v1/user/city/count');
	    let data = await response.json()
	    // console.log(data.count);
	    return data;
	}catch(e) {
	    console.log("Oops, error", e);
	}
}


/* 添加食品 */
export const addNewFood = async (item) => {
  try {
    let response = await fetch('http://cangdu.org:8001/shopping/addfood',{
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      cache: "force-cache",
      mode: "cors",
    });
    let data = await response.json();
    return data;
  }catch(e) {
    console.log("Oops, error", e);
  }
}

/* 获取食品种类 */
export const getCategory = async (formID) => {
  try {
    let response = await fetch('http://cangdu.org:8001/shopping/getcategory/' + formID);
    let data = await response.json()
    return data;
  }catch(e) {
    console.log("Oops, error", e);
  }
}

/* 添加新食品种类 */
export const addCategory = async (item) => {
  try {
    let response = await fetch('http://cangdu.org:8001/shopping/addcategory',{
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      cache: "force-cache",
      mode: "cors",
    });
    let data = await response.json();
    return data;
  }catch(e) {
    console.log("Oops, error", e);
  }
}

/* 获取所在城市 */
export const getGuessCity = async () => {
  try {
    let response = await fetch('http://cangdu.org:8001/v1/cities?type=guess');
    let data = await response.json()
    return data;
  } catch (e) {
    console.log("Oops, error", e);
  }
}

/* 获取所有商铺分类列表 */
export const getCategoryLists = async () => {
  try {
    let response = await fetch('http://cangdu.org:8001/shopping/v2/restaurant/category');
    let data = await response.json()
    return data;
  } catch (e) {
    console.log("Oops, error", e);
  }
}

/* 获取搜索列表 */
export const getCitySearchLists = async (id, queryString) => {
  try {
    let response = await fetch('http://cangdu.org:8001/v1/pois?city_id='+ id +'&keyword='+ queryString +'&type=search');
    let data = await response.json()
    return data;
  } catch (e) {
    console.log("Oops, error", e);
  }
}

/* 添加商铺 */
export const addNewShop = async (item) => {
  try {
    let response = await fetch('http://cangdu.org:8001/shopping/addshop',{
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      cache: "force-cache",
      mode: "cors",
    });
    let data = await response.json();
    return data;
  }catch(e) {
    console.log("Oops, error", e);
  }
}

/* 获取食品信息 */
export const getFoodMsg = async (category_id) => {
  try {
    let response = await fetch('http://cangdu.org:8001/shopping/v2/menu/'+category_id);
    let data = await response.json()
    return data;
  } catch (e) {
    console.log("Oops, error", e);
  }
}

/* 获取食品所在店铺 */
export const getFoodShop = async (restaurant_id) => {
  try {
    let response = await fetch('http://cangdu.org:8001/shopping/restaurant/'+restaurant_id);
    let data = await response.json()
    return data;
  } catch (e) {
    console.log('不属于任何店铺')
  }
}

/* 更新食品信息 */
export const changeFood = async (item) => {
  try {
    let response = await fetch('http://cangdu.org:8001/shopping/v2/updatefood',{
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      cache: "force-cache",
      mode: "cors",
    });
    let data = await response.json();
    return data;
  }catch(e) {
    console.log("Oops, error", e);
  }
}

/* 更新店铺信息 */
export const changeShop = async (item) => {
  try {
    let response = await fetch('http://cangdu.org:8001/shopping/updateshop',{
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      cache: "force-cache",
      mode: "cors",
    });
    let data = await response.json();
    return data;
  }catch(e) {
    console.log("Oops, error", e);
  }
}
