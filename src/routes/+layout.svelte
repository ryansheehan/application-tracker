<script lang="ts">
    import Logout from '$lib/components/logout.svelte';

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

<style>
    :global(html, body) {
        height: 100%;
    }

    :global(body) {
        background-color: #262626;
        color: #e6e6e6;
        padding: 0;
        margin: 0;
        display: flex;
        flex-flow: column nowrap;
    }    

    nav a {
        color: #e6e6e6;
    }

    main {        
        flex: 1 1 auto;
    }
</style>