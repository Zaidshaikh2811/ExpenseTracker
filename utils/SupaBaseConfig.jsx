import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://vflwvgmcseepnxbagybk.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmbHd2Z21jc2VlcG54YmFneWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxOTc2MzYsImV4cCI6MjA0Mjc3MzYzNn0.Mq6qg4aawR8NE2V9mG22tnczxKaNl26NHsTLCls4Dec')
