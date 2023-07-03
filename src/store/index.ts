import { createStore} from 'vuex'
//import { ExCreateStore } from 'vuex-ts-enhanced'
import eventsStore from './modules/events'
export default createStore({
 // namespaced: true,
  modules: {
    eventsStore:eventsStore
  },
 
})
