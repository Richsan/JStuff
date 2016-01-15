//refatorar para keyNum
var keyAscii = {"0":48, "9":57, ",":44, "backspace":8,"del" : 46,
					 ".":46, "right" : 39, "left": 37, "a": 65, "z": 90, "A": 97, "Z": 122,
					 "ç": 231, "Ç": 199, "enter": 13, "tab": 9};

var arrows = {right: 0, left: 0};

function isCursorMoveORBackspaceDel(key)
{
   if(key == keyAscii["right"] || key == keyAscii["left"]
      || key == keyAscii["backspace"] || key == keyAscii["del"])
		return true;

   return false;
}

function decimalTextComplete(obj)
{
   var regexp1 = /[,|.]$/;
   var regexp2 = /[,|.]\d$/;

   if(regexp1.test(obj.value))
		obj.value = obj.value + "00";

   if(regexp2.test(obj.value))
		obj.value = obj.value + "0";
   
}
function isDigit(keyVal)
{
   return keyVal >= keyAscii["0"] && keyVal <= keyAscii["9"];
}

function onlyNumbers(key, event)
{
   if(key == keyAscii["backspace"] || key == keyAscii["del"])
		return false;
   if(!isDigit(key))
   {
		if(key != keyAscii["right"] && key != keyAscii["left"])
		{
			event.preventDefault();
			return false;
		}
   }


   return true;
}

function getCaretPosition (oField) {

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
}