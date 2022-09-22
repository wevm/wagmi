import { useQueryClient as rqUseQueryClient } from '@tanstack/react-query'

import { queryClientContext as context } from '../../../context'

export const useQueryClient = () => rqUseQueryClient({ context })
