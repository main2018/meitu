import { getCategorys } from '~/api/category'

export const state = () => ({
  currentIndex: 0,
  categorys: []
})

export const mutations = {
  SET_CURRENT_INDEX(state, currentIndex) {
    state.currentIndex = currentIndex < 0 ? 0 : currentIndex
  },
  SET_CATEGORYS (state, categorys) {
    state.categorys = categorys
  }
}
export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const categorys = await getCategorys()
    commit('SET_CATEGORYS', categorys || [])
    // if (req.session.user) {
    //   commit('user', req.session.user)
    // }
  }
}
