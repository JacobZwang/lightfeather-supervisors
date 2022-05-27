import { SupervisorState } from '../types';

function SupervisorRow(props: {
	allSupervisors: SupervisorState[];
	setAllSupervisors: React.Dispatch<React.SetStateAction<SupervisorState[]>>;
	supervisor: SupervisorState;
}) {
	let { supervisor, allSupervisors, setAllSupervisors } = props;

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
						onChange={(e) => {
							setAllSupervisors(
								allSupervisors.map((s) => {
									if (s.id === supervisor.id) s.emailNotifsEnabled = e.target.checked;
									return s;
								})
							);
						}}
					/>
				</label>
			</td>

			<td>
				<label>
					Phone Notifications{' '}
					<input
						onChange={(e) => {
							setAllSupervisors(
								allSupervisors.map((s) => {
									if (s.id === supervisor.id) s.phoneNotifsEnabled = e.target.checked;
									return s;
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
