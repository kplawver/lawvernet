---
title: "You Wanna See?"
date: 2002-07-19
categories: 
  - "computing"
---

So, my favorite thing about [Movable Type](http://www.movabletype.org) so far is the modules. My whole pages are modular, and I love it. I can change one file and rebuild, and it changes everywhere. You wanna see? Here's my homepage template:

```
&lt;$MTInclude module=&#34;pageHeader&#34;$&gt;
&lt;$MTInclude module=&#34;menuHeader&#34;$&gt;
&lt;$MTInclude module=&#34;menuLastTenOffset&#34;$&gt;
&lt;$MTInclude module=&#34;menuLinks&#34;$&gt;
&lt;$MTInclude module=&#34;menuFooter&#34;$&gt;
&lt;$MTInclude module=&#34;blogHeader&#34;$&gt;
&lt;!-- start entries --&gt;
&lt;$MTInclude module=&#34;blogFrontPage&#34;$&gt;
&lt;!-- end entries --&gt;
&lt;$MTInclude module=&#34;blogFooter&#34;$&gt;
&lt;$MTInclude module=&#34;pageFooter&#34;$&gt;
```

And the stylesheet's even better. Change one file, and I can change pretty much anything I want about the layout. I love the web. You'd think after all this time, I'd get bored and go do something else. But nope, still hooked.
