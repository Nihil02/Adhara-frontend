<script lang="ts">
	import CourseList from '$lib/components/CourseList.svelte';
	import MasterLayout from '$lib/components/MasterLayout.svelte';
	import {
		TreeView,
		TreeViewItem,
		RecursiveTreeView,
		type TreeViewNode
	} from '@skeletonlabs/skeleton';

	// Courses array
	const courses = [
		{ name: 'Coso', href: '' },
		{ name: 'Coso2', href: '' }
	];

	const analysis = {
		group_analysis: '',
		keywords: ['Algo', 'Algo']
	};

	// Students array
	const students = [
		{ name: 'Carlos Perez', questions: ['a', 'b'] },
		{ name: 'Carlos Perez', questions: ['a', 'b'] }
	];
</script>

<MasterLayout>
	<div slot="sidebar">
		<div class="grid h-screen grid-rows-[auto_auto_1fr_auto]">
			<div class="bg-surface-500/10 p-4">
				<p class="h1">Dhara</p>
			</div>
			<button
				class="variant-outline-primary mx-12 my-4 rounded-lg py-2"
				on:click={() => {
					console.log('Algo');
				}}>Añadir Curso</button
			>
			<CourseList {courses} class="bg-surface-500/30"></CourseList>
			<button
				class="variant-outline-primary mx-12 mb-8 rounded-lg py-2"
				on:click={() => {
					console.log('Algo');
				}}>Cerrar Sesión</button
			>
		</div>
	</div>
	<div slot="main">
		<div class="p-4">
			<h1 class="h1">Nombre del curso</h1>
			<br />

			<h2 class="h2">Recomendación del curso</h2>
			<br />
			<p></p>

			<br />
			<br />

			<h2 class="h2">Palabras clave</h2>
			<br />

			<div class="grid grid-cols-[auto_auto_auto_auto_auto_auto] gap-4 px-4">
				{#each analysis.keywords as keyword}
					<span class=" badge bg-primary-400">{keyword}</span>
				{/each}
			</div>
			<br />
			<br />

			<h2 class="h2">Alumnos del curso</h2>
			<br />
			<TreeView>
				{#each students as st}
					<TreeViewItem>
						<h3 class="h3">{st.name}</h3>
						<svelte:fragment slot="children">
							<div class="px-8">
								<h4 class="h4">Recomendacion del alumno</h4>
								<p>Recomiendo que sea menos homosensual</p>
								<br />

								<TreeViewItem
									><h4 class="h4">Preguntas del alumno</h4>
									<svelte:fragment slot="children">
										{#each st.questions as qs}
											<p>{qs}</p>
										{/each}
									</svelte:fragment>
								</TreeViewItem>
							</div>
						</svelte:fragment>
					</TreeViewItem>
				{/each}
			</TreeView>
		</div>
	</div>
</MasterLayout>
