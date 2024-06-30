<script lang="ts">
    let {data} = $props();
    const {username} = data;
</script>

<p>Protected</p>
<p>Hello {username}</p>