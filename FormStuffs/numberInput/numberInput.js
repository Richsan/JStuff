if(!JStuff)
	throw "You must include JStuffUtil before!";


JStuff.numberInput = function() 
{
	var oldValue;
	var currentCaretPos;

	function numberInputChange(event)
	{

		if(JStuff._util.maxChars.call(this,currentCaretPos))
			return;
		

		if(!this.exceptList && Number(this.value) > this.maxNum)
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

		if(inputCode >= getUnicode("0") && inputCode <= getUnicode("9"))
			return;

		if(this.exceptList.indexOf(inputValue) >= 0)
			return;

		this.value = JStuff.util.removeChar(this.value, currentCaretPos);
		JStuff.util.setCaretPosition(this,currentCaretPos);
	}

   function numberTyping(event)
   {
		currentCaretPos = JStuff.util.getCaretPosition(this);
		oldValue = this.value;
   }

   function eval(idList, properties)
   {
		var addEventListener = JStuff.util.addEventListener;

		function atribEvents(id)
		{
			var obj = document.getElementById(id);
			
			obj.exceptList = properties.exceptionList;
			obj.maxChars  = properties.maxLength;
			obj.maxNum = properties.limit;
			addEventListener.call(obj,"keydown",numberTyping);
			addEventListener.call(obj,"input",numberInputChange);
		}

		if(typeof(idList) != 'string')
			idList.forEach(atribEvents, this);
		else
			atribEvents(idList);
   }
	
   return {turnOn: eval};
}();
