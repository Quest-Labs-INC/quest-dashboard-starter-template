import { createClient } from "@supabase/supabase-js";
import { mainConfig } from "./assets/Config/appConfig";

const supabaseUrl = mainConfig.REACT_APP_SUPABASE_URL;
const supabaseKey = mainConfig.REACT_APP_SUPABASE_ANON_KEY;

export let supabase = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn("Supabase URL and ANON KEY are not provided. Hense, supabase operations will be skipped.");
}
