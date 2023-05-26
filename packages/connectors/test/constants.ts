if (!process.env.VITE_WC_PROJECT_ID) {
  throw new Error('Missing environment variable "VITE_WC_PROJECT_ID"')
}

export const projectId = process.env.VITE_WC_PROJECT_ID
