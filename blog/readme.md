# A beginner’s guide: JavaScript Functions

1.  Use Function Declaration
2.  Use an Anonymous Function
3.  Use an Arrow Functions

# What is a function?

Functions tend to be task-specific modules of code, that are created for a specific purpose. It is generally suited to smaller tasks, but they can become as complicated as needed (or grow steadily over the years avoiding refactor, lurking in the shadow-code, until one day, maybe found. Or maybe not. A little much?). 

Back to the task at hand. Functions generally do something specific, with a structure 
such as:

A beginner’s guide: JavaScript Functions
1.	Use Function Declaration
2.	Use an Anonymous Function
3.	Use an Arrow Functions

These inputs and outputs are defined by the coder, in a display of modern creativity. Or maybe it is defined by the business and added to your sprint board. Either way, this should remind you of basic mathematics, where f(x) = 2x. It is a function with an input, that returns an output. And the function doesn’t disappear on one use but can be re-used like your favorite pair of shoes. 

The power of functions allows for both simple and complex, reusable “functionality” to be created in the code. Perhaps, you need a function to simply print the famous “Hello World” text. Or, perhaps, you need code that authenticates a user password. In the latter, this code will likely be some form of object-orientated programming, but it does not have to be. Functions are a great way to encode business logic or automate routine tasks.

Do you think the electronics in your home all have the same components, programming languages, and code syntax? Like these wonderful electronics, each application (let’s assume an application is a website) can be in Python, R, Java, JavaScript, and so on. Each programming language has strengths and weaknesses, but most have the concept of a function. However, within a programming language, there are often multiple kinds or different syntaxes to create and use a function. 

And this is where we’ll start diving into JavaScript functions, some common syntax options, and simple examples. 

**Functions in JavaScript**

There are three common ways to define a function in JavaScript, that you can use as you see fit. It is almost like choosing the right tool for the job, you can often use many, but one might be the “best”. The question will come up, “what is the best way to do this”? Well, it depends on the scenario. We will review these 3 approaches:

1.	Function Declaration
2.	Anonymous Function
3.	Arrow Functions

The following examples can be ran using Replit. Replit allows for computing environments for different programming languages. It is pretty cool! Here, we will be using the following link, and I suggest you create a template using node.js.

- https://replit.com/new/nodejs

**Function Declaration**


This is a standard approach to writing functions, that is similar to syntax in other programming languages. This I’d consider as the bread-and-butter option. It allows for knowledge sharing through explicit naming conventions, which is important as the codebase grows. When calling the function, we do not pass an argument for a simple ‘Hello World’ but it could as needed. This is also a good syntax for more complex code, with parameters and arguments.


```
// Syntax: Function Declaration
function myFunction() {return 'Hello World'};
let output = myFunction();
console.log(output);
```

The console output should show:

![Function Declaration](https://github.com/benjamin-jacobson/se-phase-1-project/blob/main/blog/img/FunctionDeclaration.JPG?raw=true)

**Anonymous Function**

This syntax does not explicitly name the function. The question is asked then, how do you use it? One approach is to assign it to an object like the one we have below. You may want to do this if it isn’t going to be used in other areas. Anonymous functions are also great to use in JavaScript’s even listeners as callback functions. 

And also, why would you do this? It is simple, and if the function is not used much, then it makes sense to keep it light, and simple. 


```
// Syntax: Anonymous Function
let output2 = function () { console.log('Hello World 2')};
output2();
```

The console output should show:

![Function Anonymous](https://github.com/benjamin-jacobson/se-phase-1-project/blob/main/blog/img/FunctionAnonymous.JPG?raw=true)

**Arrow Function**

And we have the arrow function, even simpler. This syntax does not require the function keyword. It is light, and to the point, one might say, like an arrow! Since below we don’t use {} as a return statement, the ‘Hello World 3’ is implicit. Isn’t it beautiful? Similar to anonymous functions, yet even shorter syntax. The same use cases apply. 

```
// Syntax: Arrow Function
let output3 = () => 'Hello World 3';
console.log(output3());
```
The console output should show:

![Function Arrow](https://github.com/benjamin-jacobson/se-phase-1-project/blob/main/blog/img/FunctionArrow.JPG?raw=true)


And that’s a wrap! Often the different syntaxes can be used interchangeably, but use each function syntax “tool” as you see fit.