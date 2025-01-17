import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion:'2024-01-04',
  useCdn: false,
  token:process.env.NEXT_PUBLIC_SANITY_API_TOKEN
   // Set to false if statically generating pages, using ISR or tag-based revalidation
})
