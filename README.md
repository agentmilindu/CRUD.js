# CRUD.js 

> Minimal code for CRUD operations on REST APIs with JavaScript

[CRUD.js](https://github.com/cmbhack/crud.js) is an easy way to consume RESTful APIs in JavaScript.


## Where to use CRUD.js?

You can use CRUD.js to make it done complete CRUD operations on a REST service with a minimal number of code anywhere you can use JavaScript, very specially on single page web applications. 

## Features
1) Call Rest API CRUD with minimum code.    
2) Ability to use ui templates of your own.    
3) If no templates are used fall back to default html template.    

## Usage

Below is quick example how to use CRUD.js:

```js

$(document).ready(function(){ 
    $.CRUD.path = "http://www.example.com/api"; 
    var Book= new $.CRUD("book");
    Book.list(); 
}); 

```
This could be the only JavaScript codes you have to write for the whole application. 


### Application-Wide Configuration Parameters:

```js
  $.CRUD.path // root URL for REST API
  $.CRUD.container // where the HTML content should be embeded; default is 'container'
  $.CRUD.resources // root folder for external templates; default is 'res'
```

In this example, the `CRUD.path` config property takes one parameter to the ROOT URL of your REST API.
The constructor is passed the Table you want to operate on.  
When we invoke list method on the object all the CRUD operations on this Table.

#### Load External Templates

```html
<table>
    <a href="#!add" data-action="add" >Add</a>
    {{#Books}}
    <tr>
        <td>
            {{Id}}
        </td>
        <td>
             {{Title}}
        </td>
        <td>
            <a href="#!view" data-action="view" data-id="{{Id}}">View</a>
            <a href="#!edit" data-action="edit" data-id="{{Id}}">Edit</a>
            <a href="#!delete" data-action="delete" data-id="{{Id}}">Delete</a>
        </td>
    </tr>
    {{/Books}}
</table> 
```
In here we have used  [mustache.js](https://mustache.github.com/)  as the templating framework.
### Data Attributes

```js
	data-action // CRUD operations like view, update, delete,..
	data-id // Unique identifier for the record
```

## Thanks

CRUD.js wouldn't kick ass if it weren't for these fine souls:

##### Gayan Kulatilleke

Git: tidalbobo    
E-mail: tidalbobo@gmail.com    
LinkedIn: lk.linkedin.com/pub/gayan-kulatilleke/12/870/a20    

##### Rasika Weliwita

Git: weliwita    
E-mail: weliwita@gmail.com    
LinkedIn:lk.linkedin.com/pub/rasika-weliwita/69/91a/448/    

##### Milindu Sanoj Kumarage
 
Git: [agentmilindu](https://github.com/agentmilindu)    
Email: [agentmilindu@gmail.com](mailto:agentmilindu@gmail.com)    
LinkedIn: [Milindu Sanoj Kumarage](lk.linkedin.com/in/agentmilindu/)    
Twitter: [@agentmilindu](https://twitter.com/AgentMilindu)    

##### Suresh Lasantha 

Git: lasanthasuresh    
Email: lasanthasuresh@gmail.com    
Linkedin: http://www.linkedin.com/pub/suresh-lasantha/31/828/192    
Twitter: @lasanthasuresh    

##### Dhammika Marasinghe 

Git: [dhammika-marasinghe](https://github.com/dhammika-marasinghe)     
E-mail: [dhammikammdb123@gmail.com](mailto:dhammikammdb123@gmail.com)    
LinkedIn: [dhammikamarasinghe](http://lk.linkedin.com/in/dhammikamarasinghe/)    
twitter: [@dhammikammdb123](https://twitter.com/dhammikammdb123)

##### Manas Najmuddeen

Git: nmmanas
E-mail: nmmanas@gmail.com    
LinkedIn: sg.linkedin.com/in/manasnajmuddeen    
Twitter: @nmmanas    

[mustache.js](https://mustache.github.com/) 

[jQuery](http://jquery.com/‎)

