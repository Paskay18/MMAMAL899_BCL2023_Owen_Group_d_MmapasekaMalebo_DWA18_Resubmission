import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sgcuecxeqiqzznshceyy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnY3VlY3hlcWlxenpuc2hjZXl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5OTcyODAsImV4cCI6MjAwNzU3MzI4MH0.PIegs_9jF51LqZk6JRXfR32iwWCB4vr0-z3H8WRhq9k'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase