<script lang="ts">
	import { goto } from '$app/navigation';
	import CourseList from '$lib/components/CourseList.svelte';
	import MasterLayout from '$lib/components/MasterLayout.svelte';
	import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
	import logo from '$lib/img/logo.jpg';

	export let data;

	let currentCourse: number = -1;

	// Courses array
	const courses = data.courses;

	console.log(data);

	// Students array
	const students = [{ name: 'Alice García López', questions: data.chats }];
</script>

<MasterLayout>
	<div slot="sidebar">
		<div class="grid h-screen grid-rows-[auto_1fr_auto]">
			<img class="mx-auto my-4 h-auto max-w-32 rounded-lg" src={logo} alt="" />
			<!--<button
				class="button_primary my-4"
				on:click={() => {
					console.log('Algo');
				}}>Añadir Curso</button
			>-->
			<CourseList bind:currentCourse {courses}></CourseList>

			<button
				class="button_primary mb-8"
				on:click={() => {
					document.cookie =
						'sessionToken=; Path=/; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
					document.cookie = 'userType=; Path=/; HttpOnly;expires=Thu, 01 Jan 1970 00:00:00 UTC;';
					goto('/');
				}}>Cerrar Sesión</button
			>
		</div>
	</div>
	<div slot="main" class="grid h-screen grid-rows-[1fr]">
		{#if currentCourse != -1}
			<div class="overflow-y-auto p-4">
				<h1 class="h1">{courses.filter((c) => c.id == currentCourse)[0].name}</h1>
				<br />

				<h2 class="h2">Recomendación sobre el curso</h2>
				<br />
				<p>{data.evaG.group_analysis}</p>

				<br />
				<br />

				<h2 class="h2">Palabras clave</h2>
				<br />

				<div class="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-4">
					{#each data.evaG.keywords as keyword}
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
									<h4 class="h4">Recomendación</h4>
									<p>{data.eva}</p>
									<br />

									<TreeViewItem
										><h4 class="h4">Preguntas</h4>
										<svelte:fragment slot="children">
											{#each st.questions as qs}
												<p><strong>Pregunta: </strong>{qs.question}</p>
												<p><strong>Respuesta: </strong>{qs.response}</p>
												<br />
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
