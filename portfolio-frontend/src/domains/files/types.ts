export interface UploadResponse {
  url: string
  blobName: string
}

export interface FileUploadOptions {
  file: File
  folder?: string
}
