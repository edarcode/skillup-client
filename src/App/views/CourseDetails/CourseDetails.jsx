import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { geCourseByIdService } from "./service/geCourseByIdService.js";
import { Row, Col, Table } from "react-bootstrap";
import YouTubePlayer from "react-player/youtube.js";
import "./module.css";

export default function CourseDetails() {
	const { id } = useParams();
	const [course, setCourse] = useState();
	const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);

	useEffect(() => {
		if (!id) return;

		const controller = new AbortController();

		geCourseByIdService(controller.signal, id)
			.then(data => setCourse(data))
			.catch(err => console.log(err));

		return () => controller.abort();
	}, [id]);

	if (!course) return null;
	const handleModuleClick = index => {
		setSelectedModuleIndex(index);
	};

	return (
		<article>
			<Row>
				<h1 className="_greenText_18we7_5 _courseh1_1317y_147 m-5 d-flex justifiy-content-left">
					{course.course.title}
				</h1>
			</Row>
			<Row>
				<Col md={3}>
					<Table striped bordered hover className="table-borderless fs-5 mx-5">
						{course.course.modules.map((module, index) => (
							<tr
								key={module.id}
								className={`fila${index % 2 === 0 ? "Par" : "Impar"} row-spacing align-items-center`}
								onClick={() => handleModuleClick(index)} // Cambiar el módulo al hacer clic
								style={{ cursor: "pointer" }}
							>
								<td>
									Clase {index + 1}: {module.title}
								</td>
							</tr>
						))}
					</Table>
				</Col>
				<Col md={9}>
					<div className="video-container d-flex justify-content-center">
						<YouTubePlayer
							className="YouTubePlayer"
							url={course.course.modules[selectedModuleIndex].video_url}
						/>
					</div>
				</Col>
			</Row>
		</article>
	);
}
