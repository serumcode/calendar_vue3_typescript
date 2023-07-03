import store from '../store'
export default function (axios) {
    axios.interceptors.request.use(
        (config) => {
            store.dispatch('changeLoader', true)         
            return config
        },
        (error) => {
            store.dispatch('changeLoader', false)
            return Promise.reject(error)
        },
    )
    axios.interceptors.response.use(
        (response) => {
            store.dispatch('changeLoader', false)
            return response
        },
        (error)=> {
            store.dispatch('changeLoader', false)

            if (error.response) {
                if (error.response.status === 401) {
                    store.dispatch('loggedOutUser')
                }

            }
            if(error.toJSON().message === 'Network Error'){
                    
                    store.dispatch('showNetworkError',true);
            }

            return Promise.reject(error)
        })
}
