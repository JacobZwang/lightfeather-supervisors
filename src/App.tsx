import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import SupervisorRow from './components/SupervisorRow';
import { setEmail, setFirstName, setLastName, setPhone, setSupervisors } from './store';
import { Info, SupervisorState } from './types';

function App() {
	const supervisors = useSelector((state: { supervisors: SupervisorState[] }) => state.supervisors);
	const dispatch = useDispatch();
	const info = useSelector((state: { info: Info }) => state.info);

	const didMount = useRef(false);

	useEffect(() => {
		fetch('http://localhost:8080/api/supervisors')
			.then((res) => res.json())
			.then((json) => {
				if (!didMount.current) {
					didMount.current = true;
					dispatch(setSupervisors(json));
				}
			});
	});

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<div>
				<div>
					<h2>Your Information</h2>
					<label>
						First Name
						<input
							required
							type="text"
							name="First Name"
							placeholder="Jacob"
							value={info.firstName}
							onChange={(e) => dispatch(setFirstName(e.target.value))}
						/>
					</label>

					<label>
						Last Name
						<input
							required
							type="text"
							name="Last Name"
							placeholder="Zwang"
							value={info.lastName}
							onChange={(e) => dispatch(setLastName(e.target.value))}
						/>
					</label>

					<h2>Notification Options</h2>

					<label>
						Email
						<input
							type="text"
							name="Last Name"
							placeholder="youremail@lightfeather.io"
							value={info.email}
							onChange={(e) => dispatch(setEmail(e.target.value))}
						/>
					</label>

					<label>
						Phone Number
						<input
							type="text"
							name="Last Name"
							placeholder="123 456 7890"
							value={info.phone}
							onChange={(e) => dispatch(setPhone(e.target.value))}
						/>
					</label>
				</div>
			</div>

			<div>
				<h2>Supervisors You're Watching</h2>

				{supervisors.filter((s) => s.isWatching).length ? (
					<table>
						<tbody>
							{supervisors
								.filter((s) => s.isWatching)
								.map((supervisor) => (
									<SupervisorRow supervisor={supervisor} />
								))}
						</tbody>
					</table>
				) : (
					<p style={{ maxWidth: '30rem' }}>
						You aren't watching any supervisors yet. Enable email or phone notifications for a
						supervisor below to watch them.
					</p>
				)}

				<br />

				<h2>All Supervisors</h2>

				{supervisors.length ? (
					<table>
						<tbody>
							{supervisors
								.filter((s) => !s.isWatching)
								.map((supervisor) => (
									<SupervisorRow key={supervisor.str} supervisor={supervisor} />
								))}
						</tbody>
					</table>
				) : (
					<p
						style={{
							padding: '1rem 0'
						}}
					>
						No Supervisors Found
					</p>
				)}
			</div>
		</form>
	);
}

export default App;
