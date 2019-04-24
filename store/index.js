import { getCategorys } from '~/api/category'
import { compare } from '~/utils'

export const state = () => ({
  currentIndex: 0,
  categorys: [],
  site: {},
})

export const mutations = {
  SET_CURRENT_INDEX(state, currentIndex) {
    state.currentIndex = currentIndex < 0 ? 0 : currentIndex
  },
  SET_CATEGORYS (state, categorys) {
    state.categorys = categorys
  },
  SET_SITE(state, site) {
    state.site = site || {}
  },
}
export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const categorys = await getCategorys()
    commit('SET_CATEGORYS', (categorys || []).sort(compare('order')))
    // if (req.session.user) {
    //   commit('user', req.session.user)
    // }
  }
}
