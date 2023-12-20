import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class ApiConfig {
  private static instance: ApiConfig;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create();
    this.setupInterceptors();
  }

  public static getInstance(): ApiConfig {
    if (!ApiConfig.instance) {
      ApiConfig.instance = new ApiConfig();
    }
    return ApiConfig.instance;
  }

  public getAxiosInstance(): AxiosInstance {
    this.setBaseUrl("https://valorant-api.com/v1/")
    return this.axiosInstance;
  }

  public setBaseUrl(baseUrl: string): void {
    this.axiosInstance.defaults.baseURL = baseUrl;
    // this.axiosInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  }

  private setupInterceptors(): void {
    // You can add interceptors here (e.g., request, response, error handling)
  }
}

export default ApiConfig;