import axios from "axios";

const api=axios.create({
  baseURL:"http://localhost:4000/api",
  withCredentials:true,
  timeout:10000,
  headers:{
    "Content-Type":"application/json"
  }
})

api.interceptors.response.use(
  (response)=>response,
  async(error)=>{
    const originalRequest=error.config;
    if(error.response?.status===401&&!originalRequest._retry){
      originalRequest._retry=true;
      await api.post("/refresh");
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
)

export default api
