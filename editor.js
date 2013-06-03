var Editor = {

  editor : null,
	disableNode : null,
	doc : null,
	win : null,
	body : null,
	
	// direction
	dir : "rtl",
	box : null,
	saveSelect : '',
	placeEditor : null,
	path : '',
	family : 'tahoma',
	width : '',
	height : '',
	imgUP : null,
	linkSave : null,
	saveMenu : null,
	cellUpdateSave : null,
	tableUpdateSave : null,

	editorValue : {
		color : ['000000', 'A0522D', '556B2F', '006400', '483D8B', '000080', '4B0082', '2F4F4F', '8B0000', 'FF8C00', '808000', '008000', '008080', '0000FF', '708090', '696969', 'FF0000', 'F4A460', '9ACD32', '2E8B57', '48D1CC', '4169E1', '800080', '808080', "66CCFF", "FF33CC", "FFFF66", "0099FF", "CC6600", "CC6699"],

		fontSize : [1, 2, 3, 4, 5, 6, 7],
		fontSizeName : [8, 10, 12, 14, 18, 24, 36, 48],

		moreColor : ['000000', '003300', '006600', '009900', '00cc00', '00ff00', '330000', '333300', '336600', '339900', '33cc00', '33ff00', '660000', '663300', '666600', '669900', '66cc00', '66ff00', '000033', '003333', '006633', '009933', '00cc33', '00ff33', '330033', '333333', '336633', '339933', '33cc33', '33ff33', '660033', '663333', '666633', '669933', '66cc33', '66ff33', '000066', '003366', '006666', '009966', '00cc66', '00ff66', '330066', '333366', '336666', '339966', '33cc66', '33ff66', '660066', '663366', '666666', '669966', '66cc66', '66ff66', '000099', '003399', '006699', '009999', '00cc99', '00ff99', '330099', '333399', '336699', '339999', '33cc99', '33ff99', '660099', '663399', '666699', '669999', '66cc99', '66ff99', '0000cc', '0033cc', '0066cc', '0099cc', '00cccc', '00ffcc', '3300cc', '3333cc', '3366cc', '3399cc', '33cccc', '33ffcc', '6600cc', '6633cc', '6666cc', '6699cc', '66cccc', '66ffcc', '0000ff', '0033ff', '0066ff', '0099ff', '00ccff', '00ffff', '3300ff', '3333ff', '3366ff', '3399ff', '33ccff', '33ffff', '6600ff', '6633ff', '6666ff', '6699ff', '66ccff', '66ffff', '990000', '993300', '996600', '999900', '99cc00', '99ff00', 'cc0000', 'cc3300', 'cc6600', 'cc9900', 'cccc00', 'ccff00', 'ff0000', 'ff3300', 'ff6600', 'ff9900', 'ffcc00', 'ffff00', '990033', '993333', '996633', '999933', '99cc33', '99ff33', 'cc0033', 'cc3333', 'cc6633', 'cc9933', 'cccc33', 'ccff33', 'ff0033', 'ff3333', 'ff6633', 'ff9933', 'ffcc33', 'ffff33', '990066', '993366', '996666', '999966', '99cc66', '99ff66', 'cc0066', 'cc3366', 'cc6666', 'cc9966', 'cccc66', 'ccff66', 'ff0066', 'ff3366', 'ff6666', 'ff9966', 'ffcc66', 'ffff66', '990099', '993399', '996699', '999999', '99cc99', '99ff99', 'cc0099', 'cc3399', 'cc6699', 'cc9999', 'cccc99', 'ccff99', 'ff0099', 'ff3399', 'ff6699', 'ff9999', 'ffcc99', 'ffff99', '9900cc', '9933cc', '9966cc', '9999cc', '99cccc', '99ffcc', 'cc00cc', 'cc33cc', 'cc66cc', 'cc99cc', 'cccccc', 'ccffcc', 'ff00cc', 'ff33cc', 'ff66cc', 'ff99cc', 'ffcccc', 'ffffcc', '9900ff', '9933ff', '9966ff', '9999ff', '99ccff', '99ffff', 'cc00ff', 'cc33ff', 'cc66ff', 'cc99ff', 'ccccff', 'ccffff', 'ff00ff', 'ff33ff', 'ff66ff', 'ff99ff', 'ffccff', 'ffffff', '000000', '333333', '666666', '999999', 'cccccc', 'ffffff', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000'],

		fonts : [["tahoma", "Tahoma"], ["arial", "Arial"], ["arial black", "Arial Black"], ["akhbar MT", "Akhbar"], ["arabic transparent", "Basit"], ["comic sans ms", "Comic"], ["courier new", "Courier New"], ["diwani letter", "Diwani"], ["arial narrow", "Narrow"], ["times new roman", "Times"], ["monotype kufi", "Kufi"], ["andalus", "Andalus"], ["old antic bold", "Antic"], ["verdana", "Verdana"], ["wingdings", "Wingdings"]]
	},

	browser : function() {

		var nav = navigator.appVersion.toLowerCase();
		var op = navigator.appName.toLowerCase();

		if(op == "opera") {
			return "op";
		}

		if(nav.indexOf('msie') > -1) {
			var patter = "/msie (*);/";

			var text = nav.match(/msie [0-9]{0,1}/i);

			if(text != "msie 9" || text == "msie 7" || text == "msie 6" || text == "msie 5")
				return "ie";
			else
				return "ie9";
		} else {
			return true;
		}
	},

	isNumeric : function(sourse) {
		return ( typeof sourse == "number" && !isNaN(sourse));
	},

	inArray : function(arr, value) {
		if( typeof arr == "object") {
			for(var x = 0; x < arr.length; x++) {
				if(arr[x] == value) {
					return true;
				}
			}
		}
	},

	typeLinkReplace : function(value) {
		value = value.replace(/http:\/\//g, "");
		value = value.replace(/https:\/\//g, "");
		value = value.replace(/ftp:\/\//g, "");
		value = value.replace(/mailto:/g, "");

		return value;
	},

	htmlspecialchars : function(html) {
		html = html.replace(/&/g, "&amp;");
		html = html.replace(/"/g, "&quot;");
		html = html.replace(/</g, "&lt;");
		html = html.replace(/>/g, "&gt;");

		return html;
	},

	EditorOn : function(frame) {
		this.editor = frame;
		this.win = this.editor.contentWindow;
		this.doc = this.win.document;
		this.body = this.doc.body;

		this.body.ondblclick = Editor.EvClickElement;

		this.doc.oncontextmenu = Editor.editElement;

		this.body.onclick = Editor.unlinkDisplay;

		this.body.dir = this.dir;

		if("spellcheck" in this.body) {// Firefox
			this.body.spellcheck = false;
		}

		if('contentEditable' in this.body) {
			// allow contentEditable
			this.body.contentEditable = true;
		} else {// Firefox earlier than version 3
			if('designMode' in this.doc) {
				// turn on designMode
				this.doc.designMode = "on";
			}
		}

		this.appendFormChange();

		this.body.focus();
	},

	run : function(obj) {
		this.placeEditor = obj.replace;
		this.width = obj.width;
		this.height = obj.height;
		
		var pathValidate = obj.path.length, startPath = (pathValidate - 1);
		
		var lastKey = obj.path.substr(startPath,pathValidate);
		
		if (this.path != ""){
			if (lastKey == "/")
				this.path = obj.path;
			else
			{ this.path = obj.path+"/"; }
		}
			this.createEditor();

			if("dir" in obj) {
				this.dir = dir;
			}

	},

	appendFormChange : function() {

		var text = document.getElementById(this.placeEditor);

		if(text != null && text.nodeType == 1) {
			text.style.display = "none";
		} else {
			alert('عليك تحديد id حقل textarea');
			text = null;
		}

		if(text != null) {
			var form = text;

			if(text.value && text.value != "")
				Editor.body.innerHTML = text.value;

			while( form = form.parentNode) {
				if(form.nodeName.toLowerCase() == "form") {
					form.onsubmit = function() {
						var changeCursorsImg = Editor.body.getElementsByTagName('img');
						
						if (changeCursorsImg.length > 0)
						{
							for (var x=0; x < changeCursorsImg.length; x++)
							{
								changeCursorsImg[x].style.cursor = "default";
							}
						}
						
						Editor.startChange();
					}
					break;
				}
			}
		}
	},

	startChange : function() {
		var text = document.getElementById(this.placeEditor);

		if(text != null && text.nodeType == 1) {
			text.value = Editor.body.innerHTML;
		}
	},

	createEditor : function() {
		var widthFrame = (this.isNumeric(this.width) == true) ? this.width : 500, heightFrame = (this.isNumeric(this.height) == true) ? this.height : 300, div = (this.isNumeric(this.width) == true) ? this.width + 6 : 506;

		html = '<link rel="stylesheet" type="text/css" href="' + this.path + 'skins/editor.css" />' + 
		'<div style=" font-family: ' + this.family + ';width:' + div + 'px;" class="editor_Adv">' + 
		'<div dir="ltr" id="telbarEditor">' +
			'<div style="width: 162px; border: 1px solid #B4C9DC; margin-left: 10px; padding:2px;" class="normalIconEditor">' + 
				'<a title="خط غليظ" href="#" class="bold" onclick="Editor.Commend(\'bold\',null); return false;"></a>' + 
				'<a href="#" title="خط مائل" class="italic" onclick="Editor.Commend(\'italic\',null); return false;"></a>' + 
				'<a href="#" title="خط أسفل الكتابة" class="underline" onclick="Editor.Commend(\'underline\',null); return false;"></a>' +
				'<a href="#" title="خط وسط الكتابة" class="strike" onclick="Editor.Commend(\'Strikethrough\',null); return false;"></a>' +
				'<a href="#" class="subscript" onclick="Editor.Commend(\'Subscript\',null);return false;"></a>' + 
				'<a href="#" class="superscript" onclick="Editor.Commend(\'Superscript\',null);return false;"></a>' +
				'<div class="clr"></div>' + 
			'</div>'+
			'<div style="width: 81px; border: 1px solid #B4C9DC; margin-left: 10px; padding:2px;" class="normalIconEditor">'+
				'<a href="#" title="الكتابة على اليسار" class="align_left" onclick="Editor.Commend(\'JustifyLeft\',null); return false;" ></a>' + 
				'<a href="#" title="الكتابة على الوسط" class="align_center" onclick="Editor.Commend(\'JustifyCenter\',null); return false;"></a>' + 
				'<a href="#" class="align_right" title="الكتابة على اليمين" onclick="Editor.Commend(\'JustifyRight\',null); return false;"></a>' +
				'<div class="clr"></div>' + 
			'</div>'+
			'<div style="width: 54px; border: 1px solid #B4C9DC; margin-left: 10px; padding:2px;" class="normalIconEditor">'+
				'<a href="#" title="قائمة مرقمة" class="InsertOrderedList" onclick="Editor.Commend(\'InsertOrderedList\',null); return false;"></a>' + 
				'<a href="#" title="قائمة منقطة" class="InsertUnorderedList" onclick="Editor.Commend(\'InsertUnorderedList\',null); return false;"></a>' + 
				'<div class="clr"></div>' + 
			'</div>'+
			'<div style="width: 202px; border: 1px solid #B4C9DC; margin-left: 10px; padding:2px;" class="normalIconEditor">'+
				'<a href="#" title="سطر" class="InsertHorizontalRule" onclick="Editor.Commend(\'InsertHorizontalRule\',null); return false;"></a>' + 
				'<a href="#" title="اضافة صورة" class="insertimage" onclick="Editor.showTabimg(); return false;"></a>' + 
				'<a href="#" title="إضافة جدول" class="inserttable" onclick="Editor.showBoxTable(); return false;"></a>' + 
				'<a href="#" title="إضافة رابط" class="insertlink" onclick="Editor.BoxLink(); return false;"></a>' + 
				'<a href="#" title="ازالة الرابط" id="unlinkEditor" onclick="return false;" class="unlinkop"></a>' + 
				'<a href="#" title="اضافة كود" class="code" onclick="Editor.showBoxCoude(); return false;"></a>' +
				'<a href="#" title="اضافة فيديو" class="Edyotube" onclick="Editor.showBoxYoutube(); return false;"></a>' +
				'<div class="clr"></div>' + 
			'</div>' + 
			'<div style="width: 69px; border: 1px solid #B4C9DC; margin-left: 10px; padding: 0 2px; " id="superCheck" class="superSheckEditor">' + 
				'<ul>' + 
					'<li class="EditorchechlistColor">' + 
						'<a href="#" title="لون الخط" id="ShowMenuColor" onclick="Editor.showColorMenu(this,\'EditorchechlistColor\'); return false;" class="colortext"></a>' + 
						'<ul>' + 
							'<li>';
								for(var x = 0; x < this.editorValue.color.length; x++) {
									html += '<a class="colorCheckSmall" href="#" onclick=\'return Editor.insertMenuColor(this,"' + Editor.editorValue.color[x] + '","ForeColor","ShowMenuColor");\'><span style="background-color:#' + Editor.editorValue.color[x] + ';"></span></a>';
								}

		html += '<div class="clr"></div>' + 
								'<a onclick="Editor.redColorPanel(this,\'ForeColor\'); return false;" class="colorMore" href="#"> ... المزيد من الألوان</a>' + 
							'</li>' + 
						'</ul>' + 
					'</li>' + 
					'<li class="Editorchechlistbgtext">' + 
						'<a href="#" title="سباغة النص" id="ShowMenuBg" onclick="Editor.showColorMenu(this,\'Editorchechlistbgtext\'); return false;" class="bgtext"></a>' + '<ul>' + '<li>';

						for(var i = 0; i < this.editorValue.color.length; i++) {
							html += '<a class="colorCheckSmall" href="#" onclick=\'return Editor.insertMenuColor(this,"' + Editor.editorValue.color[i] + '","backcolor","ShowMenuBg");\'><span style="background-color:#' + Editor.editorValue.color[i] + ';"></span></a>';
						}

		html += '<div class="clr"></div>' + '<a onclick="Editor.redColorPanel(this,\'backcolor\'); return false;" class="colorMore" href="#"> ... المزيد من الألوان</a>' + '</li>' + '</ul>' + '</li>' + 
				
				'</ul><div class="clr"></div></div>'+
				
		'<div style=" width: 150px; border: 1px solid #B4C9DC; margin-left: 10px; padding-bottom:4px; "  id="fontApp" class="superSheckEditor">' + 
				'<ul>' + 
					'<li class="EditorchechlistFont">' + 
						'<a onclick="Editor.displayFonts(this); return false;" class="Editorfont" href="#" class="familyText"><span>خط</span></a>' + 
						'<ul style="width: 200px;">' + 
						'<li>';

							for(var x = 0; x < this.editorValue.fonts.length; x++) {
								var name = this.editorValue.fonts[x][1];
								html += '<a onclick="Editor.InsertFont(\'' + name + '\'); return false;" href="#"><font face="' + this.editorValue.fonts[x][1] + '">' + this.editorValue.fonts[x][0] + '</font></a>';
							}
							html += '<div class="clr"></div>';
				html +=  '</li>' + 
					'</ul>' + 
				'</li>' + 
				'<li class="EditorchechlistSize">' + 
					'<a title="حجم النص" onclick="Editor.showMenuFontSize(this); return false;" href="#" class="fontSize"><span>حجم</span></a>' + 
					'<ul style="width: 100px;">' + 
						'<li>';

		for(var x = 0; x < this.editorValue.fontSize.length; x++) {
			html += '<a onclick="Editor.insertSize(this,' + this.editorValue.fontSize[x] + '); return false;" href="#"><font size="' + this.editorValue.fontSize[x] + '">' + this.editorValue.fontSizeName[x] + '</font></a>';
		}
			html +='<div class="clr"></div>';
			
		html +=  '</li>' + '</ul>' + '</li></ul><div class="clr"></div></div>';
		
		html += '<div  style="width: 70px; border: 1px solid #B4C9DC; margin-left: 10px; padding-bottom: 2px ; " class="superSheckEditor">'+
					'<ul>' + 
						'<li class="EditorHystory">' + 
							'<a href="#" onclick="Editor.Commend(\'undo\',null); return false;" class="EditorUndo"></a>' + 
						'</li>' + 
						'<li class="EditorHystory">' + 
							'<a href="#" onclick="Editor.Commend(\'redo\',null); return false;" class="EditorRedo"></a>' + 
						'</li>' + 
					'</ul>' +
					'<div class="clr"></div>'+
				'</div>' +
				 
				
			'<div class="clr"></div>' + 
		'</div>' +
		
		
		
		'<iframe align="center" class="EditorText" frameborder="0" onload="Editor.EditorOn(this);" id="editor" width="' + widthFrame + '" height="' + heightFrame + '"></iframe>' + 
		'</div>';
		document.write(html);
	},

	showColorMenu : function(elem, cls) {

		this.hideAll();

		elem.setAttribute("style", "background-color:#B4C9DC;");
		var parent = elem.parentNode.getElementsByTagName('ul')[0];

		parent.style.visibility = "visible";

		document.body.onmousedown = function(e) {
			if(!Editor.clickOut(cls, e)) {
				parent.style.visibility = "hidden";
				elem.removeAttribute('style');
			}
		}

		this.doc.onclick = function() {
			parent.style.visibility = "hidden";
			elem.removeAttribute('style');
		}
	},

	hideAll : function() {
		var pl = document.getElementById('superCheck');
		var fontApp = document.getElementById('fontApp');
		
		
		var allLink = pl.getElementsByTagName('li'), fontLink = fontApp.getElementsByTagName('li'), nodes = ['EditorchechlistColor', 'Editorchechlistbgtext', 'EditorchechlistFont', "EditorchechlistSize"];

		for(var x = 0; x < allLink.length; x++) {
			if(this.inArray(nodes, allLink[x].className)) {
				allLink[x].getElementsByTagName('ul')[0].style.visibility = "hidden";
				allLink[x].getElementsByTagName('a')[0].removeAttribute('style');
			}
		}
		
		
		for(var i = 0; i < fontLink.length; i++) {
			if(this.inArray(nodes, fontLink[i].className)) {
				fontLink[i].getElementsByTagName('ul')[0].style.visibility = "hidden";
				fontLink[i].getElementsByTagName('a')[0].removeAttribute('style');
			}
		}
		
		
	},

	displayFonts : function(elem) {

		this.hideAll();

		var list = elem.parentNode.getElementsByTagName('ul')[0];

		if(this.browser() == "ie") {
			list.style.height = "auto";
			list.style.overflow = "hidden";
		}

		list.style.visibility = "visible";

		document.body.onmousedown = function(e) {
			if(!Editor.clickOut("EditorchechlistFont", e)) {
				list.style.visibility = "hidden";
			}
		}

		this.doc.onclick = function() {
			list.style.visibility = "hidden";
		}
	},

	showMenuFontSize : function(elem) {

		this.hideAll();

		var list = elem.parentNode.getElementsByTagName('ul')[0];

		if(this.browser() == "ie") {
			list.style.height = "auto";
			list.style.overflow = "hidden";
		}

		list.style.visibility = "visible";

		document.body.onmousedown = function(e) {
			if(!Editor.clickOut("EditorchechlistSize", e)) {
				list.style.visibility = "hidden";
			}
		}

		this.doc.onclick = function() {
			list.style.visibility = "hidden";
		}
	},

	clickOut : function(elemClass, ev) {
		var tar = typeof ev != "undefined" ? ev.target : window.event.srcElement;

		if(tar.className != elemClass) {
			while( tar = tar.parentNode) {
				if(tar.className == elemClass)
					return true;
			}
		} else
			return true;

		return false;
	},

	moveBox : function(e, elem) {
		if(!e)
			e = window.event;

		document.body.style.cursor = "move";

		var top = e.clientY - 20;
		var left = e.clientX - 200;

		elem.style.top = top + "px";
		elem.style.left = left + "px";
	},

	disablePage : function() {
		var newDiv = document.createElement('div');
		newDiv.className = "layerEditor";
		document.body.insertBefore(newDiv, document.body.firstChild);
		this.disableNode = newDiv;
	},

	showBox : function(title, html, doApp, buttonname, widthBox) {
		var newDiv = document.createElement('div'), blockWisth = ( typeof widthBox != "undefined") ? widthBox : "500", header = document.createElement('div'), center = document.createElement('div'), footer = document.createElement('div');

		header.className = "boxTtitle";
		newDiv.className = "popupEditor";
		center.className = "boxCenter";
		footer.className = "boxFoterEditor";

		if(this.browser() == "ie" || this.browser() == "ie9") {
			newDiv.style.border = "1px solid #999";
		}

		this.box = newDiv;

		this.disablePage();

		header.onmouseover = function() {
			this.style.cursor = "move";
		}

		header.onmousedown = function() {
			document.body.style.cursor = "move";
			document.body.onmousemove = function(e) {
				Editor.moveBox(e, newDiv);
			}
		}

		document.body.onmouseup = function() {
			document.body.onmousemove = null;
			document.body.style.cursor = "auto";
		}

		header.innerHTML = "<div class='title_box_div'>" + title + "</div><div onclick='Editor.hideBox();' class='closeBox'></div><div class='clr'></div>";

		this.doc.onclick = function() {
			Editor.hideBox();
		}
		if(this.browser() == "op" || this.browser() == "ie") {
			header.setAttribute('unselectable', 'on');
		} else {
			header.setAttribute('style', '-moz-user-select: none; -webkit-user-select: none;');
		}

		center.innerHTML = html;
		footer.innerHTML = "<center><input type='button' class='button_box' onclick='Editor." + doApp + ";' value='" + buttonname + "' />" + "<input class='button_box' type='button' onclick='Editor.hideBox();' value='إلغاء الأمر' />" + "</center>";

		newDiv.appendChild(header);
		newDiv.appendChild(center);
		newDiv.appendChild(footer);

		newDiv.style.direction = this.dir;
		newDiv.style.fontFamily = this.family;

		document.body.insertBefore(newDiv, document.body.firstChild);

		newDiv.style.width = blockWisth + "px";

		var positionNode = this.getCenterPosition(newDiv);

		this.box.style.top = positionNode.top + "px";
		this.box.style.right = positionNode.rigth + "px";
	},

	hideBox : function() {
		this.box.parentNode.removeChild(this.box);
		this.disableNode.parentNode.removeChild(this.disableNode);
	},

	unlinkDisplay : function() {
		if(Editor.browser() == "ie") {

			var link = Editor.getSelect();

			var linkItem = ((link.item) ? link.item(0) : link.parentElement());

			if(linkItem.nodeName.toLowerCase() == "a") {
				document.getElementById('unlinkEditor').className = "unlink";
				document.getElementById('unlinkEditor').onclick = function() {
					Editor.Commend('unlink', null);
				}
			} else {
				var clr = setTimeout(function() {
					document.getElementById('unlinkEditor').className = "unlinkop";
					clearTimeout(clr);
				}, 4000);
			}

		} else {
			var link = Editor.getSelect().getRangeAt(0).startContainer;

			if(link.nodeType == 3) {
				link = link.parentNode;
			}

			if(link.nodeName.toLowerCase() == "a") {
				document.getElementById('unlinkEditor').className = "unlink";
				document.getElementById('unlinkEditor').onclick = function() {
					Editor.Commend('unlink', null);
					return false;
				}
			} else {
				var clr = setTimeout(function() {
					document.getElementById('unlinkEditor').className = "unlinkop";
					clearTimeout(clr);
				}, 4000);
			}
		}
	},

	getCenterPosition : function(elem) {
		var top, rigth;

		if(window.innerHeight > 0) {
			top = window.innerHeight - 100;
			rigth = window.innerWidth;
		} else {
			top = document.documentElement.clientHeight - 100;
			rigth = document.documentElement.clientWidth;
		}

		top = (top - elem.clientHeight) / 2, rigth = (rigth - elem.clientWidth) / 2;

		return {
			"top" : top,
			"rigth" : rigth
		};
	},

	EvClickElement : function(e) {
		var target = Editor.target(e);
		var tag = target.nodeName.toLowerCase();

		// update elements for this editor onblclick

		switch (tag) {
			case "img":
				return Editor.showBoxUpdateImg(target);
				break;

			case "a":
				return Editor.showBoxUpdateLink(target);
				break;
		}
	},

	hoverMenu : function(elem) {
		var childs = elem.childNodes;

		for(var x = 0; x < childs.length; x++) {
			if(childs[x].nodeType == 1 && childs[x].nodeName.toLowerCase() == "td") {
				childs[x].setAttribute('style', 'background-color: #e1e1e1;');
			}
		}

	},

	outhoverMenu : function(elem) {
		var childs = elem.childNodes;

		for(var x = 0; x < childs.length; x++) {
			if(childs[x].nodeType == 1 && childs[x].nodeName.toLowerCase() == "td") {
				childs[x].removeAttribute('style');
			}
		}
	},

	editElement : function(e) {
		var ev = Editor.event(e), target = Editor.target(e), elemName = target.nodeName.toLowerCase(), positionFrame = Editor.getPosition(Editor.editor), top = (Number(ev.clientY) + Number(positionFrame)) + 5, left = (Number(ev.screenX) - 200);

		if(Editor.saveMenu != null) {
			document.body.removeChild(Editor.saveMenu);
		}

		if(left < 210) {
			left = left + 210;
		}

		var menu = document.createElement('div');
		menu.className = "EditormenuEdit";

		var html = "<table style='font-family: " + Editor.family + "; font-size: 14px;' dir='" + Editor.dir + "' width='100%' border='0' cellspacing='0' cellpadding='0'>";

		var addTableHTML = "<tr id='EditorMenuTableNew' onmouseover='Editor.hoverMenu(this);' onmouseout='Editor.outhoverMenu(this);'>" + "<td id='EditorMenuTableIcon' width='15%' class='EditoriconMenu'>&nbsp;</td>" + "<td class='EditorMenuList'>اضافة جدول جديد</td>" + "</tr>";

		switch (elemName) {
			case "img":
				html += "<tr id='EditorMenuImage' onmouseover='Editor.hoverMenu(this);' onmouseout='Editor.outhoverMenu(this);'>" + "<td width='15%' id='EditorMenuImageIcon' class='EditoriconMenu'>&nbsp;</td>" + "<td class='EditorMenuList'>خصائص الصورة</td>" + "</tr>";
				break;

			case "a":
				html += "<tr id='EditorMenuLink' onmouseover='Editor.hoverMenu(this);' onmouseout='Editor.outhoverMenu(this);'>" + "<td width='15%' id='EditorMenuLinkIcon' class='EditoriconMenu'>&nbsp;</td>" + "<td class='EditorMenuList'>خصائص الرابط</td>" + "</tr>";
				break;
		}

		var node = target, 
		tdHTML = "<tr id='EditorMenuTd' onmouseover='Editor.hoverMenu(this);' onmouseout='Editor.outhoverMenu(this);'>" + 
						"<td width='15%' class='EditoriconMenu'>&nbsp;</td>" + 
						"<td class='EditorMenuList'>خصائص الخلية</td>" + 
				 "</tr>"+
				 "<tr id='EditorMenuTdDelete' onmouseover='Editor.hoverMenu(this);' onmouseout='Editor.outhoverMenu(this);'>" + 
						"<td width='15%' class='EditoriconMenu'>&nbsp;</td>" + 
						"<td class='EditorMenuList'>حدف الخلية</td>" + 
				 "</tr>",
		
		rowDelete = "<tr id='edRowDelete' onmouseover='Editor.hoverMenu(this);' onmouseout='Editor.outhoverMenu(this);'>" + 
						"<td width='15%' class='EditoriconMenu'>&nbsp;</td>" + 
						"<td class='EditorMenuList'>حدف الصف</td>" + 
					"</tr>",
		
		rowAddBefore = "<tr id='edAddRowsBefore' onmouseover='Editor.hoverMenu(this);' onmouseout='Editor.outhoverMenu(this);'>" + 
						"<td width='15%' class='EditoriconMenu'>&nbsp;</td>" + 
						"<td class='EditorMenuList'>ادراج صف قيل</td>" + 
					"</tr>",
		
		rowAddAfter = "<tr id='edAddRowsAfter' onmouseover='Editor.hoverMenu(this);' onmouseout='Editor.outhoverMenu(this);'>" + 
						"<td width='15%' class='EditoriconMenu'>&nbsp;</td>" + 
						"<td class='EditorMenuList'>ادراج صف بعد</td>" + 
					"</tr>",
		
		collDelete = "<tr id='edDeleteCell' onmouseover='Editor.hoverMenu(this);' onmouseout='Editor.outhoverMenu(this);'>" + 
						"<td width='15%' class='EditoriconMenu'>&nbsp;</td>" + 
						"<td class='EditorMenuList'>حدف العمود</td>" + 
					"</tr>",
		
		cellAddBefore = "<tr id='edAddCellBefore' onmouseover='Editor.hoverMenu(this);' onmouseout='Editor.outhoverMenu(this);'>" + 
						"<td width='15%' class='EditoriconMenu'>&nbsp;</td>" + 
						"<td class='EditorMenuList'>ادراج عمود قيل</td>" + 
					"</tr>",
		
		cellAddAfter = "<tr id='edAddCellAfter' onmouseover='Editor.hoverMenu(this);' onmouseout='Editor.outhoverMenu(this);'>" + 
						"<td width='15%' class='EditoriconMenu'>&nbsp;</td>" + 
						"<td class='EditorMenuList'>ادراج عمود بعد</td>" + 
					"</tr>",
					
					
					
		
		tableHTMl = "<tr id='EditorMenuTable' onmouseover='Editor.hoverMenu(this);' onmouseout='Editor.outhoverMenu(this);'>" + 
						"<td id='EditorMenuTableIcon' width='15%' class='EditoriconMenu'>&nbsp;</td>" + 
						"<td class='EditorMenuList'>خصائص الجدول</td>" + 
					"</tr>"+
					"<tr id='EditorMenuTableDelete' onmouseover='Editor.hoverMenu(this);' onmouseout='Editor.outhoverMenu(this);'>" + 
						"<td width='15%' class='EditoriconMenu'>&nbsp;</td>" + 
						"<td class='EditorMenuList'>حدف الجدول</td>" + 
					"</tr>";
		
		var cellTarget = null, tableTarget = null, showMoreAttr = true;

		if(node.nodeName.toLowerCase() != "html" && node.nodeName.toLowerCase() != "body") {
			if(node.nodeName.toLowerCase() == "td") {
				html += tdHTML;

				showMoreAttr = false;

				cellTarget = node;

				var parent = node;
				
				if (node.parentNode.nodeName.toLowerCase() == "tr")
				{
					html += rowDelete + rowAddBefore + rowAddAfter;
					
				}
				
				html += collDelete + cellAddBefore + cellAddAfter;
				
				while( parent = parent.parentNode) {
					if(parent.nodeName.toLowerCase() == "table") {
						html += tableHTMl;
						tableTarget = parent;
						break;
					}
				}
			} else {
				while( node = node.parentNode) {
					if(node.nodeName.toLowerCase() == "td") {
						html += tdHTML;
						cellTarget = node;

						showMoreAttr = false;

						var parent = node;
						
						if (node.parentNode.nodeName.toLowerCase() == "tr")
						{
							html += rowDelete + rowAddBefore + rowAddAfter;
						}
						
						html += collDelete + cellAddBefore + cellAddAfter;
						
						while( parent = parent.parentNode) {
							if(parent.nodeName.toLowerCase() == "table") {
								html += tableHTMl;
								tableTarget = parent;
								break;
							}
						}
						break;
					}
				}
			}
		}

		if(showMoreAttr == true) {
			html += "<tr id='EditorMenuUrlNew' onmouseover='Editor.hoverMenu(this);' onmouseout='Editor.outhoverMenu(this);'>" + "<td id='EditorMenuUrlIcon' width='15%' class='EditoriconMenu'>&nbsp;</td>" + "<td class='EditorMenuList'>إضافة ارتباط تشعيعي</td>" + "</tr>" + addTableHTML;
		}

		html += "</table>";

		menu.style.top = top + "px";
		menu.style.left = left + "px";
		menu.innerHTML = html;

		document.body.insertBefore(menu, document.body.firstChild);

		var imgMenu = document.getElementById('EditorMenuImage'), 
		linkMenu = document.getElementById('EditorMenuLink'), 
		addTable = document.getElementById('EditorMenuTableNew'), 
		newUrl = document.getElementById('EditorMenuUrlNew'), 
		cellEdit = document.getElementById('EditorMenuTd'), 
		cellDelete = document.getElementById('EditorMenuTdDelete'),
		rowDelete = document.getElementById('edRowDelete'),
		rowAddBefore = document.getElementById('edAddRowsBefore'),
		rowAddAfter = document.getElementById('edAddRowsAfter'),
		deleteColl = document.getElementById('edDeleteCell'),
		addCellBefore = document.getElementById('edAddCellBefore'),
		addCellAfter = document.getElementById('edAddCellAfter'),
		tableEdit = document.getElementById('EditorMenuTable'),
		tableDelete = document.getElementById('EditorMenuTableDelete');

		if(imgMenu) {
			imgMenu.onclick = function() {
				Editor.showBoxUpdateImg(target);
				menu.style.visibility = "hidden";
			}
		}

		if(linkMenu) {
			linkMenu.onclick = function() {
				Editor.showBoxUpdateLink(target);
				menu.style.visibility = "hidden";
			}
		}

		if(addTable) {
			addTable.onclick = function() {
				Editor.showBoxTable();
				menu.style.visibility = "hidden";
			}
		}

		if(newUrl) {
			newUrl.onclick = function() {
				Editor.BoxLink();
				menu.style.visibility = "hidden";
			}
		}

		if(cellEdit) {
			cellEdit.onclick = function() {
				Editor.BoxCellAttr(cellTarget);
				menu.style.visibility = "hidden";
			}
		}
		
		if (cellDelete)
		{
			cellDelete.onclick = function() {
				Editor.CellDelete(cellTarget);
				menu.style.visibility = "hidden";
			}
		}
		
		if (rowDelete)
		{
			rowDelete.onclick = function() {
				Editor.rowDelete(cellTarget.parentNode);
				menu.style.visibility = "hidden";
			}
		}
		
		
		if (rowAddBefore)
		{
			rowAddBefore.onclick = function() {
				Editor.rowAddBefore(cellTarget.parentNode);
				menu.style.visibility = "hidden";
			}
		}
		
		if (rowAddAfter)
		{
			rowAddAfter.onclick = function() {
				Editor.rowAddAfter(cellTarget.parentNode);
				menu.style.visibility = "hidden";
			}
		}
		
		if (deleteColl)
		{
			deleteColl.onclick = function() {
				Editor.deleteColl(cellTarget);
				menu.style.visibility = "hidden";
			}
		}
		
		if (addCellBefore)
		{
			addCellBefore.onclick = function() {
				Editor.addCellBefore(cellTarget);
				menu.style.visibility = "hidden";
			}
		}
		
		if (addCellAfter)
		{
			addCellAfter.onclick = function() {
				Editor.addCellAfter(cellTarget);
				menu.style.visibility = "hidden";
			}
		}
		
		if(tableEdit) {
			tableEdit.onclick = function() {
				Editor.BoxTableAttr(tableTarget);
				menu.style.visibility = "hidden";
			}
		}
		
		if(tableDelete) {
			tableDelete.onclick = function() {
				Editor.tableDelete(tableTarget);
				menu.style.visibility = "hidden";
			}
		}
	
		document.body.onmousedown = function(evn) {
			if(!Editor.clickOut('EditormenuEdit', evn)) {
				menu.style.visibility = "hidden";
			}
		}

		Editor.saveMenu = menu;

		Editor.doc.onclick = function() {
			menu.style.visibility = "hidden";
		}

		return false;
	},

	getPosition : function(elem) {
		var top = 0;

		if(elem.offsetParent) {
			do {
				top += elem.offsetTop;
			} while (elem = elem.offsetParent);
		}

		return top;
	},

	event : function(ev) {
		if( typeof ev == "undefined" || !ev)
			return Editor.win.event;
		else
			return ev;
	},

	target : function(ev) {
		if( typeof ev == "undefined" || !ev)
			return Editor.win.event.srcElement
		else
			return ev.target;
	},

	getSelect : function() {
		if(this.win.getSelection) {
			var sel = this.win.getSelection();
		} else {
			var sel = this.doc.selection.createRange();
			var selType = this.doc.selection.type;
		}

		return sel;
	},

	Commend : function(name, value) {
		if( typeof name != "undefined" || typeof value != "undefined") {
			this.doc.execCommand(name, false, value);
			this.body.focus();
		} else {
			console.log("insert param as comment");
		}

	},

	getSelectElement : function() {
		var sel = this.getSelect(), elem = null;

		if(this.browser() == "ie") {

			if(sel.item) {
				elem = sel.item(0);
			} else {
				if(parent.nodeType == 1 && parent.nodeName.toLowerCase() != "body") {
					elem = sel.parentElement();
				}
			}
		} else {
			if(sel.getRangeAt) {
				elem = sel.getRangeAt(0).startContainer;

				if(elem.nodeType == 3) {
					elem = elem.parentNode;
				}
			}
		}

		return elem;

	},

	getTextSelection : function() {
		var sel = this.getSelect();

		if(sel.toString) {
			return sel.toString();
		} else {
			return sel.text;
		}
	},

	insertMenuColor : function(elem, color, comm, id) {
		this.Commend(comm, "#" + color);
		var node = elem.parentNode.parentNode, menuElem = document.getElementById(id);
		menuElem.removeAttribute('style');
		this.hideAll();
		return false;
	},

	insertColorForBox : function(comm) {
		var valueColor = document.getElementById('colorPrint').value;

		if(valueColor == "") {
			alert("يجب عليك تحديد اللون");
		} else {
			this.Commend(comm, valueColor);
			this.hideBox();
		}
	},

	redColorPanel : function(elem, comm) {
		this.hideAll();

		var html = "<div class='colorCheckBox'>" + "<div style='color:#777777; font-size: 12px; margin: 2px;'>اللون</div>" + "<div class='ColorPrint'></div>" + "<div style='color:#777777; font-size: 12px; margin: 2px;'>كود اللون</div>" + "<input id='colorPrint' type='text' class='viewsCoudeColor' />" + "</div>";

		html += "<div class='boxColor'>";

		for(var x = 0; x < this.editorValue.moreColor.length; x++) {
			html += "<a onclick='Editor.insertColorForSelector(this,\"" + this.editorValue.moreColor[x] + "\"); return false;' style='background-color: #" + this.editorValue.moreColor[x] + ";' href='#'></a>";
		}
		html += "</div>" + "<div class='clr'></div>";

		this.showBox('تحديد الألوان', html, 'insertColorForBox("' + comm + '")', "تنفيد", "320");

	},

	insertColorForSelector : function(elem, color) {

		var place = elem.parentNode.previousSibling;

		if(place.nodeType != 1)
			place.previousSibling

		var print = place.getElementsByTagName('div')[1];
		var text = place.getElementsByTagName('input')[0];

		print.style.backgroundColor = "#" + color;
		text.value = "#" + color;
	},

	unlinkUrl : function(link) {
		Editor.Commend('unlink', null);
	},

	InsertFont : function(name) {
		this.hideAll();
		Editor.Commend('fontName', name);
	},

	insertSize : function(elem, size) {
		this.hideAll();
		Editor.Commend('fontSize', size);
	},

	showTabimg : function() {
		this.body.focus();
		this.saveSelect = this.getSelect();

		var html = "<div>" + "<table width='95%' align='center' border='0'>" + "<tr>" + "<td width='22%'>" + "<span style='font-size: 14px; color:#4a4a4a;'>رابط الصورة</span>" + "</td>" + "<td width='50%'>" + "<input type='text' class='textInputEditor' id='EditorImageUrl' />" + "</td>" + "</td>" + "<tr>" + "<td width='22%'>" + "<span style='font-size: 14px; color:#4a4a4a;'>وصف الصورة</span>" + "</td>" + "<td width='50%'>" + "<input type='text' class='textInputEditor' id='EditorImageDesc' />" + "</td>" + "</tr>" + "<tr>" + "<td width='22%'>" + "<span style='font-size: 14px; color:#4a4a4a;'>عرض الصورة</span>" + "</td>" + "<td width='50%'>" + "<input type='text' class='textInputEditor2' id='EditorImageWidth' />" + "&nbsp;&nbsp;" + "<span style='font-size: 14px; color:#4a4a4a;'>إرتفاع الصورة</span>" + "&nbsp;&nbsp;" + "<input type='text' class='textInputEditor2' id='EditorImageHeigth' />" + "</td>" + "</tr>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>اتجاه الصورة</span>" + "</td>" + "<td>" + "<select id='EditorImgAlign'>" + "<option value=''>غير محدد</option>" + "<option value='absBottom'>أقصى الأسفل</option>" + "<option value='absMiddle'>وسط دقيق</option>" + "<option value='baseline'>خط النص</option>" + "<option value='bottom'>أسفل</option>" + "<option value='left'>يسار</option>" + "<option value='middle'>وسط</option>" + "<option value='right'>يمين</option>" + "<option value='textTop'>أعلى النص</option>" + "<option value='top'>أقصى الأعلى</option>" + "</select>" + "</td>" + "</tr>" + "</table>" + "</div>";

		this.showBox(' إضافة صورة', html, 'insertImage()', 'اضافة الصورة', '400');
	},

	insertImage : function() {

		this.body.focus();

		var imgUrl = document.getElementById('EditorImageUrl').value, imgDesc = document.getElementById('EditorImageDesc').value, imgWidth = Number(document.getElementById('EditorImageWidth').value), imgHeigth = Number(document.getElementById('EditorImageHeigth').value);
		imgAlign = document.getElementById('EditorImgAlign').value;

		if(imgUrl != "") {

			if(this.browser() == "ie") {
				if(imgDesc != "") {
					imgDesc = "alt='" + imgDesc + "'";
				}
				if(this.isNumeric(imgWidth) == true && imgWidth > 0) {
					imgWidth = "width='" + imgWidth + "'";
				}
				if(this.isNumeric(imgHeigth) == true && imgHeigth > 0) {
					imgHeigth = "height='" + imgHeigth + "'";
				}
				if(imgAlign != "") {
					imgAlign = "align='" + imgAlign + "'";
				}

				this.saveSelect.pasteHTML('<img ' + imgAlign + ' ' + imgDesc + ' ' + imgWidth + ' ' + imgHeigth + ' src="' + imgUrl + '" />');
			} else {
				var newImg = this.doc.createElement('img');

				var range = this.saveSelect.getRangeAt(0);

				newImg.setAttribute('style', 'cursor:move;');

				newImg.src = imgUrl;
				if(imgDesc != "") {
					newImg.alt = imgDesc;
				}
				if(imgAlign != "") {
					newImg.setAttribute('align', imgAlign);
				}

				if(this.isNumeric(imgWidth) == true && imgWidth > 0) {
					newImg.width = imgWidth;
				}
				if(this.isNumeric(imgHeigth) == true && imgHeigth > 0) {
					newImg.height = imgHeigth;
				}

				range.collapse(false);
				range.insertNode(newImg);
			}
			this.hideBox();
			this.body.focus();
		} else {
			alert("عليك كتابة رابط الصورة");
		}
	},

	showBoxUpdateImg : function(image) {

		var url = image.src, height = (image.height > 0) ? image.height : null, width = (image.width) ? image.width : "", alt = (image.alt != null) ? image.alt : "", align = (image.align != null) ? image.align : "";
		this.imgUP = image;
		var html = "<div>" + "<table width='95%' align='center' border='0'>" + "<tr>" + "<td width='22%'>" + "<span style='font-size: 14px; color:#4a4a4a;'>رابط الصورة</span>" + "</td>" + "<td width='50%'>" + "<input value='" + url + "' type='text' class='textInputEditor' id='EditorUpImageUrl' />" + "</td>" + "</td>" + "<tr>" + "<td width='22%'>" + "<span style='font-size: 14px; color:#4a4a4a;'>وصف الصورة</span>" + "</td>" + "<td width='50%'>" + "<input type='text' value='" + alt + "' class='textInputEditor' id='EditorUpImageDesc' />" + "</td>" + "</tr>" + "<tr>" + "<td width='22%'>" + "<span style='font-size: 14px; color:#4a4a4a;'>عرض الصورة</span>" + "</td>" + "<td width='50%'>" + "<input type='text' value='" + width + "' class='textInputEditor2' id='EditorUpImageWidth' />" + "&nbsp;&nbsp;" + "<span style='font-size: 14px; color:#4a4a4a;'>إرتفاع الصورة</span>" + "&nbsp;&nbsp;" + "<input type='text' value='" + height + "' class='textInputEditor2' id='EditorUpImageHeigth' />" + "</td>" + "</tr>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>اتجاه الصورة</span>" + "</td>" + "<td>" + "<select id='EditorUpImgAlign'>" + "<option value=''>غير محدد</option>" + "<option " + (align == "absBottom" ? "selected " : null) + "value='absBottom'>أقصى الأسفل</option>" + "<option " + (align == "absMiddle" ? "selected " : null) + " value='absMiddle'>وسط دقيق</option>" + "<option " + (align == "baseline" ? "selected " : null) + " value='baseline'>خط النص</option>" + "<option " + (align == "bottom" ? "selected " : null) + " value='bottom'>أسفل</option>" + "<option " + (align == "left" ? "selected " : null) + " value='left'>يسار</option>" + "<option " + (align == "middle" ? "selected " : null) + " value='middle'>وسط</option>" + "<option " + (align == "right" ? "selected " : null) + " value='right'>يمين</option>" + "<option " + (align == "textTop" ? "selected " : null) + " value='textTop'>أعلى النص</option>" + "<option " + (align == "top" ? "selected " : null) + " value='top'>أقصى الأعلى</option>" + "</select>" + "</td>" + "</tr>" + "</table>" + "</div>";

		this.showBox(' تعديل صورة', html, "updateImage()", 'تعديل الصورة', '400');
	},

	updateImage : function() {

		var imgUrl = document.getElementById('EditorUpImageUrl').value, imgDesc = document.getElementById('EditorUpImageDesc').value, imgWidth = Number(document.getElementById('EditorUpImageWidth').value), imgHeigth = Number(document.getElementById('EditorUpImageHeigth').value);
		imgAlign = document.getElementById('EditorUpImgAlign').value;
		obj = this.imgUP;

		if(imgUrl != "") {
			obj.src = imgUrl;

			if(imgDesc != "") {
				obj.alt = imgDesc;
			}
			if(imgWidth > 0) {
				obj.width = imgWidth;
			}
			if(imgHeigth > 0) {
				obj.height = imgHeigth;
			}

			obj.align = imgAlign;

			this.hideBox();
			this.body.focus();
		} else {
			alert("أكتب رابط الصورة");
		}

	},

	BoxLink : function() {

		if(this.browser() == "ie")
			this.body.focus();

		this.saveSelect = this.getSelect();

		var html = "<div>" + "<table width='95%' align='center' border='0'>" + "<tr>" + "<td width='22%'>" + "<span style='font-size: 14px; color:#4a4a4a;'>الرابط</span>" + "</td>" + "<td width='50%'>" + "<input dir='ltr' type='text' class='textInputEditor' id='link_url' />" + "</td>" + "<td dir='ltr' width='15%'>" + "<select id='typeUrl'>" + "<option value='http://'>http://</option>" + "<option value='https://'>https://</option>" + "<option value='ftp://'>ftp://</option>" + "<option value='mailto:'>mailto:</option>" + "</select>" + "</td>";

		if(this.getTextSelection() == "") {
			html += "<tr>" + "<td width='22%'>" + "<span style='font-size: 14px; color:#4a4a4a;'>نص الرابط</span>" + "</td>" + "<td colspan='2' width='50%'>" + "<input type='text' class='textInputEditor' id='textUrl' />" + "</td>" + "</tr>";
		}

		html += "<tr>" + "<td width='22%'>" + "<span style='font-size: 14px; color:#4a4a4a;'>وصف الرابط</span>" + "</td>" + "<td colspan='2'  width='50%'>" + "<input type='text' class='textInputEditor' id='link_description' />" + "</td>" + "</tr>" + "<tr>" + "<td width='22%'>" + "<span style='font-size: 14px; color:#4a4a4a;'>إسم الرابط</span>" + "</td>" + "<td colspan='2'  width='50%'>" + "<input type='text' class='textInputEditor' id='link_name' />" + "</td>" + "</tr>" + "</table>" + "</div>";

		var staticInsertText = (this.getTextSelection() != "") ? false : true;

		this.showBox('إضافة رابط', html, 'insertLink(' + staticInsertText + ')', "تنفيد", "450");
	},

	insertLink : function(staticInsertText) {
		var urlType = document.getElementById('typeUrl').value, link_url = document.getElementById('link_url').value, textUrl = document.getElementById('textUrl'), descUrl = document.getElementById('link_description').value, nameUrl = document.getElementById('link_name').value;

		if(urlType == "") {
			urlType = "http://";
		}

		if(link_url != "") {

			var url = urlType + link_url;

			if(staticInsertText == false) {

				if(this.browser() == "ie") {
					var sel = this.saveSelect, attr = "";

					if(descUrl != "") {
						attr += "title='" + descUrl + "'";
					}
					if(nameUrl != "") {
						attr += "name='" + nameUrl + "'";
					}

					if(sel.text != "") {
						this.saveSelect.pasteHTML("<a " + attr + " href='" + url + "'>" + sel.text + "</a>");
					}
				} else {
					this.Commend("createlink", url);

					var getElement = this.getSelectElement();

					if(getElement.nodeName.toLowerCase() == "a") {
						if(descUrl != "") {
							getElement.setAttribute('title', descUrl);
						}
						if(nameUrl != "") {
							getElement.setAttribute('name', nameUrl);
						}
					}
				}
			} else {
				textUrl = textUrl.value;

				if(textUrl == "") {
					textUrl = url;
				}

				if(this.browser() == "ie") {
					var sel = this.saveSelect, attr = "";
					if(descUrl != "") {
						attr += "title='" + descUrl + "'";
					}
					if(nameUrl != "") {
						attr += "name='" + nameUrl + "'";
					}

					this.saveSelect.pasteHTML("<a " + attr + " href='" + url + "'>" + textUrl + "</a>");

				} else {
					var sel = this.getSelect().getRangeAt(0), newLink = this.doc.createElement('a');

					if(descUrl != "") {
						newLink.setAttribute('title', descUrl);
					}
					if(nameUrl != "") {
						newLink.setAttribute('name', nameUrl);
					}
					newLink.setAttribute('href', url);
					newLink.innerHTML = textUrl;

					sel.collapse(false);
					sel.insertNode(newLink);
				}
			}

			this.hideBox();

		} else {
			alert("عليك كتابة الرابط");
		}

	},

	showBoxUpdateLink : function(node) {

		var href = node.href, name = (node.name) ? node.name : "", title = (node.title) ? node.title : "";
		this.linkSave = node;

		var linkSimple = this.typeLinkReplace(href);

		var html = "<div>" + "<table width='95%' align='center' border='0'>" + "<tr>" + "<td width='22%'>" + "<span style='font-size: 14px; color:#4a4a4a;'>الرابط</span>" + "</td>" + "<td width='50%'>" + "<input dir='ltr' value='" + linkSimple + "' type='text' class='textInputEditor' id='link_urlUp' />" + "</td>" + "<td dir='ltr' width='15%'>" + "<select id='typeUrlUp'>" + "<option ";
		if(href.indexOf('http://') > -1) {
			html += "selected";
		}
		html += " value='http://'>http://</option>" + "<option ";
		if(href.indexOf('https://') > -1) {
			html += "selected";
		}
		html += " value='https://'>https://</option>" + "<option ";
		if(href.indexOf('ftp://') > -1) {
			html += "selected";
		}
		html += " value='ftp://'>ftp://</option>" + "<option ";
		if(href.indexOf('mailto:') > -1) {
			html += "selected";
		}
		html += " value='mailto:'>mailto:</option>" + "</select>" + "</td>" + "<tr>" + "<td width='22%'>" + "<span style='font-size: 14px; color:#4a4a4a;'>وصف الرابط</span>" + "</td>" + "<td colspan='2'  width='50%'>" + "<input type='text' class='textInputEditor' value='" + title + "' id='link_descriptionUp' />" + "</td>" + "</tr>" + "<tr>" + "<td width='22%'>" + "<span style='font-size: 14px; color:#4a4a4a;'>إسم الرابط</span>" + "</td>" + "<td colspan='2'  width='50%'>" + "<input type='text' class='textInputEditor' value='" + name + "' id='link_nameUp' />" + "</td>" + "</tr>" + "</table>" + "</div>";

		this.showBox('إضافة رابط', html, 'updateLink()', "تنفيد", "450");
	},

	updateLink : function() {

		var urlType = document.getElementById('typeUrlUp').value, link_url = document.getElementById('link_urlUp').value, descUrl = document.getElementById('link_descriptionUp').value, nameUrl = document.getElementById('link_nameUp').value, obj = this.linkSave;

		if(link_url != "undefined" || link_url != "") {
			if(urlType == "") {
				urlType = "http://";
			}

			obj.href = urlType + link_url;

			if(descUrl != "undefined" || descUrl != "") {
				obj.title = descUrl;
			}

			if(nameUrl != "undefined" || nameUrl != "") {
				obj.name = nameUrl;
			}

			this.hideBox();
			this.body.focus();
		} else {
			alert("أكتب الرابط");
		}

	},

	dipslayColorTable : function(elem, cls) {

		var list = elem.parentNode.getElementsByTagName('ul')[0];
		document.getElementById('listColor1').style.visibility = "hidden";
		document.getElementById('listColor2').style.visibility = "hidden";

		list.style.visibility = "visible";

		document.body.onmousedown = function(e) {
			if(!Editor.clickOut(cls, e)) {
				list.style.visibility = "hidden";
			}
		}

		this.doc.onclick = function() {
			list.style.visibility = "hidden";
		}
	},

	insertColorForInputBoxTable : function(elem, color) {

		var parentA = elem.parentNode.parentNode.previousSibling.previousSibling;

		if(parentA.nodeType == 3)
			parentA.previousSibling

		var hidden = parentA.nextSibling;

		if(hidden.nodeType == 3) {
			hidden = hidden.nextSibling;
		}

		hidden.value = "#" + color;
		parentA.style.backgroundColor = "#" + color;

		elem.parentNode.parentNode.style.visibility = "hidden";
	},

	autoColorTable : function(elem) {
		var parentA = elem.parentNode.parentNode.previousSibling.previousSibling;

		if(parentA.nodeType == 3)
			parentA.previousSibling

		var hidden = parentA.nextSibling;

		hidden.value = "";
		parentA.style.backgroundColor = "#fff";
		elem.parentNode.parentNode.style.visibility = "hidden";
	},

	showBoxTable : function() {
		this.body.focus();
		this.saveSelect = this.getSelect();

		var html = "<div>" + "<table class='EditorTableBox' width='95%' align='center' border='0'>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>عدد الصفوف</span>" + "</td>" + "<td>" + "<input class='textInputEditor2' value='2' type='text' id='EditorLengthRow' />" + "</td>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>عدد الأعمدة</span>" + "</td>" + "<td>" + "<input class='textInputEditor2' value='2' type='text' id='EditorLengthCell' />" + "</td>" + "</tr>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>العرض</span>" + "</td>" + "<td>" + "<input class='textInputEditor2' type='text' id='EditorWidthTable' />" + "&nbsp;" + "<select id='EditorTypeWidthTable'>" + "<option value='px'>px</option>" + "<option value='%'>%</option>" + "</select>" + "</td>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>الإرتفاع</span>" + "</td>" + "<td>" + "<input class='textInputEditor2' type='text' id='EditorHeightTable' />" + "&nbsp;" + "<select id='EditorTypeHeightTable'>" + "<option value='px'>px</option>" + "<option value='%'>%</option>" + "</select>" + "</td>" + "</tr>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>لون الخلفية</span>" + "</td>" + "<td>" + "<ul class='bgColorBoxSmall'>" + "<li class='listBgColorSmall'>" + "<a onclick='Editor.dipslayColorTable(this,\"listBgColorSmall\"); return false;' href='#' class='EditorCheckColor'></a><input type='hidden' id='BgColorTable' />" + "<ul  id='listColor1'>" + "<li>" + "<a href='#' onclick='Editor.autoColorTable(this); return false;' class='EditorColorAuto' style='width: 215px; height: 16px;'>تلقائي</a>";

		for(var x = 0; x < this.editorValue.moreColor.length; x++) {
			html += "<a onclick='Editor.insertColorForInputBoxTable(this,\"" + this.editorValue.moreColor[x] + "\"); return false;' style='background-color: #" + this.editorValue.moreColor[x] + ";' href='#'></a>";
		}

		html += "</li>" + "</ul>" + "</li>" + "</ul>" + "</td>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>المحاذات</span>" + "</td>" + "<td>" + "<select id='EditorTableAlign'>" + "<option value='right'>يمين</option>" + "<option value='center'>وسط</option>" + "<option value='left'>يسار</option>" + "</select>" + "</td>" + "</tr>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>لون الحاشية</span>" + "</td>" + "<td>" + "<ul class='bgColorBoxSmall'>" + "<li class='listBgColorSmall2'>" + "<a onclick='Editor.dipslayColorTable(this,\"listBgColorSmall2\"); return false;' href='#' class='EditorCheckColor'></a><input type='hidden' id='ColorBorderTable' />" + "<ul id='listColor2'>" + "<li>" + "<a href='#' class='EditorColorAuto' onclick='Editor.autoColorTable(this); return false;' style='width: 215px; height: 16px;'>تلقائي</a>";

		for(var x = 0; x < this.editorValue.moreColor.length; x++) {
			html += "<a onclick='Editor.insertColorForInputBoxTable(this,\"" + this.editorValue.moreColor[x] + "\"); return false;' style='background-color: #" + this.editorValue.moreColor[x] + ";' href='#'></a>";
		}

		html += "</li>" + "</ul>" + "</li>" + "</ul>" + "</td>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>حجم الحاشية</span>" + "</td>" + "<td>" + "<input class='textInputEditor2' value='1' type='text' id='EditorBorderTable' />" + "</td>" + "</tr>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>حجم الخلايا</span>" + "</td>" + "<td>" + "<input class='textInputEditor2' value='0' type='text' id='EditorTablePadding' />" + "</td>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>المسافة بن الخلايا</span>" + "</td>" + "<td>" + "<input class='textInputEditor2' value='0' type='text' id='EditorTableSpacing' />" + "</td>" + "</tr>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>صورة الخلفية</span>" + "</td>" + "<td colspan='3'>" + "<input class='textInputEditor' type='text' id='EditorTableBackgroundImage' />" + "</td>" + "</tr>" + "</table>" + "</div>";

		this.showBox(' جدول جديد', html, 'insertTable()', 'اضافة الجدول');
	},

	insertTable : function() {
		var rowLength = document.getElementById('EditorLengthRow').value, cellLength = document.getElementById('EditorLengthCell').value, width = document.getElementById('EditorWidthTable').value, typeWidth = document.getElementById('EditorTypeWidthTable').value, height = document.getElementById('EditorHeightTable').value, typeHeight = document.getElementById('EditorTypeHeightTable').value, bgColor = document.getElementById('BgColorTable').value, align = document.getElementById('EditorTableAlign').value, borderColor = document.getElementById('ColorBorderTable').value, border = document.getElementById('EditorBorderTable').value, padding = document.getElementById('EditorTablePadding').value, margin = document.getElementById('EditorTableSpacing').value, bgImage = document.getElementById('EditorTableBackgroundImage').value;

		if(!this.isNumeric(Number(rowLength)) || rowLength == 0) {
			rowLength = 2;
		}
		if(!this.isNumeric(Number(cellLength)) || cellLength == 0) {
			cellLength = 2;
		}

		if(typeWidth == "" || typeWidth == "px") {
			typeWidth = ''
		}
		if(typeHeight == "" || typeHeight == "px") {
			typeHeight = ''
		}

		if(width != null && width > 0) {
			width = "width='" + width + typeWidth + "'";
		} else {
			width = "width='500'";
		}
		if(height != null && height > 0) {
			height = "height='" + height + typeHeight + "'";
		} else {
			height = "";
		}

		if(bgColor != "undefined" && bgColor != "") {
			bgColor = "bgcolor='" + bgColor + "'";
		} else {
			bgColor = "";
		}

		if(align != "undefined" && align != "") {
			align = "align='" + align + "'";
		} else {
			align = "";
		}

		if(borderColor != "undefined" && borderColor != "") {
			borderColor = "bordercolor='" + borderColor + "'";
		} else {
			borderColor = "";
		}
		if(this.isNumeric(Number(border))) {
			border = "border='" + border + "'";
		}

		if(this.isNumeric(Number(padding))) {
			padding = "cellpadding='" + Number(padding) + "'";
		} else {
			padding = "";
		}
		if(this.isNumeric(Number(margin))) {
			margin = "cellspacing='" + Number(margin) + "'";
		} else {
			margin = "";
		}

		if(bgImage != "undefined" && bgImage != "") {
			bgImage = "background='" + bgImage + "'";
		} else {
			bgImage = "";
		}

		var table = "<table " + width + " " + height + " " + bgColor + " " + align + " " + border + " " + borderColor + " " + padding + " " + margin + " " + bgImage + ">";

		for(var x = 1; x <= Number(rowLength); x++) {
			table += "<tr>";
			for(var i = 1; i <= Number(cellLength); i++) {
				table += "<td>&nbsp;</td>";
			}
			table += "</tr>";
		}

		table += "</table>";

		if(this.browser() == "ie") {
			this.saveSelect.pasteHTML(table);
		} else {
			var newPlace = this.doc.createElement('div');

			var range = this.saveSelect.getRangeAt(0);

			newPlace.innerHTML = table;

			range.collapse(false);
			range.insertNode(newPlace);
		}
		this.hideBox();

	},

	BoxTableAttr : function(table) {
		width = (table.width) ? table.width : "", height = (table.getAttribute('height')) ? table.getAttribute('height') : "", bgColor = (table.bgColor) ? table.bgColor : "", align = (table.align) ? table.align : "", borderColor = (table.getAttribute('bordercolor')) ? table.getAttribute('bordercolor') : "", border = (table.border) ? table.border : "", padding = (table.cellPadding) ? table.cellPadding : "", margin = (table.cellSpacing) ? table.cellSpacing : "", bgImage = (table.getAttribute('background')) ? table.getAttribute('background') : "", pexilWidth = true, pexilHeight = true;

		if(width.indexOf("%") > -1) {
			width = width.replace(/%/, "");
			pexilWidth = false;
		}

		if(height.indexOf("%") > -1) {
			height = height.replace(/%/, "");
			pexilHeight = false;
		}

		var html = "<div>" + "<table class='EditorTableBox' width='95%' align='center' border='0'>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>العرض</span>" + "</td>" + "<td>" + "<input class='textInputEditor2' value='" + width + "' type='text' id='EditorWidthTableUp' />" + "&nbsp;" + "<select id='EditorTypeWidthTableUp'>" + "<option value='px'>px</option>" + "<option ";
		if(pexilWidth == false) {
			html += "selected";
		}
		html += " value='%'>%</option>" + "</select>" + "</td>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>الإرتفاع</span>" + "</td>" + "<td>" + "<input class='textInputEditor2' value='" + height + "' type='text' id='EditorHeightTableUp' />" + "&nbsp;" + "<select id='EditorTypeHeightTableUp'>" + "<option value='px'>px</option>" + "<option ";
		if(pexilHeight == false) {
			html += "selected";
		}
		html += " value='%'>%</option>" + "</select>" + "</td>" + "</tr>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>لون الخلفية</span>" + "</td>" + "<td>" + "<ul class='bgColorBoxSmall'>" + "<li class='listBgColorSmall'>" + "<a ";
		if(bgColor != "") {
			html += "style='background-color: " + bgColor + ";'"
		}
		html += " onclick='Editor.dipslayColorTable(this,\"listBgColorSmall\"); return false;' href='#' class='EditorCheckColor'></a><input value='" + bgColor + "' type='hidden' id='BgColorTableUp' />" + "<ul  id='listColor1'>" + "<li>" + "<a href='#' onclick='Editor.autoColorTable(this); return false;' class='EditorColorAuto' style='width: 215px; height: 16px;'>تلقائي</a>";

		for(var x = 0; x < this.editorValue.moreColor.length; x++) {
			html += "<a onclick='Editor.insertColorForInputBoxTable(this,\"" + this.editorValue.moreColor[x] + "\"); return false;' style='background-color: #" + this.editorValue.moreColor[x] + ";' href='#'></a>";
		}

		html += "</li>" + "</ul>" + "</li>" + "</ul>" + "</td>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>المحاذات</span>" + "</td>" + "<td>" + "<select id='EditorTableAlignUp'>" + "<option ";
		if(align == "right") {
			html += "selected";
		}
		html += " value='right'>يمين</option>" + "<option ";
		if(align == "center") {
			html += "selected";
		}
		html += " value='center'>وسط</option>" + "<option ";
		if(align == "left") {
			html += "selected";
		}
		html += " value='left'>يسار</option>" + "</select>" + "</td>" + "</tr>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>لون الحاشية</span>" + "</td>" + "<td>" + "<ul class='bgColorBoxSmall'>" + "<li class='listBgColorSmall2'>" + "<a ";
		if(borderColor != "") {
			html += "style='background-color: " + borderColor + ";'"
		}
		html += " onclick='Editor.dipslayColorTable(this,\"listBgColorSmall2\"); return false;' href='#' class='EditorCheckColor'></a><input value='" + borderColor + "' type='hidden' id='ColorBorderTableUp' />" + "<ul id='listColor2'>" + "<li>" + "<a href='#' class='EditorColorAuto' onclick='Editor.autoColorTable(this); return false;' style='width: 215px; height: 16px;'>تلقائي</a>";

		for(var x = 0; x < this.editorValue.moreColor.length; x++) {
			html += "<a onclick='Editor.insertColorForInputBoxTable(this,\"" + this.editorValue.moreColor[x] + "\"); return false;' style='background-color: #" + this.editorValue.moreColor[x] + ";' href='#'></a>";
		}

		html += "</li>" + "</ul>" + "</li>" + "</ul>" + "</td>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>حجم الحاشية</span>" + "</td>" + "<td>" + "<input class='textInputEditor2' value='" + border + "' value='1' type='text' id='EditorBorderTableUp' />" + "</td>" + "</tr>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>حجم الخلايا</span>" + "</td>" + "<td>" + "<input class='textInputEditor2' value='" + padding + "' type='text' id='EditorTablePaddingUp' />" + "</td>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>المسافة بن الخلايا</span>" + "</td>" + "<td>" + "<input class='textInputEditor2' value='" + margin + "' type='text' id='EditorTableSpacingUp' />" + "</td>" + "</tr>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>صورة الخلفية</span>" + "</td>" + "<td colspan='3'>" + "<input class='textInputEditor' value='" + bgImage + "' type='text' id='EditorTableBackgroundImageUp' />" + "</td>" + "</tr>" + "</table>" + "</div>";

		this.tableUpdateSave = table;
		this.showBox('خصائص الجدول', html, 'editTable()', 'تعديل الجدول');
	},

	editTable : function() {

		var width = document.getElementById('EditorWidthTableUp').value, typeWidth = document.getElementById('EditorTypeWidthTableUp').value, height = document.getElementById('EditorHeightTableUp').value, typeHeight = document.getElementById('EditorTypeHeightTableUp').value, bgColor = document.getElementById('BgColorTableUp').value, align = document.getElementById('EditorTableAlignUp').value, borderColor = document.getElementById('ColorBorderTableUp').value, border = document.getElementById('EditorBorderTableUp').value, padding = document.getElementById('EditorTablePaddingUp').value, margin = document.getElementById('EditorTableSpacingUp').value, bgImage = document.getElementById('EditorTableBackgroundImageUp').value, table = this.tableUpdateSave;

		if(typeHeight == "px" || typeHeight == "") {
			typeHeight = "";
		}
		if(typeWidth == "px" || typeWidth == "") {
			typeWidth = "";
		}

		if(this.isNumeric(height) || height > 0) {
			table.setAttribute('height', height + typeHeight);
		}

		if(this.isNumeric(width) || width > 0) {
			table.width = width + typeWidth;
		}

		table.bgColor = bgColor;

		if(align != "") {
			table.align = align;
		}

		table.removeAttribute('bordercolor');

		if(borderColor != "") {
			table.setAttribute('bordercolor', borderColor);
		}

		if(border != "") {
			table.border = border;
		}

		table.cellPadding = padding;
		table.cellSpacing = margin;

		table.removeAttribute('background');

		if(bgImage != "") {
			table.setAttribute('background', bgImage);
		}
		this.hideBox();
	},
	
	tableDelete: function (table){
		table.parentNode.removeChild(table);
	},
	
	dipslayColorCell : function(elem) {

		var list = elem.parentNode.getElementsByTagName('ul')[0];

		list.style.visibility = "visible";

		document.body.onmousedown = function(e) {
			if(!Editor.clickOut("listBgColorSmall", e)) {
				list.style.visibility = "hidden";
			}
		}

		this.doc.onclick = function() {
			list.style.visibility = "hidden";
		}
	},

	BoxCellAttr : function(cell) {
		var height = (cell.height) ? cell.height : "", width = (cell.width) ? cell.width : "", align = (cell.align) ? cell.align : "", valing = (cell.vAlign) ? cell.vAlign : "", bgColor = (cell.bgColor) ? cell.bgColor : "", bgImg = (cell.getAttribute("background")) ? cell.getAttribute("background") : "", pxielWidth = true;
		pxielHeight = true;

		if(width.indexOf('%') > -1) {
			width = width.replace(/%/, "");
			pxielWidth = false;
		}

		if(height.indexOf('%') > -1) {
			height = height.replace(/%/, "");
			pxielHeight = false;
		}

		var html = "<div>" + "<table class='EditorTableBox' width='95%' align='center' border='0'>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>العرض</span>" + "</td>" + "<td>" + "<input class='textInputEditor2' value='" + width + "' type='text' id='EditorWidthCell' />" + "&nbsp;" + "<select id='EditorTypeWidthTable'>" + "<option value='px'>px</option>" + "<option ";
		if(pxielWidth == false) {
			html += "selected";
		}
		html += " value='%'>%</option>" + "</select>" + "</td>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>الإرتفاع</span>" + "</td>" + "<td>" + "<input class='textInputEditor2' value='" + height + "' type='text' id='EditorHeightCell' />" + "&nbsp;" + "<select id='EditorTypeHeightCell'>" + "<option value='px'>px</option>" + "<option ";
		if(pxielHeight == false) {
			html += "selected";
		}
		html += " value='%'>%</option>" + "</select>" + "</td>" + "</tr>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>تنسيق أفقي </span>" + "</td>" + "<td>" + "<select id='EditorCellAlign'>" + "<option ";
		if(align == "right") {
			html += "selected";
		}
		html += " value='right'>يمين</option>" + "<option ";
		if(align == "center") {
			html += "selected";
		}
		html += " value='center'>وسط</option>" + "<option ";
		if(align == "left") {
			html += "selected";
		}
		html += " value='left'>يسار</option>" + "</select>" + "</td>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>تنسيق عمودي </span>" + "</td>" + "<td>" + "<select id='EditorCellvAlign'>" + "<option ";
		if(valing == "top") {
			html += "selected";
		}
		html += " value='top'>فوق</option>" + "<option ";
		if(valing == "middle" || valing == "") {
			html += "selected";
		}
		html += " value='middle'>وسط</option>" + "<option ";
		if(valing == "bottom") {
			html += "selected";
		}
		html += " value='bottom'>أسفل</option>" + "</select>" + "</td>" + "</tr>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>لون الخلفية</span>" + "</td>" + "<td colspan='3'>" + "<ul class='bgColorBoxSmall'>" + "<li class='listBgColorSmall'>" + "<a ";
		if(bgColor != "") {
			html += "style='background-color:" + bgColor + ";'";
		}
		html += " onclick='Editor.dipslayColorCell(this,\"listBgColorSmall\"); return false;' href='#' class='EditorCheckColor'></a><input type='hidden' value='" + bgColor + "' id='BgColorCell' />" + "<ul  id='listColor1'>" + "<li>" + "<a href='#' onclick='Editor.autoColorTable(this); return false;' class='EditorColorAuto' style='width: 215px; height: 16px;'>تلقائي</a>";

		for(var x = 0; x < this.editorValue.moreColor.length; x++) {
			html += "<a onclick='Editor.insertColorForInputBoxTable(this,\"" + this.editorValue.moreColor[x] + "\"); return false;' style='background-color: #" + this.editorValue.moreColor[x] + ";' href='#'></a>";
		}

		html += "</li>" + "</ul>" + "</li>" + "</ul>" + "</td>" + "</tr>" + "<tr>" + "<td>" + "<span style='font-size: 14px; color:#4a4a4a;'>صورة الخلفية</span>" + "</td>" + "<td colspan='3'>" + "<input class='textInputEditor' value='" + bgImg + "' type='text' id='EditorCellBackgroundImage' />" + "</td>" + "</tr>" + "</table>" + "</div>";

		this.cellUpdateSave = cell;

		this.showBox('خصائص الخلية', html, 'editCell()', 'تعديل الخلية');
	},

	editCell : function() {

		var height = document.getElementById('EditorHeightCell').value, typeHeight = document.getElementById('EditorTypeHeightCell').value, width = document.getElementById('EditorWidthCell').value, typeWidth = document.getElementById('EditorTypeWidthTable').value, align = document.getElementById('EditorCellAlign').value, valign = document.getElementById('EditorCellvAlign').value, bgColor = document.getElementById('BgColorCell').value, bgImg = document.getElementById('EditorCellBackgroundImage').value, cell = this.cellUpdateSave;

		if(typeHeight == "px" || typeHeight == "") {
			typeHeight = "";
		}
		if(typeWidth == "px" || typeWidth == "") {
			typeWidth = "";
		}

		if(this.isNumeric(height) || height > 0) {
			cell.height = height + typeHeight;
		}

		if(this.isNumeric(width) || width > 0) {
			cell.width = width + typeWidth;
		}

		if(align != "") {
			cell.align = align;
		}

		if(valign != "") {
			cell.vAlign = valign;
		}

		cell.bgColor = "";

		if(bgColor != "") {
			cell.bgColor = bgColor;
		}

		cell.removeAttribute('background');

		if(bgImg != "") {
			cell.setAttribute('background', bgImg);
		}

		this.hideBox();
	},
	
	CellDelete: function (cell)
	{
		if (cell.nodeName.toLowerCase() == "td")
		{
			cell.parentNode.removeChild(cell);
		}
	},
	
	rowDelete: function (row)
	{
		if (row.nodeName.toLowerCase() == "tr")
		{
			row.parentNode.removeChild(row);
		}
	},
	
	rowAddBefore: function (row){
		if (row.nodeName.toLowerCase() == "tr")
		{
			var index = Number(row.rowIndex), newRow = row.parentNode.insertRow(index), cellsLength = row.cells.length;
			
			for (var x=0; x < cellsLength; x++)
			{
				var cell = newRow.insertCell(0);
				cell.innerHTML = "&nbsp;";
			}
		}
	},
	
	rowAddAfter: function (row){
		if (row.nodeName.toLowerCase() == "tr")
		{
			var index = Number(row.rowIndex) + 1, newRow = row.parentNode.insertRow(index), cellsLength = row.cells.length;
			
			for (var x=0; x < cellsLength; x++)
			{
				var cell = newRow.insertCell(0);
				cell.innerHTML = "&nbsp;";
			}
		}
	},
	
	deleteColl: function (cell)
	{
		var index = cell.cellIndex, rows =  cell.parentNode.parentNode.rows;
		
		for (var x = 0; x < rows.length; x++)
		{ 
			rows[x].deleteCell(index);
		}
	},
	
	addCellBefore: function (cell){
	
		var index = cell.cellIndex, rows =  cell.parentNode.parentNode.rows;
		
		for (var x = 0; x < rows.length; x++)
		{ 
			var cl = rows[x].insertCell(index);
			cl.innerHTML = "&nbsp;";
		}
		
	},
	
	addCellAfter: function (cell){
		var index = Number(cell.cellIndex)+1, rows =  cell.parentNode.parentNode.rows;
		
		for (var x = 0; x < rows.length; x++)
		{ 
			var cl = rows[x].insertCell(index);
			cl.innerHTML = "&nbsp;";
		}
	},
	
	showBoxCoude : function() {

		this.body.focus();
		this.saveSelect = this.getSelect();

		boxCoude = "<div>" + "<div class='divSelectLang'>" + "<select class='Select_box' id='EditorLange'>" + "<option value=''>حدد اللغة</option>" + "<option value='php'>php</option>" + "<option value='javascript'>javascript</option>" + "<option value='html'>html</option>" + "<option value='css'>css</option>" + "<option value='other'>أخرى</option>" + "</select>" + "<br /><br />" + "<textarea dir='ltr' id='coudeText' class='boxTextarea'></textarea>" + "</div>" + "</div>";

		this.showBox(' إضافة كود', boxCoude, 'insertCoude()', 'اضافة الجدول', '600');

	},

	insertCoude : function() {
		var lang = document.getElementById('EditorLange').value, text = document.getElementById('coudeText').value, content = "";

		if(lang == "other") {
			lang = "";
		}

		switch (lang) {
			case "php":
				if(text.indexOf("<?") == -1) {
					content += "<?php \n" + text + " \n" + "?>";
				} else {
					content = text;
				}
				break;

			case "javascript":
				if(text.indexOf("<script") < 0) {
					content += "<script type='text/javascript'> \n" + text + "\n" + "</script>";
				} else {
					content = text;
				}
				break;

			case "css":
				if(text.indexOf("<style") < 0) {
					content += "<style type='text/css'>\n" + text + "\n" + "</style>";
				} else {
					content = text;
				}
				break;

			case "html":
				if(text.indexOf("<html") < 0) {
					content += '<!DOCTYPE>\n' + '<html xmlns="http://www.w3.org/1999/xhtml">\n' + text + "\n" + "</html>";
				} else {
					content = text;
				}
				break;

			default:
				content = text;
				break;

		}

		var create = "<div dir='"+this.dir+"'><h4 style='padding: 2px; margin: 0; direction: "+this.dir+"; font-family: " + this.family + ";'> كود ";
		var explode = content.split("\n");
		
		if(lang != "") {
			create += "<font color='#FF3366'>" + lang + "</font>";
		}

		create += " :</h4>" + "<pre style='heigth: 700px; max-width: 600px; text-align: left; font-family: Courier New; overflow: auto; font-size: 14px; border: 1px solid #999; margin: 0;' dir='ltr' class='EditorCoude'>" + 
						"<div style='color:#999; background-color: #E3EBF2; border-right: 1px solid #ddd; width: 40px; text-align:center; float: left;'>";
						
							for (var x = 0; x < explode.length; x++){
								create += "<div style='padding: 3px;'>"+(x+1)+"</div>";
							}
						
						create += "</div>"+
						"<div style='width: 555px; float: left;'>";
						
						var linechange = false;
						
						for (var i = 0; i < explode.length; i++){
								create += "<div style='padding-left: 20px; padding-top: 3px; padding-bottom: 3px; ";
								
								var validate = (i+1) / 2;
								
								validate = new String(validate);
								
								if (validate.indexOf('.') <= -1){ create += "background-color: #f9f9f9;"; }
								
								create += "'>&nbsp;"+this.htmlspecialchars(explode[i])+"</div>";
						}
						
						create += "</div><div style='clear: both;'></div>"+
						"</pre></div><br />";

		if(text != "") {
			if(this.browser() == "ie") {
				this.saveSelect.pasteHTML(create);
			} else {
				var newPlace = this.doc.createElement('span');

				var range = this.saveSelect.getRangeAt(0);

				newPlace.innerHTML = create;
				range.collapse(false);
				range.insertNode(newPlace);

			}
			this.hideBox();
		} else
			alert('عليك كتابة الكود');
	},
	
	showBoxYoutube: function ()
	{
		this.body.focus();
		this.saveSelect = this.getSelect();

		boxVideo = "<div>" + 
						"<div>"+
							"<span style='font-size: 14px; color:#4a4a4a;'>عرض الفيديو</span>&nbsp;&nbsp;"+
							"<input class='textInputEditor2' type='text' value='640' id='EdVideoWidth' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+

							"<span style='font-size: 14px; color:#4a4a4a;'>طول الفيديو</span>&nbsp;&nbsp;"+
							"<input class='textInputEditor2' type='text' value='390' id='EdVideoHeight' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
							
							"<br /><br />"+
							"<span style='font-size: 14px; color:#4a4a4a;'>إتجاه الفيديو</span>&nbsp;&nbsp;"+
							"<select id='EdAlignVideo'>" + 
								"<option value='rigth'>يمين</option>" + 
								"<option value='center'>وسط</option>" + 
								"<option value='left'>يسار</option>"+
							"</select>"+
							"<br /><br />"+
							"<span style='font-size: 14px; color:#4a4a4a;'>رابط الفيديو</span>&nbsp;&nbsp;"+
							"<input class='textInputEditor' type='text' id='EdVideoUrl' />&nbsp;<br />"+
							"<br /><span style='color: #999; font-size:12px;'>ملاحظة : يجب أن ييكون الفيديو من موقع youtube فقط</span>"+
						"</div>"+
					"</div>";

		this.showBox(' إضافة فيديو', boxVideo, 'insertVideo()', 'اضافة الفيديو', '400');
	},
	
	insertVideo: function ()
	{
		var widthVideo = Number(document.getElementById('EdVideoWidth').value),
		HeightVideo = Number(document.getElementById('EdVideoHeight').value),
		EdAlignVideo = document.getElementById('EdAlignVideo').value,
		UrlVideo = document.getElementById('EdVideoUrl').value;
		
		
		
		if (!this.isNumeric(widthVideo) || widthVideo == null)
			widthVideo = 640;
		
		if (!this.isNumeric(HeightVideo) || HeightVideo == null)
			HeightVideo = 390;
		
		
		if (!EdAlignVideo || EdAlignVideo == null) EdAlignVideo = "";
		
		if (UrlVideo.indexOf("youtube") > -1)
		{
			var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11,11}).*/;
			var match = UrlVideo.match(regExp);
				
		if (match)
			{ 
				if (match.length >= 2) var id =  match[2]; 	
				
				var src = 'http://www.youtube.com/embed/'+id;
				
				html = '<p style="margin: 0;" align="'+EdAlignVideo+'"><iframe width="'+widthVideo+'" height="'+HeightVideo+'" src="'+src+'" frameborder="0" allowfullscreen></iframe></p>';
				
				if(this.browser() == "ie") {
					this.saveSelect.pasteHTML(html);
				} else {
					var newPlace = this.doc.createElement('div');

					var range = this.saveSelect.getRangeAt(0);

					newPlace.innerHTML = html;

					range.collapse(false);
					range.insertNode(newPlace);
				}
				this.hideBox();
				
			}
			else
			{
				alert('الرابط المدخل خاطئ');
			}
			
		}
		else
		{
			alert('عليك اختيار الفيديو من موقع youtube');
		}
	}
};

