//Name
//  Email
//  Password
//  Terms of Service (checkbox)
//  A Submit button to send our form data to the server.
import React, { useState, useEffect } from "react";
import Axios from "axios";
import * as yup from "yup";
import { values } from "lodash";

let schema = yup.object().shape({
	email: yup.string().email("must be valid email address format"),
	name: yup.string().required("name is required"),
	password: yup.string().required("Password is required"),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match"),
	ToS: yup.boolean(),
});

export default function Form(props) {
	const [errors, setErrors] = useState({
		name: "",
		password: "",
		email: "",
		ToS: false,
	});
	const [disabled, setDisabled] = useState(true);

	const setFormErrors = (name, value) => {
		yup
			.reach(schema, name)
			.validate(value)
			.then(() => setErrors({ ...errors, [name]: "" }))
			.catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
	};

	//onchange={handleChange} in my form

	useEffect(() => {
		schema.isValid(form).then((valid) => setDisabled(!valid));
	}, [form]);

	const handleChange = (event) => {
		const { name, type, value, checked } = event.target;
		const updatedInfo = type === "checkbox" ? checked : value;
		setFormErrors(name, valueToUse);

		setForm({ ...Form, [name]: valueToUse });
		console.log("changing");
	};

	//axios POST
	const submit = (event) => {
		event.preventDefault();
		const newUser = {
			user: form.user.trim(),
			email: form.email,
			name: form.name,
			password: form.password,
			passwordConfirmation: form.passwordConfirmation,
			ToS: form.ToS,
		};
		Axios.post("https://reqres.in/api/users", newUser)
			.then((res) => {
				setForm({
					email: "",
					name: "",
					password: "",
					passwordConfirmation: "",
					ToS: false,
				});
			})
			.catch((err) => {
				debugger;
			});
	};
	return (
		<div className="FormContainer">
			<form>
				<label>Email</label>
				<input
					type="Email"
					onChange={handleChange}
					name="email"
					value={values.email}
				/>
				<label>Name</label>
				<input
					type="Text"
					onChange={handleChange}
					name="name"
					value={values.name}
				/>
				<label>Password</label>
				<input
					type="Password"
					onChange={handleChange}
					name="password"
					value={values.password}
				/>

				<label>Password Confirmation</label>
				<input
					type="Password"
					onChange={handleChange}
					name="passwordConfirmation"
					value={values.passwordConfirmation}
				/>

				<label>Terms of Service</label>
				<input
					type="checkbox"
					onChange={handleChange}
					name="ToS"
					value={values.ToS}
					checked={values.toSAgree}
				/>
			</form>
			<buton disabled={disabled}>Submit</buton>
		</div>
	);
}
