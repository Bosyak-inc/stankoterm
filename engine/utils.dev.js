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
		elem: "",
		height: "",
		ws: "",
		wsPaddingLeft: "",
		wsX: "",

		move() {
			let yOffset = window.pageYOffset
			if (yOffset > headerHeight) {
				this.elem.style.zIndex = "10000";
				this.elem.style.position = "fixed";
				this.elem.style.top = 0 + 'px';
				this.elem.style.left = 0 + 'px';
				// menu.menu.style.transform = "translate(" + (-menu.Left) + "px)";
				this.elem.style.borderTopLeftRadius = 0 + 'px';
				this.elem.style.width = "100%";
				this.elem.style.borderTop = "none";
				this.elem.style.clear = "both";

				this.ws.style.paddingLeft = this.wsPaddingLeft + this.wsX + 'px';
			} else if (yOffset <= headerHeight) {
				this.elem.style.position = "";
				this.elem.style.left = "";
				this.elem.style.top = "";
				this.elem.style.width = "";
				this.elem.style.borderTop = "";
				this.elem.style.borderTopLeftRadius = "";
				this.elem.style.clear = "";

				this.ws.style.paddingLeft = "";
			}
		}
	};
	menu.elem = document.getElementById("menu");
	menu.height = elemHeight(menu.elem);
	menu.ws = menu.elem.getElementsByClassName("ws")[0];
	menu.wsPaddingLeft = getPadding(menu.ws).left;
	menu.wsX = getOffset(menu.ws).left;


	let goup = {
		elem: "",
		treshold: "",

		move() {
			if (window.pageYOffset >= this.treshold) {
				this.elem.style.opacity = 0.5;
				this.elem.style.display = 'block';
			} else {
				this.elem.style.display = 'none';
			}
		}
	};
	goup.elem = document.getElementById("go_up");
	goup.treshold = headerHeight;
	goup.elem.addEventListener('click', () => {window.scrollBy({top: -document.documentElement.scrollHeight,behavior: 'smooth'});});

	let nav = {
		elem: "",
		y: headerHeight,

		move() {
			this?.elem?.style.top = posScroll(this.y, menu.height-1);
		}
	};
	nav.elem = document.getElementById("nav");

	goup.move();
	nav.move();
	menu.move();
	window.addEventListener('scroll', function() {
		goup.move();
		nav.move();
		menu.move();
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
