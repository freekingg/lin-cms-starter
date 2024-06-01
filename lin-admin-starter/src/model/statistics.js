/* eslint-disable class-methods-use-this */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class Order {
  // 类中的方法可以代表一个用户行为
  async createItem(data) {
    return _axios({
      method: 'post',
      url: 'v1/order',
      data,
    })
  }

  async getItem(id) {
    const res = await get(`v1/order/${id}`)
    return res
  }

  async editItem(id, info) {
    const res = await put(`v1/order/${id}`, info)
    return res
  }

  async deleteItem(id) {
    const res = await _delete(`v1/order/${id}`)
    return res
  }

  async getItems(data) {
    return _axios({
      method: 'get',
      url: 'v1/order',
      data,
      handleError: true,
    })
  }

  async getItems(data) {
    return _axios({
      method: 'get',
      url: 'v1/order/statistics/data',
      data,
      handleError: true,
    })
  }

  async exportItem(data) {
    return _axios({
      method: 'get',
      url: 'v1/order/export/file',
      responseType:'arraybuffer',
      data,
      handleError: true,
    })
  }


}

export default new Order()
