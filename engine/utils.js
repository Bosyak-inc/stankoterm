function SubMenu(bt, mn, txt, st = 0) {
	this.stat   = st;
	this.button = bt;
	this.menu   = mn;
	this.text   = txt;
}

function toggleSub(sm) {
	if (sm.stat === 0) {
		sm.stat = 1;
		sm.menu.style.display = "block";
		sm.text.className = "fa fa-angle-up";
	} else {
		sm.stat = 0;
		sm.menu.style.display = "none";
		sm.text.className = "fa fa-angle-down";
	}
}

document.addEventListener('DOMContentLoaded', () => {
	let goupBtn = document.getElementById("go_up");

	window.onscroll = function() {
		let offset = window.pageYOffset;
		if (offset > 103) {
			goupBtn.style.opacity = "0.5";
			goupBtn.style.display = "block";
			goupBtn.style.top = "0";
		// } else if (offset < 70 && offset > 40) {
		// 	goupBtn.style.opacity = "0.3";
		// 	goupBtn.style.display = "block";
		// } else if (offset < 40 && offset > 10) {
		// 	goupBtn.style.opacity = "0.1";
		// 	goupBtn.style.display = "block";
		} else {
			goupBtn.style.opacity = "0";
			goupBtn.style.display = "none";
		}
	};

	goupBtn.addEventListener('click', function () {
		window.scrollBy({
			top: -document.documentElement.scrollHeight,
			behavior: 'smooth'
		});
	});
});
