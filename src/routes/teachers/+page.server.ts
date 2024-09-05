import { goto } from "$app/navigation";
import { onMount } from "svelte";

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

			return {
				courses: await res.json(),
				token: sessionToken,
				type: userType
			};
		}
	} catch (error) {
		console.log(error);
	}
}
