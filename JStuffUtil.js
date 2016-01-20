//refatorar para keyNum
if(!JStuff)
	var JStuff = {};


JStuff.hasTouch = false;

window.ontouchstart = function()
{
	JStuff.hasTouch = true;
}


JStuff.util = {};
JStuff.util.keyCode = {"0":48, "9":57, ",":44, "backspace":8,"del" : 46,
					".":46, "right" : 39, "left": 37, "a": 65, "z": 90, "A": 97, "Z": 122,
					"ç": 231, "Ç": 199, "enter": 13, "tab": 9};

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

JStuff.util.isCursorMoveORBackspaceDel = function(key)
{
	if(key == JStuff.util.keyCode["right"] || key == JStuff.util.keyCode["left"]
		|| key == JStuff.util.keyCode["backspace"] || key == JStuff.util.keyCode["del"])
		return true;

	return false;
};

JStuff.util.decimalTextComplete = function(obj)
{
	var regexp1 = /[,|.]$/;
	var regexp2 = /[,|.]\d$/;

	if(regexp1.test(obj.value))
		obj.value = obj.value + "00";

	if(regexp2.test(obj.value))
		obj.value = obj.value + "0";
	
};

JStuff.util.isDigit = function(keyVal)
{
	return keyVal >= JStuff.util.keyCode["0"] 
		&& keyVal <= JStuff.util.keyCode["9"];
};

JStuff.util.isAlpha = function(key)
{
	return (key >= JStuff.util.keyCode["A"] && key <= JStuff.util.keyCode["Z"])
		||	(key >= JStuff.util.keyCode["a"] && key <= JStuff.util.keyCode["z"]);

};

JStuff.util.onlyNumbers = function(key, event)
{
	if(key == JStuff.util.keyCode["backspace"] || key == JStuff.util.keyCode["del"])
		return false;

	if(!JStuff.util.isDigit(key))
	{
		if(key != JStuff.util.keyCode["right"] && key != JStuff.util.keyCode["left"])
		{
			event.preventDefault();
			return false;
		}
	}


	return true;
};

JStuff.util.getCaretPosition = function(oField)
{

	var iCaretPos = 0;
	// IE Support
	if (document.selection)
	{
		oField.focus ();
		// To get cursor position, get empty selection range
		var oSel = document.selection.createRange ();

		// Move selection start to 0 position
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

JStuff.util.exceptionListEval = function(exceptList,event, carretPos)
{
   if(!exceptList)
   {
		event.preventDefault();
		return;
   }
   setTimeout(function() { 
      var charDigited = this.value.slice(carretPos,carretPos+1);
		if(exceptList.indexOf(charDigited) == -1)
			this.value = this.value.slice(0,carretPos) + this.value.slice(carretPos +1, this.value.length);
   }.bind(this), 0);
};

JStuff.util.maxInput = function(maxChars, event)
{
   if(maxChars)
   {
		if(this.value.length >= maxChars)
		{
			event.preventDefault();
			return;
		}
   }

};


JStuff.util.numberMaskInput = function() 
{
   var shiftIsPressed = false;
   var mousedown = false;

   function numMaskTyping(event)
   {
		var key = event.keyCode || event.charCode;
		var keyCode = JStuff.util.keyCode;

		if(key == keyCode["enter"] || key == keyCode["tab"])
			return;


		if(key < keyCode["0"] || key > keyCode["9"])
		{
			event.preventDefault();
			return;
		}
   }

   function numMaskKeyDown(event)
   {
		var key = event.keyCode || event.charCode;
		var keyCode = JStuff.util.keyCode;
		var getCaretPosition = JStuff.util.getCaretPosition;

		if(mousedown)
		{
			event.preventDefault();
			return;
		}
		if(key == keyCode["left"])
		{
			event.preventDefault();
			return;
		}
		
		if(key == 16)
		{
			shiftIsPressed = true;
			return;
		}

		if((shiftIsPressed && key == 53))
		{
			event.preventDefault();
			return;
		}
		if(key == 229)
		{
			setTimeout(function(carretPos){
				this.value = this.value.slice(0,carretPos) + this.value.slice(carretPos +1, this.value.length)
				;}.bind(this,getCaretPosition(this)),0);
			return;
		}

		if((key == 192) || (key == 229 || key == 0 || key == 222) || (key == 190))
		{
			setTimeout(function(carretPos){
				this.value = this.value.slice(0,carretPos) + this.value.slice(carretPos +1, this.value.length)
				;}.bind(this,getCaretPosition(this)),0);
			
			event.preventDefault();
			return;
		}
   }
   
   function numMaskKeyUp(event)
   {
		var key = event.keyCode || event.charCode;
		if(key == 16)
			shiftIsPressed = false;
   }

   function numMaskMouseDown(event)
   {
		mousedown = true;
   }

   function numMaskMouseUp(event)
   {
		mousedown = false;
		this.setSelectionRange(this.value.length,this.value.length);
   }
   return {numMaskTyping, numMaskKeyDown, numMaskKeyUp, numMaskMouseDown, numMaskMouseUp};
}();

//==============================================================

function inherit(proto)
{
  function f() {}

  f.prototype = proto

  return new f

}


function createHTTPRequestObject()
{
   var obj;
   
   if (window.XMLHttpRequest)
		obj =new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
   else
		obj =new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
   
   return obj;
}

function stateChange(func)
{
   if((this.readyState == 4 || this.readyState == "complete") && this.status == 200)
		func(this.responseText);
}
