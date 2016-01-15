if(!JStuff)
	var JStuff = {};

JStuff.alphabeticInput = function() 
{
   
   var shiftIsPressed = false;

   function keyCodeIsAlpha(key)
   {

		return (key >= keyCode["A"] && key <= keyCode["Z"]) || (key >= keyCode["a"] && key <= keyCode["z"]);

   }
   function alphabeticTyping(event)
   {
		var key = event.keyCode || event.charCode;

		if(isCursorMoveORBackspaceDel(key))
			return;

		if(key == keyCode["enter"] || key == keyCode["tab"])
			return;

		maxInput.call(this, this.maxChars,event);
		
		if(keyCodeIsAlpha(key))
			return;
		
		exceptionListEval.call(this,this.exceptList,event,getCaretPosition(this));
   }

   function eval(idList, properties)
   {
		function atribEvents(id)
		{
			var obj = document.getElementById(id);
			obj.exceptList = properties.exceptionList;
			obj.maxChars  = properties.maxLength;
			obj.onkeypress = alphabeticTyping.bind(obj);
			obj.onkeyup = function(event){var key = event.keyCode || event.charCode; if(key == 16)shiftIsPressed = false;};

			//That's for semicolon/dot/accent keys
			obj.onkeydown = function(event){
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
