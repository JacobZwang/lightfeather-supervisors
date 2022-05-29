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
		if (!didMount.current) {
			didMount.current = true;
			loadWatchList();
		}
	});

	function loadWatchList() {
		fetch(
			`${process.env.REACT_APP_ENDPOINT}/api/supervisors?firstName=${info.firstName}&lastName=${info.lastName}`
		)
			.then((res) => res.json())
			.then((json) => {
				dispatch(setSupervisors(json));
			});
	}

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

					<p>
						After entering your first and last name, reload your watch list to see any supervisors
						you're already watching.
					</p>

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

					<br />

					<p>
						Updating your notification options will not modify notifications you've already
						subscribed to.
					</p>
				</div>
			</div>

			<div>
				<div style={{ display: 'flex' }}>
					<h2>Supervisors You're Watching</h2>{' '}
					<button onClick={loadWatchList}>reload watch list ↺</button>
				</div>

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
					<p>
						You aren't watching any supervisors yet or you haven't input your information correctly.
						Edit your information to the left or enable notifications for a supervisor below to
						watch them.
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
