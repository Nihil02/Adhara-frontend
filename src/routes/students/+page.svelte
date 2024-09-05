<script lang="ts">
	import CourseList from '$lib/components/CourseList.svelte';
	import MasterLayout from '$lib/components/MasterLayout.svelte';
	import MessageBubbleAI from '$lib/components/MessageBubble/MessageBubbleAI.svelte';
	import MessageBubbleUser from '$lib/components/MessageBubble/MessageBubbleUser.svelte';

	export let data;
	console.log(data.courses);

	let chatElement: HTMLElement;

	let currentPrompt = '';

	let currentCourse: string = '-1';

	// Courses array
	const courses = data.courses;

	//Messages array
	let messages:
		| {
				question: string;
				answer: string;
				timestamp: string;
		  }[]
		| [] = [
		{
			question: '¿Qué es eso?',
			answer: 'Queso',
			timestamp: ''
		},
		{
			question: '¿Qué es eso?',
			answer: 'Queso',
			timestamp: ''
		}
	];

	// Functions

	function scrollChatBottom(behavior?: ScrollBehavior): void {
		chatElement.scrollTo({ top: chatElement.scrollHeight, behavior });
	}

	function sendPrompt(): void {
		const newPrompt = {};
		setTimeout(() => {
			scrollChatBottom('smooth');
		}, 0);
	}
</script>

<MasterLayout>
	<div slot="sidebar">
		<div class="grid h-screen grid-rows-[auto_1fr_auto]">
			<div class="bg-surface-500/10 p-4">
				<h1 class="h1">Dhara</h1>
			</div>
			<CourseList bind:value={currentCourse} {courses}></CourseList>
			<button
				class="button_primary mb-8"
				on:click={() => {
					console.log('Algo');
				}}>Cerrar Sesión</button
			>
		</div>
	</div>
	<div slot="main">
		{#if currentCourse != '-1'}
			<div class="grid h-screen grid-rows-[auto_1fr_auto]">
				<div class="bg-surface-500/30 p-4">
					<h2 class="h2">{courses.filter((c) => c.id == currentCourse)[0].name}</h2>
				</div>
				<div bind:this={chatElement} class="overflow-y-auto bg-surface-500/50 p-4">
					<div class="grid gap-4">
						{#each messages as m}
							<MessageBubbleUser message={m.question} timestamp={m.timestamp}></MessageBubbleUser>
							{#if m.answer != null}
								<MessageBubbleAI message={m.answer} timestamp={m.timestamp}></MessageBubbleAI>
							{/if}
						{/each}
					</div>
				</div>

				<div class="bg-surface-500/30 p-4">
					<!-- Message Input -->
					<div class="input-group input-group-divider grid-cols-[1fr_auto] rounded-container-token">
						<textarea
							bind:value={currentPrompt}
							class="border-0 bg-transparent ring-0"
							name="prompt"
							id="prompt"
							placeholder="Escribe algo"
							rows="1"
						/>
						<button
							class="variant-filled-primary"
							on:click={() => {
								sendPrompt();
							}}>Send</button
						>
					</div>
				</div>
			</div>
		{:else}
			<div class="grid h-screen place-items-center">
				<p>¿Empieza a chatear!</p>
			</div>
		{/if}
	</div>
</MasterLayout>
