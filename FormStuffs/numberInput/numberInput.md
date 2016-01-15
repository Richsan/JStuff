**numberInput**
---------

>The **numberInput** object offers functionalities to transform text inputs in inputs for numbers.


**How to use?**
```javascript
JStuff.numberInput.turnOn(arrayForIdNames, configObject);
```
The arrayForIdNames parameter should be an array of strings with all the id names of text inputs that you wanna turn  number inputs.

The configObject is optional and it's an object with some atributes values that changes default behaviours of the number input.



**Config Atributes**
>**maxLength:** Maximum integer number of characters allowed in the input,if is undefined, then there's no limit.
>**exceptionList:** List of characters allowed in the numberInput beyond the numbers.
>**limit:** Only works if the exceptionList is empty or undefined.Reefers the numericable integer limit, which the input can't be bigger.If is undefined, then there's no limit.

**Availables methods**
>The text input DOM element that has been modified for the numberInput.turnOn routine receive the following methods:

>**There's no available methods , yet**. 