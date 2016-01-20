if(!JStuff)
	var JStuff = {};

JStuff.rgInput = function()
{
	function rgInputChange(event)
	{
		if(this.value.length > 12)
		{
			this.value = JStuff.util.removeChar(this.value, currentCaretPos);
			JStuff.util.setCaretPosition(this,currentCaretPos);
			return;
		}

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
		}
   }

   function turnOn(idList)
   {
		function atribEvents(id)
		{
			var obj = document.getElementById(id);
			var numberMaskInput = JStuff.util.numberMaskInput;

			obj.onkeydown = rgTyping;
			obj.oninput = rgInputChange;
			//obj.onmousedown = numberMaskInput.numMaskMouseDown;
			//obj.onmouseup = numberMaskInput.numMaskMouseUp;
		}

		if(typeof(idList) != 'string')
			idList.forEach(atribEvents, this);
		else
			atribEvents(idList);
  }
   return {turnOn};
}();
