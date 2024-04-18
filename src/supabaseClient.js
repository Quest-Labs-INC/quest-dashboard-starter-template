import { createClient } from "@supabase/supabase-js";
import { mainConfig } from "./assets/Config/appConfig";

const supabaseUrl = mainConfig.REACT_APP_SUPABASE_URL;
const supabaseKey = mainConfig.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);