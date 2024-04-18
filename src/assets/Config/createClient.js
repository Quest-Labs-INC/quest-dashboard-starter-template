import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://orcxrpcknmetkousgguq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yY3hycGNrbm1ldGtvdXNnZ3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NzA4MjUsImV4cCI6MjAyODU0NjgyNX0.Yf25ZiL5duZBkd1ASjZcNas3eiU4-bZcBK-9WxfPAlA"
)