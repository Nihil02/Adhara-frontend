import { goto } from '$app/navigation';
import { onMount } from 'svelte';

export async function load({ cookies }) {
	try {
		const sessionToken = cookies.get('sessionToken');
		const userType = cookies.get('userType');
		const userId = cookies.get('userId');

		onMount(() => {
			if (userType != 'student') {
				goto('/');
			}
		});

		if (sessionToken != null) {
			const resCourse = await fetch('http://127.0.0.1:8000/course', {
				method: 'POST',
				body: JSON.stringify({
					user_email: sessionToken
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const resChat = await fetch('http://127.0.0.1:8000/course/chat', {
				method: 'POST',
				body: JSON.stringify({
					user_email: sessionToken,
					course_id: '1'
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			return {
				courses: await resCourse.json(),
				chats: await resChat.json(),
				token: sessionToken,
				type: userType,
				userId: userId
			};
		}
	} catch (error) {
		console.log();
	}
}
