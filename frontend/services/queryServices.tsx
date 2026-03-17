import axios from "axios"

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (optional: redirect to login)
    }
    return Promise.reject(error)
  }
)

export const registerUser = async (userData: any) => {
  const response = await api.post("/register", userData)
  return response.data
}

export const loginUser = async (loginData: any) => {
  const response = await api.post("/login", loginData)
  return response.data
}

export const verifyEmail = async (token: string) => {
  const response = await api.get(`/verify/email?token=${token}`)
  return response.data
}

export const getMe = async () => {
  const response = await api.get("/get/me")
  return response.data
}

export const refreshToken = async () => {
  const response = await api.post("/refresh")
  return response.data
}

export const logoutUser = async () => {
  const response = await api.post("/logout")
  return response.data
}

export const getManagerAccess = async (accessData: any) => {
  const response = await api.post("/get/manager/access", accessData)
  return response.data
}

export const addManagerToClient = async (data: any) => {
  const response = await api.post("/client/add/manager", data)
  return response.data
}

export const removeManagerFromClient = async (data: any) => {
  const response = await api.post("/client/remove/manager", data)
  return response.data
}

export const buyStock = async (tradeData: any) => {
  const response = await api.post("/client/buy/stock", tradeData)
  return response.data
}

export const sellStock = async (tradeData: any) => {
  const response = await api.post("/client/sell/stock", tradeData)
  return response.data
}

export const getClientAll = async () => {
  const response = await api.get("/client/dashboard")
  return response.data
}

export const handleRequest = async (requestData: any) => {
  const response = await api.post("/manager/handle/request", requestData)
  return response.data
}

export const getManagerAll = async () => {
  const response = await api.get("/manager/dashboard")
  return response.data
}

export const getAdminDashboard = async () => {
  const response = await api.get("/admin/dashboard")
  return response.data
}

export const restrictUser = async (restrictData: any) => {
  const response = await api.post("/restrict/user", restrictData)
  return response.data
}

export const restrictManager = async (restrictData: any) => {
  const response = await api.post("/restrict/manager", restrictData)
  return response.data
}

export const getMarketQuotes = async () => {
  const response = await api.get("/market/quotes")
  return response.data
}

export const searchStock = async (query: string) => {
  const response = await api.post("/market/search", { query })
  return response.data
}

export const postMarketQuotes = async (symbols: string[]) => {
  const response = await api.post("/market/quotes", { symbols })
  return response.data
}

export const fetchStockDetailsAPI = async (symbol: string) => {
  const response = await api.post("/market/stock-details", { symbol })
  return response.data
}

export const addSuperAdmin = async (data: any) => {
  const response = await api.post("/add-super-admin", data);
  return response.data;
}

export const addAdmin = async (adminData: any) => {
  const response = await api.post("/admin/add/admin", adminData);
  return response.data
}

export const generateAccessKey = async (data: { access_key: string, userid: string, role: 'MANAGER' | 'ADMIN' }) => {
  const response = await api.post("/generate-access-key", data);
  return response.data;
}
