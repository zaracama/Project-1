/** @format */

import HeaderBar from "../components/HeadBar";
import BottomSection from "../components/BottomSection";
import MainSection from "../components/MainSect";
import DigimonDex from "../components/DigiDex";

const HomePage = () => {
	return (
		<div>
			<HeaderBar />
			<div className='container mx-auto p-4'>
				<MainSection />
				<DigimonDex />
			</div>
			<BottomSection />
		</div>
	);
};

export default HomePage;