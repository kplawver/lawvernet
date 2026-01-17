---
title: "A Fun Javascript Puzzle: Shortcut Icons"
date: 2005-10-28
categories: 
  - "javascript"
---

Someone at work asked about this and I can't find the answer. And, because my foot hurts and I can't sleep, I figured I'd give it a shot.\\ [This is my attempt](/temp/favicon), and it doesn't work in anything but Opera 8.5 (that I've tested so far), as you can see. Any ideas?\\ Before you start, here's what I found with my example:

1. Firefox and Safari both report no errors when I try to change the shortcut icon.
2. Firefox actually updates the DOM to point to the new image, but the browser doesn't display it.
3. It doesn't work in IE, but I had someone else test it and I didn't get any more details other than it doesn't work.
4. I've only tried one way of doing it so far, but I can't think of anything else that would work at the moment (paaaaaain piiiiiiiills).\\ Got any ideas? Isn't it a fun little conundrum?\\ **UPDATE**: I've got something working in Firefox! Check out [attempt two](/temp/favicon/delete.html). It removes the shortcut icon link and appends a new one to the head. Still doesn't work in Safari, and I don't have IE at the moment to test, but it's progress. If you try it in IE, please let me know if it works.
