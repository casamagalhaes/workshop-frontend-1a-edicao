const actions = {
  saveFilterValues({ commit }, filters) {
    commit('SET_FILTERS_VALUE', filters)
  },
}

export default actions
