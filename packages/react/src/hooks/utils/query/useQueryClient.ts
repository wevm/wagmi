import { useQueryClient as useQueryClient_ } from '@tanstack/react-query'

import { queryClientContext as context } from '../../../context'

export const useQueryClient = () => useQueryClient_({ context })
