import { createClient } from '@supabase/supabase-js';

export default createClient(
  process.env.NEXT_PUBLIC_PROVIDER_URL,
  process.env.NEXT_PUBLIC_PROVIDER_KEY
);
