---
title: S5 + Instiki = Happy Geek
date: 2005-03-18
tags:
  - "wiki"
slug: "s5_instiki_happ"
---

\[**Warning:**\]{style="color:#900;"} I've only tested this on 0.9.2 on OS X. This may not work at all on .10. Since .9.2 is working fine for me, and there isn't a disk image for .10, I haven't upgraded yet. When I do, I'll see about posting instructions for it. Until then, you're on your own.

I use [instiki](http://instiki.org) all the time. I have it installed on my Powerbook and use it for note-taking, documentation writing, presentations, brainstorming and keeping info I would normally keep in a saved e-mail somewhere. It's great. I love it.

As I said, I've been using it for presentations. I'll jot down the sections as h1's, then go back and fill in bullet points. When I've got what I want to say, I'll go in and add the [s5](http://meyerweb.com/eric/tools/s5/) divs, then tweak, massage, correct and add until I'm happy with it. Once that's all done, I cut and paste into a new copy of s5 and I'm good to go. Well, I'm fine as long as I don't want to change it. Once I change it, I have to save, cut and paste all over again. Why bother?

So, I had an idea. It shouldn't be all that hard to create a new "print-like" view in Instiki that's just s5. You know, it wasn't! In about fifteen minutes, I had a link at the bottom of all my wiki pages that said "Presentation". I clicked on it, and **kaboom**, I had a lovely presentation ready to go. It was scary simple. Here's how i did it (I use OS X, but most of these instructions apply to any install of it, just don't do the stuff that doesn't apply):

\# Make sure you have [Instiki 0.9.2](http://instiki.org) and [S5](http://meyerweb.com/eric/tools/s5) (download the zip file)

\# Go to Applications, right click on Instiki, and choose "Show Package Contents"

\# Go to Contents, then Resources, then rb\_src (on every other platforms, you should have an rb\_src inside your instiki directory).

\# Now, go to the app directory, then controllers and open up wiki.rb.

\# You should see a line that says "def print" (in mine, it's line 189). **Above** that line, put in:

```
<code>def preso
@page = wiki.read_page(web_address, page_name)
end</code>
```

\# Save that file and close it.

\# Now, go back to the app directory, then to views.

\# I went ahead and put my preso file up, so you can [snag it](/instiki/preso.rhtml).

\# Drop preso.html into the views directory.

\# Now, we need to create our link to the Presentation view, so in the views directory, open up page.rhtml, and search for "| Views:" - that should put you in the right place. Now, add the following:

```
<code> | Presentation</code>
```

\# Save that file, and close it.

\# Now, we have to make some decisions, mostly because I suck. I couldn't figure out (in the fifteen minutes it took me to do this) where to drop the s5 stuff (the ui directory in the s5 zip file) to get it to get served out by WeBRICK (the webserver instiki runs), so I just dropped them in my local copy of Apache, which is always running anyway. I suggest you do the same, then change the urls at the top of preso.rhtml (for the CSS and JS files) to match that. Once you've done that, you're almost done!

\# Bounce Instiki.

\# Now, try it! Isn't that cool?

All you need to do to create an s5-able wiki entry is enclose the stuff you want in a slide in (the spaces are important, so Textile doesn't do something stupid with the HTML):

```
<code><div class="slide">
stuff
</div></code>
```

There you have it... s5 + Instiki = happy geek

And some tags: [Instiki](http://technorati.com/tag/Instiki) and [S5](http://technorati.com/tag/S5)
