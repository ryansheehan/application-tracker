<script lang="ts">
    import {invalidate} from '$app/navigation';

    let {data} = $props();

    let applications = $derived(data.applications);

    async function deleteApplication(id: string) {
        const response = await fetch(`/applications/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            applications.splice(applications.findIndex(a => a.id === id), 1);
            invalidate('applications');
        } else {
            console.error(`Failed to delete application: ${id}`);
        }
    }
</script>

<h2>Applications</h2>

<a href="applications/add">Add Application</a>

<ul>
    {#each applications as {company, position, id} (id)}
        <li>
            <a href={`applications/${id}`}>
                {company.name} - {position}
            </a>
            <button onclick="{() => deleteApplication(id)}">Delete</button>
        </li>
    {/each}
</ul>
