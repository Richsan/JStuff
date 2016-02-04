if(!JStuff)
	throw "You must include JStuffUtil before!";

JStuff.rgInput = function()
{
	var mousedown = false;
	var oldValue;
	var currentCaretPos;

	function rgInputChange(event)
	{
		if(JStuff._util.maxChars.call(this,currentCaretPos,12))
			return;

		if(this.value.length == oldValue.length)
			return;

		var inputCode = this.value.charCodeAt(currentCaretPos);
		var inputValue = this.value.charAt(currentCaretPos);
		var getUnicode = JStuff.util.getUnicode;

		
		if(this.value.length == 12 && 11 == currentCaretPos
			&& (inputValue == "x" || inputValue == "X"))
		{
			this.value = oldValue + "X";
			return;
		}
		if(inputCode >= getUnicode("0") && inputCode <= getUnicode("9"))
		{
			var length = this.value.length;
			if(length == 3 || length == 7)
			{
				this.value = oldValue + "."+inputValue;
				return;
			}

			if(length == 11)
			{
				this.value = oldValue + "-"+inputValue;
				return;
			}

			return;
		}

		this.value = JStuff.util.removeChar(this.value, currentCaretPos);
		JStuff.util.setCaretPosition(this,currentCaretPos);		
	}


   function rgMouseDown(event)
   {
		mousedown = true;
   }

	function rgMouseUp(event)
   {
		mousedown = false;
		JStuff.util.setCaretPosition(this,this.value.length);
   }

   function rgTyping(event)
   {
		currentCaretPos = JStuff.util.getCaretPosition(this);
		oldValue = this.value;

		var key = event.keyCode || event.charCode;
		var keyCode = JStuff.util.keyCode;

		if(key == keyCode["left"] || key == keyCode["right"])
		{
			event.preventDefault();
			return;
		}

		if(currentCaretPos < this.value.length)
      {
         JStuff.util.setCaretPosition(this,this.value.length);
         currentCaretPos = this.value.length;
         return;
      }

	}

   function turnOn(idList)
   {
		var addEventListener = JStuff.util.addEventListener;
		function atribEvents(id)
		{
			var obj = document.getElementById(id);
			var numberMaskInput = JStuff.util.numberMaskInput;

			addEventListener.call(obj,"keydown",rgTyping);
			addEventListener.call(obj,"input",rgInputChange);
			addEventListener.call(obj,"mousedown",rgMouseDown);
			addEventListener.call(obj,"mouseup",rgMouseUp);
		}

		if(typeof(idList) != 'string')
			idList.forEach(atribEvents, this);
		else
			atribEvents(idList);
  }
   return {turnOn};
}();
