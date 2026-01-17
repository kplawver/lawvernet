---
title: Comment Spam-o-rama
date: 2004-12-16
tags:
  - "computing"
slug: "comment_spamora"
---

This will probably get me spammed, but I've been reading a lot the past few days ([here](http://photodude.com/article/2592/mt-plus-comment-spam-equals-dead-site), [here](http://www.jayallen.org/journey/2004/12/spam_and_the_tragedy_of_the_commons) and [here](http://www.elise.com/mt/archives/000246concerning_spam.php), and the MT Pro list) about the horrors of comment spam, and how evil comment spam spiders are crawling sites for the path to mt-comments.cgi and then spamming the crap out of it. Me? I don't really have a problem with comment spam. How I've been able to avoid it up to this point, I'm not really sure. I have several blogs, and none of them have been hit by more than one or two comment spams in their long lives (three years now for Ultranormal, two for Geekout and almost two for the photo gallery).

But, I'm getting serious with the preventative medicine. I haven't implemented all of these things, but I have done some of them:

- Don't install Movable Type in the cgi-bin if your host allows it.
- Rename mt-comments.cgi (and update the CommentScript line in mt.cfg, removing the # in front of it).
- Use javascript to write out the form action on your comments form. That way, they can't spider for the location of your comments script (well, make sure the function to do this is in a linked javascript). All of these javascript options screw people who have javascript turned off, but there are sacrifices we have to make.
- Use javascript to write out your comments. This way, they won't be indexed by search engines, and you're removing the benefit of spamming you.
- Use javascript to open your comment popup window. The one I use uses the entry id, and has the comment script in the linked script - so, again, it's not easily spiderable.
- Use the Moderate plugin to close comments on old entries. This gives the spammers fewer available targets.

I wrote a tutorial for doing a few of those. I'll update it to add the form action bit and probably post it to [Geekout](/geek) in the near future.

To me, the real problem here is that Movable Type's default templates are vulnerable out of the box. Maybe if the default template set was a little more protected, comment spam wouldn't be such a problem. I know the train has kind of left the station on this, since there's already a huge installed base of people probably using slightly modified versions of the default templates. But, for future versions, a lot of these changes could be included in the default, protecting the vulnerable "newbie" from themselves.
