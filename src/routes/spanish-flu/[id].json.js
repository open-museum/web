import rooms from './_rooms.js';

const lookup = new Map();
rooms.forEach(room => {
	lookup.set(room.id, JSON.stringify(room));
});

export function get(req, res, next) {
	// the `id` parameter is available because
	// this file is called [id].json.js
	const { id } = req.params;

	if (lookup.has(id)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(id));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
