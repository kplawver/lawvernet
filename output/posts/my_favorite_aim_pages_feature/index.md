---
title: "My Favorite AIM Pages Feature"
date: 2006-06-21
categories: 
  - "microformats"
  - "web-standards"
---

Since it launched yesterday, I can talk about it now. With the whole [microformat](http://developer.iamalpha.com/profile) thing, we've started thinking about the pages created in [AIM Pages](http://www.aimpages.com) as mini web services, and the first step to doing really cool things with that is being able to pull out modules from the page so you can use them in other modules. You don't want to have to grab the _whole_ page just to get a piece, so today, you can request a particular module on the page and get back an XML document that contains just that piece. You could also request it with all the scripts it needs to run so you could embed your Buddy Gallery on your own web page if you wanted.\\ How do you do it? If you wanted to get my buddy gallery, you'd grab:

```
<code>http://www.aimpages.com/kplawver/profile.html?moduleid=buddy-gallery-0</code>
```

If you wanted to get it with all its scripts and CSS, you'd grab:

```
<code>http://www.aimpages.com/kplawver/profile.html?moduleid=buddy-gallery-0&aspage</code>
```

Now, this opens up _all_ kinds of possibilities for new modules that I can't wait to start playing with. I hope you'll beat me to it...\\ **update**: There are a couple "quirks" with it at the moment. When you use aspage, the module's onload isn't being called, and there's a lonely little double-quote in the body element. Not sure what's up, but we'll get it fixed. Getting just the module's markup works fine (which is really the important bit, right?).
