---
title: "I'm Not So Dumb AFTER All!"
date: 2002-11-10
tags:
  - "computing"
slug: "im_not_so_dumb_after_all"
---

Apparently, I'm not as dumb as I thought I was. I've been working on this photo blog because keeping them all on [Max's](/Max) page just isn't working. I wanted an easy way to create [Movable Type](http://www.movabletype.org) export files from PhotoShop exported web galleries. Sounds reasonale enough, right? Since I'm doing all this on my Powerbook, I figured I could do it with a shell script. I've been procrastinating since I didn't really want to deal with it. Here's where the dumbitude comes in. I went poking around the /usr/bin directory and... TA-DA!!! I see **tclsh** and the light goes on. Duh. I know Tcl. I know Tcl better than most . So, last night I do a quick and ugly script that rips JPG's from a directory and creates the export file; worked like a charm. Tonight, I created a holding directory where I can put all the web galleries. The new script reads in the directories, uses the directory name as the category, then reads all the images in the images directory and creates the entries. Then, it copies the images and thumbnails into two separate directories to make them easier to copy and returns the export file (which I pipe to a new file which contains aaaa-aaaall the entries). Smooth, huh? You wanna see it? Well, OK, if you really wanna, [here it is](/gr/import.sh.txt). I may clean it up and put sweet happy comments in it, but it works.
