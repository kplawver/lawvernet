---
title: "You Wanna See?"
date: 2002-07-19
tags:
  - "computing"
slug: "you_wanna_see"
---

So, my favorite thing about [Movable Type](http://www.movabletype.org) so far is the modules. My whole pages are modular, and I love it. I can change one file and rebuild, and it changes everywhere. You wanna see? Here's my homepage template:

```
<$MTInclude module="pageHeader"$>
<$MTInclude module="menuHeader"$>
<$MTInclude module="menuLastTenOffset"$>
<$MTInclude module="menuLinks"$>
<$MTInclude module="menuFooter"$>
<$MTInclude module="blogHeader"$>
<!-- start entries -->
<$MTInclude module="blogFrontPage"$>
<!-- end entries -->
<$MTInclude module="blogFooter"$>
<$MTInclude module="pageFooter"$>
```

And the stylesheet's even better. Change one file, and I can change pretty much anything I want about the layout. I love the web. You'd think after all this time, I'd get bored and go do something else. But nope, still hooked.
