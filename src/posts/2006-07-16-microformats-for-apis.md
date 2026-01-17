---
title: Microformats for APIs
date: 2006-07-16
tags:
  - "microformats"
slug: "microformats_for_apis"
---

There was a fun discussion [at Mashup Camp about Microformats for APIs](http://wiki.mashupcamp.com/index.php/MicroFormatsAPIs). It started as a question about using [microformats](http://microformats.org) for documenting APIs, which I think was resolved fairly quickly by deciding to try it using [XMDP](http://www.gmpg.org/xmdp/). There's a short example on the wiki now that I came up with. It's not complete and doesn't contain eveything I think should be in it (error codes, response format, etc), but its a start. ([Christine Herron posted some notes as well](http://www.christine.net/2006/07/do_microformats.html))

The discussion turned into a plea (from me) to start thinking about using microformats instead of coming up with new XML languages for APIs. There are already competing formats that replicate, in entirely new markup, structures available in HTML. Why not just use XHTML?

For example, instead of the various formats returned by the different search engines (and I've used several by now), why not return this (inside an XHTML document)?

```
<code>
<ol start="1">
<li><a href="http://url">Document Title</a>
<p class="description">Description goes here</p>
<blockquote>Snippet goes here</blockquote>
</li>
</ol>
</code>
```

You could, of course, add more, but that's basically what you get back in any search API. Why does it need to be any more complicated than that? For sites who want something simple, they wouldn't even need to parse the result, just display it. They could even use javascript on the client side once it's displayed to come up with the proper next/previous links.

I think there's a lot of room for discussion here, and I don't think that we can reasonably replace _all_ XML-based APIs with microformatted XHTML, but it's a discussion worth having.
