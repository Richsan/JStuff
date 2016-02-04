if(!JStuff)
	throw "You must include JStuffUtil before!";


JStuff.CEPInput = function()
{
	var oldValue;
	var currentCaretPos;
	var mousedown = false;

	function CEPInputChange(event)
	{
		if(JStuff._util.maxChars.call(this,currentCaretPos,9))
			return;

		if(this.value.length <= oldValue.length)
			return;

		var inputCode = this.value.charCodeAt(currentCaretPos);
		var inputValue = this.value.charAt(currentCaretPos);
		var getUnicode = JStuff.util.getUnicode;
		var size = this.value.length;
		
		if(inputCode < getUnicode("0") || inputCode > getUnicode("9"))
		{
			this.value = JStuff.util.removeChar(this.value, currentCaretPos);
			JStuff.util.setCaretPosition(this,currentCaretPos);
			return;
		}

		if(size == 6)
			this.value = oldValue + "-"+inputValue;

	}
   function CEPTyping(event)
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
   
	function CEPMouseDown(event)
   {
		mousedown = true;
   }

	function CEPMouseUp(event)
   {
		mousedown = false;
		JStuff.util.setCaretPosition(this,this.value.length);
   }

   function completeFields(fields,responseText)
   {
		if(responseText.match(/erro/))
		{
			console.log("erro no cep");
			return;
		}

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
			var request = JStuff.createHTTPRequestObject();
			request.onreadystatechange = JStuff.util.stateChange.bind(request,completeFields.bind(this,fields));
			request.open("GET",url);
			request.send();
		}
   }

   function turnOn(idList)
   {
		var addEventListener = JStuff.util.addEventListener;

		function atribEvents(id)
		{
			var obj = document.getElementById(id);

			addEventListener.call(obj,"keydown",CEPTyping);
			addEventListener.call(obj,"input",CEPInputChange);
			addEventListener.call(obj,"mousedown",CEPMouseDown);
			addEventListener.call(obj,"mouseup",CEPMouseUp);
			
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
