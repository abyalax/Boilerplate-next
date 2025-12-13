import { AxiosProgressEvent } from 'axios';
import { api } from './api';

export interface UploadFilesOptions {
  files: (File | undefined)[];
  endpoint: string;
  onProgress?: (progress: number) => void;
}

export interface UploadResponse {
  success: boolean;
  data?: string[];
  message?: string;
}

export async function uploadFiles(params: UploadFilesOptions): Promise<UploadResponse> {
  if (!params.files.length) throw new Error('No files provided');

  const formData = new FormData();

  // Append semua files dengan key 'files' (sesuai backend)
  params.files.forEach((file) => {
    if (!file) return;
    formData.append('files', file);
  });

  const response = await api.post<UploadResponse>(params.endpoint, formData, {
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      if (params.onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        params.onProgress(progress);
      }
    },
  });

  return response.data;
}
