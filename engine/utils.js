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

function goupCheck(goup, treshold) {
	function goupScale(goup, state, opacity) {
		if (state === 1) {
			goup.style.opacity = opacity;
			goup.style.display = "block";
			goup.style.top = 0;
		} else {
			goup.style.display = "none";
		}
	}

	let offset = window.pageYOffset;
	if (offset >= treshold) {
		goupScale(goup, 1, 0.5);
	} else {
		goupScale(goup, 0, 0.5);
	}
}

function navMove(nav, navY) {
	let offset = window.scrollY;
	let diff = navY - offset;
	if (diff < 0) {
		nav.style.top = 0 + 'px';
	} else {
		// nav.style.top = (diff + nav.style.paddingTop) + 'px';
		nav.style.top = (diff) + 'px';
	}
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
			this.buttonSkin.className = "fa fa-angle-up";
		} else {
			this.state = 0;
			this.subBlock.style.display = "none";
			this.buttonSkin.className = "fa fa-angle-down";
		}
	};
}

window.onload = function() {
	const header = document.getElementById("header");
	const headerHeight = elemHeight(header);

	const nav = document.getElementById("nav");
	const navY = nav.offsetTop;

	const goupBtn = document.getElementById("go_up");

	window.onscroll = function() {
		goupCheck(goupBtn, headerHeight);
		navMove(nav, navY);
	};

	goupBtn.addEventListener('click', function () {
		window.scrollBy({
			top: -document.documentElement.scrollHeight,
			behavior: 'smooth'
		});
	});

	// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	const buttonedC = document.getElementsByClassName("buttoned");
	if (buttonedC) {
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

	// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
	document.querySelector('[href="#openModal"]').addEventListener('click', function () {
		document.body.style.overflow = 'hidden';
		document.querySelector('#openModal').style.marginLeft = scrollbar;
	});
	
	document.querySelector('[href="#close"]').addEventListener('click', function () {
		document.body.style.overflow = 'visible';
		document.querySelector('#openModal').style.marginLeft = '0px';
	});
}

document.addEventListener('DOMContentLoaded', () => {
	const news = document.getElementsByClassName("news")[0];
	let newsBlocks = news.getElementsByClassName("row-block");
	let i = 0;
	Array.from(newsBlocks).forEach(function(child) {
		if (i < 1) {
			child.classList.add("recent");
		}
		if (i < 10) {
			child.classList.add("last10years");
		}
		// child.classList.add("allnews");

		i++;
	});
});
