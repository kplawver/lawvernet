---
title: "Movable Type Categories As Tag Cloud"
date: 2005-10-31
categories: 
  - "movable-type"
---

Like [yesterday's post about del.icio.us tag clouds](/archive/2005/10/30/h04_importing_your_delicious_tag_cloud_in_movable_type.php), this was an experiment because I was bored. I figured it was so easy to make the link tag cloud, it should be almost as easy to [create one from my categories](/category-tags). The challenge is that I have almost 1600 entries (actually, this is #1600!): so many that I don't want the number of entries in a category to correspond directly to the text size (because 200em is _really_ big).\\ All it took was a little PHP on top of the tags to do the category list.\\ Of course, this will only work if you can use PHP on your server (and why can't you, huh huh huh), and if you publish the page as a PHP file. You may want to change the way it increments numbers to get the right scale between categories. Play, and if you end up using it, please post a comment so I can come check it out.\\ Here's what I did (of course, this is the "meat" - you have to add the rest of the page around it):

```
<code>
<ul class="tags">
<MTCategories show_empty="0" sort_by="title" sort_order="ascend">
<?
$count = <MTCategoryCount>;
$fontSize = 1;
for ( $i=1;$i<10; $i++ ) {
if ( $count > $i ) {
$fontSize = $fontSize + .1;
}
}
for ( $i = 10; $i < 300; $i=$i+20 ) {
if ( $count > $i ) {
$fontSize++;
}
}
?>
<li>
<a href="<MTCategoryArchiveLink>" title="<MTCategoryCount> Entries" style="font-size:<?= $fontSize ?>em"><MTCategoryLabel></a>
</li>
</MTCategories>
</ul>
</code>
```

The CSS is pretty much the same as yesterday, although I've tweaked it just a little since then:

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
