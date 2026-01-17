---
title: Switching Your Primary Google Apps Domain In Not Too Many Steps
date: 2016-04-09
tags:
  - "google"
  - "googleapps"
  - "primary-domain"
  - "development"
---

[![My face when we decided we needed to change our primary Google Apps domain.](/assets/images/posts/switching-your-primary-google-apps-domain-in-not-too-many-steps/16325791014_d69c32867e.jpg)](https://www.flickr.com/photos/kplawver/16325791014/in/dateposted-public/ "My face when we decided we needed to change our primary Google Apps domain.")

It happens. You rebrand (like we did at [Planted](https://www.planted.com) last year) and need to change your email addresses. You use Google Apps because you need video conferencing that kind of works, document sharing and email and... whatever else they do. You figure, hey, it's Google, how hard can this be? And then you google for how to do it and it turns out it's a poorly documented nightmare, which you'd think it wouldn't be because it's Google and they're supposed to make hard things easy.

You probably took the easy way out last time and just created an alias domain. Eventually, though, you get tired of people asking about the old domain on calendar invites and dealing with aliases in all your email clients, and you just decide _it's time_. Actually, having an alias already set up makes the whole process a lot easier. If you haven't done that, that's alright, it just means you can skip the "remove the existing domain alias" step!

It turns out that it's not actually that bad as long as you do things in the right order. I'm going to share that order with you so I don't have to remember it later.

Before you make the switch, I'd make sure all of your users who use 2 factor auth have added their phones as a backup because they'll need to delete and re-add their accounts to the authenticator app, which took me by surprise and don't remember from Google's documentation!

I went through several iterations of this list and this is the one I came up with that resulted in the least amount of time where email addresses didn't exist and the fewest number of steps! Without anymore prevaricating from me, here are the steps:

1. Remove your existing domain alias. **This is when email will stop going to you@newdomain.com**
2. Add your new domain as a "real" domain in Google Apps. Go through and DNS setup or verification needed, but if you already had it as an alias, you should already have all of that setup.
3. Rename all of your users on the old domain to the new domain. This is where you@newdomain.com starts working again. The benefit of doing it this way instead of just switching primary domains is that it automatically creates aliases for all your users on the old domain, which saves you as many steps as you have users. You should rename yourself last as it will kick you out and make you log back in, which was scary when it happened to me, but not the end of the world.
4. Rename all of your groups (aliases, y'all) on the old domain to the new domain.
5. This is the stupid part. In order to change your primary domain, you have to use the API. I went through a bunch of the official clients and had no luck, but then I found the [API Test Page](https://developers.google.com/admin-sdk/directory/v1/reference/customers/update) and that worked fine.
6. On the [API Test Page](https://developers.google.com/admin-sdk/directory/v1/reference/customers/update):
    
    - Toggle the "Authorize requests using OAuth 2.0" thing, which will then pop up a window. Make sure you log in with your work domain.
    - For "customerKey", put in `my\_customer`
    - In "Request Body", the field name is `customerDomain` and the value is your new domain!
    - Now click outside the request body box, and then click **Execute**.
    - You should get a 200 response.

And now you're done!

Everything seems to be fine. The only thing that's still a little weird is gChat, but all of our old Hangout URLs still work and we haven't noticed any issues with Docs or anything else.

Good luck in your domain switching!

#### Further Reading:

- [Impact of changing a username](https://support.google.com/a/answer/2622985)
- [Before you change your primary domain](https://support.google.com/a/answer/6301932)

**Update**: I don't know anything else than what I've written. If it doesn't work, I probably can't help you. If you have a business account, Google's support is actually really good. Call them. Really.
