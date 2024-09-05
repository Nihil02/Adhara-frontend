<script lang="ts">
	export let timestamp = '';
	export let message = 'Hola<br>Mundo';
</script>

<div class="card bg-primary-50 ml-64 space-y-2 rounded-tl-none p-4">
	<header class="flex items-center justify-between">
		<p class="justify-start font-bold">Tu</p>
		<small class="justify-center opacity-50"></small>
	</header>
	<p>{@html message}</p>
</div>
