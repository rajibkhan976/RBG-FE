import styles from "./MultiSelector.module.css";
import { useEffect, useRef, useState } from "react";
import Loader from "../../Loader";

const MultiSelector = (props) => {
	const {
		className,
		clearControlLabel,
		errorMsg,
		handleSetSearchKey,
		isRequired,
		items,
		label,
		placeholder,
		searchKey,
		selectionInfo,
		selectedItems,
		setSelectedItems,
	} = props;
	const [showOptions, setShowOptions] = useState(false);
	const multiSelectRef = useRef(null);

	const handleSearch = (event) => {
		handleSetSearchKey(event.target.value);
	};

	const onChangeOption = (event) => {
		event.stopPropagation();
		setSelectedItems(event.target.value);
	};

	const clearSearchKey = () => {
		handleSetSearchKey("");
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				multiSelectRef.current &&
				!multiSelectRef.current.contains(event.target)
			) {
				setShowOptions(false);
			}
		}
		document.body.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.body.removeEventListener("mousedown", handleClickOutside);
		};
	}, [multiSelectRef]);

	return (
		<div className={className}>
			<div className={styles.multiSelectLabel}>
				{label} {isRequired && <span className='required'>*</span>}
			</div>
			<div
				className={
					styles.multiSelect +
					`${errorMsg ? " " + styles.multiSelectError : ""}`
				}
				ref={multiSelectRef}
			>
				<div
					className={styles.multiSelectPlaceholder}
					onClick={() => setShowOptions(!showOptions)}
				>
					{placeholder}
				</div>
				{showOptions && (
					<div className={styles.multiSelectOptions}>
						<div className={styles.multiSelectSearchBar}>
							<input
								type='text'
								className={styles.multiSelectSearchControl}
								onChange={(e) => handleSearch(e)}
								value={searchKey}
							/>
							<span
								className={styles.crossActionBtn}
								onClick={clearSearchKey}
							></span>
						</div>
						{!items ? (
							<Loader />
						) : (
							<div className={styles.multiSelectOptionBar}>
								{items?.map((item, index) => (
									<div
										className={styles.multiSelectOption}
										key={index}
									>
										<input
											className={styles.multiSelectOptionCheckbox}
											type='checkbox'
											value={item?.value}
											id={item?.value}
											onChange={(e) => onChangeOption(e)}
											checked={selectedItems?.some(
												(e) => e?.value === item?.value
											)}
										/>
										<label
											className={styles.multiSelectOptionLabel}
											htmlFor={item?.value}
										>
											{item?.label}
										</label>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
			{errorMsg && <span className={styles.errorMessage}>{errorMsg}</span>}
			{selectionInfo && (
				<div className={styles.multiSelectResultBlock}>
					<span className={styles.selectItemMsg}>{selectionInfo}</span>
					<span
						className={styles.clearControl}
						onClick={() => setSelectedItems(null)}
					>
						{clearControlLabel}
					</span>
				</div>
			)}
		</div>
	);
};

export default MultiSelector;
