---
title: "Importing Your Del.icio.us Tag Cloud In Movable Type"
date: 2005-10-30
categories: 
  - "movable-type"
---

Someone on the Movable Type ProNet list asked how to import their [del.icio.us](http://del.icio.us) tag cloud into thier blog a couple days ago, and since I'm stuck here on the couch, I'd see if I could figure out an easy way to do it... and you know what, there is!\\ All you need to install is the [very cool MTGetXML plugin](http://www.staggernation.com/mtplugins/GetXML), and create yourself a new index template. The important bit to add is this:

```
<code><ul class="tags">
<MTGetXML keeproot="0"
location="http://USERNAME:PASSWORD@del.icio.us/api/tags/get?"
cache="60">
<MTGetXMLElement name="tag">
<li style="font-size:<MTGetXMLValue name="count">em">
<a href="http://del.icio.us/USERNAME/<MTGetXMLValue name="tag" encode_url="1">" title="<MTGetXMLValue name="count"> links">
<MTGetXMLValue name="tag">
</a>
</li>
</MTGetXMLElement>
</ul></code>
```

\* USERNAME = del.icio.us username

\* PASSWORD = del.icio.us password\\ Here's what my CSS looks like to get [my tag cloud](/tags) to look the way it does:

```
<code>ul.tags {
list-style:none;
text-align:justify;
}
ul.tags li {
display:inline;
padding:0 .3em;
}</code>
```

And in case you missed the link earlier, [here's what it looks like](/tags). Enjoy!\\ **Update**: And because I couldn't sleep, I did the [same thing with my categories](/category-tags). It was a little more involved (because I have some categories with more than 100 entries in them, I didn't map them right to font sizes, so I had to do MATH!). I kinda like it. It takes some PHP (for the math bits), but it's almost as easy. I'll post my template for it later.
