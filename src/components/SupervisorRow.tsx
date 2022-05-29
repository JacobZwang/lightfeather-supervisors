/* eslint-disable react-hooks/exhaustive-deps */
import { setWatching, updateSupervisorNotif } from '../store';
import { Info, SupervisorState } from '../types';
import { useDispatch, useSelector } from 'react-redux';

function SupervisorRow(props: { supervisor: SupervisorState }) {
	let { supervisor } = props;
	const dispatch = useDispatch();
	const info = useSelector((state: { info: Info }) => state.info);

	return (
		<tr
			style={{
				borderBottom: '1px solid #ccc'
			}}
		>
			<td
				style={{
					width: '18rem'
				}}
			>
				{supervisor.str}
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
									supervisorId: supervisor.str,
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
									supervisorId: supervisor.str,
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
						fetch(`${process.env.REACT_APP_ENDPOINT}/api/submit`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								firstName: info.firstName,
								lastName: info.lastName,
								email: supervisor.emailNotifsEnabled ? info.email : '',
								phone: supervisor.phoneNotifsEnabled ? info.phone : '',
								supervisor: supervisor.str
							})
						}).then((res) => {
							if (res.status === 200) {
								dispatch(setWatching(supervisor.str));
							} else {
								res.text().then((text) => {
									alert(text);
								});
							}
						});
					}}
				>
					save
				</button>
			</td>
		</tr>
	);
}

export default SupervisorRow;
