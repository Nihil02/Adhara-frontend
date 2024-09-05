<script lang="ts">
	export let courses: any = [];
	export let currentCourse = '';
</script>

<div class="h-full overflow-y-auto pb-4">
	{#each courses as c}
		<button
			class="h-12 w-full truncate px-4 transition delay-200 duration-300 ease-in-out hover:bg-primary-200"
			on:click={() => {
				currentCourse = c.id;
			}}>{c.name}</button
		>
	{/each}
</div>
