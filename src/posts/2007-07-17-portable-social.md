---
title: Portable Social Networks at Mashup Camp
date: 2007-07-17
tags:
  - "aol"
  - "microformats"
  - "web-standards"
slug: "portable_social"
---

I'm doing a presentation today at [Mashup University](http://mashupcamp.com) that I've titled [Tapping the Portable Social Network](http://presentations.lawver.net/philosophy/mashup_university_tapping_the/) that's a code tour of how to create a social network that uses existing social connections and public data to make the sign up process for web sites easier. Of course, this whole idea [came from Jeremy Keith](http://adactio.com/journal/1209/).

It's a very simple Rails app ([that you can download](http://dev.lawver.net/mashup_u/mashup_u.zip)) that only deals with the login/signup process using both OpenID and AOL's [OpenAuth](http://dev.aol.com/openauth).

Here are the basics...

If you log in with OpenID, it:

1. grabs the identity URL, and looks for some microformats
2. looks for an hcard and pre-fllls the profile
3. looks for XFN-encoded links and searches the site for existing users with that homepage and gives you the option to add them as contacts when you sign up.

If you log in with [OpenAuth](http://dev.aol.com/openauth), it:
4. pre-fills your profile with URLs and data we think we know based on your screen name.
5. grabs your buddy list and looks for folks who logged in with those screennames on the site and gives you the option to add them as contacts.

It's dead simple and poorly documented, but works well so far, and I think the flow makes sense and has possibilities. You're welcome to take it, the concept, the code, and do whatever you want with it.

The next step is to see what other open reliable sources of social data are out there that would make sense to look for during the sign up process.

**UPDATE**: Read the **README** file! There are _several_ things you need to change in both the configuration, and one line in profile.js. The README documents all of the required changes and where to find them.
