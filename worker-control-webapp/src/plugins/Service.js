import api from '../api'

export default {
  install(Vue) {
    const get = async ({
      path,
      start = 0,
      limit = 10,
      sort = { prop: 'id', direction: 'asc' },
      q = {},
    } = {}) => {
      if (this.resourceName) api.defaults.headers.resource = this.resourceName
      const response = await api.get(path, {
        params: {
          start,
          limit,
          sort,
          ...q,
        },
      })

      return response.data
    }

    const getById = async ({ path, id = '' } = {}) => {
      if (this.resourceName) api.defaults.headers.resource = this.resourceName
      const response = await api.get(`${path}/${id}`)

      return response.data
    }

    const remove = async ({ path, id = '' } = {}) => {
      if (this.resourceName) api.defaults.headers.resource = this.resourceName
      const response = await api.delete(`${path}/${id}`)

      return response
    }

    const update = async ({ path, id = '', data = {} } = {}) => {
      if (this.resourceName) api.defaults.headers.resource = this.resourceName
      const response = await api.put(`${path}/${id}`, { ...data })

      return response
    }

    const partialUpdate = async ({ path, id = '', data = {} } = {}) => {
      if (this.resourceName) api.defaults.headers.resource = this.resourceName
      const response = await api.patch(`${path}/${id}`, { ...data })

      return response
    }

    const create = async ({ path, data = {} } = {}) => {
      if (this.resourceName) api.defaults.headers.resource = this.resourceName
      const response = await api.post(path, { ...data })

      return response
    }

    Vue.prototype.$service = {
      create,
      get,
      getById,
      update,
      partialUpdate,
      remove,
    }
  },
}
