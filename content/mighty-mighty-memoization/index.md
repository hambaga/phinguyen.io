---
title: Mighty mighty memoization (React memoization deep dive)
description: We talk about various angles and methods to achieve memoization in React
date: '2019-3-15'
image: cover.jpg
imageAuthor: Aleksandra Khaprenko
imageCredit: https://unsplash.com/photos/0PPw9irzLIw
tags: ['javascript', 'typescript',  'react', 'memoization', 'memo']
---

The word _Memoization_ used to scare the 💩 out of me. I pictured it some kind of dark forbidden art of ancient magic, a discipline that only the most experienced coding wizards could hone. Over time, as I gained more experience and on my way into mastering React, _it still scared the 💩 outta me_.

Before going forward, you can read this sentence coming straight from [React docs on the `useMemo` hook](https://reactjs.org/docs/hooks-reference.html#usememo):

> Write your code so that it still works without useMemo — and then add it to optimize performance.

Take the statement above as a thumb rule before going forward. _Memoization is not a required technique in React_. That is why before the introduction of hooks, it is much more difficult to memoize values in React. You either had to rely on different Javascript tricks to achieve the effect, or use 3rd party libraries like [Moize](https://github.com/planttheidea/moize) or [react-memoize](https://github.com/theKashey/react-memoize). Not to mention, memoizing values in React will make your code more verbose and obfuscated, and can even introduce errors if memoization is poorly done.

That's why you, before going into the valley of darkness, should understand the price you are paying to achieve maximum performance optimization. If all is understood, I will henceforth show you, in my experience, how to correctly and effectively memoize values in React.

## So what is memoization anyway?

Let's say you're a carpenter dude who wants to make a table, but you don't have a hammer. You then go to the local blacksmith and ask him to make you a steel hammer. You come home, used the hammer to make a cute little table.

The next week, you realize that you need to make some chairs. **So, would you go to the blacksmith and ask for another hammer, or do you simply use the one he made for you last week?**

This is what memoization is about. If you don't fancy my metaphor, you can checkout the [wikipedia definition](https://en.wikipedia.org/wiki/Memoization) here.

Let's start with a simple Javascript example:
```js
function getTodos() {
  return fetch('https://jsonplaceholder.typicode.com/todos/')
    .then(val => val.json());
}

setInterval(() => {
  getTodos().then(val => console.log(val));
}, 1000);
```

This piece of code will attempt to fetch todo notes from the placeholder endpoint then log them into the console every second. Now the problem with this is that every time you want to log the code, you'd have to fetch the data again. **This is highly inefficient.**

Imagine you're the owner of an API and you have to do fetching in a high frequency. Every unnecessary API call you make to the server will both congest the server, add a few cents to the traffic cost and make your code slower.

So how do we fix this? We memoize, of course:

```js
let todos;

function getTodos() {
  if (!todos) {
    return fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(val => {
        todos = val.json();
        return todos;
      });
  }
  return Promise.resolve(todos);
}

setInterval(() => {
  getTodos().then(val => console.log(val));
}, 1000);
```

So what just happened here? First, we attempt to create the reference `blogs` that will hold the memoized todos for us. Then in `getTodos`, we will attempt to fetch the todos once. The next time `getTodos` is called, it will attempt to check if `todos` is undefined, and if it's not, the function will simply resolve the memoized value and not make a hassle of fetching. As mentioned above, this can be useful in many cases.

However, do you notice how this function has become much harder to understand?

> But, but, if you call yourself a good programmer you have to write hard to understand code, amirite?

You know, not really. It's not a big deal if you are the only one who participates in the code (that is excluding the possibility that you can confuse yourself with your own code). However, if there are other maintainers of the code who aren't on your level or not on the same page with you, writing confusing code will damage readability and maintainability of your code. My advice, as always, is to understand the pros and cons of everything before you use them.

If you understand the caveats and decide to optimize, memoization can become a crucial technique for improving performance, reduce traffic cost and provide your consumers a nice, clean interface with great user experience.

## Memoization in Class Components

Before the time of functional components and hooks, we had to make use of Javascript tricks to optimize in React because there is not really an official memoization tool back then.

Consider a class component:

```js
export default class App extends React.Component {
  state = {
    counter: 0
  };
  
  render() {
    const {counter} = this.state;
    return (
      <div>
        <p>{counter}</p>
        <button onClick={() => this.setState(counter => counter + 1)}> // highlight-line
          Increment
        </button> 
      </div>
    );
  }
}
```

Know that when an action in React triggers a re-render, React will try to **run the render() function again**. This means that if you can somehow declare values and functions **in the body of the class**, those values and functions will not end up getting recreated during render and therefore achieved the effect of memoization.

In the example code above, notice how I declare the onClick event listener inside `render()` if you use eslint for React, you will notice how the linter [would complain about this kind of code](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md). When you declare the inline arrow function inside render, you are effectively creating the function inside the render, and React would keep recreating this function on every re-render. It not a problem for one-liner functions (I'm guilty for doing one-liner inline functions all the time 😛), but it's an issue for big ones.

To fix this, we can declare the event listener in the body of the class:

```js
export default class App extends React.Component {
  state = {
    counter: 0
  };
  
  handleClick = () => { // highlight-line
    this.setState(counter => counter + 1); // highlight-line
  }; // highlight-line
  
  render() {
    const {counter} = this.state;
    return (
      <div>
        <p>{counter}</p>
        <button onClick={this.handleClick}> // highlight-line
          Increment
        </button> 
      </div>
    );
  }
}
```

This is what I call **in-class memoization** (not an universal term, don't quote me on this 😛).

There is one more way to memoize values in this situation (works for both class components and functional components). **If you have an event handler or any value that are not dependent on any of your state or props, you can declare the them outside of the class**.

```js
const handleLog = () => { // highlight-line
  console.log('💩💩💩'); // highlight-line
}; // highlight-line

const dudes = {  // highlight-line
  smilingDude: '😆',  // highlight-line
  sickDude: '🤮'  // highlight-line
};  // highlight-line

export default class App extends React.Component {
  state = {
    someStateThatYouAreNotGoingToUse: 0
  };
  
  render() {
    return (
      <div>
        <p>All happy, all smiling {dudes.smilingDude}</p> // highlight-line
        <button onClick={handleLog}> // highlight-line
          Dude, something smells really bad {dudes.sickDude} // highlight-line
        </button> // highlight-line
      </div>
    );
  }
}
```

Don't get freak out when you declare stuff outside classes. React will not tamper with anything outside class declaration. It won't cause any memory leak or kidnap your girlfriend. Well, that is if you're not silly enough to try and mutate values outside your component 🙅. If for any reason that you're insecure about this syntax, you can always declare these values inside the class, no biggie (but not inside a functional component!). **Please avoid writing React like this**:

```js
// BAD EXAMPLE, DO NOT FOLLOW!
// BAD EXAMPLE, DO NOT FOLLOW!
// BAD EXAMPLE, DO NOT FOLLOW!

render() {
  const handleLog = () => { // highlight-line
    console.log('💩💩💩'); // highlight-line
  }; // highlight-line
  
  const dudes = {  // highlight-line
    smilingDude: '😆',  // highlight-line
    sickDude: '🤮'  // highlight-line
  };  // highlight-line
  return (
    <div>
      <p>All happy, all smiling {dudes.smilingDude}</p> // highlight-line
      <button onClick={handleLog}> // highlight-line
        Dude, something smells really bad {dudes.sickDude} // highlight-line
      </button> // highlight-line
    </div>
  );
}
```

But, it's totally acceptable to destructure states, props and values inside render:
```js
// DO THIS

render() {
  const {foo, bar, baz} = this.state;
  const {raz, ma, tazz} = this.props;
  return (
    /* some JSX */
  );
}
```

### Curried functions are not memoized

Consider a form:

```html
<form>
  <span>Name</span>
  <input type="text"/>
    
  <span>Age</span>
  <input type="text"/>
</form>
```

You have 2 inputs in your form so you will probably need two sets of state values and change handlers. Let's put this into a React component:

```js
class UserForm extends React.Component {
  state = {
    name: '',
    age: ''
  };
  
  handleNameChange = (event) => this.setState({name: event.target.value});
  handleAgeChange = (event) => this.setState({age: event.target.value});
  
  render() {
    const {name, age} = this.state;
    return (
      <form>
        <span>Name</span>
        <input value={name} onChange={this.handleNameChange} type="text"/>
          
        <span>Age</span>
        <input value={age} onChange={this.handleAgeChange} type="text"/>
      </form>
    );
  }
}
```

Well, we can keep doing this... until your form grows bigger and bigger and you have some 10, 15 form fields to handle. So do you think it's wise to hand-make 15 more event handlers? Of course not!

If you are familiar with functional programming, you would immediately think of **currying your function**:

```js
class UserForm extends React.Component {
  state = {
    name: '',
    age: ''
  };
  
  getEventHandler = (field) => {// highlight-line
    return (event) => {// highlight-line
      this.setState({[field]: event.target.value});// highlight-line
    };// highlight-line
  };// highlight-line
  
  render() {
    const {name, age} = this.state;
    return (
      <form>
        <span>Name</span>
        <input value={name} onChange={this.getEventHandler('name')} type="text"/>// highlight-line
          
        <span>Age</span>
        <input value={age} onChange={this.getEventHandler('age')} type="text"/>// highlight-line
      </form>
    );
  }
}
```

While this is a commendable effort, currying a function can sometimes do damage to your component's performance. When you curry a function inside render, you are effectively creating new functions within the bound of render, and that will be as bad as writing an inline arrow function.

Unfortunately, there is no universal way to effectively curry event handlers. You can always curry big functions into small functions, but you still have to go through the tedious process of creating one handler for each input:

```js
  getEventHandler = (field) => {
    console.log(`Something you don't want to repeat in 10 other functions`);
    console.log(`Something you don't want to repeat in 10 other functions`);
    console.log(`Something you don't want to repeat in 10 other functions`);
    console.log(`Something you don't want to repeat in 10 other functions`);
    return (event) => {
      this.setState({[field]: event.target.value});
    };
  };

  handleNameChange = getEventHandler('name');
  handleAgeChange = getEventHandler('age');
```

However, in the case of handling form, there's a neat technique that you can use: Making use of `name` prop:

```js
class UserForm extends React.Component {
  state = {
    name: '',
    age: ''
  };
  
  handleChange = (event) => { // highlight-line
    this.setState({[event.target.name]: event.target.value}); // highlight-line
  };// highlight-line
  
  render() {
    const {name, age} = this.state;
    return (
      <form>
        <span>Name</span>
        <input name="name" value={name} onChange={this.handleChange} type="text"/> // highlight-line
          
        <span>Age</span>
        <input name="age" value={age} onChange={this.handleChange} type="text"/> // highlight-line
      </form>
    );
  }
}
```

Kool, right? You can make one universal change handler using this nifty little technique. Unfortunately this solution doesn't apply to every use case that calls for higher order functions. You'll have to find specific solutions for specific use cases 😔.

### How much damage can you cause for not using memoization?

The consequences of not memoizing your stuff can be really apparent in a component that re-renders in a high frequency.