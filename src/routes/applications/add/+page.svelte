<script lang="ts">
    import { Field, Control, Label, FieldErrors, Description, Fieldset, Legend, ElementField } from "formsnap";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";    
    import { schema } from './application-form-schema';

    let {data} = $props();

    const form = superForm(data.form, {
        validators: zodClient(schema),
    });
    const {form: formData, enhance} = form;

    function removeUrlByIndex(index: number) {
		$formData.links = $formData.links.filter((_, i) => i !== index);
	}
 
	function addUrl() {
		$formData.links = [...$formData.links, ""];
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
    <Fieldset {form} name="links">
        <Legend>Associated Links</Legend>
        {#each $formData.links as _, i}
            <ElementField {form} name="links[{i}]">
                <Control let:attrs>
                    <Label class="sr-only">Link {i + 1}</Label>
                    <input {...attrs} type="url" bind:value={$formData.links[i]} />
                    <button type="button" onclick={() => removeUrlByIndex(i)}>
						Remove URL
					</button>
                </Control>
                <Description class="sr-only">Links assocated to this application</Description>
                <FieldErrors />
            </ElementField>
        {/each}
        <FieldErrors />
        <button type="button" onclick={addUrl}>Add URL</button>
    </Fieldset>

    <button type="submit">Add Application</button>
</form>