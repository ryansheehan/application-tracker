<script lang="ts">
    import { page } from "$app/stores";
    import { superForm } from "sveltekit-superforms";
    import {goto} from '$app/navigation';

    let {data} = $props();

    const { form, errors, message, enhance, constraints } = superForm(data.form, {
        multipleSubmits: 'prevent',
        onResult({result}) {
            if(result.status === 200) {                
                goto('/', {invalidateAll: true});
            }
        },
    });
</script>

{#if $message}
    <!-- eslint-disable-next-line svelte/valid-compile -->
    <div
        class="status"
        class:error={$page.status >= 400}
        class:success={$page.status == 200}
    >
        {$message}
    </div>
{/if}

<form method="POST" use:enhance>
    <label for="email">Email</label>
    <input
        id="email"
        name="email"
        aria-invalid={$errors.email ? "true" : undefined}
        bind:value={$form.email}
        {...$constraints.email}
    />
    {#if $errors.email}
    <small class="invalid">{$errors.email}</small>
    {/if}
    <br />
    <label for="password">Password</label>
    <input
        id="password"
        type="password"
        name="password"
        aria-invalid={$errors.password ? "true" : undefined}
        bind:value={$form.password}
        {...$constraints.password}
    />
    {#if $errors.password}
    <small class="invalid">{$errors.password}</small>
    {/if}
    <button>Login</button>
</form>

<p>Dont have an account? <a href="/register">Register here</a>!</p>