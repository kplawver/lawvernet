---
title: "You Need to Vacuum Your Index, Son!"
date: 2002-11-06
tags:
  - "computing"
slug: "you_need_to_vacuum_your_index"
---

You know, if you have a [Postgres](http://www3.us.postgresql.org) database with over 500k records that you delete and reinsert on a weekly basis, that you should run [**vacuum**](http://www.postgresql.org/idocs/index.php?routine-vacuuming.html) and **reindex** on it frequently? See, I'm not a database administrator. I'm not even a system administrator, but I play one on TV.

Sometimes, I'm such a **user**. I don't care how things work, just that they do. I've been happy with the way Postgres works up until now. I don't have to mess with it, I just do my inserts, updates and deletes and it's always just worked. Now, it's not working like I need it to, and it's bugging me. So, I'm doing the unthinkable and messing with configuration options, like the amount of memory used per select, and sort and that kind of thing (because I figured, hey, I'm selecting a ton of things at once and I have a ton of memory, so let's use it instead of the hard drive!). We'll see what happens.
