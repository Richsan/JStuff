if(!JStuff)
	var JStuff = {};


function createHTTPRequestObject()
{
   var obj;
   
   if (window.XMLHttpRequest)
		obj =new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
   else
		obj =new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
   
   return obj;
}

function stateChange(func)
{
   if((this.readyState == 4 || this.readyState == "complete") && this.status == 200)
		func(this.responseText);
}

JStuff.CEPInput = function()
{
   function CEPTyping(event)
   {
		var key = event.keyCode || event.charCode;
		if(key == keyAscii["backspace"])
			return;

		numberMaskInput.numMaskTyping.call(this,event);

		maxInput.call(this, 9, event);
		var size = this.value.length;
		if(size == 5)
			this.value = this.value + "-";
		
   }
   
   function completeFields(fields,responseText)
   {
		var address =  JSON.parse(responseText);

		if(address["erro"])
		{
			console.log("erro no cep");
			return;
		}
		if(fields.endereco)
			fields["endereco"].value = address["logradouro"];
		
		if(fields.bairro)
			fields["bairro"].value = address["bairro"];
		
		if(fields.uf)
			fields["uf"].value = address["uf"];
		
		if(fields.cidade)
			fields["cidade"].value = address["localidade"];
   }
   function getField(objId)
   {
		var fields = {};
		if(objId.endereco)
			fields["endereco"] = document.getElementById(objId["endereco"]);
		if(objId.bairro)
			fields["bairro"] = document.getElementById(objId["bairro"]);
		if(objId.uf)
			fields["uf"] = document.getElementById(objId["uf"]);
		if(objId.cidade)
			fields["cidade"] = document.getElementById(objId["cidade"]);

		return fields;
   }
   function searchCep(objFields)
   {
		var fields = getField(objFields);
		if(this.value.length == 9)
		{
			var cep = this.value.replace('-','');
			var url = "http://cep.correiocontrol.com.br/"+cep+".json";
			var request = createHTTPRequestObject();
			request.onreadystatechange = stateChange.bind(request,completeFields.bind(this,fields));
			request.open("GET",url);
			request.send();
		}
   }

   function turnOn(idList)
   {
		function atribEvents(id)
		{
			var obj = document.getElementById(id);
			obj.onkeypress = CEPTyping;
			obj.onkeyup = numberMaskInput.numMaskKeyUp;
			obj.onkeydown = numberMaskInput.numMaskKeyDown;
			obj.onmousedown = numberMaskInput.numMaskMouseDown;
			obj.onmouseup = numberMaskInput.numMaskMouseUp;
			obj.searchCep = searchCep;
			obj.autocomplete = "false";
		}

		if(typeof(idList) != 'string')
			idList.forEach(atribEvents, this);
		else
			atribEvents(idList);
	}
   return {turnOn};
}();
