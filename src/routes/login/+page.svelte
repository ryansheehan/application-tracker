<script lang="ts">
    import { Field, Control, Label, FieldErrors, Description } from "formsnap";
    import { page } from "$app/stores";
    import { superForm } from "sveltekit-superforms";
    import {goto} from '$app/navigation';
    import { zodClient } from "sveltekit-superforms/adapters";
    import { schema } from './login-form-schema';

    let {data} = $props();

    const form = superForm(data.form, {
        multipleSubmits: 'prevent',
        validators: zodClient(schema),
        onResult({result}) {
            if(result.status === 200) {                
                goto('/', {invalidateAll: true});
            }
        },
    });

    const { form: formData, errors, message, enhance, constraints } = form;    
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
    <Field {form} name="email">
        <Control let:attrs>
            <Label>Email</Label>
            <input {...attrs} bind:value={$formData.email} />
        </Control>
        <Description class="sr-only">Email address for your account</Description>
        <FieldErrors/>
    </Field>
    <Field {form} name="password">
        <Control let:attrs>
            <Label>Password</Label>
            <input {...attrs} type="password" bind:value={$formData.password} />
        </Control>
        <Description class="sr-only">Password for your account</Description>
        <FieldErrors/>
    </Field>
    <button type="submit">Login</button>
</form>
<p>Dont have an account? <a href="/register">Register here</a>!</p>