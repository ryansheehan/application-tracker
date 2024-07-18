<script lang="ts">
    import { Field, Control, Label, FieldErrors, Description, Fieldset, Legend, ElementField } from "formsnap";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";    
    import { schema } from './application-form-schema';
    import { goto } from '$app/navigation';

    let {data} = $props();

    const form = superForm(data.form, {
        dataType: 'json',
        validators: zodClient(schema),
    });
    const {form: formData, enhance, message} = form;

    message.subscribe((msg) => {        
        if (msg?.status === 'created') {            
            goto('/applications');
        }
    })

    function removeUrlByIndex(index: number) {
		$formData.links = $formData.links.filter((_, i) => i !== index);
	}
 
	function addUrl() {
		$formData.links = [...$formData.links, { label: '', url: '' }];
	}
</script>

<form method="POST" use:enhance>
    <Field {form} name="company">
        <Control let:attrs>
            <Label>Company</Label>
            <input {...attrs} bind:value={$formData.company} />
        </Control>
        <Description class="sr-only">Name of the company to which you're applying</Description>
        <FieldErrors />
    </Field>
    <Field {form} name="position">
        <Control let:attrs>
            <Label>Position</Label>
            <input {...attrs} bind:value={$formData.position} />
        </Control>
        <Description class="sr-only">Job title to which you're applying</Description>
        <FieldErrors />
    </Field>
    <Field {form} name="notes">
        <Control let:attrs>
            <Label>Notes</Label>
            <textarea {...attrs} bind:value={$formData.notes}></textarea>
        </Control>
        <Description class="sr-only">Job title to which you're applying</Description>
        <FieldErrors />
    </Field>
    <Fieldset {form} name="links">
        <Legend>Associated Links</Legend>
        {#each $formData.links as _, i}            
            <ElementField {form} name="links[{i}].label">
                <Control let:attrs>
                    <Label>Label</Label>                    
                    <input {...attrs} bind:value={$formData.links[i].label} />                   
                </Control>
                <Description class="sr-only">Label for the link</Description>
                <FieldErrors />
            </ElementField>
            <ElementField {form} name="links[{i}].url">
                <Control let:attrs>
                    <Label>URL</Label>                    
                    <input {...attrs} type="url" bind:value={$formData.links[i].url} />                   
                </Control>
                <Description class="sr-only">URL for the link</Description>
                <FieldErrors />
            </ElementField>
            <button type="button" aria-label="delete URL" onclick={() => removeUrlByIndex(i)}>
                Delete
            </button>
        {/each}
        <FieldErrors />
        <button type="button" onclick={addUrl}>Add URL</button>
    </Fieldset>

    <button type="submit">Add Application</button>
</form>