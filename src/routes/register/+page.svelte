<script lang="ts">
    import { page } from "$app/stores";
    import { superForm } from "sveltekit-superforms";
    import SuperDebug from "sveltekit-superforms";

    let {data} = $props();

    const { form, errors, message, enhance, constraints } = superForm(data.form, {
        multipleSubmits: 'prevent'
    });
</script>

<SuperDebug data={$form} />

<h1>Sign Up</h1>

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
    <br />
    <label for="confirmPassword">Confirm Password</label>
    <input
        id="confirmPassword"
        type="password"
        name="confirmPassword"
        aria-invalid={$errors.confirmPassword ? "true" : undefined}
        bind:value={$form.confirmPassword}
        {...$constraints.confirmPassword}
    />
    {#if $errors.confirmPassword}
    <small class="invalid">{$errors.confirmPassword}</small>
    {/if}
    <br />
    <button>Register</button>
</form>
