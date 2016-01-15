**dateInput**
---------

>The **dateInput** object offers functionalities to transform text inputs in masked inputs for dates.


**How to use?**
```javascript
JStuff.dateInput.turnOn(arrayForIdNames, configObject);
```
The arrayForIdNames parameter should be an array of strings with all the id names of text inputs that you wanna turn  date inputs.

The configObject is optional and it's an object with some atributes values that changes default behaviours of the date input.

**Config Atributes**

>**dateFormat:** "LittleEntiand", "MiddleEndian", "BigEndian"

>**separator:** a single character like '-', or '/'.

>LittleEndian follows the format (day, month, year)

>MiddleEndian follows the format (month, day, year)

>BigEndian follows the format (year, month, day)

**Availables methods**
>The text input DOM element that has been modified for the dateInput.turnOn routine receive the following methods:

>**void putCurrentDateValue()**:put the value of the current date on the machine.
