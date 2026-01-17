---
title: Hold My Hat While I Kvetch
date: 2002-09-24
tags:
  - "computing"
slug: "hold_my_hat_while_i_kvetch"
---

This will interest no one but me, but I don't care. I've found something completely annoying about [AOLserver](http://www.aolserver.com) and I need to share. Let's say you download these bigass (the technical term would be "friggin' huge") files every day and have to parse them out and dump them into a database so you can do a bunch of conversions on them and generate spiffy reports. Let's just say this is a new system that worked fine in testing with small files, but now, it will only parse a small portion of each file before deciding to give up. Let's then say that the reason it does this, and then doesn't report any kind of error is a helpful feature in the server that closes active (and very busy) db handles after they've been open for a certain amount of time. Does it check to see if they're doing something? Nope. It just closes it. Thankfully, there's an obscure configuration setting (MaxOpen in the pool/POOLNAME section) where you can set that timeout to some insane number (did you know that 1,000,000,000 seconds is approximately 192 days?). This will run tonight... I hope it gets all twenty-four hours instead of just ten or eleven. The only good thing is that it made me go in and fix up a bunch of things it was doing that weren't quite as efficient as they could have been, which got us from 9am to 1pm, but still, sheesh.

I love AOLserver. I use it for things it wasn't intended for, like turning it into a cron job handler, and reporting system. I guess that's why I run into this stuff. I can live with that. But I'm still gonna whine about it when I run into stupid stuff like this.

The other thing is that [Postgres](http://www.postgresql.org) doesn't handle databases with more than 200k records in them very well without creating a LOT of indexes (like on every column of every table). Before I deleted the records older than two weeks, it took five minutes just to get a count. If I were a real DBA, I'd go find out why. But, I'm not. I use it because it's easy to install and configure for use with AOLserver. It also supports all the SQL features I'm used to with Sybase. It's also reasonably fast for normal use.

If I didn't have this headache, you all would never have known all this stuff. Thanks, Dr. Nik! (yes, my dentist's name is Dr. Nik)
