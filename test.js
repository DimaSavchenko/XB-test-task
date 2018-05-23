 
// Please define a new JavaScript object called ‘Map’ that can be instantiated with ‘new’, using its constructor. The constructor takes one parameter - this list of cities and their latitudeitudes and longititudeitudes:
 
// “Nashville, TN”, 36.17, -86.78
// “New York, NY”, 40.71, -74.00
// “Atlanta, GA”, 33.75, -84.39
// “Denver, CO”, 39.74, -104.98
// “Seattle, WA”, 47.61, -122.33
// “Los Angeles, CA”, 34.05, -118.24
// “Memphis, TN”, 35.15, -90.05
 
// This ‘Map’ object should have the following methods:
 
// 1)      Return the name of the northernmost, easternmost, southernmost or westernmost city from the list, as requested by the caller.
 
// 2)      Pass longititude and latitude as parameters, and return the name of the city that is closest to that location.
 
// 3)      Return a single string containing just the state abbreviations from the list of cities, each separated by a space. The method should eliminate duplicate states. The result string should not have leading or trailing spaces.

class Map {

	constructor(cities) {
		this.cities = cities;

		this.directions = {
			northernmost: cities[0],
			easternmost:  cities[0],
			southernmost: cities[0],
			westernmost:  cities[0],
		};

		cities.map((city)=> {
			if(city.latitude > this.directions.northernmost.latitude) {
				this.directions.northernmost = city; 
			}

			if(city.latitude < this.directions.easternmost.latitude) {
				this.directions.easternmost = city; 
			}

			if(city.longititude > this.directions.southernmost.longititude) {
				this.directions.southernmost = city; 
			}

			if(city.longititude < this.directions.westernmost.longititude) {
				this.directions.westernmost = city; 
			}
		});
	}

	cityWithExtremeCity(direction) {
		return this.directions[direction];
	}

	nearest(latitude, longititude) {
		let distances = [];
		
		this.cities.map((city)=> {
			let d = Math.acos(Math.sin(city.latitude) * Math.sin(latitude) + Math.cos(latitude) * Math.cos(city.latitude) * Math.cos(city.longititude - longititude));
			distances.push(d);
		});

		let index = distances.indexOf(Math.min( ...distances ));

		return this.cities[index]
	}

	getStates() {
		let states = ""; 

		this.cities.map((city)=> {
			if(!states.includes(city.name.split(",")[1])) {
				states += city.name.split(",")[1];
			}
		});

		return states.substr(1);
	}
}

let map = new Map([
		{ name: "Nashville, TN", latitude: 36.17, longititude: -86.78 },
		{ name: "New York, NY", latitude: 40.71, longititude: -74.00 },
		{ name: "Atlanta, GA", latitude: 33.75, longititude: -84.39 },
		{ name: "Denver, CO", latitude: 39.74, longititude: -104.98 },
		{ name: "Seattle, WA", latitude: 47.61, longititude: -122.33 },
		{ name: "Los Angeles, CA", latitude: 34.05, longititude: -118.24 },
		{ name: "Memphis, TN", latitude: 35.15, longititude: -90.05 },
	]);

console.log(map.cityWithExtremeCity("northernmost"));

console.log(map.nearest(36.17, -86.78));

console.log(map.getStates());
