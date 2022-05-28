export interface Supervisor {
	id: string;
	phone: string;
	jurisdiction: string;
	identificationNumber: string;
	firstName: string;
	lastName: string;
}

export interface SupervisorSummary {
	str: string;
	phoneNotifsEnabled: boolean;
	emailNotifsEnabled: boolean;
}

export interface SupervisorState extends SupervisorSummary {
	changed: boolean;
	isWatching: boolean;
}

export interface Info {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}
