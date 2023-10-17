import noRecords from "../../../../../assets/images/noRecords.svg";

const Documents = (props) => {
	return (
		<div className='contact-documents'>
			<h2 className='contact-documents-header'>Documents ({0})</h2>
			<div className='contact-documents-norecord'>
				<div className='no-records-content'>
					<img
						src={noRecords}
						className='noRecords'
						alt=''
					/>
					<h4 className='no-doc-txt'>No Document Builder Found</h4>
					<p className='no-doc-subtxt'>
						No Document Builder have been listed here yet
					</p>
				</div>
			</div>
		</div>
	);
};

export default Documents;
