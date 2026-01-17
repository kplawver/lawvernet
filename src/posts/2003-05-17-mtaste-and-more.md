---
title: "MTaste - And More?"
date: 2003-05-17
tags:
  - "computing"
slug: "mtaste_and_more"
---

I read about [mtaste](http://stevenf.com/mt/mt-tb.cgi/107) a while ago, and thought it was an interesting idea. Unfortunately, I was really busy when it first came up and I promptly forgot all about it. Then, Mr. Frank wondered aloud about what the best way to [implement it in a database](http://stevenf.com/mt/mt-tb.cgi/120 ), and that got me to thinking. How would I do it?

Well, there are a couple ways to do it, but if you're going to have a never-ending list of artists that people can vote on, then you need several tables. This also leaves it open to add things other than music to the list (which is what intrigues me about this all). As you can see, I design overly complex schemas. They're way more fun than simple ones. Honestly, they're sometimes hard to manage, but they're a lot easier to extend and add to, especially in this case where you have an ever-growing list of ratings linked to an ever-changing/growing list of artists and genres. The item\_types table could grow as well, to add authors, books, movies, actors, etc. I have some idea that you could use the [ODP](http://www.dmoz.org) to cut down on the confusion of artist names, and to add to it (so you could end up basically rating ODP categories). Also, this is a first stab at this. I usually way overdo this in the first draft and then trim it down once I start building it. I think I'll try to learn PHP and MySQL and actually build this (maybe using Movies instead, but you never know). With this schema, a lot of the logic will be held in application logic instead of the database, which I think could be mitigated some with secondary id's and a simple API (so no one gets access to the db - just the API).

Here's the schema that comes to mind:

**users**:

- user

\_id int primary key
    
- user

\_fname varchar(255)
    
- user

\_lname varchar(255)
    
- user

\_email varchar(255)
    
- user

\_zip varchar(24)
    

**user\_taste:**:

- user

\_id int
    
- item

\_id int
    
- rating int
    
- timestamp int
    

**items**:

- item

\_id int primary key
    
- item

\_type int
    

**item\_types:**

- item

\_type int primary key
    
- type

\_title varchar(255)
    
- type

\_desc text null
    
- type

\_public int
    
- type

\_table varchar(64)
    

**music\_artists**:

- item

\_id int
    
- martist

\_id int primary key
    
- martist

\_title varchar(255)
    
- martist

\_genre int
