import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
import { getClientAll,refreshToken,loginUser,registerUser,verifyEmail,logoutUser,getManagerAccess,addManagerToClient,restrictUser,restrictManager,handleRequest,buyStock,sellStock,removeManagerFromClient,getManagerAll,getAdminDashboard ,addAdmin} from "../services/queryServices"




// refresh token
export const useRefreshToken=()=>{
  return useMutation({
    mutationFn:refreshToken
  })
}
// all get for client
export const useGetDashboard=()=>{
  return  useQuery({
  queryKey:["dashboard"],
  queryFn:getClientAll
})
}
// all get for manager
export const useGetManagerDashboard=()=>{
  return useQuery({
    queryKey:["managerDashboard"],
    queryFn:getManagerAll
  })
}

// all get for admin
export const useGetAdminDashboard=()=>{
  return useQuery({
    queryKey:["adminDashboard"],
    queryFn:getAdminDashboard
  })
}

// all post by users

export const login=()=>{
  return useMutation({
    mutationFn:loginUser
  })
}

export const register=()=>{
  return useMutation({
    mutationFn:registerUser
  })
}

export const verifyUserEmail=()=>{
  return useMutation({
    mutationFn:verifyEmail
  })
}

export const logout=()=>{
  return useMutation({
    mutationFn:logoutUser
  })
}

// client post
export const addManager=()=>{
  return useMutation({
    mutationFn:addManagerToClient
  })
}

export const removeManager=()=>{
  return useMutation({
    mutationFn:removeManagerFromClient
  })
}

export const userBuyStock=()=>{
  return useMutation({
    mutationFn:buyStock
  })
}

export const userSellStock=()=>{
  return useMutation({
    mutationFn:sellStock
  })
}
// user get dashboardd

export const getUserDashboard=async()=>{
  return useQuery({
    queryKey:["userDashboard"],
    queryFn:getClientAll
  })
}

// manager post
export const requestManagerAccess=()=>{
  return useMutation({
    mutationFn:getManagerAccess
  })
}

export const handleUserRequest=()=>{
  return useMutation({
    mutationFn:handleRequest
  })
}



export const adminRestrictUser=()=>{
  return useMutation({
    mutationFn:restrictUser
  })
}

export const adminRestrictManager=()=>{
  return useMutation({
    mutationFn:restrictManager
  })
}

export const adminAddAdmin=()=>{
  return useMutation({
    mutationFn:addAdmin
  })
}
