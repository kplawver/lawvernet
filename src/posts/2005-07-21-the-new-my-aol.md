---
title: "The New My AOL: Feeds Are Cool"
date: 2005-07-21
tags:
  - "blogging"
  - "development"
slug: "the_new_my_aol"
---

I don't normally talk about work, but I'm making an exception because this one was a lot of fun. It's officially in beta now, and I can talk about it. Yay!! The [new My AOL](http://feeds.my.aol.com) launched its first beta today, and I worked on it! I got to play with everyone's favorite new javascript toy: XMLHTTPRequest, and did most of the CSS and a good deal of the markup. It was a fun project to spend a couple weeks on, and there's a lot of potential for cool stuff with it.

It is still _very_ beta (in the traditional sense of the word). It's a little slow in Safari for some reason that we haven't been able to track down, and there's a really funny jumping icon thing in Firefox that, again, we haven't been able to figure out (it jumps the exact width of a scrollbar, but no scrollbar shows up, so it's double-weird).

Play around with it, try adding your own feed, and see how it goes. There are a couple odd things about how it chooses which feeds to grab, and which RSS fields to display (for example, if you have both `summary` and `content:encoded`, it will only use `summary`), and if you have multiple feeds in your HTML, it will choose the first if they all have the same link. Hey, it's a beta.

There's lots of cool stuff coming in subsequent releases, so stay tuned!
