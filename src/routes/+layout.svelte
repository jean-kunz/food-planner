<script lang="ts">
  import '../app.css';
  import { auth } from '$lib/auth.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let { children } = $props();

  const authOnlyRoutes = ['/login', '/signin'];

  $effect(() => {
    if (auth.ready && auth.user && authOnlyRoutes.includes($page.url.pathname)) {
      goto('/');
    }
  });
</script>

{@render children()}
