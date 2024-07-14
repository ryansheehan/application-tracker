<script lang="ts">
    let {data} = $props();

    let application = $derived(data.application);
</script>

<h2>Application Details</h2>

<p><pre>{JSON.stringify(application, undefined, 4)}</pre>