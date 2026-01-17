---
title: Mid-caffeination Mastodon Thoughts
date: 2023-11-20
tags:
  - "moderation"
  - "nablopomo"
  - "fediverse"
  - "search"
  - "social-media"
---

[Derek Powazek](https://milkbarn.farm) posted this on Mastodon yesterday:

> An actual use for machine learning that I'd want: a bot that records all the posts that cause me to block someone, saves them into a db, and then automatically hides posts that match above a certain threshold.
> 
> [Derek on Mastodon](https://xoxo.zone/@fraying/111434108391626524)

I love a good brain exercise, so I've been thinking about it, and I don't actually think this is that hard, and is very possible using tools you already need to run Mastodon in production.

I might play with actually implementing this during my week off around cooking and family time, but if someone else wanted to do it, this idea is 100% free.

To enable search in Mastodon, you have to install and use [ElasticSearch](https://elastic.co). It has machine learning goodies in it _already_ like [nearest neighbor](https://www.elastic.co/blog/introducing-approximate-nearest-neighbor-search-in-elasticsearch-8-0) and [vector search](https://www.elastic.co/search-labs/blog/articles/how-to-deploy-nlp-text-embeddings-and-vector-search).

Basically, we should be able to build a _very_ personal spam/block bot for Mastodon given some training data (posts that pushed you to block someone) and some fiddling about (which is the hard/fun part).

Right now, there are no dates on blocks in Mastodon (I haven't checked the schema yet to see if they're there but not returned), and you can't see which post "triggered" the block. I think that could be added fairly easily - or at least something like "Add this to Blockbot" to use it to train the bot.

Mastodon doesn't really have a plugin architecture yet, so I'm not sure if this should be a standalone app that sits alongside your running Mastodon instance or a feature - I'll probably try it as a feature to get familiar with Mastodon.

Basically, we take "blockworthy" posts, index them, and then use that to compare posts to the blocklist to get a semantic distance. Once we have the distance we can start manually testing for accuracy and tweak settings until we get something close to a "block score". Users could then say, "yep, don't show me anything with a block score greater than 1.5" and ta-da, a little robot janitor is just cleaning up your feed for you. That's probably computationally intensive to do on _every post_, but I think you could apply it to people you don't follow who reply to you to weed out the worst Reply Guys and riff raff.

You could also have community-wide block bots that are trained on a communal collection of blockworthy posts. It could help get around rigid blocklists by allowing targetted removal of replies from timelines instead of blocking whole instances.

It could _also_ be used for finding good stuff too... Imagine something that found you people who post things like you do and brought them to you. It could be used as an "attract" bot as well.

I think ideally, it could be used like [left and right handed whuffie](https://handwiki.org/wiki/Social:Whuffie). When you come in contact with a profile, how alike and how different are your posts from theirs'? Do we agree on anything? Are our disagreements strong enough, and on topics that are sensitive enough, that I probably don't want to engage with them? Then it's more informative than just a robot going out and sweeping up my replies.

Yeah, this is hand wavey, but a lot of this stuff is just built in to ElasticSearch already, so it's not like we have to invent anything (yay, because that's hard). We just have to assemble it and feed it enough data.

It should be fun, and I think it could be helpful, especially for folks who get inundated with awful replies.

And if you beat me to implementing it, that's great! Then it'll be out there in the world and we can all play with it!
