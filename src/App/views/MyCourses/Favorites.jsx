import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import "./styles/Favorites.css";

const Favorites = () => {
	const { favorites, onFavoritesUpdate } = useOutletContext(); // Obtener los favoritos y la función para actualizar

	const toggleFavorite = id => {
		onFavoritesUpdate(favorites.filter(course => course.id !== id)); // Elimina el curso de favoritos
	};

	if (favorites.length === 0) {
		return (
			<>
				<Row className="text-center">
					<h1>Mis Cursos Favoritos</h1>
				</Row>
				<Row>
					<h2 className="favoritesNotYet">No tienes cursos favoritos aun.</h2>;
				</Row>
			</>
		);
	}

	return (
		<Container className="favoritesContainer">
			<Row className="text-center">
				<h1>Mis Cursos Favoritos</h1>
			</Row>
			<Row className="row-gap-3">
				{favorites.map((card, index) => (
					<Col xs={12} md={6} lg={4} key={index}>
						<Card className="mb-4">
							<div className="cardImg">
								<Card.Img
									variant="top"
									src={card.cover_image}
									className="imgCard--310x207"
								/>
								<Badge className="cardBadge" bg="primary">
									{card.duration} horas
								</Badge>
							</div>
							<Card.Body className="position-relative">
								<div className="d-flex align-items-start justify-content-between">
									<Card.Title className="favoritesTitle">
										{card.title}
									</Card.Title>
									{/* Mostrar estrella llena o vacía según el estado de favorito */}
									{favorites.some(fav => fav.id === card.id) ? (
										<FaStar
											className="star-icon"
											onClick={() => toggleFavorite(card.id)}
											style={{ cursor: "pointer", color: "gold" }}
										/>
									) : (
										<FaRegStar
											className="star-icon"
											onClick={() => toggleFavorite(card.id)}
											style={{ cursor: "pointer" }}
										/>
									)}
								</div>
								<Card.Text>{card.description}</Card.Text>
								<Card.Text>Costo: $ {card.price}</Card.Text>

								<Button variant="dark" className="favorites-btn">
									Ver más
								</Button>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default Favorites;
