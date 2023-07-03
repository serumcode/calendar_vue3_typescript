
console.log("rrr",process.env, process.env.VUE_APP_LOCALHOST,process.env.VUE_APP_API_BASE_URL)
export default function (axios,app) {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  
    let url='';
    if(process.env.PROD){
            url=process.env.VUE_APP_API_BASE_URL
       
    }else{
        url=process.env.VUE_APP_LOCALHOST
    }
    const axiosInstance = axios.create({
        baseURL:  url, 
       // baseURL:  "api", 
        withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          }
    })
    app.config.globalProperties.$axios = { ...axiosInstance }

}
