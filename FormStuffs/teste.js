var pessoa = function()
{
    var proto = {};
    proto.idade = 0;
    function getIdade()
    {
	return  this.idade;
    }

    function setIdade(novaIdade)
    {
	this.idade = novaIdade;
    }

    function clone(spec)
    {
	spec.__proto__ = this;
	spec.prototype = pessoa;
	return spec;
	//return Object.create(this); 
    }
    properties = {getIdade: {value: getIdade}, setIdade: {value: setIdade},clone: {value: clone}};
    return Object.create(proto, properties);
}();

var hen = pessoa.clone({idade: 12});
var id = pessoa.clone({idade: 34});
pessoa.nome = "joao";
id.setIdade(56);
console.log(hen.getIdade());
console.log(id.getIdade());
hen.nome = "papai";
console.log(hen.nome);
console.log(id.nome);
