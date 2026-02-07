document.getElementById("year").innerText = new Date().getFullYear();

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// TODO: Onload
const cookie = getCookie("1234");
const card = document.getElementById("card");
const buttons = [
	{
		title: "Submit a Flag",
		target: "submit-flag",
		logged: true,
	},
	{
		title: "Achievements",
		target: "achievements",
		logged: false,
	},
	{
		title: "Rankings",
		target: "rankings",
		logged: false,
	},
];

buttons.forEach((v) => {
	if (v.logged) {
		if (cookie != "") {
			const button = document.createElement("button");
			button.textContent = v.title;
			button.setAttribute("data-target", `pages/${v.target}.html`);
			button.classList = ["nav-btn"];
			card.appendChild(button);
		}
	} else {
		const button = document.createElement("button");
		button.textContent = v.title;
		button.setAttribute("data-target", `pages/${v.target}.html`);
		button.classList = ["nav-btn"];
		card.appendChild(button);
	}
});
