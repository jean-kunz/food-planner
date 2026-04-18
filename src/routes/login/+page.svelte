<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let email = $state('');
  let password = $state('');
  let error = $state<string | null>(null);
  let loading = $state(false);

  async function logInWithPassword(e: SubmitEvent) {
    e.preventDefault();
    loading = true;
    error = null;
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    loading = false;
    if (err) {
      error = err.message;
      return;
    }
    goto('/');
  }

  async function logInWithGoogle() {
    error = null;
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` }
    });
    if (err) error = err.message;
  }
</script>

<main class="min-h-screen flex items-center justify-center p-6">
  <div class="w-full max-w-sm space-y-6">
    <h1 class="text-2xl font-bold">Log in</h1>

    <form class="space-y-4" onsubmit={logInWithPassword}>
      <label class="block">
        <span class="block text-sm font-medium mb-1">Email</span>
        <input bind:value={email} type="email" required class="w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="block text-sm font-medium mb-1">Password</span>
        <input bind:value={password} type="password" required class="w-full border rounded px-3 py-2" />
      </label>
      <button type="submit" disabled={loading} class="w-full bg-black text-white rounded py-2 disabled:opacity-60">
        {loading ? 'Logging in…' : 'Log in'}
      </button>
    </form>

    <button type="button" onclick={logInWithGoogle} class="w-full border rounded py-2">
      Continue with Google
    </button>

    {#if error}
      <p class="text-red-600 text-sm">{error}</p>
    {/if}

    <p class="text-sm">No account? <a class="underline" href="/signin">Sign up</a></p>
  </div>
</main>
