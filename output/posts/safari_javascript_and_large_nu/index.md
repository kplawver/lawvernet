---
title: "Safari, Javascript and Large Numbers"
date: 2005-08-18
categories: 
  - "dashboard"
  - "javascript"
  - "os-x"
---

Let's say you're playing with a dashboard widget that deals with some large numbers you might want to compare. For some reason, you're not getting the result that you thought you would. For some reason really large numbers are breaking your if statements. Well, if you wanted them not to, you might want to wrap those numbers in Number() in the comparison. That seemed to work for me (yes, I really hope you'll get to see this widget soon - it's fun).\\ **UPDATE**: Apparently, I'm on crack because the above bug I mentioned apparently doesn't exist. I was trying to prove it with some test cases, and I can't recreate it, even with REALLY large numbers expressed as strings. So... ummm... sorry.
