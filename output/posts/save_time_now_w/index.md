---
title: "Save Time Now, Waste Money Later"
date: 2002-02-27
categories: 
  - "geekery"
---

I've been working on a theory for a few weeks that you all probably know already. I want to share it just in case you don't. There seem to be many people where I work who just don't get it even when I use small words and exaggerated hand gestures. I even drew a diagram with stick people and arrows. I think I even used multicolored white board markers. Yes, it was pageantry and sophistication all rolled together in the round mound of me.

| **Equipment**: The boxes and software that will run your site, tool, database, whatever.   |
| --- |
| **Backend Programming**: Writing stored procedures for the database, setting up data sources, creating daemons, etc.   |
| **Webserver Integration**: Hooking up the backend systems to the webserver and writing procedures and/or functions to surface them to the webserver.   |
| **Frontend Integration**: Using the stuff written by the previous step to build the actual pages returned to the user.   |
| **Users**: Ummm, they use it. The "intended audience", if you will.   |

I bet you're wonder what this theory is now, huh? I'm getting there, just hold on. I work on some very large projects involving many different groups. The flow is in a lovely table to the right. The problem is that if the system involves daily interaction with employers, or worse, the general public, any steps you've taken to cut corners that make the product less usable will ultimately cost you more more in time and money than if you had just done it right the first time. Every hack that the person after you has to create in order to get code to work is a waste of time and money. Every useless step a user has to do to accomplish the purpose is wasted time that gets compounded by the fact that there are probably many more users than there are programmers. It's even worse if this is a consumer site. If it doesn't work, or is difficult to use, they won't use it at all, and it will really be a waste.

Cost-cutting measures during development made in the sake of saving time or money save neither. Every mistake made that isn't fixed wastes the time of the next person to work on the project. If the next step involves multiple people, you've multiplied that waste by the number of people who have to compensate. No matter how much your backend developers make, it's not enough to justify wasting the time and talent of the people who take over. The same goes for everyone else involved. When building something, do your part right. Talk to the people who will be using what you produce. Let's say you're in the webserver integration group and you're writing something that will be used by 20 people. Talk to them and make sure you're not doing something that will make them have to work around your product instead of using it as intended.

This all boils down to usability. The principles of usability don't go out the door just because it's software and not a webpage. Writing crappy code because it takes you less time is no excuse. It's the poorest of excuses because you've just inflicted a giant time and money waster on the people who then have to use it. So, think before you code, please? Say it with me: I will not write crappy code. I will do things the **right** way, deadlines be damned!
