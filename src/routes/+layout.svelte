<script lang="ts">
    import Logout from '$lib/components/logout.svelte';
    import "../app.css";

    let {children, data} = $props();   
    let isUserLoggedIn = $derived(data.isUserLoggedIn); 
</script>

<nav>
    <a href="/">Home</a>
    <a href="/public">Public</a>
    {#if isUserLoggedIn}
    <a href="/protected">Protected</a>    
    <Logout/>
    {:else}
    <a href="/login">Login</a>
    {/if}
</nav>

<main>
    {@render children()}
</main>
