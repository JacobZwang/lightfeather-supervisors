export interface Supervisor {
	id: string;
	phone: string;
	jurisdiction: string;
	identificationNumber: string;
	firstName: string;
	lastName: string;
}

export interface SupervisorState {
	id: string;
	phone: string;
	jurisdiction: string;
	identificationNumber: string;
	firstName: string;
	lastName: string;
	phoneNotifsEnabled: boolean;
	emailNotifsEnabled: boolean;
	isWatching: boolean;
	changed: boolean;
}
