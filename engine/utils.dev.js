function getOffset(elem) {
	let box = elem.getBoundingClientRect();
	let body = document.body;
	let docEl = document.documentElement;
	
	let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
	
	let clientTop = docEl.clientTop || body.clientTop || 0;
	let clientLeft = docEl.clientLeft || body.clientLeft || 0;
	
	let top = box.top + scrollTop - clientTop;
	let left = box.left + scrollLeft - clientLeft;
	
	return {
		top: top,
	    left: left
	};
}

function getPadding(el) {
	let style = el.currentStyle || window.getComputedStyle(el);
	return {
		left: parseInt(style.paddingLeft),
		right: parseInt(style.paddingRight),
		top: parseInt(style.paddingTop),
		bottom: parseInt(style.paddingBottom),
	};
}

function elemHeight(elem) {
	let style = getComputedStyle(elem);
	return elem.offsetHeight +
					parseInt(style.marginTop) +
					parseInt(style.marginBottom);
}

function elemWidth(elem) {
	let style = getComputedStyle(elem);
	return elem.offsetWidth +
					parseInt(style.marginRight) +
					parseInt(style.marginLeft);
}

function SubElem(button, subBlock, buttonSkin, state = 0) {
	this.state      = state;
	this.button     = button;
	this.subBlock   = subBlock;
	this.buttonSkin = buttonSkin;

	this.toggleSub = function() {
		if (this.state === 0) {
			this.state = 1;
			this.subBlock.style.display = "block";
			this.buttonSkin.style.transform = 'rotate(' + 180 + 'deg)';
		} else {
			this.state = 0;
			this.subBlock.style.display = "none";
			this.buttonSkin.style.transform = 'rotate(' + 0 + 'deg)';
		}
	};
}

function posScroll(y, zero = 0) {
	let diff = y - window.scrollY;
	if (diff < 0) {
		return zero + "px";
	} else {
		return diff + "px";
	}
}

function setupScroll() {
	const headerHeight = elemHeight(document.getElementById("header"));

	let menu = {
		menu: document.getElementById("menu"),
		Position: this.menu.style.position,
		LeftOffset: getOffset(this.menu).left,
		Left: this.menu.style.left,
		Top: this.menu.offsetTop,
		BorderTop: this.menu.style.borderTop,
		BorderTopLeftRadius: this.menu.style.borderTopLeftRadius,
		Y: this.menu.pageYOffset,
		Height: elemHeight(this.menu),

		ws: {
			ws: this.menu.getElementsByClassName("ws")[0],
			paddingLeft: "",
			x: "",
		}
	};

	menu.ws.paddingLeft = getPadding(menu.ws.ws).left;
	menu.ws.x = getOffset(menu.ws.ws).left;

	function menuMove() {
		if (window.pageYOffset > headerHeight) {
			menu.menu.style.zIndex = "10000";
			menu.menu.style.position = "fixed";
			menu.menu.style.top = posScroll(headerHeight);
			menu.menu.style.left = 0;
			// menu.menu.style.transform = "translate(" + (-menu.Left) + "px)";
			menu.menu.style.borderTopLeftRadius = 0 + 'px';
			menu.menu.style.width = "100%";
			menu.menu.style.borderTop = "none";
			menu.menu.style.clear = "both";

			menu.ws.ws.style.paddingLeft = menu.ws.paddingLeft + menu.ws.x + 'px';
		} else if (window.pageYOffset <= headerHeight) {
			menu.menu.style.position = menu.Position;
			menu.menu.style.left = menu.Left;
			// menu.menu.style.transform = "translate(" + (menu.Left) + "px)";
			menu.menu.style.top = menu.Top + 'px';
			menu.menu.style.width = "calc(100% - " + (menu.LeftOffset) + "px)";
			menu.menu.style.borderTop = menu.BorderTop;
			menu.menu.style.borderTopLeftRadius = menu.BorderTopLeftRadius;
			menu.menu.style.clear = "none";

			menu.ws.ws.style.paddingLeft = menu.ws.paddingLeft + 'px';
		}
	}

	function goupMove(goup, treshold) {
		if (window.pageYOffset >= treshold) {
			goup.style.opacity = 0.5;
			goup.style.display = 'block';
		} else {
			goup.style.display = 'none';
		}
	}
	let goup = document.getElementById("go_up");

	goup.addEventListener('click', function () {
		window.scrollBy({
			top: -document.documentElement.scrollHeight,
			behavior: 'smooth'
		});
	});

	let nav = {
		nav: document.getElementById("nav"),
		y: headerHeight,
	};

	function navMove(nav) {
		nav.nav.style.top = posScroll(nav.y, menu.Height);
	}

	if (!(nav.nav)) {
		navMove = function() {};
	}

	goupMove(goup, headerHeight);
	navMove(nav);
	menuMove();
	window.addEventListener('scroll', function() {
		goupMove(goup, headerHeight);
		navMove(nav);
		menuMove();
	});
}

function setupToglableMenus() {
	const buttonedC = document.getElementsByClassName("buttoned");
	if (!buttonedC) {
		return 1;
	}
	let buttoned = new Array(); 
	let i = 0;
	Array.from(buttonedC).forEach(function(el) {
		let button = el.getElementsByClassName("button-container")[0];;
		let subBlock = el.getElementsByClassName("subBlock")[0];
		let buttonSkin = button.getElementsByClassName("skin")[0];

		buttoned[i] = new SubElem(button, subBlock, buttonSkin, 0);
		let tmp = buttoned[i];
		buttoned[i].button.addEventListener("click", function(){ tmp.toggleSub(); });
		i++;
	});
}

function setupModals() {
	let om = document.getElementsByClassName("openModal");
	if (!om) {
		return 1;
	}
	var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
	Array.from(om).forEach(function(cb) {
		cb.addEventListener('click', function () {
			document.body.style.overflow = 'hidden';
			document.cb.style.marginLeft = scrollbar;
		});
	});

	let cm = document.getElementsByClassName("close");
	Array.from(cm).forEach(function(cb) {
		cb.addEventListener('click', function () {
			document.body.style.overflow = 'visible';
			Array.from(om).forEach(function(ob) {
				document.ob.style.marginLeft = '0px';
			});
		});
	});
}

function setupNewsDating() {
	const newsd = document.getElementsByClassName("news")[0];
	if (!newsd) {
		return 1;
	}
	let newsBlocks = newsd.getElementsByClassName("row-block");
	let i = 0;
	Array.from(newsBlocks).forEach(function(child) {
		if (i < 1) {
			child.classList.add("recent");
		}
		if (i < 10) {
			child.classList.add("last10years");
		}

		i++;
	});
}

function setupAnchoring() {
	const nav = document.getElementById("nav");
	if (!nav) {
		return 1;
	}
	const navLinks = nav.getElementsByTagName("a");
	for (let i = 0; i < navLinks.length; i++) {
		navLinks[i].addEventListener( 'click', function (event) {
			event.preventDefault();
			let href = this.getAttribute('href').substring(1);
			const scrollTarget = document.getElementById(href);
			const topOffset = document.querySelector('#menu').offsetHeight;
			const elementPosition = scrollTarget.getBoundingClientRect().top;
			const offsetPosition = elementPosition - topOffset;
			window.scrollBy({
				top: offsetPosition,
				behavior: 'smooth'
			});
			// event.preventDefault();
			// const blockId = event.target.getAttribute('href').substr(1);
			// document.getElementById(blockId).scrollIntoView({
			// 	behavior: 'smooth',
			// 	block: 'start',
			// 	inline: 'start',
			// });
		});
	}
}

document.addEventListener('DOMContentLoaded', () => {
	setupNewsDating();
	setupModals();
	setupToglableMenus();
});

window.onload = function() {
	setupScroll();
	setupAnchoring();
}
