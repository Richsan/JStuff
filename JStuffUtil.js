var JStuff = {};

JStuff.hasTouch = false;

window.ontouchstart = function()
{
	JStuff.hasTouch = true;
}


JStuff.util = {};
JStuff.util.keyCode = {"0":48, "9":57, ",":44, "backspace":8,"del" : 46,
					".":46, "right" : 39, "left": 37, "a": 65, "z": 90, "A": 97, "Z": 122,
					"ç": 231, "Ç": 199, "enter": 13, "tab": 9,"shift":16};

JStuff.util.arrows = {right: 0, left: 0};

JStuff.util.getUnicode = function(character)
{
	return character.charCodeAt(0);
}

JStuff.util.removeChar = function(str,idx)
{
	var ret = str.slice(0,idx) + str.slice(idx+1);
	return ret;
}


JStuff.util.getCaretPosition = function(oField)
{

	var iCaretPos = 0;
	// IE Support
	if (document.selection)
	{
		oField.focus ();
		var oSel = document.selection.createRange ();
		oSel.moveStart ('character', -oField.value.length);

		iCaretPos = oSel.text.length;
	}

	// Firefox support
	else if (oField.selectionStart || oField.selectionStart == '0')
		iCaretPos = oField.selectionStart;

	return (iCaretPos);
};

JStuff.util.setCaretPosition = function(obj,pos)
{
	obj.setSelectionRange(pos,pos);
}

JStuff.util.addEventListener = function(eventString, handler)
{
	if(this.attachEvent)
		this.attachEvent("on"+eventString, handler);
	else
		this.addEventListener(eventString, handler);
}
//==============================================================

JStuff.inherit = function(proto)
{
  function f() {}

  f.prototype = proto

  return new f

}


JStuff.createHTTPRequestObject = function()
{
   var obj;
   
   if (window.XMLHttpRequest)
		obj =new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
   else
		obj =new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
   
   return obj;
}

JStuff.util.stateChange = function(func)
{
   if((this.readyState == 4 || this.readyState == "complete") && this.status == 200)
		func(this.responseText);
}

JStuff._util = {};

JStuff._util.maxChars = function(currentCaretPos, maxChars)
{
	if(!maxChars)
		maxChars = this.maxChars;
	if(this.value.length > maxChars)
	{
		this.value = JStuff.util.removeChar(this.value, currentCaretPos);
		JStuff.util.setCaretPosition(this,currentCaretPos);
		return true;
	}

	return false;
}
