import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { geCourseByIdService } from "./service/geCourseByIdService.js";
import { Row, Col, Table } from "react-bootstrap";
import { PiCheckFatDuotone } from "react-icons/pi";
import YouTubePlayer from "react-player/youtube.js";
import "./module.css";

export default function CourseDetails() {
	const { id } = useParams();
	const [course, setCourse] = useState();
	const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
	const [completedModules, setCompletedModules] = useState({});

	useEffect(() => {
		if (!id) return;

		const controller = new AbortController();

		geCourseByIdService(controller.signal, id)
			.then(data => {
				setCourse(data);
				if (data.course.modules.length > 0) {
					setCurrentVideoId(extractVideoId(data.course.modules[0].video_url));
				}
			})
			.catch(err => console.log(err));

		return () => controller.abort();
	}, [id]);

	useEffect(() => {
		const savedProgress = JSON.parse(
			localStorage.getItem(`course_${id}_progress`) || "{}"
		);
		setCompletedModules(savedProgress);
	}, []);

	useEffect(() => {
		localStorage.setItem(
			`course_${id}_progress`,
			JSON.stringify(completedModules)
		);
	}, [completedModules, id]);

	const handleModuleClick = index => {
		setSelectedModuleIndex(index);
	};

	const handleVideoEnd = index => {
		setCompletedModules(prevState => ({
			...prevState,
			[index]: true
		}));
	};

	if (!course) return null;

	return (
		<article className="mb-5">
			<Row>
				<h1 className="tituloCurso _courseh1_1317y_147 m-5 d-flex justifiy-content-left">
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
								onClick={() => handleModuleClick(index)}
							>
								<td className="p-3 filaModulo">
									<span className="iconoModulo">
										Clase {index + 1}: {module.title}
										{completedModules[index] && (
											<span className="ms-2 tilde">
												<PiCheckFatDuotone />
											</span>
										)}
									</span>
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
							controls={true}
							onEnded={() => handleVideoEnd(selectedModuleIndex)}
						/>
					</div>
				</Col>
			</Row>
		</article>
	);
}
