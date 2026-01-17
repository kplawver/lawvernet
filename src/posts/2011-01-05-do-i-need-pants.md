---
title: "Do I Need Pants Today?"
date: 2011-01-05
tags:
  - "ruby-on-rails"
slug: "do_i_need_pants"
---

Have you ever been _plagued_ by that question? I know _I_ have. So, at [Rails Machine's](http://railsmachine.com) hackfest last night, I set out to answer the question once and for all. How did I do it? With this: [Do I Need Pants Today?](http://doineedpantstoday.com).

Yes, it's ridiculous, but I got to draw underpants and build something completely silly and launch it in about an hour and a half.

And because I'm a good little geek (and thanks to a couple suggestions from the guys at the hackfest), there's an API too! It only returns JSON, because that's how I made it. If you want to build your own app that answers the questions (I really think it calls for an iPhone app), you can call http://doineedpantstoday.com/?format=json and get a little javascript object that will tell you the answer. If you pass wday=\[0-6\] (0 = Sunday, 6 = Saturday), you can get the answer for any day of the week. AND, if you pass cb=YOURJAVASCRIPTFUNCTIONHERE, you'll get a neat-o JSONP response!

Yes, it's overkill. But, it was fun!

Oh, and it should look awesome on your mobile device too, in case you need to know the answer and you've already left the house.
