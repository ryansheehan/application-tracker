<script lang="ts">
    import type { Snippet } from 'svelte';

    let {children}: {children: Snippet} = $props();
</script>

<nav>
    <a href="/">Home</a>
    <a href="/signup">Sign Up</a>
    <a href="/login">Login</a>
    <a href="/logout">Logout</a>
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