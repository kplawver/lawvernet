---
title: Thoughts on Kanban
date: 2010-08-19
tags:
  - "development"
slug: "thoughts_on_kan"
---

I was introduced to Kanban by Brad Taylor from [Rails Machine](http://railsmachine.com) when we were talking about agile and how to do it in an ops environment where there's a lot of reacting that's hard to plan for. Since I come from the product dev world, where releases are easier to plan, Scrum works pretty well.

What's Kanban? The best introduction I've read so far is [Kanban Developmnt Oversimplified](http://www.agileproductdesign.com/blog/2009/kanban_over_simplified.html). I also attended a great introduction to Kanban by [David Laribee](http://laribee.com/) at [BizConf](http://www.bizconf.org), so some of my thoughts came out of that intro and not the article.

In my own words, Kanban is an agile approach to development where you take away most of the structure found in Scrum and replace it with visual queues for progress. You basically have buckets for things: Planning, Defined (ready for development), Being Developed, Testing and Ready. You place limits on how many things can be in those buckets, which keeps you from working on too many things at once. The visual queues are displayed on a board with columns for each bucket. That allows you, in a small team, to see where your bottlenecks are and where you have availability. I think it's a great approach for a team of equals, where you don't really need the metrics you get from Scrum (team velocity, estimates vs. actuals, etc), or a small centrally located team. The physical Kanban board becomes useless when you've got remove people, since they can't act on their own cards or see the board all the time.

If I was running a 3 person shop where we all worked on the same product, I'd do Kanban instead of Scrum. I also think the visual representation of the board - what's being worked on _right now_ - is a great tool for seeing your team's current status. We're trying out [Wallsome](http://www.wallsome.com) as our Kanban board (we can't do the physical board because we have folks in Spain). I chose it because it uses our existing [Basecamp](http://basecamphq.com) data, which makes the adoption cost relatively low for us. I checked out a bunch of other web-based Kanban tools and they all required me to re-enter everything, which I just don't have time to do.

But, I'm running a team where I need to help people improve. So, having the data I get out of Scrum is _extremely_ important - and Scrum just works for us. We know what we're working on, when the next release to production is, and can easily communicate that to whoever needs to know. Switching to Kanban would only take things away without improving efficiency (OK, it might, but I'm not seeing how right now). We _are_ going to use Wallsome for a while and see if it helps us keep better track of the flow of tasks during a sprint, but I don't see us switching to Kanban completely anytime soon.

So, I think Kanban's great for teams where you spend a lot of time reacting to events outside of your control, small centrally located teams or teams where they're just starting to get into Agile and don't have a lot of different projects. But, our team has been doing Scrum for two years, and it works for us. We're already Agile and have a well-established process (and more importantly, a change management process for those things we just have to "react" to on short notice) with Scrum that works for us. The switching costs at this point are higher than I'm willing to bear.
