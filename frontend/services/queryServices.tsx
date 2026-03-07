import api from "../lib/axios";

// authentication services

export const registerUser=async(userData:any)=>{
  const response=await api.post("/register",userData)
  return response.data
}

export const loginUser=async(userData:any)=>{
  const response=await api.post("/login",userData)
  return response.data
}

export const logoutUser=async()=>{
  const response=await api.post("/logout")
  return response.data
}



export const verifyEmail=async({email,otp}:{
  email:string,
  otp:string
})=>{
  const response=await api.post("/verify/email",{email,otp})
  return response.data
}




export const refreshToken=async()=>{
  const response=await api.get("/refresh")
  return response.data
}

// user services

export const addManagerToClient=async(managerData:any)=>{
  const response=await api.post("/client/add/manager",managerData)
  return response.data
}

export const removeManagerFromClient=async(managerData:any)=>{
  const response=await api.post("/client/remove/manager",managerData)
  return response.data
}

export const buyStock=async(stockData:any)=>{
  const response=await api.post("/client/buy/stock",stockData)
  return response.data
}

export const sellStock=async(stockData:any)=>{
  const response=await api.post("/client/sell/stock",stockData)
  return response.data
}

export const getClientAll=async()=>{
  const response=await api.get("/client/dashboard")
  return response.data
}

// manager services

export const handleRequest=async(requestData:any)=>{
  const response=await api.post("/manager/handle/request",requestData)
  return response.data
}

export const getManagerAccess=async()=>{
  const response=await api.post("/get/manager/access")
  return response.data
}
export const getManagerAll=async()=>{
  const response=await api.get("/manager/dashboard")
  return response.data
}


//  admin services

export const restrictUser=async(userData:any)=>{
  const response=await api.post("admin/restrict/user",userData);
  return response.data
}

export const restrictManager=async(managerData:any)=>{
  const response=await api.post("admin/restrict/manager",managerData);
  return response.data
}

export const getAdminDashboard=async()=>{
  const response=await api.get("admin/dashboard");
  return response.data
}

export const addAdmin=async()=>{
  const response=await api.get("admin/add/admin");
  return response.data
}
