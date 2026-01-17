---
title: "Style My RSS, Please"
date: 2003-07-10
categories: 
  - "computing"
---

I suggested this on the [NetNewsWire](http://www.ranchero.com/netnewswire) bug report list, but it really doesn't belong there. I was poking around the [RSS 2.0](http://feeds.archive.org/validator/docs/rss2.html) spec today and saw a weird little optional tag with <item> called <enclosure>. Enclosure takes length, type and url as arguments, and says it's for "media" files. But, like the script tag, you can pass it any MIME type and url. Here's where the lightening struck. Why not pass in a stylesheet? Just like you use <link> to pull in your external stylesheet, why not have an RSS feed stylesheet. Why? One of the big complaints about RSS Readers is that the post is displayed outside its intended context - the designed page it originated on. If we were able to pass in a stylesheet, we could style the properties of the objects in a post to make it look more like the original page. Wouldn't that be cool?

Now, Brent doesn't think enclosure's the right place to put it, but I really didn't see anything else in 2.0, or in the infant [Echo specs](http://www.intertwingly.net/wiki/pie/FrontPage) about style information. I think giving designers some control over how their content is display in an aggregator would go a long way to driving acceptance of using syndication as a method of distribution of content, and not just the notification tool a lot of sites offer today.
