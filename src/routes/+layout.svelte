<script lang="ts">
    import AppBar from '$lib/components/app-bar.svelte';
    import "../app.css";

    let {children, data} = $props();   
    let isUserLoggedIn = $derived(data.isUserLoggedIn); 
</script>

<AppBar {isUserLoggedIn} />

<main class="content-grid">
    {@render children()}
</main>

<style>

</style>