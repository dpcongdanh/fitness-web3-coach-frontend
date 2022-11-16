import { createClient } from "@pankod/refine-supabase";

const SUPABASE_URL = "https://fsuhvshdxcmhotjlygpc.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzdWh2c2hkeGNtaG90amx5Z3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg1OTQ2NTAsImV4cCI6MTk4NDE3MDY1MH0.YTIRum8oBf-s7CkOpBdercvRxo2Q2Bt3fEp7X_yooik";
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// Database Password: 6cAtqZzvVIKRRpUz
