<script lang="ts">
	import CourseList from '$lib/components/CourseList.svelte';
	import MasterLayout from '$lib/components/MasterLayout.svelte';
	import MessageBubbleAI from '$lib/components/MessageBubble/MessageBubbleAI.svelte';
	import MessageBubbleUser from '$lib/components/MessageBubble/MessageBubbleUser.svelte';

	import { AppBar } from '@skeletonlabs/skeleton';

	let chatElement: HTMLElement;

	let currentPrompt = '';

	let currentCourse: number = 0;

	// Courses array
	let courses = [
		{ name: 'Coso', href: '' },
		{ name: 'Coso2', href: '' }
	];

	//Messages array
	let messages: [{ question: string; answer?: string; timestamp?: string }] | [] = [
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
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
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
				<p class="h1">Dhara</p>
			</div>
			<CourseList {courses} class="bg-surface-500/30"></CourseList>
			<button class=" mx-12 mb-8 rounded-sm bg-primary-300 py-2">Log off</button>
		</div>
	</div>
	<div slot="main">
		<div class="grid h-screen grid-rows-[1fr_auto]">
			<div bind:this={chatElement} class="overflow-y-auto bg-surface-500/30 p-4">
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
				<div
					class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token"
				>
					<p></p>
					<textarea
						bind:value={currentPrompt}
						class="border-0 bg-transparent ring-0"
						name="prompt"
						id="prompt"
						placeholder="Escribe algo"
						rows="1"
					/>
					<button class="variant-filled-primary">Send</button>
				</div>
			</div>
		</div>
	</div>
</MasterLayout>
