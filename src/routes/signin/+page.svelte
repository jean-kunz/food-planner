<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let email = $state('');
  let password = $state('');
  let error = $state<string | null>(null);
  let message = $state<string | null>(null);
  let loading = $state(false);

  async function signUp(e: SubmitEvent) {
    e.preventDefault();
    loading = true;
    error = null;
    message = null;
    const { data, error: err } = await supabase.auth.signUp({ email, password });
    loading = false;
    if (err) {
      error = err.message;
      return;
    }
    if (data.user && !data.session) {
      message = 'Check your email to confirm your account.';
      return;
    }
    goto('/');
  }

  async function signUpWithGoogle() {
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
    <h1 class="text-2xl font-bold">Sign up</h1>

    <form class="space-y-4" onsubmit={signUp}>
      <label class="block">
        <span class="block text-sm font-medium mb-1">Email</span>
        <input bind:value={email} type="email" required class="w-full border rounded px-3 py-2" />
      </label>
      <label class="block">
        <span class="block text-sm font-medium mb-1">Password</span>
        <input bind:value={password} type="password" minlength={6} required class="w-full border rounded px-3 py-2" />
      </label>
      <button type="submit" disabled={loading} class="w-full bg-black text-white rounded py-2 disabled:opacity-60">
        {loading ? 'Creating account…' : 'Sign up'}
      </button>
    </form>

    <button type="button" onclick={signUpWithGoogle} class="w-full border rounded py-2">
      Continue with Google
    </button>

    {#if error}<p class="text-red-600 text-sm">{error}</p>{/if}
    {#if message}<p class="text-green-600 text-sm">{message}</p>{/if}

    <p class="text-sm">Already have an account? <a class="underline" href="/login">Log in</a></p>
  </div>
</main>
