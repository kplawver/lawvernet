---
title: Upgrading to Betaness
date: 2005-07-14
tags:
  - "blogging"
slug: "upgrading_to_be"
---

I've upgraded almost all the blogs in the **Lawver Blogging Network** (didn't know I had one of those, did you) to the new beta version of [Movable Type](http://sixapart.com/movabletype). So far, it's awesome. New interface, especially for plugins. The new icons are much nicer than the old ones, and the interface seems a lot snappier. I like that you can do almost anything to one of your blogs from the main screen, and well, it's just better, OK?

The only problem so far is that [MarsEdit](http://www.ranchero.com/marsedit) is saying I have a bad password, when I know it isn't. Not sure what that's about, but I'm sure it will get fixed shortly. Ok, there's another problem too: The FlickrPhotoset plugin no longer works, which is sad, because I love that plugin. Now, I'll have to start using GetXML to get my list of photosets too (that's how I get the recent photos).

I'd been flirting with [WordPress](http://wordpress.org) for a project at work, and I just hit a brick wall. It's not that WordPress is bad. It's not. It's very good, but you have to know too much PHP in order to tweak it. So, it's back to MT, and talking folks into buying a license for it.

The power of MT comes not from its technology, but from the template system. I love the fact that I'm not locked into a programming language to use it. I can have my templates spit out PHP, Tcl, or anything else. With most of the other blogging gigs out there, you're stuck with PHP whether you like it or not (and I'm ambivalent at the moment... I never have enough time to spend getting to know it).

If you see anything funky, please let me know.

**Update** - A Couple Tips:

- If you created a new user for yourself and deleted Melody when you installed, you'll need to go into the database and tweak your record in mt\_author. Set the **author\_is\_superuser** field to **1** and update that row.
- If you use something like [MarsEdit](http://ranchero.com/marsedit) to post to your blog, you'll need to edit your user and add the xml-rpc password. You can do this by clicking your user name at the top right corner of the regular Movable Type admin screen.
