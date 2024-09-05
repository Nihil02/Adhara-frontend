<script lang="ts">
	export let timestamp = ""
	export let message = "Hola<br>Mundo"
</script>

<div class="card variant-soft space-y-2 rounded-tl-none p-4 mr-64 bg-red-100">
	<header class="flex items-center justify-between">
		<p class="font-bold justify-start">Dhara</p>
		<small class="opacity-50 justify-center">{timestamp}</small>
	</header>
	<p>{@html message}</p>
</div>
