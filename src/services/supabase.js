import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://uhpprrbaibovbugmfjgi.supabase.co';
//Read and access only from supabase Row level policies
// key from supabase project settings
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVocHBycmJhaWJvdmJ1Z21mamdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MTM4MjEsImV4cCI6MjAyNzE4OTgyMX0.iY9KeB4wGeKVtj0mwfZ8GXlywutEi9dXSjSpK1slUTk';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
