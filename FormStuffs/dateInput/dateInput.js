if(!JStuff)
	throw "You must include JStuffUtil before!";

JStuff.dateInput = function()
{

   var formats = {LittleEndian: {daySize: 1, monthSize: 4}, BigEndian: {daySize: 9, monthSize: 6},
						MiddleEndian: {daySize: 4, monthSize: 1}};

	var oldValue;
	var currentCaretPos;
	var mousedown = false;

   function inputVerification(size)
   {
		var dayValue;
		var monthValue;
		if(size == this.dateFormat.daySize)
		{
			dayValue = this.value.substring(this.dateFormat.daySize - 1,this.dateFormat.daySize + 1);
			dayValue = parseInt(dayValue);
		}

		if(size == this.dateFormat.monthSize)
		{
			monthValue = this.value.substring(this.dateFormat.monthSize - 1,this.dateFormat.monthSize + 1);
			monthValue = parseInt(monthValue);
		}
		if(size == this.dateFormat.daySize && (dayValue > 31 || dayValue == 0))
		{
				this.value = this.value.slice(0,this.dateFormat.daySize);
				return;
		}
		if(size == this.dateFormat.monthSize && (monthValue > 12 || monthValue == 0))
			this.value = this.value.slice(0,this.dateFormat.monthSize);
   }

   function dateInputChange(event)
   {

		if(this.value.length > 10)
		{
			this.value = JStuff.util.removeChar(this.value, currentCaretPos);
			JStuff.util.setCaretPosition(this,currentCaretPos);
			return;
		}

		if(this.value.length == oldValue.length)
			return;

		if(this.value.length < oldValue.length)
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

		if(size == this.dateFormat.daySize || size == this.dateFormat.monthSize)
		{
			inputVerification.call(this,size);		
			size = this.value.length;
		}

		size = this.value.length;
		if(this.dateFormat.daySize == 9)
		{
			if(size == 5 || size == 8)
				this.value = oldValue + this.separator + inputValue;
		}
		else if(size == 3 || size == 6)
			this.value = oldValue + this.separator + inputValue;

   }

   function dateTyping(event)
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

	function dateMouseDown(event)
   {
		mousedown = true;
   }

	function dateMouseUp(event)
   {
		mousedown = false;
		JStuff.util.setCaretPosition(this,this.value.length);
   }


   function getCurrentDate()
   {
		var d = new Date;
		var day = d.getDate();
		var month = d.getMonth() + 1;
		var year = d.getFullYear();

		if(day < 10)
			day = "0"+day;

		if(month < 10)
			month = "0" + month;

		if(this.dateFormat.daySize == 1)
			return day + this.separator + month + this.separator + year;

		if(this.dateFormat.daySize == 4)
			return month + this.separator + day + this.separator + year;

		return year + this.separator + month + this.separator + day;
   }
   function putCurrentDateValue()
   {
		this.value = getCurrentDate.call(this);
   }

   function turnOn(idList, properties)
   {
		var addEventListener = JStuff.util.addEventListener;

		if(properties["separator"].length > 1)
			throw "JStuff dateInput Error: separator should be a single size character.";
		
		function atribEvents(id)
		{
			var obj = document.getElementById(id);
			var numberMaskInput = JStuff.util.numberMaskInput;
			
			obj.separator = "/";
			obj.dateFormat = formats["MiddleEndian"];

			addEventListener.call(obj,"keydown",dateTyping);
			addEventListener.call(obj, "input",dateInputChange);
			addEventListener.call(obj,"mousedown",dateMouseDown);
			addEventListener.call(obj,"mouseup",dateMouseUp);
			
			obj.putCurrentDateValue = putCurrentDateValue;
			

			if(properties && properties.dateFormat && formats[properties.dateFormat])
				obj.dateFormat = formats[properties.dateFormat];

			if(properties && properties.separator)
				obj.separator = properties.separator;
		}

		if(typeof(idList) != 'string')
			idList.forEach(atribEvents, this);
		else
			atribEvents(idList);
   }
   return {turnOn};
}();
