export function randomString(length = 7) {
	const slug = `01234AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz56789`;
	let random = '';

	for (let i = 0; i < length; i += 1) {
		random += slug.charAt(Math.ceil(Math.random() * slug.length))
	}
	return random;
}