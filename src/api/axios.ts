import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { getAccessToken } from '@/lib/token'

export interface ConsoleError {
  status: number
  data: unknown
}

export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getAccessToken()
  const apiKey = import.meta.env.VITE_API_KEY

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  if (apiKey) {
    config.headers.set('apikey', apiKey)
  }

  return config
}

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response
}

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  if (error.response?.status === 401) {
    await Promise.reject(error)
    return
  }

  if (error.response) {
    const errorMessage: ConsoleError = {
      status: error.response.status,
      data: error.response.data,
    }
    console.error(errorMessage)
  } else if (error.request) {
    console.error(error.request)
  } else {
    console.error('Error', error.message)
  }

  await Promise.reject(error)
}

const axiosRequestConfig: AxiosRequestConfig = {
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
}

const axiosInstance: AxiosInstance = axios.create({
  ...axiosRequestConfig,
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

axiosInstance.interceptors.request.use(requestInterceptor)
axiosInstance.interceptors.response.use(successInterceptor, errorInterceptor)

export { axiosInstance }
