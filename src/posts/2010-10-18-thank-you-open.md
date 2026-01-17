---
title: "Thank You, Open Source!"
date: 2010-10-18
tags:
  - "open-source"
slug: "thank_you_open"
---

[![Thank you](/assets/images/posts/thank_you_open/2602728681_0a28b3b4b8.jpg)](http://www.flickr.com/photos/darwinbell/2602728681/ "Thank you by Darwin Bell, on Flickr")  
"Thank You" by Darwin Bell

I read [Zed Shaw's blog post on the decline of open source participation](http://sheddingbikes.com/posts/1286998492.html) last week and it got me thinking about just how much open source software [we use at work](http://uplaya.com) and how we're (mostly not) giving back to those communities. So, here's the first step in me becoming more involved and giving something back, even if it's just a huge "thank you". I am trying to be more involved, especially in the [MongoDB](http://mongodb.org) and [MongoMapper](http://mongomapper.com) communities. I'm probably not going to be contributing code to either, but I'm fairly active on the mailing lists, have reported bugs and am committed to help with the MongoMapper documentation project.

Excuses aside, here's a list of the big open source things we use on a daily basis and why we love them:

- [Apache](http://apache.org) - The webserver that holds everything together. It's used by most of the web, and we use it too.
- [Ruby on Rails](http://rubyonrails.org) - Rails lets us do more faster. We also use a bunch of gems that I'll list later on.
- [Sinatra](http://sinatrarb.com) - When you don't need everything that Rails has (a simple API, for example), then Sinatra is perfect.
- [Passenger](http://modrails.com) - Deploying Rails apps used to be a pain. Not anymore! Thank you, Passenger!
- [MySQL](http://dev.mysql.com/) - Need an RDBMS? Well, we use this one. And it works pretty darned well.
- [Memcached](http://memcached.org) - We cache _everything_ we can, and memcached helps us do that.
- [MongoDB](http://mongodb.org) - We use it because it's _web scale_! (if you get that joke, then you're in the club!) Seriously, we first started using MongoDB just to collect our stats because we'd maxed our poor MySQL instance. Then, I looked deeper and realized it's _perfect_ for the big top secret thing I'm working on now. Atomic updates and super-fast inserts make it perfect for collecting a lot of data quickly. And it's now slouch on the query side either. There's also a great community behind MongoDB. The updates and improvements are frequent and the community is always willing to jump in and help.

It's a nice hybrid between the new school document store databases and a traditional RDBMS.
- [Beanstalkd](http://kr.github.com/beanstalkd/) - A super-fast queue server. It just works, which is why I love it. We queue _everything_ we can. Why? It's a great way to meter load. If you can only handle 3 jobs running at once, then you only run 3 workers. If you can handle more, you run more. It's _great_!
- And of course, all of our servers are Linux and run hundreds of open source packages that I don't even worry about.

Since our strength lies in Ruby, we try to do everything in Ruby that makes sense. I'm not going to list _all_ the gems we use, but here are a few of my favorites - the ones that make life easier and make programming all day more fun.
- **MongoMapper** - Makes working with MongoDB even _more_ fun. I'm on the MongoMapper mailing list, and it's one of the most supportive and helpful communities I've been a part of. It makes using it more fun.
- **memcache-client** & **beanstalk-clent** - they're how we talk to memcached and beanstalkd
- **hashie** - Allows you to very easily create classes built around hashes. Great for wrapping around API's.
- **typhoeus** - My favorite of the many HTTP clients for Ruby.
- **will\_paginate** - Now I don't need to do all the horrible gymnastics needs to add "previous" and "next" links to things! THANK YOU!
- **hpricot** - My favorite way to parse HTML - with CSS selectors!
- **aws-s3** - A great interface to Amazon S3 (where we store a bunch of stuff)

There you go. That's pretty much our entire stack. I left out a bunch of gems - most of them we don't use directly - or that just provide one or two things.

So, thank you to all of the creators and contributors to open source projects out there, especially the ones we use to make our work easier. The web would be a much smaller place if there weren't dedicated geniuses out there making this stuff, and the world would be a poorer place for it. I promise to be a better member of the community and contribute where I can!
