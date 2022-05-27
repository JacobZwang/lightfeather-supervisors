import { useState } from 'react';
import './App.css';
import SupervisorRow from './components/SupervisorRow';
import placeholder from './supervisor-placeholder-data';

function App() {
	const [watchingSupervisors, setWatchingSupervisors] = useState(
		placeholder.filter((s) => s.phoneNotifsEnabled || s.emailNotifsEnabled)
	);

	const [allSupervisors, setAllSupervisors] = useState(
		placeholder.filter((s) => !s.phoneNotifsEnabled && !s.emailNotifsEnabled)
	);

	return (
		<form>
			<div>
				<div>
					<h2>Your Information</h2>
					<label>
						First Name
						<input required type="text" name="First Name" placeholder="Jacob" />
					</label>

					<label>
						Last Name
						<input required type="text" name="Last Name" placeholder="Zwang" />
					</label>

					<h2>Notification Options</h2>

					<label>
						Email
						<input type="text" name="Last Name" placeholder="youremail@lightfeather.io" />
					</label>

					<label>
						Phone Number
						<input type="text" name="Last Name" placeholder="123 456 7890" />
					</label>

					<br />

					<div
						style={{
							textAlign: 'center'
						}}
					>
						{/* <label>
							Save Options
							<input type="checkbox" checked></input>
						</label> */}
					</div>
				</div>
			</div>

			<div>
				<h1>Supervisors You're Watching</h1>

				<p style={{ maxWidth: '30rem' }}>
					You aren't watching any supervisors yet. Enable email or phone notifications for a
					supervisor below to watch them.
				</p>

				<table></table>

				<h1>All Supervisors</h1>

				<table>
					<tbody>
						{/* <tr>
						<td>
						<label>
						Search Supervisors
						<input type="select" />
						</label>
						</td>
					</tr> */}

						{allSupervisors.length ? (
							allSupervisors.map((supervisor) => (
								<SupervisorRow
									supervisor={supervisor}
									allSupervisors={allSupervisors}
									setAllSupervisors={setAllSupervisors}
								/>
							))
						) : (
							<p
								style={{
									padding: '1rem 0'
								}}
							>
								No Supervisors Found
							</p>
						)}
					</tbody>
				</table>
			</div>
		</form>
	);
}

export default App;
