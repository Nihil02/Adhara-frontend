<script lang="ts">
	import CourseList from '$lib/components/CourseList.svelte';
	import MasterLayout from '$lib/components/MasterLayout.svelte';
	import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';

	export let data;
	let currentCourse: string = '-1';

	// Courses array
	const courses = data.courses;

	const analysis = {
		group_analysis: '',
		keywords: ['Keyword 1', 'Keyword 2']
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
				<h1 class="h1">Dhara</h1>
			</div>
			<button
				class="button_primary my-4"
				on:click={() => {
					console.log('Algo');
				}}>Añadir Curso</button
			>
			<CourseList bind:value={currentCourse} {courses}></CourseList>
			<button
				class="button_primary mb-8"
				on:click={() => {
					console.log('Algo');
				}}>Cerrar Sesión</button
			>
		</div>
	</div>
	<div slot="main" class="grid h-screen grid-rows-[1fr]">
		{#if currentCourse != '-1'}
			<div class="overflow-y-auto p-4">
				<h1 class="h1">{courses.filter((c) => c.id == currentCourse)[0].name}</h1>
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
						<span class=" elipsis badge bg-primary-400">{keyword}</span>
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
									<h4 class="h4">Recomendación del alumno</h4>
									<p></p>
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
		{:else}
			<div class="grid h-screen place-items-center">
				<p>Selecciona un curso</p>
			</div>
		{/if}
	</div>
</MasterLayout>
