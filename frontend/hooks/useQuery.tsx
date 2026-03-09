import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getClientAll, refreshToken, loginUser, registerUser, verifyEmail,
  logoutUser, getManagerAccess, addManagerToClient, restrictUser, restrictManager,
  handleRequest, buyStock, sellStock, removeManagerFromClient, getManagerAll,
  getAdminDashboard, addAdmin, getMarketQuotes, searchStock, managerAccessKey,
  postMarketQuotes, getMe, fetchStockDetailsAPI
} from "../services/queryServices"




// refresh token
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshToken
  })
}
// role check for navigation
export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    retry: false
  })
}
// all get for client
export const useGetDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getClientAll,
    staleTime: 5 * 60 * 1000,
    retry: 1
  })
}
// all get for manager
export const useGetManagerDashboard = () => {
  return useQuery({
    queryKey: ["managerDashboard"],
    queryFn: getManagerAll,
    staleTime: 5 * 60 * 1000,
    retry: 1
  })
}

// all get for admin
export const useGetAdminDashboard = () => {
  return useQuery({
    queryKey: ["adminDashboard"],
    queryFn: getAdminDashboard,
    staleTime: 5 * 60 * 1000,
    retry: 1
  })
}

// all post by users

export const login = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      // Invalidate and refetch 'me' so ProtectedRoute sees the logged-in user immediately
      void queryClient.invalidateQueries({ queryKey: ["me"] });
    }
  })
}

export const register = () => {
  return useMutation({
    mutationFn: registerUser
  })
}

export const verifyUserEmail = () => {
  return useMutation({
    mutationFn: verifyEmail
  })
}

export const logout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear cached user so ProtectedRoute redirects to login immediately
      queryClient.removeQueries({ queryKey: ["me"] });
    }
  })
}

// client post
export const addManager = () => {
  return useMutation({
    mutationFn: addManagerToClient
  })
}

export const removeManager = () => {
  return useMutation({
    mutationFn: removeManagerFromClient
  })
}

export const userBuyStock = () => {
  return useMutation({
    mutationFn: buyStock
  })
}

export const userSellStock = () => {
  return useMutation({
    mutationFn: sellStock
  })
}
// user get dashboardd

export const getUserDashboard =() => {
  return useQuery({
    queryKey: ["userDashboard"],
    queryFn: getClientAll
  })
}

// manager post
export const requestManagerAccess = () => {
  return useMutation({
    mutationFn: getManagerAccess
  })
}

export const handleUserRequest = () => {
  return useMutation({
    mutationFn: handleRequest
  })
}



export const adminRestrictUser = () => {
  return useMutation({
    mutationFn: restrictUser
  })
}

export const adminRestrictManager = () => {
  return useMutation({
    mutationFn: restrictManager
  })
}

export const adminAddAdmin = () => {
  return useMutation({
    mutationFn: addAdmin
  })
}

// Market hooks
export const useGetMarketQuotes = () => {
  return useQuery({
    queryKey: ["marketQuotes"],
    queryFn: getMarketQuotes
  })
}

export const useSearchStock = () => {
  return useMutation({
    mutationFn: searchStock
  })
}
export const usePostMarketQuotes = () => {
  return useMutation({
    mutationFn: postMarketQuotes
  })
}
export const useFetchStockDetails = () => {
  return useMutation({
    mutationFn: fetchStockDetailsAPI
  })
}

export const useManagerAccessKey = () => {
  return useMutation({
    mutationFn: managerAccessKey
  })
}
