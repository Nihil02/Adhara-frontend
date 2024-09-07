import { goto } from '$app/navigation';
import { onMount } from 'svelte';

export async function load({ cookies }) {
	try {
		const sessionToken = cookies.get('sessionToken');
		const userType = cookies.get('userType');

		onMount(() => {
			if (userType != 'teacher') {
				goto('/');
			}
		});

		if (sessionToken != null) {
			const res = await fetch('http://127.0.0.1:8000/course', {
				method: 'POST',
				body: JSON.stringify({
					user_email: sessionToken
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const resEva = await fetch('http://127.0.0.1:8000/course/evaluation/new', {
				method: 'POST',
				body: JSON.stringify({
					student_id: '1',
					course_id: '1'
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const resGroupEva = await fetch('http://127.0.0.1:8000/course/group_evaluation/new', {
				method: 'POST',
				body: JSON.stringify({
					course_id: '1'
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const resChat = await fetch('http://127.0.0.1:8000/course/chat', {
				method: 'POST',
				body: JSON.stringify({
					user_email: 'alice@student.com',
					course_id: '1'
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			return {
				courses: await res.json(),
				eva: await resEva.json(),
				evaG: await resGroupEva.json(),
				token: sessionToken,
				type: userType,
				chats: await resChat.json()
			};
		}
	} catch (error) {
		console.log(error);
	}
}
