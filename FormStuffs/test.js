window.onload = function(){

   JStuff.numberInput.turnOn(["num"],{limit: 12,exceptionList: ["a"], maxLength: 5});
   JStuff.alphabeticInput.turnOn(["letras"], {exceptionList: ["1",";","\u00E3","\u00C7","\u00E7"," ","\""]});
   JStuff.priceInput.turnOn("preco");
   JStuff.rgInput.turnOn(["rg"]);
   JStuff.dateInput.turnOn(["dt"],{dateFormat: "LittleEndian", separator: "-"});
   JStuff.timeInput.turnOn(["hora"]);
   JStuff.CEPInput.turnOn(["cep"]);
   var a = document.getElementById("dt");
   a.putCurrentDateValue();

   var c = document.getElementById("cep");
   c.onblur =  c.searchCep.bind(c,{endereco: "est", cidade: "cid", uf: "sigla", bairro:"bair"});

};
