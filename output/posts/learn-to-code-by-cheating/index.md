---
title: "Learn to Code By Cheating"
date: 2013-10-12
categories: 
  - "development"
  - "javascript"
---

My kids _love_ [Cookie Clicker](http://orteil.dashnet.org/cookieclicker/). And, only because they can't stop talking about it, I checked it out. My 14 year-old told me he's figured out how to cheat at the game so bad that he basically ends up with "infinity cookies".

Wait, let's step back. The game is weird and silly and involves clicking a big cookie to get more cookies. You can buy upgrades like cursors that click cookies for you, grandmas who bake cookies for you, all the way up to time machines that go back in time and bring you cookies that before they've been eaten - and you purchase all of these with cookies that you, wait for it, click.

Back to the cheating. The game is all done in Javascript and all done in the browser, so it's really fun to mess around with things and cheat - and learn some Javascript fundamentals while you're at it (and even some [jQuery](http://jquery.com)). There's even [a page on the Cookie Clicker Wiki dedicated to cheating](http://cookieclicker.wikia.com/wiki/Cheating). You'll notice that all of those cheats are Javascript functions. Here's one I wrote that is a little longer than the one on the wiki, but makes me happy because it's all object-notated and is called cookie\_monster:

```
<code>var cookie_monster = {
  gimme:function() { 
    Game.ClickCookie(); 
    setTimeout("cookie_monster.gimme()", 1); 
  }
};
cookie_monster.gimme();</code>
```

That's all broken out so you can see what it's doing. Here it is if you want to just cut and paste it into the Javascript Console in Chrome (the browser made for cheating):

```
<code>var cookie_monster = {gimme:function() { Game.ClickCookie(); setTimeout("cookie_monster.gimme()", 1); }}; cookie_monster.gimme()</code>
```

Basically, the `cookie\_monster.gimme()` method clicks the cookie and then sets a timer to run itself again in 1 millisecond. That ends up being a _lot of cookies_ per second. It also unlocks a bunch of achievements, which is cool (but still cheating).

And here it is as a bookmarklet: [Cookie Monster](javascript:var cookie_monster = {gimme:function\(\) { Game.ClickCookie\(\); Game.ClickCookie\(\); setTimeout\('cookie_monster.gimme\(\)', 1\); }}; cookie_monster.gimme\(\);). Just drag that to your bookmarks bar, and click on it while you're in Cookie Clicker and the cheat will magically start running. I love Javascript.

I've been talking to both of my kids now about Javascript and how we can more efficiently cheat at the game, which I think is _awesome_. If I can get them to think of programming as a game, then I've already won.
