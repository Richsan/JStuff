if(!JStuff)
	var JStuff = {};


JStuff.priceInput = function()
{
	var moneySymbols = 
	{
		"real": {text: "R$ ", separator: ","},
		"dollar": {text: "$ ", separator: "."},
		"euro": {text: '\u20AC'+" ", separator: "."},
		"yen": {text: '\u00A5'+" ", separator: "."}
	};


   var  symbol = moneySymbols["dollar"];
   var shiftPressed = false;
   var mousedown = false;
	var currentCaretPos;
	var oldValue;
	var delPressed = false;

	function backspaceVerification()
	{
		var inputValue = this.value.charAt(currentCaretPos);
		var size = this.value.length;
		var regexp = /\s[, | .]/;
		if(size == 0)
			return;

		if(regexp.test(this.value))
			this.value = "";
		
		if(oldValue.charAt(size) == symbol.separator && currentCaretPos == (size+1))
		{
			this.value = oldValue;
			return;
		}

		if(currentCaretPos <= symbol.text.length)
		{
			this.value = "";
			return;
		}

		separatorPos = oldValue.indexOf(symbol.separator);
		
		if(currentCaretPos == separatorPos && delPressed)
		{
			this.value = oldValue;
			delPressed = false;
			JStuff.util.setCaretPosition(this,currentCaretPos);
			return;
		}

		if(currentCaretPos == (separatorPos + 1) && !delPressed)
		{
			this.value = oldValue;
			JStuff.util.setCaretPosition(this,currentCaretPos);
		}
	}

	function completeNumber()
	{
		var regexp = /[,|.]/, regexp2 = /[,|.]\d\d$/ , regexp3 = /[, |.]\d$/;

		if(this.value.length == 0)
			return;

		if(!regexp.test(this.value))
		{
			this.value = this.value + symbol.separator+"00";
			JStuff.util.setCaretPosition(this,currentCaretPos);
			return;
		}

		if(!regexp2.test(this.value))
		{
			if(!regexp3.test(this.value))
				this.value = this.value + "00";

			else
				this.value = this.value + "0";

			JStuff.util.setCaretPosition(this,currentCaretPos);
		}

	}
	function priceInputChange(event)
	{

		if(this.value.length == oldValue.length)
			return;


		if(this.value.length < oldValue.length)
		{
			backspaceVerification.call(this);
			return;
		}

		var inputCode = this.value.charCodeAt(currentCaretPos);
		var inputValue = this.value.charAt(currentCaretPos);
		var getUnicode = JStuff.util.getUnicode;
		
		if(inputCode < getUnicode("0") || inputCode > getUnicode("9"))
		{
			this.value = oldValue;
			JStuff.util.setCaretPosition(this,currentCaretPos);
			return;
		}
		

		if(this.value.length == 1)
		{
			this.value = symbol.text + inputValue;
			completeNumber.call(this);
			JStuff.util.setCaretPosition(this,symbol.text.length+1);
			return;
		}

		if(currentCaretPos >= oldValue.indexOf(symbol.separator))
		{
			var reg = /[. | ,]\d{0,2}$/;

			if(!reg.test(this.value))
			{
				this.value = oldValue;
				JStuff.util.setCaretPosition(this,currentCaretPos);
			}
		}
		
	}

   function priceTyping( event)
   {
		currentCaretPos = JStuff.util.getCaretPosition(this);
		oldValue = this.value;

		var key = event.keyCode || event.charCode;
		var keyCode = JStuff.util.keyCode;

		if(key == keyCode["del"])
			delPressed = true;

		if(key == keyCode["shift"])
			shiftPressed = true;

		if(key == keyCode["right"] || key == keyCode["left"])
		{
			if(shiftPressed)
				event.preventDefault();
		}

		if(key == keyCode["enter"])
			completeNumber.call(this);
   }

	function priceKeyUp(event)
	{
		var key = event.keyCode || event.charCode;
		var keyCode = JStuff.util.keyCode;

		if(key == keyCode["shift"])
			shiftPressed = false;

		if(key == keyCode["del"])
			delPressed = false;
	}

	function priceMouseDown(event)
	{ 
		mousedown = true;
	}

	function priceMouseUp(event)
	{
		mousedown = false;
		this.setSelectionRange(this.value.length,this.value.length);
	}

   function priceFocusOut(event)
   {
		completeNumber.call(this);
   }

   function turnOn(idList, moneyType)
   {
		if(moneyType)
			this.symbol = moneySymbols[moneyType]
		

		var atribEvents = function(element, index)
		{
			var obj = document.getElementById(element);

			obj.oninput = priceInputChange;
			obj.onkeydown = priceTyping;
			obj.onkeyup = priceKeyUp;
			obj.onblur = priceFocusOut;
			obj.onmousedown = priceMouseDown;
			obj.onmouseup = priceMouseUp;

			obj.completeNumber = completeNumber;
		}

		if(typeof(idList) != 'string')
			idList.forEach(atribEvents, this);
		else
			atribEvents(idList);
   }

   return {turnOn};
}();
