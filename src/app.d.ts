// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		user: User
	}
}

interface AuthenticationResult {
	statusCode: NumericRange<400, 599>
	status: string
	user: User
	sessionId: string
}

interface Credentials {
	user_email: string
	password: string
}

interface UserProperties {
	id: string
	role: string
}

type User = UserProperties | undefined | null

interface UserSession {
	id: string
	user: User
}