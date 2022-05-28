import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { SupervisorState, SupervisorSummary } from './types';

export const supervisorsSlice = createSlice({
	name: 'supervisors',
	initialState: [] as SupervisorState[],
	reducers: {
		setSupervisors: (state, action: PayloadAction<SupervisorSummary[]>) => {
			return action.payload.map((s) => ({
				...s,
				changed: false,
				isWatching: s.emailNotifsEnabled || s.phoneNotifsEnabled
			}));
		},
		updateSupervisorNotif: (
			state,
			action: PayloadAction<{ supervisorId: string; notifType: 'email' | 'phone'; value: boolean }>
		) => {
			state.forEach((s) => {
				if (s.str === action.payload.supervisorId) {
					if (action.payload.notifType === 'email') {
						s.emailNotifsEnabled = action.payload.value;
					} else if (action.payload.notifType === 'phone') {
						s.phoneNotifsEnabled = action.payload.value;
					}

					s.changed = true;
				}
			});
		},
		setWatching: (state, action: PayloadAction<string>) => {
			const notif = state.find((s) => s.str === action.payload)!;

			if (notif.emailNotifsEnabled || notif.phoneNotifsEnabled) {
				notif.isWatching = true;
			} else {
				notif.isWatching = false;
			}
			notif.changed = false;
		}
	}
});

export const infoSlice = createSlice({
	name: 'info',
	initialState: {
		firstName: '',
		lastName: '',
		email: '',
		phone: ''
	},
	reducers: {
		setFirstName: (state, action) => {
			state.firstName = action.payload;
		},
		setLastName: (state, action) => {
			state.lastName = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setPhone: (state, action) => {
			state.phone = action.payload;
		}
	}
});

export default configureStore({
	reducer: {
		supervisors: supervisorsSlice.reducer,
		info: infoSlice.reducer
	}
});

export const { updateSupervisorNotif, setWatching, setSupervisors } = supervisorsSlice.actions;
export const { setFirstName, setLastName, setEmail, setPhone } = infoSlice.actions;
