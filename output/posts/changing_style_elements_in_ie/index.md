---
title: "Changing Style Elements In IE"
date: 2006-01-30
categories: 
  - "css"
  - "javascript"
---

Everyone knows [what I'm working on](http://iamalpha.com), right? Well, this is a little story I'm telling so I don't have to remember it. I'm working on the generic style API so users can change stuff, and wow... I didn't think it would be as painful as it was. What caused the pain? Oh, you should know by now that it was caused by **Internet Explorer for Windows**!! Hooray for the truly strange!\\ The other browsers (Safari and Firefox, chiefly) did fine with removing the existing text node in the `style` element, and replacing it with the new one. I tried using the CSS DOM, but that was a lost cause, so I wrote a simple CSS parser in Javascript (only about 10 lines) to throw all the selectors and properties into objects and then more functions to change, update, delete, etc, properties and update the associated `style` elements.\\ What happened in IE? It blew up as soon as I tried to remove the child text node of `style`, or even set `innerHTML`. What did I have to do? I had to crawl the properties of that element's object and find the `styleSheet` property, which is an object and has a property of `cssText`, which I _can_ set.\\ So, now my code looks like this (`\_style` is the `style` element, `output` is the text I'm setting and yes, I'm using [Dojo](http://dojotoolkit.org)):

```
<code>if ( !isIE ) {
dojo.dom.textContent(_style,output);
} else {
_style.styleSheet.cssText=output;
}</code>
```

I hope you never have to do this, but if you do, that's how.
