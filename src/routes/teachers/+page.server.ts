export async function load() {
	const res = await fetch('http://127.0.0.1:8000/course', {
		method: 'POST',
		body: JSON.stringify({
			user_email: 'carol@teacher.com'
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return {
		courses: await res.json()
	};
}
