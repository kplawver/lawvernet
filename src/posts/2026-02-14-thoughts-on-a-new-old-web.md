---
title: "Thoughts on a new (old) web"
date: 2026-02-14
tags:
  - "work"
  - "linkedin"
  - "web-development"
  - "web-standards"
  - "open-source"
  - "community"
  - "social-media"
---

I rage quit LinkedIn about a week ago in a [post about the whole Moltbook nonsense](https://www.linkedin.com/posts/kevinlawver_the-whole-moltbook-farce-the-engagement-activity-7423842805736710144--b0G?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAbmOsBa2XENfy-WNEKISi0v0d2PFqsAyE). To save you having to go to LinkedIn, here's what I said:

> The whole Moltbook farce, the engagement trap, the outright lies, and that literally every suggested post on LinkedIn for the past three days has been from someone unironically boosting some nonsense part of it - I’m done.
>
> You can find me on my blog, where I’ll keep the links to my other social networks up to date - and now is the time for us to build something less centralized, more human, and more supportive to talk about the work part of our lives.
>
> Let’s go build something better.

If you've never heard of Moltbook, OpenClawd, or Moltbot, I'm jealous. The [wikipedia page](https://en.wikipedia.org/wiki/Moltbook) about it is alright, but my real issue with it is that it's mostly bullshit, riddled with security issues, and was used by engagement farming liars _pretending_ to be agents posting on it claiming to be doing _all kinds_ of things, and people ate it up, creating a frenzy around something that was easily proven to be a malware-infested, easily-gamed, kind of interesting, experiment that got out of hand (the original thing, moltbot, is an _interesting experiment_). That's dismissive and mean, and there's a lot more that could be said about the responsibility we have to own the things we put out in the world (like the fact that if you put something out there that allows people to create extensions, and people report that it's overrun with malware, it's your job to _do something about it, even if that something is shut the site down_), but that's not what this post is about.

Sorry, I got off track. I'm supposed to be talking about building something better.

I've been exchanging emails with my pal, and sometime-Savannah resident, Simon, about how bad LinkedIn is and thinking about trying to build something new. We've been emailing since (checks timestamps) last October and we're still not exactly sure what that looks like, but it's been one of my all-time favorite epic email threads, and it's all lead here. I told Simon I'd write something about Moltbook and how my thinking is starting to come together and instead of it _only_ being in an email, I thought it was time to start working in public.

## Legacy Corporate Social Media

The name comes from an [excellent post this week](https://social.lol/@wndxlori@ruby.social/116047537614213078) from Lori Olsen describing the entrenched players: X, Facebook, LinkedIn, etc. There's a whole lot of interesting work happening outside of them: the whole federated world of [Mastodon](https://joinmastodon.org), [New_Public](https://newpublic.org/), [Pixelfed](https://pixelfed.org/), [Bonfire](https://bonfirenetworks.org/), etc, and new things happening all the time.

I can't find it now (I'm really sorry - I've searched for everything I can think of!), but someone posted this week that for anyone thinking about building something to replace one of the "legacy corporate social media" players, you can't think of building the _whole_ thing, you have to think in pieces, and that's the spark that triggered everything that follows.

None of the big corporate monsters started with all the features they have today. They all started by doing one thing, and then either acquired a company that did something, _or_ "fast followed" their way to pushing all of the little interesting players out of the market.

So, what's our response?

## Go open, small, weird and local - with the option to go global

We don't need to replace all of what Facebook or LinkedIn does at once. We need to do something they do, do it _better_, _smaller_, _weirder_, more _open_ and for a _smaller_ audience. We don't want to boil the ocean or become a billionaire (because, let's face it, there are no good billionaires - as they're all dead set on proving to us these days). We want to build interesting things and help people.

It's the unix philosophy all over again: _small pieces loosely joined_. We just need to figure out what the pieces are that we want to build, and go. Where should you start? Start with whatever you're most excited about and build just that one thing. Don't build anything more than that one thing. Don't get lost in adding on things you don't need. Build the one thing.

Anyone with an idea and a computer connected to the internet can build _something_ that does _something_ today. You can use [ollama](https://ollama.com) to download an open source model you can run on your computer that you can use to _slowly_ build software. You can use any of the others that your ethics allow you to to turn an idea into working software (maybe not _professional_ software, but you can build something - more on that later).

So, let's do that. Instead of creating bad slop art, let's build software for each other that solves real problems. [Open source it](https://opensource.org/osd). Build on it. Make it better. Make it for yourself, for your neighbors, and then... think about how to make it talk to other software, because once it's online, the step beyond local is:

Now, about that global option...

The great thing about the Fediverse is that you can run a server as small as you want - it could be _just for you_ and you can be a part of the global conversation, or a part of _just_ the conversations you want to be a part of. That's the great part of a _federation_, it's just the parties that agree to be a part of it!

I think that's the first ingredient to this, any new thing we build, even if it's intended to be local, should implement [ActivityPub](https://activitypub.rocks/) and have the capacity for federation even if it's not implemented _at first_ and can be disabled.

## Where to go from here

In [my post last month about rewriting the blog](/2026/01/a-shiny-new-bloggy-home/) I wrote about how I would use AI and the more I talk to people the more I think I'm OK with where I've drawn the line. I'm excited about building things, _and_ helping other people build things - more excited than I've been in years. How excited? So excited that I signed [TechSAV](https://techsav.co) up to be an event sponsor at the local library, and signed us up to host something next month called **The Explorers and Builders Guild** that's part hacker space, part office hours, part tech support, where anyone can drop in and ask about whatever they want that's tech-related, from installing linux on an old laptop, to starting a blog, to building an app. I'll be there with my laptop, and a couple of distros on thumb drives, plugging away on projects waiting for people to show up.

I don't know where it will go, but I'm hoping it will turn into a community of people who build software for their community, a little like Open Savannah used to be, but without the overhead of Code for America. I'm hoping it will help people see that there's a world online outside of legacy corporate social media that _they can help build_ and that they can make their own, that it can be more art than commerce and more community than extractive end-days capitalism.

That's a lot to ask from one event at the library, but I've got to start somewhere.
