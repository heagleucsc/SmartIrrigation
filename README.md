2017-07-18
Pulling Data from Server API
- upon construct main:
	- get the nodes' id's from the return the json file upon login into a datatype so i can build my sliding bar with the node's id.
	- get the lateest reading for Humidity, Temperature, Moisture, Light, for a specific Id

- a function to
	- /api/nodes/prev_24h/:nid - POST :this would be use to parse into the graph extract 24 value in the past day, 1 hour apart in to a datatype to be parsed into graph
	- /api/nodes/prev_24h/:nid - POST :this would be use to parse into the graph extract 30 value in past 1 hour, 2min apart in to a datatype to be parsed into graph