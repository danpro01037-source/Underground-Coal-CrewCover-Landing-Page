import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://tpoczmetouqsbxpgvhli.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjU0YWRkMzhiLTlmNzYtNDcwNi1hOGEzLWVjZDc3ZTc2MjFmOCJ9.eyJwcm9qZWN0SWQiOiJ0cG9jem1ldG91cXNieHBndmhsaSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzkzMjU1NTE3LCJleHAiOjIxMDg2MTU1MTcsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.tWzu5vAj_RYCQYBxnsYT15Xb2oz6xh1DThdSQE1ifFY';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };