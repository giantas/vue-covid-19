import { timeIsLessThan } from '@/helpers'

export default {
  namespaced:true,

  state: {
    updating: false,
    lastModified: new Date(),
    ttl: 600
  },

  mutations: {
    updateLastModified (state) {
      state.lastModified = new Date()
    },

    updateStatus (state, value) {
      state.updating = value
    }
  },

  getters: {
    isUptoDate: (state) => (timeInSeconds) => {
      if (!timeInSeconds) {
        timeInSeconds = state.ttl
      }
      return timeIsLessThan(timeInSeconds, new Date(), state.lastModified)
    }
  }
}