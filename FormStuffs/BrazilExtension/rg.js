if(!JStuff)
	var JStuff = {};

var numberMaskInput = function() 
{
   var shiftIsPressed = false;
   var mousedown = false;

   function numMaskTyping(event)
   {
		var key = event.keyCode || event.charCode;

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


JStuff.rgInput = function()
{
   function rgTyping(event)
   {
		var key = event.keyCode || event.charCode;
		if(key == keyCode["backspace"])
			return;

		numberMaskInput.numMaskTyping.call(this,event);

		maxInput.call(this, 12, event);
		var size = this.value.length;
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
