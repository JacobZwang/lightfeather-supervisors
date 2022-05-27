import { setWatching, updateSupervisorNotif } from '../store';
import { Info, SupervisorState } from '../types';
import { useDispatch, useSelector } from 'react-redux';

function SupervisorRow(props: { supervisor: SupervisorState }) {
	let { supervisor } = props;
	const dispatch = useDispatch();
	const info = useSelector((state: { info: Info }) => state.info);

	return (
		<tr
			key={supervisor.id}
			style={{
				borderBottom: '1px solid #ccc'
			}}
		>
			<td
				style={{
					width: '18rem'
				}}
			>
				{supervisor.jurisdiction}, {supervisor.firstName} {supervisor.lastName}
			</td>

			<td>
				<label style={{ color: info.email ? 'black' : 'grey' }}>
					Email Notifications
					<input
						type="checkbox"
						disabled={!info.email}
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
				<label style={{ color: info.phone ? 'black' : 'grey' }}>
					Phone Notifications
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
						disabled={!info.phone}
						type="checkbox"
						defaultChecked={supervisor.phoneNotifsEnabled}
					/>
				</label>
			</td>

			<td style={{ width: '3rem' }}>
				<button
					style={{
						visibility: supervisor.changed ? 'visible' : 'hidden'
					}}
					onClick={() => {
						dispatch(setWatching(supervisor.id));
					}}
				>
					save
				</button>
			</td>
		</tr>
	);
}

export default SupervisorRow;
