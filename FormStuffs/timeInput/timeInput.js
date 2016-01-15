if(!JStuff)
	var JStuff = {}; 

JStuff.timeInput = function()
{
   function inputVerification(size)
   {
		var hourValue;
		var minValue;

		if(size == 1)
		{
			hourValue = this.value.substring(0,2);
			hourValue = parseInt(hourValue);

			if(hourValue > 23)
			{
				this.value = this.value.slice(0,1);
				return;
			}
		}

		if(size == 4)
		{
			minValue = this.value.substring(3,5);
			minValue = parseInt(minValue);

			if(minValue > 59)
			{
				this.value = this.value.slice(0,3) + this.value.slice(3,4);
				return;
			}
		}
   }

   function timeTyping(event)
   {
		var key = event.keyCode || event.charCode;
		if(key == keyCode["backspace"])
			return;

		numberMaskInput.numMaskTyping.call(this,event);
		maxInput.call(this,5,event);

		var size = this.value.length;
		if(size == 1 || size == 4)
		{
			setTimeout( inputVerification.bind(this,size),0);
			size = this.value.length;
		}
		if(size == 2)
			this.value = this.value + ":";
   }

   
   function turnOn(idList)
   {
		function atribEvents(id)
		{
			var obj = document.getElementById(id);
			obj.onkeypress = timeTyping;
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
