export const transform = name => parse(document.querySelector(`[data-name="${name}"]`));

export function transformAll () {
	const jsonData = {};
	const allJSONs = fetchAll();
	allJSONs.forEach(el => jsonData[el.getAttribute("data-name")] = parse(el));
	return jsonData;
};

function fetchAll () {
	return [ ... document.querySelectorAll("[type='application/json']") ];
};

function parse (el) {
	let json;
	try {
		json = JSON.parse(el.innerHTML);
	} catch {
		json = {};
	};
	return json;
};