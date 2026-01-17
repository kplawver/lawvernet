---
title: "I Know Something!"
date: 2006-04-13
categories: 
  - "css"
  - "javascript"
---

Today is a banner day. No, it's not because the cold I've had for four days has reached Biblical mucous proportions (if Pharoah hadn't relented, it would have been the next plague: multi-colored, never-ending mucous). It's not that I've had three days off in the last thirty. It's not that I've interviewed two kids out of college in the last week who are actually curious and qualified. It's not that I've forgotten how to sleep.\\ What is it? It's that today, April 13th 2006, I knew something about javascript and the DOM that [Mr. Javascript](http://slayeroffice.com) didn't know, and I got to tell him what it was. What was it? Well, it's this horrible little Internet Explorer quirk where it won't let you update the text of a `style` element with the normal ways (you know, appending a text node, or _gasp_ using innerHTML). You have to use `node.styleSheet.cssText` to get or change the text. Isn't that crazy?
