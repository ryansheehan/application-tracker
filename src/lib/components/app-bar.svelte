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
        <a href="/public">Public</a>
        {#if isUserLoggedIn}
        <a href="/protected">Protected</a>        
        {/if}
    </nav>
    <div class="right-side">
        {#if isUserLoggedIn}
        <LogoutButton/>
        {:else}
        <a href="/login">Login</a>
        {/if}
    </div>    
</header>

<style>
    
</style>