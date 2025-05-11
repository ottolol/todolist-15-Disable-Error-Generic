import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice.ts"
import type { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"

export const handleServerNetworkError = (dispatch: Dispatch, error: unknown) => {
  let errorMessage

  // проверям является-ли ошибка - ошибкой axios
  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error.message
  }
  // проверям является-ли ошибка - нативной ошибкой JavaScript
  else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
  }
  // приводим любую другую ошибку к строке
  else {
    errorMessage = JSON.stringify(error)
  }

  dispatch(setAppErrorAC({ error: errorMessage }))
  dispatch(setAppStatusAC({ status: "failed" }))
}
