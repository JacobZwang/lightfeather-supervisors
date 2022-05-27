import { updateSupervisorNotif } from '../store';
import { SupervisorState } from '../types';
import { useDispatch } from 'react-redux';

function SupervisorRow(props: { supervisor: SupervisorState }) {
	let { supervisor } = props;
	const dispatch = useDispatch();

	return (
		<tr
			key={supervisor.id}
			style={{
				borderBottom: '1px solid #ccc'
			}}
		>
			<td>
				{supervisor.jurisdiction}, {supervisor.firstName} {supervisor.lastName}
			</td>

			<td>
				<label>
					Email Notifications
					<input
						type="checkbox"
						defaultChecked={supervisor.emailNotifsEnabled}
						onChange={(e) =>
							dispatch(
								updateSupervisorNotif({
									supervisorId: supervisor.id,
									notifType: 'email',
									value: e.target.checked
								})
							)
						}
					/>
				</label>
			</td>

			<td>
				<label>
					Phone Notifications{' '}
					<input
						onChange={(e) => {
							dispatch(
								updateSupervisorNotif({
									supervisorId: supervisor.id,
									notifType: 'phone',
									value: e.target.checked
								})
							);
						}}
						type="checkbox"
						defaultChecked={supervisor.phoneNotifsEnabled}
					/>
				</label>
			</td>

			<td style={{ width: '3rem' }}>
				<button
					style={{
						visibility:
							supervisor.phoneNotifsEnabled || supervisor.emailNotifsEnabled ? 'visible' : 'hidden'
					}}
				>
					save
				</button>
			</td>
		</tr>
	);
}

export default SupervisorRow;
