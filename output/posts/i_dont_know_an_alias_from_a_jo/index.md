---
title: "I Don't Know an Alias From A Join In The Ground"
date: 2002-10-07
categories: 
  - "computing"
---

In the spirit of learning something new every day (and the fact that the way I was doing it took 20 minutes each time I ran the query), I learned how to select [aliased tables](http://www.postgresql.org/idocs/index.php?sql-select.html) with Postgres today. For those of you who aren't geeky, you may want to skip this post altogether.

I've been using SQL when I had to for almost five years now and never run into a spot where I'd do something like this, but it worked really really well and runs a whole lot faster than the old way (mostly because I was doing a JOIN of a table with almost a million records to one with 250k records).

I know the suspense is killing you... how do you do it? This example is completely unrelated to what I'm actually using it for, because it's work related. Let's say you have a table full of used car ads and you want to get each distinct manufacturer and how many ads there are for each of those manufacturers. Now, if you have a separate table of car makers, this is fairly easy. But, let's (for sake of my precious example) say manufacturer is a free text field where the user can enter whatever they want. To get out the list of manufacturers and the number of cars ordered by most often listed, you could do the following: **select distinct lower(manufacturer) as carmaker,(select count(\*) from car\_ads where manufacturer = carmaker) as car\_count from (select lower(manufacturer) from $table where timestamp between $begin and $end) as all\_ads order by car\_count desc,carmaker**

How cool is that? You can create a virtual table with a select statement from either the same table or a separate one. You could even join your virtual table with another virtual table for even MORE fun!
