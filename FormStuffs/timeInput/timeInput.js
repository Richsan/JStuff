if(!JStuff)
	var JStuff = {}; 

JStuff.timeInput = function()
{
	var oldValue;
	var currentCaretPos;
	
   function inputVerification(size)
   {
		var hourValue;
		var minValue;
		var mousedown = false;

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

	function timeInputChange(event)
	{
		if(this.value.length > 5)
		{
			this.value = JStuff.util.removeChar(this.value, currentCaretPos);
			JStuff.util.setCaretPosition(this,currentCaretPos);
			return;
		}

		if(this.value.length <= oldValue.length)
			return;

		var inputCode = this.value.charCodeAt(currentCaretPos);
		var inputValue = this.value.charAt(currentCaretPos);
		var getUnicode = JStuff.util.getUnicode;
		var size = oldValue.length;

		if(inputCode < getUnicode("0") || inputCode > getUnicode("9"))
		{
			this.value = JStuff.util.removeChar(this.value, currentCaretPos);
			JStuff.util.setCaretPosition(this,currentCaretPos);
			return;
		}

		if(size == 1 || size == 4)
		{
			inputVerification.call(this,size);
			size = this.value.length;
		}
		if(size == 2)
			this.value = this.value + ":";
   }

	function timeMouseDown(event)
   {
		mousedown = true;
   }

	function timeMouseUp(event)
   {
		mousedown = false;
		JStuff.util.setCaretPosition(this,this.value.length);
   }

	function getCurrentTime()
	{
		var d = new Date;
		var min = d.getMinutes();
		var hours = d.getHours();

		if(min < 10)
			min = "0"+min;
		if(hours < 10)
			hours = "0"+hours;

		return hours + ":" + min;
	}

	function putCurrentTimeValue()
   {
		this.value = getCurrentTime();
   }

   
   function turnOn(idList)
   {
		function atribEvents(id)
		{
			var obj = document.getElementById(id);
			var numberMaskInput = JStuff.util.numberMaskInput;

			obj.onkeydown = timeTyping;
			obj.oninput = timeInputChange;
			obj.onmousedown = timeMouseDown;
			obj.onmouseup = timeMouseUp;

			obj.putCurrentTimeValue = putCurrentTimeValue;
		}

		if(typeof(idList) != 'string')
			idList.forEach(atribEvents, this);
		else
			atribEvents(idList);
   }
   return {turnOn};

}();










