<script lang="ts">
	import { goto } from '$app/navigation';
	import logo from '$lib/img/logo.jpg';

	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';

	const credentials: Credentials = {
		user_email: '',
		password: ''
	};

	async function login() {
		const form = <HTMLFormElement>document.getElementById('signIn');
		console.log(credentials);

		const btn = <HTMLButtonElement>document.getElementById('btnlogin');
		btn.setAttribute('disabled', 'disabled');

		if (form.checkValidity()) {
			try {
				await loginLocal(credentials);
			} catch (err) {
				if (err instanceof Error) {
					console.error('Login error', err.message);
				}
			}
		} else {
			btn.removeAttribute('disabled');
		}
	}

	async function loginLocal(credentials: Credentials) {
		try {
			const res = await fetch('http://127.0.0.1:8000/login', {
				method: 'POST',
				body: JSON.stringify(credentials),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const user = await res.json();

			if (user != null) {
				const user_type = user.user_type;
				const user_id = user.user_id;
				const sessionToken = user.user_email;

				document.cookie = `sessionToken=${sessionToken}; path=/; secure; SameSite=Strict;`;
				document.cookie = `userType=${user_type}; path=/; secure; SameSite=Strict;`;
				document.cookie = `userId=${user_id}; path=/; secure; SameSite=Strict;`;

				switch (user_type) {
					case 'student':
						goto('/students');
						break;
					case 'teacher':
						goto('/teachers');
						break;
					case 'admin':
						goto('/admin');
						break;
					default:
						goto('/');
				}
			} else {
				throw new Error('Invalid login');
			}
		} catch (err) {
			if (err instanceof Error) {
				const btn = <HTMLButtonElement>document.getElementById('btnlogin');
				btn.removeAttribute('disabled');
				console.error('Login error', err);
			}
		}
	}
</script>

<main>
	<div class="align-center align-middle">
		<div class="grid h-screen place-items-center">
			<div class="card min-h-72 min-w-96 rounded-lg bg-tertiary-50 p-4 shadow-md">
				<form id="signIn" class="grid h-full place-items-center">
					<img class="mx-auto my-2 h-auto max-w-32 rounded-lg" src={logo} alt="" />
					<br />
					<p>Email</p>
					<input
						bind:value={credentials.user_email}
						type="email"
						placeholder="correo@ejemplo.com"
						class="mt-4 rounded-container-token"
					/>

					<br />

					<p>Contraseña</p>
					<input
						bind:value={credentials.password}
						type="password"
						placeholder="Contraseña"
						class="mt-4 rounded-container-token"
					/>

					<br />

					<button on:click|preventDefault={login} id="btnlogin" class="button_primary p-4"
						>Iniciar Sesión</button
					>
				</form>
			</div>
		</div>
	</div>
</main>
