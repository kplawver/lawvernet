---
title: "So, what am I doing?"
date: 2001-06-12
categories: 
  - "geekery"
---

So, what am I doing? I think next week, I'll start posting a bunch of the cool AOLserver stuff I've done on my own, like the adp-tag db call, the calendar and my instructions on how to install AOLserver and Postgres in Linux. How does that sound? It'll be nice to have some content up here other than my ramblings and Max's pics (which are cool and need to be updated).

I'm also thinking of building a search engine into AOLserver. There used to be this cool text indexing stuff built right in back in 2.1 when Illustra was still the primary db (and which I still have running somewhere on my O2). I'd love to see it come back. Why, you ask? Because I've been doing Search stuff for two years and think I can do it. So there.

What has to go into a search engine? Here's what I've got so far:

- **Indexing**: There has to be a way to get content, and it has to be fast. Also, it has to be able to index parsed content from ADP's, which means lots of http gets, or ns\_adp\_parses (which would be cool but cumbersome).
- **Searching**: I have to find some way to search other than tacking SQL wildcards on either side of the query. It just doesn't produce good results. That means cool meta searching stuff which I know nothing about.
- **Results**: I've used lots of API's, and I don't really like any of them. This isn't a knock against the people who wrote them, it's just the way it is. They're usually written by people who do all backend stuff and don't take the pains of UI development into consideration. I do some of both, so hopefully I can do it the way I wanna do it. Ok, I think that's it... Wow, what a geeky post.
