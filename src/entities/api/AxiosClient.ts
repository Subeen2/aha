import axios, { AxiosInstance } from "axios";

export class AxiosClient {
  public url = process.env.NEXT_PUBLIC_API_URL;

  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  // 토큰 가져오기
  private async getToken(): Promise<any> {
    const tokensString = await localStorage.getItem("Tokens"); // 적절한 비동기 스토리지 사용
    return tokensString ? JSON.parse(tokensString) : null;
  }

  // 토큰 갱신 로직
  private async refreshToken(): Promise<any> {
    try {
      const tokens = await this.getToken();
      if (!tokens || !tokens.refresh_token) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post(`${this.url}/auth/refresh`, {
        refresh_token: tokens.refresh_token,
      });

      const newTokens = response.data;
      await localStorage.setItem("Tokens", JSON.stringify(newTokens)); // 새 토큰 저장
      return newTokens;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return null;
    }
  }

  // 인터셉터 설정
  private setupInterceptors() {
    // 요청 인터셉터
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const tokens = await this.getToken();
        if (tokens && tokens.access_token) {
          config.headers["Authorization"] = `Bearer ${tokens.access_token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // 401 에러 처리 및 토큰 갱신 로직
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const newTokens = await this.refreshToken();
          if (newTokens) {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newTokens.access_token}`;
            return this.axiosInstance(originalRequest); // 갱신된 토큰으로 재요청
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Axios 인스턴스 반환
  public getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}
