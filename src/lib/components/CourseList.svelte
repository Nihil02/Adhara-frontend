<script lang="ts">
	export let courses: [{ name: string; href: string }] | [] = [];
</script>

<div class="h-full overflow-y-auto pb-4">
	{#each courses as c}
		<button class="h-12 w-full">{c.name}</button>
	{/each}
</div>
