import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import supervisors from './supervisor-placeholder-data';

export const supervisorsSlice = createSlice({
	name: 'counter',
	initialState: supervisors.filter((s) => !s.phoneNotifsEnabled && !s.emailNotifsEnabled),
	reducers: {
		updateSupervisorNotif: (
			state,
			action: PayloadAction<{ supervisorId: string; notifType: 'email' | 'phone'; value: boolean }>
		) => {
			return state.forEach((s) => {
				if (s.id === action.payload.supervisorId) s.emailNotifsEnabled = action.payload.value;
			});
		}
	}
});

export default configureStore({
	reducer: {
		supervisors: supervisorsSlice.reducer
	}
});

export const { updateSupervisorNotif } = supervisorsSlice.actions;
