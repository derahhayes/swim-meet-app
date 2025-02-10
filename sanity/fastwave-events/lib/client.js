import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '@/sanity/env'

export const client = createClient({
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // ✅ Ensure this is set
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-02-08",
  useCdn: false, // Set to `true` for faster performance (read-only mode)// Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.SANITY_TOKEN, // API KEY for accessing Sanity CMS backend.
})

console.log("Sanity Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
