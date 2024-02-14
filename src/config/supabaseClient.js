import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://drujfxtziqtjmxjkaqao.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRydWpmeHR6aXF0am14amthcWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI0MzQ5MzQsImV4cCI6MjAwODAxMDkzNH0.gyfTgzfm4pJW7yv7nBIsp3dG5tDIlEGFw4q-FH5_F8k"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase