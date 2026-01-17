---
title: "Child Scripts Making Child Scripts!"
date: 2006-08-03
tags:
  - "aim-pages"
  - "javascript"
slug: "child_scripts_making_child_scr"
---

I've been wrestling with a bug in one of my modules for [AIM Pages](http://aimpages.com) for\_ever\_, and just found a fix today. I created this well-intentioned module called **code snippet** that allows you to paste in markup and it'll get inserted into the DOM. This is really just a stopgap to allow people to add stuff that a module doesn't exist for yet. I never should have written it. Do you know how _bad_ DOM support is in IE? It's awful!

The big problem is that people wanted/needed to insert script elements with inline script using the code snippet module, and I couldn't figure out a good way to do it (ok, any way, good or otherwise). Just adding them to the DOM using innerHTML doesn't work. IE won't allow you to create a new script element and set the text content to the code.

Today, I stumbled on a [message board post](http://www.codingforums.com/showthread.php?p=466853) that hints at the answer. What's the answer?

Create a new script element, and set the text property to the script content and then append it to the body. Voila, actual evaluated javascript! Here's an example:

```
<code>var b=document.getElementsByTagName("body")[0];
var txt="function doIt(msg) {alert(msg)}";
var scr=document.createElement("script");
scr.setAttribute("type","text/javascript");
scr.text=txt;
b.appendChild(scr);</code>
```

Enjoy! Oh, and the fixed version of the module isn't live yet. I'm letting the QA guys look at it first before I unleash it on an unsuspecting world.
