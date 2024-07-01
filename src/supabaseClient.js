import { createClient } from "@supabase/supabase-js";
import { mainConfig } from "./assets/Config/appConfig";

const isLocal = window.location.hostname === 'localhost';

if (isLocal) {
    console.log('Running locally');
} else {
    console.log('Running on the cloud');
}

const supabaseUrl = mainConfig.REACT_APP_SUPABASE_URL;
const supabaseKey = mainConfig.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);