---
title: "Warping Young Minds"
date: 2026-10-24
tags:
  - coding
  - AI
  - tallmadge
  - setauket
  - clothesline
---

I'm on the Industry Advisory Board for the Computer Science Department at Savannah State University.  Whew, that's a mouthful. This is IAB number two for me. My first one was at Georgia Southern, which was a lot of fun, but I felt like 5 years was enough, and startup life was _really busy at the time_.

Anyway, Rose Robinson and I took over the CS classes for a day a few weeks ago.  Rose and I both did workshops.  She did a great one that showed the students how to build an agent loop, test it and add on to it.  Mine was called **The State of AI Coding** and went through some of how we got to where we are, and then tried to give them some strategies on how to think about the ethical questions surrounding AI so they can decide for themselves what their line is.

Want to see it for yourself? [Here are the slides](https://docs.google.com/presentation/d/1-Z_c4UWd_o1iU4kmKpZRI5cfBJPZxqXP85Z0t29M1Gs/edit?usp=sharing).  

In it, you can see my line: I use AI for coding, because LLMs were trained on the same open source code I was, and _if I'm being completely honest_, I have to support my family, and I don't think I can survive in this industry _without_ using them at work and being conversant with them.

Part of being conversant is me playing around with things and trying to make the whole _lonely_ experience of what programming has turned into better, or at least weirder. I love working with other engineers, collaborating on solving problems.  At Bonusly, that still happenings, but the _act_ of coding now feels a lot more solitary than it did before.  I spent most of my time talking to my computer, telling it what I want, and it pretty much giving it to me.  And then I have it create a pull request, and then I play referree as the AI code reviewers and my agent argue about what's a bug and what isn't.

So, being the imp that I am, I mess around and try to at least add some weirdness and fun to the whole process, or at least make it easier to try out new coding harnesses without abandoning the workflows I've built up to make life easier.

And that's where [Tallmadge](https://tallmadge.dev) comes in. It's named after Benjamin Tallmadge, the guy who ran George Washington's intelligence operation during the Revolutionary War.  Why Tallmadge?  Because what I wrote is a tool for managing _agents_, you know, a _handler_, and that's what Benjamin Tallmadge did.  I felt _very_ clever.  I'm pretty proud of it. It works, and allows me to jump around from Claude Code to oh-my-pi to any other coding harness that comes out and all my skills come with me. It's not perfect, but it gets better all the time.

Since then, I've added two more tools to the "family": Setauket and Clothesline, kind of along the same lines. 

Setauket is a shared memory and session store, so even if you switch tools, it still has access to all your previous sessions. It also has vector search, which is _really_ cool for a local tool.  

Clothesline is silly. It's a way for your agents to talk to each other.  I _should_ have called it AIM: Agent Instant Messenger. Your agents set a status with what they're working on and then they can message each other.  I use it when handing off things between backend and frontend work, and I've seen a conversation where one agent told another agent to stop clobbering the test database, which made me laugh.  The goal is to eventually make it multiplayer so you can invite people to join you and mob program _with_ your agent, which I think would be fun.

If none of that made any sense, that's fine! There's a lot going on and it's changing all the time, faster than anyone can keep up, and never faster than in the coding world.

If it did, I'd love if you tried them out and gave me some feedback!