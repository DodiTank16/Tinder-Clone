import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "./TinderCard.css"
import axios from './axios'

const TinderCards = () => {
	const [people, setPeople] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const req = await axios.get("/tinder/cards");
			setPeople(req.data)
		}
		fetchData();
	}, [])


	const swiped = (direction, nameToDelete) => {
		console.log("removing:" + nameToDelete);
		// setLastDirection(direction);
	};

	const outOfFrame = (name) => {
		console.log(name + "left the screen");
	};

	return (
		<>

			<div className="tinderCards">
				<div className="tinderCards__cardContainer">
					{people.map((person) => (
						<TinderCard
							className="swipe"
							key={person.name}
							preventSwipe={["up", "down"]}
							onSwipe={(dir) => swiped(dir, person.name)}
							onCardLeftScreen={() => outOfFrame(person.name)}
						>
							<div
								style={{ background: `white url(${person.imgUrl}) no-repeat fixed center` }}
								className="card"
							>
								<h3>{`${person.name}, ${person.age}`}</h3>
							</div>
						</TinderCard>
					))}
				</div>
			</div>
		</>

	);
};

export default TinderCards;
