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
