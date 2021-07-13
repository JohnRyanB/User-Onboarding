import "./App.css";
import React, { useState, useEffect } from "react";
import Form from "./Components/Form";
import * as yup from "yup";
import Axios from "axios";

export default function App() {
	const [form, setForm] = useState({
		name: "",
		password: "",
		passwordConfirmation: "",
		email: "",
		ToS: false,
	});

	const [users, setUsers] = useState([]);

	return (
		<div className="AppContainer">
			<Form values={form} />
		</div>
	);
}
