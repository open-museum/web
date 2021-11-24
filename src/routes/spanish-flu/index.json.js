import rooms from './_rooms.js';

export function get() {
	response = JSON.stringify(rooms);
	return { body: response };
}
