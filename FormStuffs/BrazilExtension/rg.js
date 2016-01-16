if(!JStuff)
	var JStuff = {};

JStuff.rgInput = function()
{
   function rgTyping(event)
   {
		var key = event.keyCode || event.charCode;
		var numberMaskInput = JStuff.util.numberMaskInput;
		var keyCode = JStuff.util.keyCode;
		var size = this.value.length;
		var maxInput = JStuff.util.maxInput;

		if(key == keyCode["backspace"])
			return;

		numberMaskInput.numMaskTyping.call(this,event);

		maxInput.call(this, 12, event);
		
		if(size == 2 || size == 6)
			this.value = this.value + ".";
		if(size == 10)
			this.value = this.value + "-";
   }

   function turnOn(idList)
   {
		function atribEvents(id)
		{
			var obj = document.getElementById(id);
			var numberMaskInput = JStuff.util.numberMaskInput;

			obj.onkeypress = rgTyping;
			obj.onkeyup = numberMaskInput.numMaskKeyUp;
			obj.onkeydown = numberMaskInput.numMaskKeyDown;
			obj.onmousedown = numberMaskInput.numMaskMouseDown;
			obj.onmouseup = numberMaskInput.numMaskMouseUp;
		}

		if(typeof(idList) != 'string')
			idList.forEach(atribEvents, this);
		else
			atribEvents(idList);
  }
   return {turnOn};
}();
