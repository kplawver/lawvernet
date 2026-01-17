---
title: The Horrors of Beta Software
date: 2005-04-29
tags:
  - "geekery"
slug: "the_horrors_of"
---

I love [Instiki](http://instiki.org), as I've said before. I've been running 0.9.2 on my Powerbook for a while (ran 0.9.1 before that), and love it. I was running it on my linux box. Notice the _was_ in the previous sentence.

What happened? That box was running RedHat 8. I decided it was time to upgrade to [Fedora Core 3](http://fedora.redhat.com), and did so. Then, I went to fire up 0.9.2 again, and it didn't work. It keeps complaining about something in Madeleine (the database). Not being familiar enough with Ruby or its various parts to figure out (something with YAML), I figured it might be because I'd upgraded from Ruby 1.8.1 to 1.8.2. So, hey, let's try the new version of Instiki! It started up fine, and then barfed on the homepages of my three wiki webs. It was something with formatting, so I went right to the edit\_web url, and switched it back to Textile. That worked for two of the three webs.

On the third web, there's a gigantic unordered list. Something in that list is causing Instiki to churn like mad. It locks up the machine, and I have to desperately try to kill it before the machine runs out of memory and thrashes itself to death. It's funny that text can do that, but apparently, it can.

I'm not sure what's up, but for now, I've had to move everything over to my G5 and run it there (where everything still works, thanks OS X!).

A few lessons I've taken from this:

- use beta software at your own risk
- don't use beta software for "critical" data
- backup everything regularly
- beware systems that don't allow easy import/export of data (Instiki has good export, non-existent import).
- don't use a development environment as a shared resource for important data.
