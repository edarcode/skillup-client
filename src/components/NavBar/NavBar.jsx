import { Navbar, Nav, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./NavBar.css";
import { Link, useLocation } from "react-router-dom";
import {
	ABOUT,
	CATALOGUE,
	INICIO,
	LOGIN,
	MY_COURSES,
	USER_PROFILE
} from "../../App/router/children";
import { useAuth } from "../../auth/useAuth.js";
import Logo from "../Logo/Logo.jsx";

function NavBar() {
	//Acerca de Nosotros
	const logout = useAuth(auth => auth.logout);
	const token = useAuth(auth => auth.token);
	const { pathname } = useLocation();

	if (pathname === "/about") {
		return (
			<Navbar
				className="custom-navbar  border-bottom"
				bg="light"
				variant="light"
				expand="lg"
			>
				<Container className="justify-content-center">
					<Navbar.Brand
						as={Link}
						to={INICIO.path}
						className="d-flex align-items-center  mx-auto"
					>
						<img
							src={logo3}
							width="100"
							height="100"
							className={`d-inline-block align-top obj-cover`}
							alt="logo"
						/>
						<span className="ms-2 fs-4 fw-bold">{`<Skill Up>`}</span>{" "}
					</Navbar.Brand>
				</Container>
			</Navbar>
		);
	}
	if (pathname === "/perfil") {
		return (
			<Navbar
				className="custom-navbar  border-bottom"
				bg="light"
				variant="light"
				expand="lg"
			>
				<Container>
					<Navbar.Brand
						as={Link}
						to={INICIO.path}
						className="d-flex align-items-center"
					>
						<img
							src={logo3}
							width="100"
							height="100"
							className="d-inline-block align-top"
							alt="logo"
						/>
						<span className="ms-2 fs-4 fw-bold">{`<Skill Up>`}</span>{" "}
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mx-auto"></Nav>
						<Nav className="ms-auto">
							{/* <Nav.Link href="#Recomendaciones">
								<Button variant="light" size="md">
									Recomendaciones
								</Button>
							</Nav.Link> */}
							<Nav.Link href="#CursosDisponibles">
								<Button variant="light" size="md">
									Cursos Disponibles
								</Button>
							</Nav.Link>
							<Nav.Link href="#Dashboard">
								<Button variant="light" size="md">
									Dashboard
								</Button>
							</Nav.Link>
							<Nav.Link href="#Certificados">
								<Button variant="light" size="md">
									Certificados
								</Button>
							</Nav.Link>
							<Nav.Link href="#Favoritos">
								<Button variant="light" size="md">
									Favoritos
								</Button>
							</Nav.Link>
							<Nav.Link as={Link} to={USER_PROFILE.path}>
								<Button
									variant="light"
									size="md"
									className="d-flex align-items-center"
								>
									<FaUserCircle size={24} />
									<span className="ms-2">Perfil</span>
								</Button>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}

	if (pathname === "/mis-cursos") {
		return (
			<Navbar
				className="custom-navbar  border-bottom"
				bg="light"
				variant="light"
				expand="lg"
			>
				<Container>
					<Navbar.Brand
						as={Link}
						to={INICIO.path}
						className="d-flex align-items-center"
					>
						<img
							src={logo3}
							width="100"
							height="100"
							className="d-inline-block align-top"
							alt="logo"
						/>
						<span className="ms-2 fs-4 fw-bold">{`<Skill Up>`}</span>{" "}
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mx-auto"></Nav>
						<Nav className="ms-auto">
							<Nav.Link href="#Recomendaciones">
								<Button variant="light" size="md">
									Recomendados
								</Button>
							</Nav.Link>
							<Nav.Link href="#CursosDisponibles" as={Link} to={CATALOGUE.path}>
								<Button variant="light" size="md">
									Cursos
								</Button>
							</Nav.Link>

							<Nav.Link href="#MisCursos">
								<Button variant="light" size="md">
									Mis Cursos
								</Button>
							</Nav.Link>

							<Nav.Link href="#Favoritos">
								<Button variant="light" size="md">
									Favoritos
								</Button>
							</Nav.Link>
							<Nav.Link href="#Contact">
								<Button variant="light" size="md">
									Contacto
								</Button>
							</Nav.Link>
							<Nav.Link as={Link} to={USER_PROFILE.path}>
								<Button
									variant="light"
									size="md"
									className="d-flex align-items-center"
								>
									<FaUserCircle size={24} />
									<span className="ms-2">Perfil</span>
								</Button>
							</Nav.Link>
							<div className="d-flex ms-3 align-items-center">
								{/* SignUp == vista registro */}
								<Nav.Link as={Link} to={LOGIN.path} className="p-0">
									<Button
										variant="dark"
										size="md"
										className="me-2 p-2"
										onClick={logout}
									>
										Cerrar Sesión
									</Button>
								</Nav.Link>
							</div>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
	if (pathname === "/login") {
		return (
			<Navbar
				className="custom-navbar  border-bottom"
				bg="light"
				variant="light"
				expand="lg"
			>
				<Container className="justify-content-center">
					<Navbar.Brand
						as={Link}
						to={INICIO.path}
						className="d-flex align-items-center mx-auto"
					>
						<img
							src={logo3}
							width="100"
							height="100"
							className="d-inline-block align-top"
							alt="logo"
						/>
						<span className="ms-2 fs-4 fw-bold">{`<Skill Up>`}</span>{" "}
					</Navbar.Brand>
				</Container>
			</Navbar>
		);
	}

	if (pathname === "/registro") {
		return (
			<Navbar
				className="custom-navbar  border-bottom"
				bg="light"
				variant="light"
				expand="lg"
			>
				<Container>
					<Navbar.Brand
						as={Link}
						to={INICIO.path}
						className="d-flex align-items-center"
					>
						<img
							src={logo3}
							width="100"
							height="100"
							className="d-inline-block align-top"
							alt="logo"
						/>
						<span className="ms-2 fs-4 fw-bold">{`<Skill Up>`}</span>{" "}
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mx-auto"></Nav>
						<Nav className="ms-auto">
							<Nav.Link href="#CursosDisponibles">
								<Button variant="light" size="md">
									Cursos Disponibles
								</Button>
							</Nav.Link>
							<Nav.Link href="#Contact">
								<Button variant="light" size="md">
									Contacto
								</Button>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}

	//inicio
	return (
		<Navbar
			className="custom-navbar border-bottom"
			bg="light"
			variant="light"
			expand="lg"
		>
			<Container>
				<Logo />

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link href="#Somos" as={Link} to={ABOUT.path}>
							<Button variant="light" size="md">
								Acerca de nosotros
							</Button>
						</Nav.Link>

						{pathname === INICIO.to && (
							<Nav.Link href="#Recomendaciones">
								<Button variant="light" size="md">
									Recomendaciones
								</Button>
							</Nav.Link>
						)}

						<Nav.Link href="#CursosDisponibles" as={Link} to={CATALOGUE.path}>
							<Button variant="light" size="md">
								{CATALOGUE.name}
							</Button>
						</Nav.Link>

						{(pathname === MY_COURSES.to || pathname === INICIO.to) && (
							<Nav.Link href="#Contact">
								<Button variant="light" size="md">
									Contacto
								</Button>
							</Nav.Link>
						)}

						{token && (
							<Nav.Link as={Link} to={USER_PROFILE.to}>
								<Button variant="light" size="md">
									{USER_PROFILE.name}
								</Button>
							</Nav.Link>
						)}

						{token && (
							<Nav.Link as={Link} to={MY_COURSES.to}>
								<Button variant="light" size="md">
									{MY_COURSES.name}
								</Button>
							</Nav.Link>
						)}

						<div className="d-flex ms-3 align-items-center">

							<Nav.Link as={Link} to={!token && LOGIN.to} className="p-0">
								<Button
									variant="dark"
									size="md"
									className="me-2 p-2"
									onClick={token && logout}
								>
									{token ? "Cerrar Sesión" : "Iniciar sesión"}

								</Button>
							</Nav.Link>
						</div>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
