import api from "../lib/axios"

export const registerUser = async (userData: any) => {
  const response = await api.post("/register", userData)
  return response.data
}

export const loginUser = async (loginData: any) => {
  const response = await api.post("/login", loginData)
  return response.data
}

export const verifyEmail = async (data: { email: string, otp: string }) => {
  const response = await api.post("/verify/email", data)
  return response.data
}
export const resendVerificationTokenAPI = async (email: string) => {
  const response = await api.post("/send-token", { email })
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

export const getMarketQuotes = async (page: number = 1, limit: number = 20) => {
  const response = await api.get(`/market/quotes?page=${page}&limit=${limit}`)
  return response.data
}

export const searchStock = async (symbols: string) => {
  console.log("query from service",symbols)
  const response = await api.post("/market/search", { symbols })
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

export const fetchStockHistoryAPI = async (symbol: string, range: string = '1mo') => {
  const response = await api.get(`/market/history/${symbol}?range=${range}`)
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

export const getMarketCategories = async (page: number = 1) => {
  const response = await api.get(`/market/categories?page=${page}`);
  return response.data;
}
export const reportProblem = async (data: any) => {
  const response = await api.post("/reports", data);
  return response.data;
}
export const updateManagerProfileAPI = async (profileData: any) => {
  const response = await api.post("/manager/profile", profileData);
  return response.data;
}
export const getClientReportsAPI = async () => {
  const response = await api.get("/admin/reports");
  return response.data;
}
export const updateReportStatusAPI = async (reportId: string, status: string, resolutionNote?: string) => {
  const response = await api.patch(`/admin/reports/status`, { reportId, status, resolutionNote });
  return response.data;
}
export const deleteReportAPI = async (reportId: string) => {
  const response = await api.delete(`/admin/reports/delete`, { data: { reportId } });
  return response.data;
}