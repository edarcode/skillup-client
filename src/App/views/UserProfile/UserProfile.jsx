import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./module.css";
import { Form, Button, Col, Row, Container, Card } from "react-bootstrap";
import logoUsuario from "./img/usuario.png";
import { useAuth } from "../../../auth/useAuth.js";
import { getUserService } from "./service/getUserService.js";
import { updateUserService } from "./service/updateUserService.js";
import { FaDiscord, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useForm } from "react-hook-form";

export default function UserProfile() {
	const {
		register,
		formState: { errors },
		watch
	} = useForm();
	const [profileImage, setProfileImage] = useState(null);
	const [previewImage, setPreviewImage] = useState(logoUsuario);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [previewName, setPreviewName] = useState("");
	const [email, setEmail] = useState("");
	const [personalId, setPersonalId] = useState("");
	const [password, setPassword] = useState("");
	// const [newPassword, setNewPassword] = useState("");
	// const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [linkedin, setLinkedin] = useState("");
	const [discord, setDiscord] = useState("");
	const [gitHub, setGitHub] = useState("");
	const [feedback, setFeedback] = useState({ message: "", type: "" });
	const fileInputRef = useRef(null);
	const [submit, setSubmit] = useState(false);
	const { user_id } = useAuth(auth => auth.getInfoToken());
	const token = useAuth(auth => auth.token);
	const newPassword = watch("newPassword");
	const confirmNewPassword = watch("confirmNewPassword");
	const isButtonDisabled = !newPassword || newPassword !== confirmNewPassword;

	useEffect(() => {
		const controller = new AbortController();

		getUserService(controller.signal, user_id, token)
			.then(user => {
				setEmail(user?.email);
				setFirstName(user?.first_name);
				setLastName(user?.last_name);
				setProfileImage(user?.profile_picture);
				setGitHub(user?.social_networks_links.github);
				setDiscord(user?.social_networks_links.discord);
				setLinkedin(user?.social_networks_links.linkedin);
			})
			.catch(err => console.log(err));
	}, [user_id, token]);

	useEffect(() => {
		if (!user_id || !submit) return;

		const controller = new AbortController();

		updateUserService(controller.signal, user_id, token, {
			first_name: firstName,
			last_name: lastName,
			email: email,
			social_networks_links: {
				github: gitHub,
				discord,
				linkedin
			}
		})
			.then(() => {})
			.catch(err => console.log(err))
			.finally(() => setSubmit(false));
	}, [submit]);

	const handleSubmit = e => {
		e.preventDefault();
		setSubmit(true);
	};

	const handleImageChange = e => {
		const file = e.target.files[0];
		setProfileImage(file);
		if (file) {
			setPreviewImage(URL.createObjectURL(file));
		}
	};
	const handleImageClick = () => {
		fileInputRef.current.click();
	};

	if (!user_id) return null;

	return (
		<Container className="mt-4 p-0 h-auto">
			<Card className="w-100  w-md-75 w-lg-50 mb-4 mx-auto">
				<Card.Header as="h4" className="text-center">
					Información personal
				</Card.Header>
				<Card.Body>
					<Form onSubmit={handleSubmit}>
						<Row className="mb-3">
							<Col md={4} className="d-flex flex-column align-items-center">
								<Form.Group controlId="profileImage">
									<Form.Control
										type="file"
										accept="image/*"
										className="custom-imgProfile"
										onChange={handleImageChange}
										ref={fileInputRef}
									/>
								</Form.Group>
								<div className="flex-fill">
									<img
										id="profilePic"
										src="/perfil.png"
										alt="Foto de perfil"
										className="img-thumbnail mb-3 align-self-center"
										onClick={handleImageClick}
									/>
									<p className="text-center fw-bold">{previewName}</p>
								</div>
							</Col>
							<Col md={8} className="border-start">
								<Form.Label as="h5">Datos Personales</Form.Label>
								<Form.Group className="mb-3" controlId="firstname">
									<Form.Label className="fw-bold p-0">Nombre</Form.Label>
									<Col sm="8">
										<Form.Control
											type="text"
											name="firstName"
											value={firstName}
											placeholder="Ejemplo: Juan"
											onChange={e => setFirstName(e.target.value)}
											className="custom-form-control"
										/>
									</Col>
								</Form.Group>
								<Form.Group className="mb-3" controlId="lastName">
									<Form.Label className="fw-bold p-0">Apellido</Form.Label>
									<Col sm="8">
										<Form.Control
											type="text"
											name="lastName"
											value={lastName}
											placeholder="Ejemplo: Perez"
											onChange={e => setLastName(e.target.value)}
											className="custom-form-control"
										/>
									</Col>
								</Form.Group>
								<Form.Group className="mb-3" controlId="personalId">
									<Form.Label className="fw-bold p-0">Número de DNI</Form.Label>
									<Col sm="8">
										<Form.Control
											type="text"
											name="personalId"
											value={personalId}
											placeholder="Ejemplo: 32526874"
											pattern="[0-9]*"
											maxLength="8"
											onChange={e => setPersonalId(e.target.value)}
											className="custom-form-control"
										/>
									</Col>
								</Form.Group>

								<Form.Group className="mb-3" controlId="email">
									<Form.Label className="fw-bold p-0">Email</Form.Label>
									<Col sm="8" className="d-flex align-items-center">
										<span className="input-group-text" id="basic-addon1">
											<MdOutlineAlternateEmail />
										</span>
										<Form.Control
											className="custom-form-control1"
											type="email"
											name="email"
											value={email}
											placeholder="ejemplo@gmail.com"
											onChange={e => setEmail(e.target.value)}
										/>
									</Col>
								</Form.Group>
								<hr />
								<Form.Label as="h5">Cambio de contraseña</Form.Label>
								<Form.Group className="mb-3" controlId="password">
									<Form.Label className="fw-bold p-0">Password</Form.Label>
									<Col sm="8" className="d-flex align-items-center">
										<Form.Control
											type="password"
											name="password"
											value={password}
											placeholder="Introducir contraseña"
											onChange={e => setPassword(e.target.value)}
											className="custom-form-control"
										/>
									</Col>
								</Form.Group>
								<Form.Group className="mb-3" controlId="newPassword">
									<Form.Label className="fw-bold p-0">
										Nueva password
									</Form.Label>
									<Col sm="8" className="d-flex align-items-center">
										<Form.Control
											type="password"
											name="newPassword"
											placeholder="Introducir nueva contraseña"
											className="custom-form-control"
											{...register("newPassword", {
												minLength: {
													value: 6,
													message: "La contraseña debe ser mayor a 6 caracteres"
												}
											})}
										/>
										{errors.newPassword && (
											<span className="text-danger">
												{errors.newPassword.message}
											</span>
										)}
									</Col>
								</Form.Group>

								<Form.Group className="mb-3" controlId="confirmNewPassword">
									<Form.Label className="fw-bold p-0">
										Repetir nueva password
									</Form.Label>
									<Col sm="8" className="d-flex align-items-center">
										<Form.Control
											type="password"
											name="confirmPassword"
											placeholder="Introducir nueva contraseña de nuevo"
											className="custom-form-control"
											{...register("confirmNewPassword", {
												validate: value =>
													value === newPassword ||
													"Las contraseñas no coinciden"
											})}
										/>
										{errors.confirmNewPassword && (
											<p className="text-danger">
												{errors.confirmNewPassword.message}
											</p>
										)}
									</Col>
								</Form.Group>
								<hr />
								<Form.Label as="h5">Redes sociales</Form.Label>
								<Form.Group className="mb-3" controlId="discord">
									<Form.Label className="fw-bold p-0">
										Usuario de Discord
									</Form.Label>
									<Col sm="8" className="d-flex align-items-center">
										<span className="input-group-text" id="basic-addon1">
											<FaDiscord />
										</span>
										<Form.Control
											type="text"
											name="discord"
											value={discord}
											placeholder="juanperez"
											onChange={e => setDiscord(e.target.value)}
											className="custom-form-control1"
										/>
									</Col>
								</Form.Group>

								<Form.Group className="mb-3" controlId="linkedin">
									<Form.Label className="fw-bold p-0">Linkedin</Form.Label>
									<Col sm="8" className="d-flex align-items-center">
										<span className="input-group-text" id="basic-addon1">
											<FaLinkedin />
										</span>
										<Form.Control
											type="url"
											name="linkedin"
											value={linkedin}
											placeholder="https://www.linkedin.com/in/ejemplo"
											onChange={e => setLinkedin(e.target.value)}
											className="custom-form-control1"
										/>
									</Col>
								</Form.Group>
								<Form.Group className="mb-3" controlId="gitHub">
									<Form.Label className="fw-bold p-0">GitHub</Form.Label>
									<Col sm="8" className="d-flex align-items-center">
										<span className="input-group-text" id="basic-addon1">
											<FaGithub />
										</span>
										<Form.Control
											type="url"
											name="gitHub"
											value={gitHub}
											placeholder="https://github.com/ejemplo"
											onChange={e => setGitHub(e.target.value)}
											className="custom-form-control1"
										/>
									</Col>
								</Form.Group>
							</Col>
						</Row>
						<div className="d-flex justify-content-center">
							<Button type="submit" variant="dark" className="mt-4">
								Guardar Cambios
							</Button>
						</div>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
}
