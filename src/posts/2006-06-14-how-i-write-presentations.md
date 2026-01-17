---
title: How I Write Presentations
date: 2006-06-14
tags:
  - "movable-type"
  - "web-standards"
slug: "how_i_write_presentations"
---

I do a lot of presentations now, and because I'm the "web standards guy" I can't go around doing them in Powerpoint or Keynote (I've tried using both and yuck, they're not made for writing). Over the past year or so, I've tried a couple different things, but here's the system I've got down, and the technology pieces that make it happen:

\# [Movable Type](http://sixapart.com/movabletype) - I love MT's template system. I don't have to write code, and I can make them do pretty much whatever I want. And, if I run into something they can't, there's either a plugin to do it, or I can write a teeny bit of PHP glue to fill the gaps.

\# Textile - I love it. It's the easiest of the pseudo-markup languages out there (Markdown is the other well-known one).

\# [S5](http://meyerweb.com/eric/tools/s5/) - Eric Meyer is a genius. It's got everything I need from Powerpoint or Keynote in an HTML page.

\# [MarsEdit](http://ranchero.com/marsedit/) - Best blog editor ever, does what I need without getting in the way with things that I don't. The preview is nice too.

I created a Movable Type [archive template out of S5](http://dev.lawver.net/mt-templates/s5-individual.txt) (which you're free to use if you want), a lot like [I did for Instiki](/archive/2005/03/18/h15_s5_instiki_happy_geek.php) a while ago, and now all my presentations go up on [my little presentations site](http://presentations.lawver.net). Now, I can get to them from anywhere, they're publicly available and stored somewhere other than my laptop (the problem with doing them all in my locally hosted copy of Instiki).

I start with all the slide titles as an outline, move them around, tweak, etc, and then go back and add the bullet points, most of which end up being removed. Then I publish and run through it quickly to make sure it all makes sense. Then I'm done! With Textile, there's no real markup to write except to go back and wrap things up in the slide divs. If I know exactly what I want to say, I can go from idea to completed presentation in about 10 minutes.

Here's what a typical slide looks like:

```
<code><div class="slide">
# My Slide Title
* This point is spectacular
* Can I get an "Ooooh" from the audience?
* Give yourselves a round of applause!
</div></code>
```

And the best part is, they all come out as standards-compliant, semantic little presentations without me having to write all the markup (which as fun as it is, takes time to get right, time that I'd rather spend thinking about what I'm going to say).

You're free to use the archive template and make your own little presentations site. If you do, send me a link!
