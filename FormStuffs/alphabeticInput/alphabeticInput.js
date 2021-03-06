if(!JStuff)
	throw "You must include JStuffUtil before!";

JStuff.alphabeticInput = function() 
{
	var oldValue;
	var currentCaretPos;

	function alphabeticInputChange(event)
	{
		if(JStuff._util.maxChars.call(this,currentCaretPos))
			return;
		
		if(this.value.length <= oldValue.length)
			return;

		var inputCode = this.value.charCodeAt(currentCaretPos);
		var inputValue = this.value.charAt(currentCaretPos);
		var getUnicode = JStuff.util.getUnicode;

		if(inputCode >= getUnicode("a") && inputCode <= getUnicode("z"))
			return;

		if(inputCode >= getUnicode("A") && inputCode <= getUnicode("Z"))
			return;

		if(this.exceptList.indexOf(inputValue) >= 0)
			return;

		this.value = JStuff.util.removeChar(this.value, currentCaretPos);
		JStuff.util.setCaretPosition(this,currentCaretPos);
		
	}
 
	function alphabeticTyping(event)
   {
		currentCaretPos = JStuff.util.getCaretPosition(this);
		oldValue = this.value;
	}
		

   function turnOn(idList, properties)
   {
		var addEventListener = JStuff.util.addEventListener;
		function atribEvents(id)
		{
			var obj = document.getElementById(id);
		
			obj.exceptList = properties.exceptionList;
			obj.maxChars  = properties.maxLength;
			addEventListener.call(obj,"keydown",alphabeticTyping);
			addEventListener.call(obj,"input",alphabeticInputChange);
		}

		if(typeof(idList) != 'string')
			idList.forEach(atribEvents, this);
		else
			atribEvents(idList);
	}
	
	return {turnOn};
	
}();
