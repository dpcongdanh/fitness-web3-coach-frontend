import { createClient } from "@pankod/refine-supabase";

// const SUPABASE_URL = "https://iwdfzvfqbtokqetmbmbp.supabase.co";
// const SUPABASE_KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDU2NzAxMCwiZXhwIjoxOTQ2MTQzMDEwfQ._gr6kXGkQBi9BM9dx5vKaNKYj_DJN1xlkarprGpM_fU";

const SUPABASE_URL = "https://mhxuwblyckkausnppiws.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oeHV3Ymx5Y2trYXVzbnBwaXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwNzI0NjIsImV4cCI6MTk4MTY0ODQ2Mn0.b314ScnsV4jGJRW9GVg-knFWmR2vY8M-dsoV-uZtuqs";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
