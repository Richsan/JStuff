if(!JStuff)
	var JStuff = {};

JStuff.dateInput = function()
{

   var formats = {LittleEndian: {daySize: 1, monthSize: 4}, BigEndian: {daySize: 9, monthSize: 6},
						MiddleEndian: {daySize: 4, monthSize: 1}};

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
			if(this.dateFormat.daySize == 1)
				this.value = this.value.slice(0,1);
			if(this.dateFormat.daySize == 9)
				this.value = this.value.slice(0,9);
			if(this.dateFormat.daySize == 4)
				this.value = this.value.slice(0,4);
			return;
		}
		if(size == this.dateFormat.monthSize && (monthValue > 12 || monthValue == 0))
		{
			if(this.dateFormat.monthSize == 1)
				this.value = this.value.slice(0,1);
			if(this.dateFormat.monthSize == 4)
				this.value = this.value.slice(0,4);
			if(this.dateFormat.monthSize == 6)
				this.value = this.value.slice(0,6);
			
			return;
		}

   }

   function dateTyping(event)
   {
		var key = event.keyCode || event.charCode;
		var keyCode = JStuff.util.keyCode;
		var size = this.value.length;
		var maxInput = JStuff.util.maxInput;
		var numberMaskInput = JStuff.util.numberMaskInput;

		if(key == keyCode["backspace"])
			return;

		numberMaskInput.numMaskTyping.call(this,event);
		maxInput.call(this, 10, event);

		if(size == this.dateFormat.daySize || size == this.dateFormat.monthSize)
		{
			setTimeout(inputVerification.bind(this,size),0);		
			size = this.value.length;
		}

		if(this.dateFormat.daySize == 9)
		{
			if(size == 4 || size == 7)
				this.value = this.value + this.separator;
		}
		else if(size == 2 || size == 5)
			this.value = this.value + this.separator;

   }

   function dateKeyDown(event)
   {
		JStuff.util.numberMaskInput.numMaskKeyDown.call(this,event);
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
		
		if(properties["separator"].length > 1)
			throw "JStuff dateInput Error: separator should be a single size character.";
		
		function atribEvents(id)
		{
			var obj = document.getElementById(id);
			var numberMaskInput = JStuff.util.numberMaskInput;
			
			obj.separator = "/";
			obj.dateFormat = formats["MiddleEndian"];

			obj.onkeyup = numberMaskInput.numMaskKeyUp;
			obj.onkeydown = dateKeyDown;
			obj.onmousedown = numberMaskInput.numMaskMouseDown;
			obj.onmouseup = numberMaskInput.numMaskMouseUp;
			obj.putCurrentDateValue = putCurrentDateValue;
			obj.onkeypress = dateTyping;

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
