import api from "../lib/axios"

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

export const generateAccessKey = async (data: { userid: string, role: 'MANAGER' | 'ADMIN' }) => {
  const response = await api.post("/generate-access-key", data);
  return response.data;
}

export const updateUserSettingsAPI = async (settingsData: any) => {
  const response = await api.patch("/user/settings", settingsData);
  return response.data;
}

export const getNotificationsAPI = async () => {
  const response = await api.get("/user/notifications");
  return response.data;
}

export const markNotificationsReadAPI = async () => {
  const response = await api.patch("/user/notifications/read");
  return response.data;
}

export const updateUserProfileAPI = async (profileData: any) => {
  const response = await api.patch("/user/profile", profileData);
  return response.data;
}

export const getPublicManagerProfileAPI = async (managerId: string) => {
  const response = await api.get(`/manager/public-profile/${managerId}`);
  return response.data;
}

export const getAIInsights = async (query: string): Promise<string> => {
  const response = await api.post("/ai", { query });
  return response.data.data as string;
}

export const deactivateAccountAPI = async () => {
  const response = await api.post("/user/deactivate");
  return response.data;
}

export const getMarketCategories = async () => {
  const response = await api.get("/market/categories");
  return response.data;
}
