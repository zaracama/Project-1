import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DigiDex = () => {
	const [digimons, obtainDigimons] = useState([]);
	const [searchTerm, obtainSearchTerm] = useState("");
	const [sortOrder, obtainSortOrder] = useState("asc");
	const [currentPage, obtainCurrentPage] = useState(1);
	const [totalPages, obtainTotalPages] = useState(0);

	const fetchData = useCallback(async () => {
		try {
			const params = {
				name: searchTerm,
				sort: "name",
				order: sortOrder,
				page: currentPage,
			};
			const response = await axios.get(
				"http://localhost:3157/digimons",
				{
					params,
				}
			);
			obtainDigimons(response.data.digimons);
			obtainTotalPages(response.data.totalPages);
		} catch (error) {
			console.error(error);
		}
	}, [searchTerm, sortOrder, currentPage]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const accessSearchChange = (e) => {
		obtainSearchTerm(e.target.value);
		obtainCurrentPage(1);
	};

	const accessSortChange = (e) => {
		obtainSortOrder(e.target.value);
		obtainCurrentPage(1);
	};

	const page = (pageNumber) => obtainCurrentPage(pageNumber);

	return (
		<div className='mb-8'>
			<div className='mb-4 flex items-center'>
				<input
					type='text'
					placeholder='Search Digimon...'
					value={searchTerm}
					onChange={accessSearchChange}
					className='p-2 border border-yellow-300 rounded-md flex-grow'
				/>
				<button
					onClick={() => fetchData()}
					className='ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:shadow-outline'>
					Search
				</button>
			</div>

			<div className='mb-4 flex items-center'>
				<label className='mr-2 text-yellow-600'>Sort by Name:</label>
				<select
					value={sortOrder}
					onChange={accessSortChange}
					className='p-2 border border-yellow-300 rounded-md'>
					<option value='asc'>ASC</option>
					<option value='desc'>DSC</option>
				</select>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{digimons.map((digimon) => (
					<Link
						to={`/digimons/${digimon.id}`}
						key={digimon.id}
						className='hover:no-underline'>
						<div className='bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105'>
							<img
								src={digimon.image}
								alt={digimon.name}
								className='w-full h-32 object-cover mb-2 rounded-md'
							/>
							<h3 className='text-lg font-semibold mb-1'>{digimon.name}</h3>
							<p className='text-yellow-500 text-sm'>
								Type: {digimon.type}, Attribute: {digimon.attribute}
							</p>
						</div>
					</Link>
				))}
			</div>

			<div className='mt-4'>
				<ul className='flex space-x-2'>
					{Array.from({ length: totalPages }).map((_, index) => (
						<li
							key={index}
							className={`px-2 py-1 border ${
								currentPage === index + 1 ? "bg-red-500 text-white" : ""
							} cursor-pointer rounded-md`}
							onClick={() => page(index + 1)}>
							{index + 1}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default DigiDex;