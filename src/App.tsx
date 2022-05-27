import './App.css';
import supervisors from './supervisor-placeholder-data';

function App() {
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

					<h2>Notifications</h2>

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
						<label>
							Save Options
							<input type="checkbox" checked></input>
						</label>
					</div>
				</div>
			</div>

			<div>
				<h1>Supervisors You're Watching</h1>

				<table>
					{/* <tr>
						<td>
							<label>
								Search Supervisors
								<input type="select" />
							</label>
						</td>
					</tr> */}

					<p>You Aren't Watching Any Supervisors Yet</p>

					<br />
					<br />

					<h1>All Supervisors</h1>

					{supervisors.length ? (
						supervisors.map((supervisor) => (
							<tr
								style={{
									borderBottom: '1px solid #ccc'
								}}
							>
								<td>
									{supervisor.jurisdiction}, {supervisor.firstName} {supervisor.lastName}
								</td>
								<td>
									<label>
										Email Notifications <input type="checkbox" />
									</label>
								</td>
								<td>
									<label>
										Phone Notifications <input type="checkbox" />
									</label>
								</td>
							</tr>
						))
					) : (
						<p>No Supervisors Found</p>
					)}
				</table>
			</div>
		</form>
	);
}

export default App;
