import './App.css';

function App() {
	return (
		<form>
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
					<label className="checkbox">
						Save Options
						<input type="checkbox" checked></input>
					</label>
				</div>
			</div>
		</form>
	);
}

export default App;
