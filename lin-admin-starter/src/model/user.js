/* eslint-disable class-methods-use-this */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class User {
  // 类中的方法可以代表一个用户行为
  async createItem(data) {
    return _axios({
      method: 'post',
      url: 'v1/wxuser',
      data,
    })
  }

  async getItem(id) {
    const res = await get(`v1/wxuser/${id}`)
    return res
  }

  async editItem(id, info) {
    const res = await put(`v1/wxuser/${id}`, info)
    return res
  }

  async deleteItem(id) {
    const res = await _delete(`v1/wxuser/${id}`)
    return res
  }

  async getItems(data) {
    return _axios({
      method: 'get',
      url: 'v1/wxuser',
      data,
      handleError: true,
    })
  }
}

export default new User()
