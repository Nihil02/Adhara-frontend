<div class="grid grid-rows-[auto_1fr_auto]">
	<div class="grid grid-cols-[auto_1fr]">
		<!-- Sidebar -->
		<aside class="w-64 bg-surface-50-900-token">
			<slot name="sidebar"></slot>
		</aside>

		<!-- Main -->
		<main class="h-screen">
			<slot name="main"></slot>
		</main>
	</div>
</div>