import rooms from './_rooms.js';

export function get({ params }) {
	const { id } = params;
	const response = rooms.find((element) => element.id == id);
	return { body: response };
}
