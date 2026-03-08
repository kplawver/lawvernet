---
title: "A Very Comic Book Redesign"
date: 2026-03-08
tags:
  - web-development
  - web-design
  - eleventy
---

I woke up early, and there must have been something a little extra in my coffee this morning because I decided that today was the day that Claude Code and I would redesign my blog. Here's what it looked like before... boring, just like everything else, right?

!["the before image - dark mode - a screen shot of the homepage of this blog with very light text on a dark background without discernible style, looking very 'default'"](/assets/images/posts/a_very_comic_book_redesign/before.png)

And well, I grew up _loving comic books_ and I thought, OK, I could use some color and **pop** around here, so why not?

Here's what happened:

- My original move from [Wordpress to 11ty](/2026/01/a-shiny-new-bloggy-home/) involved not really looking too closely at what the markup looked like, I just want to make the move and I'd clean up later.
- So, I did a little clean up! No more inline javascript or CSS! I moved all of those (I'm still using [Alpine](https://alpinejs.dev/), which I'm not sure how I feel about, but decided I didn't want to tackle that today) into a single javascript file that handles things like loading [PageFind](https://pagefind.app/) and some other stuff like changing the class on the bubbles in the background so you get random colors every page load.
- I wanted something more dynamic and colorful (I'm sorry), so decided I wanted BAM, BOOM, POW SVGs in the background just kind of bouncing around, and well, that's what happened! I'm not sure how I feel about them being in the source - I might move them to get added to the body on document ready, but they're alright for now.
- I also wanted to support reduced motion, so if you have that enabled, the bubbles won't move (I thought it was a bug initially, but I also had reduce motion enabled, so... no moving bubbles to start for me).
- The colors are a work in progress, especially in dark mode. I'm going to do some more digging - I'm thinking of having different palettes you can choose from based on my favorite issues. Late 80's Marvel for light mode, and late 90's Vertigo for dark mode. Stay tuned. All of the colors are just CSS variables at the moment, so that should be fairly easy.

It was a lot of fun playing around with things, and realizing I didn't actually have to change much markup to get the design I wanted - the biggest change was to get the "masthead" at the top, which wasn't that big. It reminds me of showing off CSS-only redesigns at work in 2002 and blowing minds.

[11ty](https://www.11ty.dev) really is a joy to work with. It's _just enough_ special sauce to do the bloggy stuff, without so much that it gets in the way of building what you want. It doesn't feel in the way, which is nice.

For a Sunday morning redesign, I'll take it. Stay tuned, there are probably bugs to fix and colors to tweak and I'm not sure about the headers, but... I like it so far!
