import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Payments.css"

// Definición del componente Btn
const Btn = ({ children, className, ...props }) => {
	return (
		<button className={`btn ${className}`} {...props}>
			{children}
		</button>
	);
};

// Definición del componente InputText
const InputText = ({ id, placeholder, ...props }) => {
	return (
		<input
			type="text"
			className="form-control"
			id={id}
			placeholder={placeholder}
			{...props}
		/>
	);
};

export default function Payments() {
	const { register, handleSubmit, formState: { errors } } = useForm();

	// Función para manejar el envío de los datos del formulario
	const onSubmit = async (paymentData) => {
		try {
			const response = await fetch("/api/payment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(paymentData)
			});
			const result = await response.json();
			console.log("Pago realizado:", result);
		} catch (error) {
			console.error("Error en el pago:", error);
		}
	};

	return (
		<div className="containerPayment br-auto"> <br />
			<h2 className="text-center mb-4">Pago con Tarjeta de Crédito</h2>
			<form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3">
					<label htmlFor="cardName" className="form-label">Nombre en la Tarjeta</label>
					<InputText
						id="cardName"
						placeholder="Nombre completo"
						{...register("cardName", { required: true })}
					/>
					{errors.cardName && <p className="text-danger">Este campo es obligatorio</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="cardNumber" className="form-label">Número de Tarjeta</label>
					<InputText
						id="cardNumber"
						placeholder="1234 5678 9012 3456"
						{...register("cardNumber", { required: true, pattern: /^\d{16}$/ })}
					/>
					{errors.cardNumber && <p className="text-danger">Número de tarjeta no válido</p>}
				</div>
				<div className="row">
					<div className="col-md-6 mb-3">
						<label htmlFor="expiryDate" className="form-label">Fecha de Expiración</label>
						<InputText
							id="expiryDate"
							placeholder="MM/YY"
							{...register("expiryDate", { required: true, pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/ })}
						/>
						{errors.expiryDate && <p className="text-danger">Formato de fecha no válido</p>}
					</div>
					<div className="col-md-6 mb-3">
						<label htmlFor="cvv" className="form-label">CVV</label>
						<InputText
							id="cvv"
							placeholder="123"
							{...register("cvv", { required: true, pattern: /^\d{3}$/ })}
						/>
						{errors.cvv && <p className="text-danger">El CVV debe tener 3 dígitos</p>}
					</div>
				</div>
				<Btn className="btn btn-primary w-100" type="submit">
					Realizar Pago
				</Btn>
			</form>
		</div>
	);
}
