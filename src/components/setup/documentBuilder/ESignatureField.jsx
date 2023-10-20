import SignatureCanvas from "react-signature-canvas";

const ESignatureField = (props) => {
	const { handleSetESignCanvasRef, handleSetSignUrl } = props;

	return (
		<div
			className='e-sign-container'
			onClick={handleSetSignUrl}
		>
			<div className='e-sign-label'>E-signature</div>
			<SignatureCanvas
				ref={handleSetESignCanvasRef}
				canvasProps={{ className: "e-sign-canvas" }}
			/>
		</div>
	);
};

export default ESignatureField;
