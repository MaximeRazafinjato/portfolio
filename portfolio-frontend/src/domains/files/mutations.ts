import { useMutation } from '@tanstack/react-query'
import { api, API_ENDPOINTS } from '@/lib/api'
import type { UploadResponse, FileUploadOptions } from './types'

export function useUploadFileMutation() {
  return useMutation({
    mutationFn: async ({ file, folder }: FileUploadOptions) => {
      const formData = new FormData()
      formData.append('file', file)
      if (folder) {
        formData.append('folder', folder)
      }

      const response = await api.post<UploadResponse>(API_ENDPOINTS.uploadFile, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    },
  })
}

