import axios from "axios";
import { config } from "./config";
import type { LoginInput, SignupInput, ForgotPasswordInput, AuthResponse } from "@shared/schema";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginInput): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  /**
   * Register new student
   */
  signup: async (userData: SignupInput): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/signup", userData);
    return response.data;
  },

  /**
   * Request password reset
   */
  forgotPassword: async (data: ForgotPasswordInput): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/forgot-password", data);
    return response.data;
  },
};
