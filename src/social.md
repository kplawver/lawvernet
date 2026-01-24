---
layout: layouts/page.njk
title: Kevin Other Places
description: The other places you can find Kevin on the web.
eleventyNavigation:
  key: Social
  order: 6
---

I've abandoned most of the major social networks over the past few years. I deleted my Twitter account in 2022 after the board approved Elon Musk's offer, and only recently put up my [archive](https://tweets.lawver.net). I still have my Facebook and Instagram accounts, but I never check them.

So, here's where I am, kind of in order of priority?

<ul class="list-disc pl-6 space-y-2 mt-4">
{% for child in collections.all | eleventyNavigation("Social") %}
  <li>
    <a href="{{ child.url }}" class="text-primary hover:underline dark:text-primary-light">{{ child.title }}</a>
    {% if child.description %}<span class="text-gray-600 dark:text-slate-400"> - {{ child.description }}</span>{% endif %}
  </li>
{% endfor %}
</ul>
