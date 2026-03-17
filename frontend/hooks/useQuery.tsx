import { useMutation, useQuery } from "@tanstack/react-query"
import { 
  getClientAll, refreshToken, loginUser, registerUser, verifyEmail,
  logoutUser, getManagerAccess, addManagerToClient, restrictUser, restrictManager,
  handleRequest, buyStock, sellStock, removeManagerFromClient, getManagerAll,
  getAdminDashboard, getMarketQuotes, searchStock, 
  postMarketQuotes, getMe, fetchStockDetailsAPI, generateAccessKey, addAdmin
} from "../services/queryServices"

export const register = () => {
  return useMutation({
    mutationFn: registerUser
  })
}

export const login = () => {
  return useMutation({
    mutationFn: loginUser
  })
}

export const verifyUserEmail = () => {
  return useMutation({
    mutationFn: (token: string) => verifyEmail(token)
  })
}

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe
  })
}

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshToken
  })
}

export const logout = () => {
  return useMutation({
    mutationFn: logoutUser
  })
}

export const useAddManagerToClient = () => {
  return useMutation({
    mutationFn: addManagerToClient
  })
}

export const useRemoveManagerFromClient = () => {
  return useMutation({
    mutationFn: removeManagerFromClient
  })
}

export const useBuyStock = () => {
  return useMutation({
    mutationFn: buyStock
  })
}

export const useSellStock = () => {
  return useMutation({
    mutationFn: (data: any) => sellStock(data)
  })
}

export const handleUserRequest = () => {
  return useMutation({
    mutationFn: handleRequest
  })
}

export const useGetManagerDashboard = () => {
  return useQuery({
    queryKey: ["managerDashboard"],
    queryFn: getManagerAll
  })
}

export const useGetAdminDashboard = () => {
  return useQuery({
    queryKey: ["adminDashboard"],
    queryFn: getAdminDashboard
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

export const getUserDashboard = () => {
  return useQuery({
    queryKey: ["userDashboard"],
    queryFn: getClientAll
  })
}

export const useGetMarketQuotes = () => {
  return useQuery({
    queryKey: ["marketQuotes"],
    queryFn: getMarketQuotes
  })
}

export const useSearchStock = () => {
  return useMutation({
    mutationFn: (query: string) => searchStock(query)
  })
}

export const usePostMarketQuotes = () => {
  return useMutation({
    mutationFn: (symbols: string[]) => postMarketQuotes(symbols)
  })
}

export const useFetchStockDetails = () => {
  return useMutation({
    mutationFn: (symbol: string) => fetchStockDetailsAPI(symbol)
  })
}

export const useGenerateAccessKey = () => {
  return useMutation({
    mutationFn: generateAccessKey
  })
}

export const useRedeemAdmin = () => {
  return useMutation({
    mutationFn: addAdmin
  })
}

export const useRedeemManager = () => {
  return useMutation({
    mutationFn: getManagerAccess
  })
}
