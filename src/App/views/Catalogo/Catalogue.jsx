import {
	Container,
	Row,
	Col,
	Button,
	Form,
	OverlayTrigger,
	Popover
} from "react-bootstrap";
import {
	FaPlayCircle,
	FaCloudDownloadAlt,
	FaCode,
	FaVideo
} from "react-icons/fa";
import { BiBarChartAlt } from "react-icons/bi";
import { MdOutlineComputer } from "react-icons/md";
import { IoIosInfinite, IoMdCheckmark } from "react-icons/io";
import { GoClock, GoHeart, GoHeartFill } from "react-icons/go";
import CarouselSU from "./CarouselSU";
import css from "./css.module.css";
import { useState, useEffect } from "react";
import CatalogueData from "./CatalogueData";
import { useOutletContext } from "react-router-dom";

const Catalogue = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [courses, setCourses] = useState([]);
	const { onFavoritesUpdate } = useOutletContext();
	const [favorites, setFavorites] = useState(() => {
		const savedFavorites = localStorage.getItem("favorites");
		return savedFavorites ? JSON.parse(savedFavorites) : []; //mi localStorage para los favoritos
	});
	const [loading, setLoading] = useState(true); //faltaria un icono
	const [popoverMessage, setPopoverMessage] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://skillup-pi83.onrender.com/api/courses" //(como integrar con services?)
				);
				const data = await response.json();
				if (data.message === "success") {
					setCourses(data.courses);
				} else {
					console.error("No carga información del curso");
				}
			} catch (error) {
				console.error("Falta información:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const handleSearchChange = e => setSearchTerm(e.target.value); //busqueda de curso
//fx para identificar favoritos compararlo con id de api mandar mensaje y llevarlo al local
	const handleFavoriteToggle = course => {
		setFavorites(prevFavorites => {
			const isFavorite = prevFavorites.some(fav => fav.id === course.id);
			const newFavorites = isFavorite
				? prevFavorites.filter(fav => fav.id !== course.id)
				: [...prevFavorites, course];

			setPopoverMessage(
				isFavorite ? "Se quitó de favoritos" : "Sumado a Favoritos"
			);
			onFavoritesUpdate(newFavorites);
			localStorage.setItem("favorites", JSON.stringify(newFavorites));

			return newFavorites;
		});
	};

	const extractVideoId = url => {
		const regex =
			/(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
		const matches = url.match(regex);
		return matches ? matches[3] : null;
	};

	const filteredCourses = courses.filter(course =>
		course.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (loading) return <h2>Estamos cargando los cursos...</h2>;

	return (
		<Container fluid className="cardContainer">
			<Row className="mx-auto w-75 text-center">
				<h1>
					Todos los cursos en un solo lugar, ¿qué te gustaría aprender hoy?
				</h1>
			</Row>

			<Form className={`${css.courseSearch} mb-4`}>
				<Form.Group controlId="search">
					<Form.Control
						className={css.formStyles}
						type="text"
						placeholder="Busca tu curso..."
						value={searchTerm}
						onChange={handleSearchChange}
					/>
				</Form.Group>
			</Form>

			{filteredCourses.map((course, index) => {
				const { title, price, description, modules } = course;
				const courseData = CatalogueData.find(item => item.title === title);
				if (!courseData) return null;
				const { calificacion, instructor, nivel, duracion, ejercicios } =
					courseData;
				const isFavorite = favorites.some(fav => fav.id === course.id);

				return (
					<Row key={index} className={css.courseRow}>
						<Row className={`align-items-center ${css.courseRowInside}`}>
							<Col lg={7}>
								<h2 className={css.courseh1}>
									{title}
									<OverlayTrigger
										trigger="click"
										placement="top"
										overlay={
											<Popover id="popover-basic">
												<Popover.Body>{popoverMessage}</Popover.Body>
											</Popover>
										}
									>
										<span
											onClick={() => handleFavoriteToggle(course)}
											className="ms-2"
										>
											{isFavorite ? (
												<GoHeartFill size={24} />
											) : (
												<GoHeart size={24} />
											)}
										</span>
									</OverlayTrigger>
								</h2>
								<div className={css.courseDescription}>
									<p>{description}</p>
									<p>{calificacion}</p>
									<p>
										<span className={css.courseTeacher}>INSTRUCTOR: </span>
										{instructor}
									</p>
								</div>
								<div className="d-flex justify-content-center">
									<Button className={`${css.btnSale} btn-secondary`}>
										Comprar a solo $ <span>{price}</span>
									</Button>
								</div>
							</Col>

							<Col className={css.cardCol}>
								<h2 className={css.detailh2}>Detalle del curso</h2>
								<ul>
									<li>
										<BiBarChartAlt /> {nivel}
									</li>
									<li>
										<FaPlayCircle /> {duracion}
									</li>
									<li>
										<FaCloudDownloadAlt /> Contenido descargable
									</li>
									<li>
										<FaCode /> {ejercicios}
									</li>
									<li>
										<IoIosInfinite /> Acceso sin vencimiento
									</li>
									<li>
										<GoClock /> Aprende a tu ritmo
									</li>
								</ul>
							</Col>
						</Row>

						<Row>
							<Col
								xs={12}
								className="d-flex flex-column align-items-center mt-5"
							>
								<h2 className={`text-center mt-5 ${css.contenth2}`}>
									Contenido validado por expertos
								</h2>
								<p className={css.contentParagraph}>
									Curso validado por expertos de la industria con las últimas
									actualizaciones
								</p>
								<div className={css.video}>
									<iframe
										width="560"
										height="315"
										src={`https://www.youtube.com/embed/${extractVideoId(modules[0]?.video_url)}`}
										title="Video del curso"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									></iframe>
								</div>
							</Col>
						</Row>

						<Col xs={12} className={css.cardCol}>
							<h2 className={`${css.detailh2} ${css.largeText}`}>
								En este curso aprenderás
							</h2>
							<ul>
								{modules.map(module => (
									<li key={module.id}>
										<IoMdCheckmark /> {module.title}
									</li>
								))}
							</ul>
						</Col>

						<Col xs={12} lg={12} className={css.cardCol}>
							<h2 className={css.contenth2}>Contenido del curso</h2>
							<h3 className={css.contenth3}>{modules.length} módulos</h3>
							<ul>
								{modules.map(module => (
									<li key={module.id} className="row">
										<span className="col-lg-2 col-xs-1">
											<MdOutlineComputer />
										</span>
										<p className="col-lg-6 col-xs-3">{module.title}</p>
										<span className="col-lg-2 col-xs-2">
											<FaVideo />
										</span>
									</li>
								))}
							</ul>
						</Col>

						<Col
							xs={12}
							className={`d-flex flex-column align-items-center ${css.who}`}
						>
							<h2 className={`text-center ${css.contenth2}`}>
								¿Quiénes pueden tomar este curso?
							</h2>
							<ul className={css.listWho}>
								<li>Todo aquel que quiera empezar su camino en programación</li>
								<li>Estudiantes que quieran reforzar sus conocimientos</li>
								<li>
									Cualquiera que busque una carrera en inteligencia artificial,
									ciencia de datos o desarrollo web
								</li>
							</ul>
						</Col>

						<Col className="d-flex justify-content-center mb-5">
							<Button variant="dark" className="css.btnSale">
								Suscríbete a solo $ <span>{price}</span>
							</Button>
						</Col>
					</Row>
				);
			})}

			<Row>
				<Col xs={12} md={6} lg={8} className="mx-auto">
					<h3 className={`text-center ${css.carouselh3}`}>
						Esto es lo que nuestros alumnos nos cuentan
					</h3>
					<CarouselSU />
					<h3 className={`text-center ${css.carouselh3b}`}>
						¡Únete a Skillup Hoy y Empieza a Aprender!
					</h3>
				</Col>
			</Row>
		</Container>
	);
};

export default Catalogue;
