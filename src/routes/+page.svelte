<script lang="ts">
  import { auth } from '$lib/auth.svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  async function signOut() {
    await supabase.auth.signOut();
    goto('/login');
  }
</script>

<main class="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
  <h1 class="text-3xl font-bold">Food Planner</h1>

  {#if !auth.ready}
    <p class="text-sm text-gray-400">Loading…</p>
  {:else if auth.user}
    <p class="text-sm text-gray-600">Signed in as <strong>{auth.user.email}</strong></p>
    <button onclick={signOut} class="text-sm underline text-gray-500 hover:text-black">
      Sign out
    </button>
  {:else}
    <nav class="flex gap-4 text-sm">
      <a class="underline" href="/login">Log in</a>
      <a class="underline" href="/signin">Sign up</a>
    </nav>
  {/if}
</main>
