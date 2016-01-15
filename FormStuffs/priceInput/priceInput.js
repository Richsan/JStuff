if(!JStuff)
	var JStuff = {};

var moneySymbols = 
	{
		"real": {text: "R$ ", separator: ",", regexp1: /^R\$\s/, regexp2: /R\$ [,|.]/},
		"dollar": {text: "$ ", separator: ".", regexp1: /^\$\s/, regexp2: /\$ [,|.]/},
		"euro": {text: '\u20AC'+" ", separator: ".", regexp1: /^\u20AC\s/, regexp2: /\u20AC [,|.]/},
		"yen": {text: '\u00A5'+" ", separator: ".", regexp1: /^\u00A5\s/, regexp2: /\u00A5 [,|.]/}
		
	};


JStuff.priceInput = function()
{
   var  symbol = moneySymbols["real"];
   var shiftIsPressed = false;
   var mousedown = false;

   function priceTyping(symbol, event)
   {
		var regexp = /[,|.]/, regexp2 = /[,|.]\d\d/;
		var key = event.keyCode || event.charCode;

		if(!onlyNumbers(key, event))
			return;
		

		if(this.value == "")
		{
			this.value = symbol.text;
		}

		else if(getCaretPosition(this) < 3)
		{
			if(key != keyAscii["backspace"]
				&& key != keyAscii["right"] && key != keyAscii["left"])
				event.preventDefault();
			return;
		}

		if(getCaretPosition(this) >= this.value.length -2)
		{
			if(regexp2.test(this.value) && key != keyAscii["backspace"]
				&& key != keyAscii["right"] && key != keyAscii["left"])
			{
				if(key != keyAscii["backspace"])
					event.preventDefault();
				return;
			}
		}
		
		if(!regexp.test(this.value))
		{
			this.value = this.value + (key - 48) + symbol.separator+"00";
			this.setSelectionRange(this.value.length -3,this.value.length -3);
			event.preventDefault();
		}
   }

   function priceKeyDown(symbol,event)
   {
		var regexp = symbol.regexp1;
		var key = event.keyCode || event.charCode;
		
		if(mousedown)
		{
			event.preventDefault();
			return;
		}
		if(key == 16)
			shiftIsPressed = true;

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
	   

		if(key == keyAscii["del"])
		{
			event.preventDefault();
			return;
		}

		if(key == keyAscii["backspace"])
		{
			if(regexp.test(this.value) && getCaretPosition(this) <= symbol.text.length)
			{
				this.value = "";
				return;
			}

			if(this.value.charAt(getCaretPosition(this) - 1) == symbol.separator)
				event.preventDefault();

			return;
		}


   }

   function priceFocusOut(symbol,event)
   {
		var regexp3 = symbol.regexp2;
		decimalTextComplete(this);
		
		if(regexp3.test(this.value))
			this.value = symbol.text + "0" + this.value.substring(symbol.text.length);

   }

   function turnOn(idList, moneyType)
   {
		if(moneyType)
			this.symbol = moneySymbols[moneyType]
		

		var atribEvents = function(element, index)
		{
			var obj = document.getElementById(element);
			obj.onkeypress = priceTyping.bind(obj,symbol);
			obj.onkeyup = function(event){var key = event.keyCode || event.charCode; if(key == 16)shiftIsPressed = false;};
			obj.onkeydown = priceKeyDown.bind(obj, symbol);
			obj.onblur = priceFocusOut.bind(obj, symbol);
			obj.onmousedown = function(event){ mousedown = true;};
			obj.onmouseup = function(event){mousedown = false; this.setSelectionRange(this.value.length,this.value.length);}
		};

		if(typeof(idList) != 'string')
			idList.forEach(atribEvents, this);
		else
			atribEvents(idList);
   }

   return {turnOn};
}();

/*window.onload = function(){

  priceInput.eval(["preco"],"dolar");
  };
*/
