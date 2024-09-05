<script lang="ts">
	export let timestamp = '';
	export let message = 'Hola<br>Mundo';
</script>

<div class="card variant-soft space-y-2 rounded-tl-none p-4 ml-64 bg-red-100">
	<header class="flex items-center justify-between">
		<p class="justify-start font-bold">Tu</p>
		<small class="justify-center opacity-50">{timestamp}</small>
	</header>
	<p>{@html message}</p>
</div>
