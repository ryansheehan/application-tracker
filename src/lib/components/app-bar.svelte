<script lang="ts">
    import LogoutButton from '$lib/components/logout-button.svelte';

    type AppBarProps = {
        isUserLoggedIn: boolean;
    }

    let {isUserLoggedIn}: AppBarProps = $props();
</script>

<header class="content-grid">    
    <nav class="breakout">
        <a href="/">Home</a>        
        {#if isUserLoggedIn}         
        <a href="/applications">Applications</a>
        {/if}
    </nav>
    <div class="right-side logout">
        {#if isUserLoggedIn}
        <LogoutButton/>
        {:else}
        <a href="/login">Login</a>
        {/if}
    </div>    
</header>

<style>
    header {
        /* padding: var(--size-2); */
        background-color: var(--surface-2);
    }

    .content-grid {
        align-items: baseline;
        padding-block: var(--size-2);
    }

    /* .content-grid > * {
        margin-block: var(--size-2);
    } */

    nav {
        text-align: center;
        width: 100%;
    } 
    
    .logout {
        justify-self: flex-end;
        margin-right: var(--size-2);
    }
</style>