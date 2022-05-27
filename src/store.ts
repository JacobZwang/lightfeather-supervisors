import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import supervisors from './supervisor-placeholder-data';

export const supervisorsSlice = createSlice({
	name: 'supervisors',
	initialState: supervisors.filter((s) => !s.phoneNotifsEnabled && !s.emailNotifsEnabled),
	reducers: {
		updateSupervisorNotif: (
			state,
			action: PayloadAction<{ supervisorId: string; notifType: 'email' | 'phone'; value: boolean }>
		) => {
			state.forEach((s) => {
				if (s.id === action.payload.supervisorId) {
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
			const notif = state.find((s) => s.id === action.payload)!;

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

export const { updateSupervisorNotif, setWatching } = supervisorsSlice.actions;
export const { setFirstName, setLastName, setEmail, setPhone } = infoSlice.actions;
