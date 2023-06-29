import { useFormik } from "formik";
import * as Yup from "yup";

export default function Form() {
	// Phải trùng với name input
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			phone: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.required("Required")
				.min(4, "Must be 4 characters or more"),
			email: Yup.string()
				.required("Required")
				.matches(
					/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
					"Invalid email"
				),
			phone: Yup.string()
				.required("Required")
				.matches(
					/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
					"Invalid phone number"
				),
			password: Yup.string()
				.required("Required")
				.matches(
					/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
					"Minimum eight characters, at least one letter, one number and one special character"
				),
			confirmPassword: Yup.string()
				.required("Required")
				.oneOf([Yup.ref("password")], "Password not matches"),
		}),
		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<form
			className="mx-auto"
			style={{ width: 600 }}
			onSubmit={formik.handleSubmit}
		>
			<div className="mb-2">
				<label className="form-label">Name</label>
				<input
					type="text"
					className="form-control"
					name="name"
					value={formik.values.name}
					onChange={formik.handleChange}
					placeholder="Enter your name"
				/>
				<div className="form-text">{formik.errors.name}</div>
			</div>
			<div className="mb-2">
				<label className="form-label">Phone</label>
				<input
					type="tel"
					className="form-control"
					name="phone"
					value={formik.values.phone}
					onChange={formik.handleChange}
					placeholder="Enter your phone number"
				/>
				<div className="form-text">{formik.errors.phone}</div>
			</div>
			<div className="mb-2">
				<label className="form-label">Email address</label>
				<input
					type="email"
					className="form-control"
					name="email"
					value={formik.values.email}
					onChange={formik.handleChange}
					placeholder="Enter your email address"
				/>
				<div className="form-text">{formik.errors.email}</div>
			</div>
			<div className="mb-2">
				<label className="form-label">Password</label>
				<input
					type="password"
					className="form-control"
					name="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					placeholder="Enter your password"
				/>
				<div className="form-text">{formik.errors.password}</div>
			</div>
			<div className="mb-2">
				<label className="form-label">Confirm password</label>
				<input
					type="password"
					className="form-control"
					name="confirmPassword"
					value={formik.values.confirmPassword}
					onChange={formik.handleChange}
					placeholder="Confirm your password"
				/>
				<div className="form-text">{formik.errors.confirmPassword}</div>
			</div>

			<button type="submit" className="btn btn-primary w-100 ">
				Sign up
			</button>
		</form>
	);
}
