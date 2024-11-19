// app.js
// Code by Ryohei.

;!(root => {

	// "Do Not Use the Global Namespace! Okay?"

	'use strict';

	function applyStyle(target, styles) {
		for(let key in styles) {
			target.style[key] = styles[key];
		}
	}

	/* ========== start define classes. ========== */

	function Modal(title, coverFlow, sections) {
		this.tid = null;
		this.tid2 = null;
		this.isFading = true;
		this.isScrolling = false;
		this.sections = sections || new Array();
		this.coverFlow = coverFlow;
		this.curtain = {
			element: document.createElement('div'),
				styles: {
					position: 'fixed',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					margin: 'auto',
					width: '100%',
					height: '130%',
					background: 'black',
					opacity: .7,
					zIndex: 1,
				}
		};
		this.curtain.element.addEventListener('click', e => {
			this.animatedScrollBack(0);
			this.fadeOut(this.modal.element);
		});
		applyStyle(this.curtain.element, this.curtain.styles);
		this.modal = {
			element: document.createElement('div'),
			styles: {
				padding: '20px',
				border: 'solid 1px #ddd',
				width: '650px',
				maxWidth: '75%',
				maxHeight: "65%",
				overflowY: "auto",
				position: 'absolute',
				top: '15%',
				right: 0,
				left: 0,
				margin: 'auto auto 15vh auto',
				background: '#232323',
				color: 'dodgerblue',
				opacity: 0,
				zIndex: 2,
				borderRadius: '10px',
			}
		};
		applyStyle(this.modal.element, this.modal.styles);
		this.btn = {
			element: document.createElement('div'),
			styles: {
				textAlign: 'center',
				bottom: 0,
				left: 0,
				right: 0,
				borderRadius: '10px',
				fontSize: '12px',
				background: '#0e0e0e',
				width: '120px',
				padding: '12px 0',
				textAlign: 'center',
				margin: 'auto',
				cursor: 'pointer',
				color: 'dodgerblue',
				userSelect: 'none',
			}
		};
		this.btn.element.innerHTML = 'Back';
		this.btn.element.addEventListener('click', e => {
			this.animatedScrollBack(0);
			this.fadeOut(this.modal.element);
		});
		applyStyle(this.btn.element, this.btn.styles);
		this.child = '\
		<div style="text-align: center; font-size: x-large;">' + title + '</div>\
		<table style="width: 100%; margin-top: 5%; margin-bottom: 5%;">';
		for(let i = 0; i < this.sections.length; i++) {
			this.child += '<tr>\
			<th style="font-size: 14px; padding: 10px; border: 1px solid #ddd; background: black; display: block; color: white;">' + String(this.sections[i][0]) + '</th>\
			<td style="font-size: 14px; text-align: center; color: dodgerblue; padding: 10px; border: 1px solid #ddd; background: #0e0e0e; display: block;">' + String(this.sections[i][1]) + '</td>\
			</tr>';
		}
		this.child += '</table>';
		this.modal.element.innerHTML = this.child;
		this.modal.element.appendChild(this.btn.element);
		document.body.appendChild(this.curtain.element);
		this.coverFlow.style.filter = 'blur(3px)';
		setTimeout(() => {
			this.isFading = false;
			document.body.appendChild(this.modal.element);
			this.fadeIn(this.modal.element);
			this.animatedScroll(this.modal.element.offsetTop / 2);
			this.coverFlow.style.filter = 'none';
		}, 300);
	}

	Modal.prototype.fadeIn = function(target) {
        
            root.scrollY = 0;
		if(!this.isFading) {
			this.isFading = true;
			var fadeIn = () => {
				target.style.opacity = Number(target.style.opacity) + 0.1;
				this.tid = setTimeout(() => {
					fadeIn();
				}, 50);
				if(target.style.opacity >= 1) {
					clearTimeout(this.tid);
					this.isFading = false;
					this.coverFlow.style.filter = 'blur(3px)';
				}
			}
			fadeIn();
		}
	}

	Modal.prototype.fadeOut = function(target) {
		if(!this.isFading) {
			this.isFading = true;
			this.coverFlow.style.filter = 'none';
			var fadeOut = () => {
				target.style.opacity = Number(target.style.opacity) - 0.15;	//for iPad safari bug fix.
				this.tid = setTimeout(() => {
					fadeOut();
				}, 35);
				if(Number(target.style.opacity) <= 0) {
					clearTimeout(this.tid);
					document.body.removeChild(this.curtain.element);
					document.body.removeChild(this.modal.element);
					this.isFading = false;
				}
			}
			fadeOut();
		} else {
			return;
		}
	}

	Modal.prototype.animatedScroll = function(y) {
		if(!this.isScrolling) {
			let cursor = root.pageYOffset;
			this.isScrolling = true;
			var scroll = () => {
				root.scrollTo(0, cursor+=5);
				this.tid2 = setTimeout(() => {
					scroll();
				}, 10);
				if(y <= cursor) {
					clearTimeout(this.tid2);
					this.isScrolling = false;
				}
			}
			scroll();
		} else {
			return;
		}
	}

	Modal.prototype.animatedScrollBack = function(y) {
		if(!this.isScrolling) {
			let cursor = root.pageYOffset;
			this.isScrolling = true;
			var scroll = () => {
				root.scrollTo(0, cursor-=5);
				this.tid2 = setTimeout(() => {
					scroll();
				}, 10);
				if(cursor <= y) {
					clearTimeout(this.tid2);
					this.isScrolling = false;
				}
                setTimeout(() => {
                    clearTimeout(this.tid2);
                    root.scrollTo(0, this.pageYOffset);
                }, 300);
			}
			scroll();
		} else {
			return;
		}
	}

	function Meter(backColor, meterColor, per) {
		var rand = Math.floor(Math.random() * (9999999999999999999 - 10000) + 10000);
		var seed = 'abcdefghijklmnopqrsuvwxyz';
		var retSeed = function() {
			return seed[Math.floor(Math.random() * seed.length)];
		}
		var mj = new String();
		for(let i = 0; i < 8; i++) {
			mj += retSeed();
		}
		rand = 'slide_' + mj + String(rand);
		var cssAnimation = document.createElement('style');
		cssAnimation.type = 'text/css';
		var rules = document.createTextNode('@keyframes ' + rand + ' {'+
		'0% { width: 0 }'+
		'100% { width:' + this.per + '; }'+
		'}');
		cssAnimation.appendChild(rules);
		document.getElementsByTagName("head")[0].appendChild(cssAnimation);
		this.per = per;
		this.meter_back = {
			element: document.createElement('div'),
			styles: {
				borderRadius: '5px',
				width: '90%',
				margin: 'auto',
				background: backColor,
				height: '6px',
				padding: '2px 0 1px 0'
			}
		};
		applyStyle(this.meter_back.element, this.meter_back.styles);
		this.meter = {
			element: document.createElement('div'),
			styles: {
				width: per,
				boxShadow: '0 0 3px #0e0e0e',
				margin: 0,
				padding: 0,
				borderRadius: '5px',
				background: meterColor,
				height: '4px',
				animation: rand + ' 1s ease 0s 1 normal'
			}
		};
		applyStyle(this.meter.element, this.meter.styles);
		this.meter_back.element.appendChild(this.meter.element);
		this.element = this.meter_back.element.outerHTML;
	}

	/* ========== end define classes. ========== */

	const roles = [
		"ハッカー(セキュリティ研究者)",
		"Webプログラマー",
		"フリーランスエンジニア",
		"Webマーケター",
	];
	  
	const roleElement = document.getElementById("role");
	let roleIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	const typingSpeed = 100;
	const pauseDuration = 2000;
	
	function typeEffect() {
		const currentRole = roles[roleIndex];
		roleElement.textContent = currentRole.substring(0, charIndex);
	  
		if (isDeleting) {
		  charIndex--;
		  if (charIndex < 0) {
			isDeleting = false;
			roleIndex = (roleIndex + 1) % roles.length;
		  }
		} else {
		  charIndex++;
		  if (charIndex > currentRole.length) {
			isDeleting = true;
			setTimeout(typeEffect, pauseDuration);
			return;
		  }
		}
	  
		setTimeout(typeEffect, isDeleting ? typingSpeed / 2 : typingSpeed);
	}

	let cover_flow = document.getElementById('cover_flow');

	let modal_show_1 = document.getElementById('modal-about');
	let modal_show_2 = document.getElementById('modal-skills');
	let modal_show_3 = document.getElementById('modal-experience');

	modal_show_1.addEventListener('click', function() {
		new Modal(this.innerHTML, cover_flow, [ 
			['<i class="fa fa-user"></i> whoami', 'RYOHEI YOSHIOKA'],
			['<i class="fa fa-birthday-cake"></i> Age', '23 y/o'],
			['<i class="fa fa-home"></i> From', 'Kashihara-City, nara, Japan <i class="fa fa-map-marker"></i>'],
			['<i class="fa fa-instagram"></i> 普通のお仕事依頼', '<a href="https://instagram.com/ryo2is">いんすた</a>'],
			['<i class="fa fa-user-secret"></i> 秘密の連絡はこちら', '<a href="https://simplex.chat/contact#/?v=2-7&smp=smp%3A%2F%2F1OwYGt-yqOfe2IyVHhxz3ohqo3aCCMjtB-8wn4X_aoY%3D%40smp11.simplex.im%2Fk4prkf-hIQUA_vblLTY6twHi0tPtiBNE%23%2F%3Fv%3D1-3%26dh%3DMCowBQYDK2VuAyEAUgUeg-6GtJBa6w_jrfrVB5s2RXM6YSlXi1X5Qrc0lgU%253D%26srv%3D6ioorbm6i3yxmuoezrhjk6f6qgkc4syabh7m3so74xunb5nzr4pwgfqd.onion">&#x1f977;</a>']
		]);
		this.blur();
	});

	modal_show_2.addEventListener('click', function() {
		new Modal(this.innerHTML + '<p class="lang">できるスキルとか</p>', cover_flow, [
			['<span class="lang">html / css</span>', new Meter('#323232', 'dodgerblue', '100%').element],
			['<span class="lang">JavaScript (VanillaJS)</span>', new Meter('#323232', 'dodgerblue', '80%').element],
			['<span class="lang">PHP</span>', new Meter('#323232', 'dodgerblue', '50%').element],
			['<span class="lang">MySQL</span>', new Meter('#323232', 'dodgerblue', '25%').element],
			['<span class="lang">MogoDB</span>', new Meter('#323232', 'dodgerblue', '20%').element],
			['<span class="lang">Express</span>', new Meter('#323232', 'dodgerblue', '20%').element],
			['<span class="lang">React</span>', new Meter('#323232', 'dodgerblue', '50%').element],
			['<span class="lang">Node.js</span>', new Meter('#323232', 'dodgerblue', '40%').element],
			['<span class="lang">Ubuntu</span>', new Meter('#323232', 'dodgerblue', '40%').element],
			['<span class="lang">C</span>', new Meter('#323232', 'dodgerblue', '15%').element],
			['<span class="lang">Anonymize, BlackHat<i class="fa fa-user"></i></span>', new Meter('#323232', 'dodgerblue', '65%').element]
		]);
		this.blur();
	});

	modal_show_3.addEventListener('click', function() {
		new Modal(this.innerHTML + '<br><small>過去の開発経験</small>', cover_flow, [
			['<i class="fa fa-gamepad"></i> みずほ銀行NISAランディングページ開発', '<img width="100%" src="./images/project-doc/mizuhoLP.png"></a><p>みずほ銀行さんのカフェNISAのトップページの開発を行いました！</p>'],
			['<i class="fa fa-id-card-o"></i> 葛城メディカルセンター様ウェブサイト制作', '<a href="https://katsuragi-medical.com"><img width="100%" src="./images/project-doc/medicalsama.png"></a><p>県内の病院関係者様のウェブサイトを作成しました！</p>']
		]);
		this.blur();
	});

	root.addEventListener('load', e => {
		setTimeout(() => {
			document.body.removeChild(document.getElementById('load_wrapper'));
			typeEffect();
		}, Math.floor(Math.random() * (1500 - 800) + 800));
	});

})((0, eval)(`this`));
