<script lang="ts">
	import { goto } from '$app/navigation';
	import CourseList from '$lib/components/CourseList.svelte';
	import MasterLayout from '$lib/components/MasterLayout.svelte';
	import MessageBubbleAI from '$lib/components/MessageBubble/MessageBubbleAI.svelte';
	import MessageBubbleUser from '$lib/components/MessageBubble/MessageBubbleUser.svelte';
	import logo from '$lib/img/logo.jpg';

	export let data;
	console.log(data);

	const webSocket = new WebSocket('ws://127.0.0.1:8000/doubt');

	let chatElement: HTMLElement;

	let currentPrompt = '';

	let currentCourse: string = '-1';

	// Courses array
	const courses = data.courses;

	//Messages array
	let messages = data.chats;

	// Functions

	function scrollChatBottom(behavior?: ScrollBehavior): void {
		chatElement.scrollTo({ top: chatElement.scrollHeight, behavior });
	}

	function sendPrompt(): void {
		let aux;
		const newPrompt = JSON.stringify({
			question: currentPrompt,
			student_id: data.userId,
			course_id: currentCourse
		});
		webSocket.send(newPrompt);

		webSocket.onmessage = (event) => {
			console.log(event.data);
		};

		currentPrompt = '';
		setTimeout(() => {
			scrollChatBottom('smooth');
		}, 0);
	}
</script>

<MasterLayout>
	<div slot="sidebar">
		<div class="grid h-screen grid-rows-[auto_1fr_auto]">
			<img class="mx-auto my-4 h-auto max-w-32 rounded-lg" src={logo} alt="" />
			<CourseList bind:currentCourse {courses}></CourseList>
			<button
				class="button_primary mb-8"
				on:click={() => {
					document.cookie = 'sessionToken=""; Path=/; HttpOnly; Max-Age=0;';
					document.cookie = 'userType=""; Path=/; HttpOnly; Max-Age=0;';
					goto('/');
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
						{#each messages.filter((m) => m.course_id == currentCourse) as m}
							<MessageBubbleUser message={m.question} timestamp={m.timestamp}></MessageBubbleUser>
							{#if m.response != null}
								<MessageBubbleAI message={m.response} timestamp={m.timestamp}></MessageBubbleAI>
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
							}}>Enviar</button
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
