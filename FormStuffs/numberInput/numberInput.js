if(!JStuff)
	var JStuff = {};


JStuff.numberInput = function() 
{
   var shiftIsPressed = false;
   var isCursorMoveORBackspaceDel = JStuff.util.isCursorMoveORBackspaceDel;
	var keyCode = JStuff.util.keyCode;
	var getCaretPosition = JStuff.util.getCaretPosition;
	var exceptionListEval = JStuff.util.exceptionListEval;

	var oldValue;
	var currentCaretPos;

	function numberInputChange(event)
	{
		
	}
   function numberTyping(event)
   {
		var key = event.keyCode || event.charCode;
		var maxInput = JStuff.util.maxInput;

		if(isCursorMoveORBackspaceDel(key))
			return;

		if(key == keyCode["enter"] || key == keyCode["tab"])
			return;

		maxInput.call(this, this.maxChars, event);
		if(key >= keyCode["0"] && key <= keyCode["9"])
		{
			if(this.maxNum && !this.exceptList)
			{
				setTimeout(function() { 
					if(parseInt(this.value) > this.maxNum)
						this.value = this.value.slice(0,this.value.length -1);
				}.bind(this), 0);
			}

			return;

		}
		
		exceptionListEval.call(this,this.exceptList,event,getCaretPosition(this));
   }

   function eval(idList, properties)
   {

		function atribEvents(id)
		{
			var obj = document.getElementById(id);
			var getCaretPosition = JStuff.util.getCaretPosition;
			
			obj.exceptList = properties.exceptionList;
			obj.maxChars  = properties.maxLength;
			obj.maxNum = properties.limit;
			obj.onkeypress = numberTyping.bind(obj);
			//That's for semicolon/dot/accent keys
			obj.onkeyup = function(event)
			{
				var key = event.keyCode || event.charCode;
				if(key == 16)
					shiftIsPressed = false;
			};

			obj.onkeydown = function(event)
			{
				var key = event.keyCode || event.charCode;
				
				if(key == 16)
					shiftIsPressed = true;

				if((shiftIsPressed && key == 53) && (obj.exceptList.indexOf("%") === -1))
					event.preventDefault();
				
				if(key == 229)
					event.preventDefault();
				if((key == 192) || (key == 229 || key == 0 || key == 222) || (key == 190))
					exceptionListEval.call(this,obj.exceptList,event,getCaretPosition(this));
			};
		}

		if(typeof(idList) != 'string')
			idList.forEach(atribEvents, this);
		else
			atribEvents(idList);
   }
	
   return {turnOn: eval};
}();
