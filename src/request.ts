import { useState } from 'react'
import axios, { Method } from 'axios'

export const useRequest = () => {
  const [isRequestError, setIsRequestError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [responseData, setResponseData] = useState(null)
  const [method, setMethod] = useState<Method>('GET')

  const send = async (url: string, data: any = null) => {
    setIsLoading(true)
    try {
      const response = await axios({
        method,
        url,
        data,
      })
      setResponseData(response.data)
      setIsRequestError(false)
    } catch (error) {
      setIsRequestError(true)
      setResponseData(null)
      setError(error)
    }
    setIsLoading(false)
  }

  return {
    method,
    isLoading,
    isRequestError,
    responseData,
    error,
    send,
    setMethod,
    setResponseData,
  }
}
