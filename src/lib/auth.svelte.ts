import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';
import { browser } from '$app/environment';

let user = $state<User | null>(null);
let ready = $state(false);

if (browser) {
  supabase.auth.getSession().then(({ data }) => {
    user = data.session?.user ?? null;
    ready = true;
  });

  supabase.auth.onAuthStateChange((_, session) => {
    user = session?.user ?? null;
    ready = true;
  });
}

export const auth = {
  get user() { return user; },
  get ready() { return ready; }
};
