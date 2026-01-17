---
title: Importing Rdio Playlists (and Your Collection) Into Google Music
date: 2015-11-20
tags:
  - "google-music"
  - "import"
  - "rdio"
  - "geekery"
  - "music"
---

My beloved Rdio is dying, and soon. They ran out of money, sold all their assets in a fire sale and have given their users about a week to find a new music home. I tried Apple Music, but quickly ran into limitations (song limit, my patience with their awful UI, horrible apps for importing songs, etc). Asking around, it looked like Google Music was the next best option.

And then the problem was, how to I get almost 5 years of musical history from Rdio into Google Music? All those favorites playlists from 2011-2015, the road trip playlists, the special occasion playlists... all of those will just disappear.

It took a lot of experimentation, but I found a way to export my playlists (and entire collection) from Rdio to Google Music. Here's what you need (sorry, this is going to require some Terminal time):

- First, you need to install the [Rdio Enhancer](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiW5-WEoZ_JAhUMVh4KHeIeAu8QFggdMAA&url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Frdio-enhancer%2Fhmaalfaappddkggilhahaebfhdmmmngf%3Fhl%3Den&usg=AFQjCNEyeoXgZPnZKSMY9RWNTu9nct0qvw&sig2=DNDV4s7R4raUxldiz-jz9Q&bvm=bv.108194040,d.dmo) Chrome Add-on.
- Sign up for the [Google Music](https://music.google.com) free trial.
- Install [gmusic-playlist](https://github.com/soulfx/gmusic-playlist) - it's a python library for interacting with Google Music. It has some dependencies, so you'll need to follow the README instructions carefully.

After you've gotten those installed, you need to do the following to save your playlists and collection in a format that'll work with the importer:

- Go to [Rdio](http://www.rdio.com) in Chrome.
- Click **Favorites**.
- You should see an **Export CSV** button. Click it. Depending on the size of your library, this could take a while. It's going to generate CSV files for your _entire_ collection. My 35,000 song collection took 3 CSV files, and about 5 minutes to generate and download them. Chrome will probably ask you if this site can download multiple files. Say yes and wait for all of them to download (15,000 songs per file).
- Once you have all those files, it's time to do playlists!

For each playlist you want to save:

- Click its link in the left nav bar.
- Click the 3 dots in a circle button (next to the share button), then "Extras", then "Export to CSV".
- That'll download another CSV file.
- You should open up each CSV and delete the first line (the header) or you'll end up with "Did She Mention My Name" by Gordon Lightfoot in _all_ of your playlists. If that doesn't bother you, go ahead skip this step.

Now that you have your collection and all the files you want to save, it's time to set up the gmusic-playlist importer. After you unzip it, open the folder and then open **preferences.py** in your favorite text editor and make the following changes:

- username should be your google login email address.
- Change the **track\_info\_order** line to look like this: `track\_info\_order = \['title','artist','album','trackNumber'\]` (the only change is to change "songid" to "trackNumber").
- Change **allow\_duplicates** to `True`.
- Change **search\_personal\_library** to `False`.
- Save the file.

Now you can follow the gmusic-playlist directions to import all those CSVs. Google Music has a limit of 1,000 songs per playlist, so your collection will be broken up, but at least you'll have all your songs!

**Update**: I tried to like Google Music. I really did. But, it has some fatal flaws:

- Their new releases page is bad and not updated with actual new releases.
- There's _no_ social at _all_. It's awful.
- The Web UI is just broken enough to be really frustrating, and all the web apps for it are hamstrung by the web's brokenness.
- They do very strange things with explicit lyrics.

So, I was going to update this post with instructions on how to import your official Rdio export into Google Music, but... don't do that.

I'm trying out Spotify Premium again for the first time since I started using Rdio, and they've paid attention. Social is better. Sharing is better. The queue is persistent between sessions. They have more music than Rdio did, or that Google Music has. Their new releases page is actually mostly up to date.

Instead of using this process to import things to Google Music, use the [official Spotify Rdio Import tool](https://import.spotify.com/rdio/). It takes about five minutes and works really well.
