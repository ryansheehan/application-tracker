<script lang="ts">
	import { enhance } from "$app/forms";
</script>

<form method="POST" action="/logout" use:enhance>
    <button>Sign out</button>
</form>

<style>
    form {
        display: inline;
    }
</style>