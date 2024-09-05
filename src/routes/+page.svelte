<script>
</script>

<main>
	<div class="align-center align-middle">
		<div class="grid h-screen place-items-center">
			<div class="card rounded-lg min-h-72 min-w-96 p-4 shadow-md bg-tertiary-50">
				<div class="grid h-full place-items-center">
					<p>Usuario</p>
					<input type="text" placeholder="Usuario" class="mt-4 rounded-container-token" />

					<br />

					<p>Contraseña</p>
					<input type="password" placeholder="Contraseña" class="mt-4 rounded-container-token" />

					<br />

					<button
						class="button_primary p-4"
						on:click={() => {
							console.log('Algo');
						}}>Iniciar Sesión</button
					>
				</div>
			</div>
		</div>
	</div>
</main>
