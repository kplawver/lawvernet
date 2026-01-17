---
title: Some Huck Hacking
date: 2011-01-04
tags:
  - "open-source"
  - "ruby-on-rails"
slug: "some_huck_hacki"
---

I used to work on a _big_ search product at AOL and still love search, even though that's not what I do anymore. So, when I saw that [IndexTank](http://indextank.com) and [Heroku](http://heroku.com) were having a contest to build a cool app with IndexTank's search-in-a-box, I couldn't resist. I knew I had to keep it simple since I don't have a lot of time for hacking outside of work, but I knew I had to do _something_.

I had two ideas, and went with the simpler one: What would happen if you broke a book down into individual sentences and made it searchable? Would it be useful at all? I decided to try **Huckleberry Finn** by Mark Twain, since it's not too long, is public domain, is quotable and full of vernacular that can screw up indexers, and I knew it was available from [Project Gutenberg](http://www.gutenberg.org/ebooks/76).

I grabbed the text file, cut and pasted each chapter into individual text files and then wrote a Ruby parser to split it up into paragraphs and sentences, which were then written to javascript files. After that was done, I wrapped it in a simple Rails app to display each chapter and paragraph, and then fired all the sentences at IndexTank.

I call the result... [Huck Smash](http://hucksmash.heroku.com), and I think it's pretty cool.

It was a lot of fun to write an app without a database or ORM, just a bunch of javascript files that Ruby can read and an extremely limited scope. I know it probably won't win, but it was a lot of fun to write and only took a few hours to put together. Writing the text parser was a lot of fun, and figuring out how to navigate the book and build out the HTML so you can link to an individual sentence was cool.

I'm going to try to spend more time outside of work playing with single-purpose sites and fixing [Ficly](http://ficly.com) up. I need to keep things constrained so I don't bite off more than I can chew or over-commit, but this was so much fun I want to do it again.

I'd love to hear what you think of Huck and any ideas you have for improvements.
