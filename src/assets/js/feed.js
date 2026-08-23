/* Social stream: merges Crucial Tracks + Mastodon into #social-stream.
   Plain browser script, no dependencies. Feed HTML is self-authored and
   injected raw; every plain-text field goes through escapeHtml(). */
(function () {
  'use strict';

  var CRUCIAL_TRACKS_URL = 'https://www.crucialtracks.org/profile/kpl/feed.json';
  // Account ID pinned from https://social.lol/api/v1/accounts/lookup?acct=kpl
  // — re-run lookup if the account ever moves.
  var MASTO_STATUSES_URL = 'https://social.lol/api/v1/accounts/109523605918327243/statuses?limit=12&exclude_replies=true';
  var PER_SOURCE_LIMIT = 10;
  var MAX_ITEMS = 25;

  var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  var shortDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function relativeTime(date) {
    var remaining = (date.getTime() - Date.now()) / 1000;
    var divisions = [
      { amount: 60, unit: 'second' },
      { amount: 60, unit: 'minute' },
      { amount: 24, unit: 'hour' }
    ];
    for (var i = 0; i < divisions.length; i++) {
      if (Math.abs(remaining) < divisions[i].amount) {
        return rtf.format(Math.round(remaining), divisions[i].unit);
      }
      remaining /= divisions[i].amount;
    }
    // Within a week keep relative formatting; older falls back to a short date.
    if (Math.abs(remaining) < 7) return rtf.format(Math.round(remaining), 'day');
    return shortDate.format(date);
  }

  function fetchCrucialTracks() {
    return fetch(CRUCIAL_TRACKS_URL).then(function (res) {
      if (!res.ok) throw new Error('Crucial Tracks HTTP ' + res.status);
      return res.json();
    }).then(function (feed) {
      return (feed.items || []).slice(0, PER_SOURCE_LIMIT).map(function (item) {
        var song = item._song_details;
        return {
          source: 'crucialtracks',
          date: new Date(item.date_published),
          url: item.url,
          title: song ? song.song + ' — ' + song.artist : item.title,
          // The feed's content_html embeds its own audio player; drop it since we
          // already render the official preview_url prominently above.
          html: item.content_html ? item.content_html.replace(/<audio\b[^>]*>[\s\S]*?<\/audio>/gi, '') : undefined,
          audio: song ? song.preview_url : undefined
        };
      });
    });
  }

  function fetchMastodon() {
    return fetch(MASTO_STATUSES_URL).then(function (res) {
      if (!res.ok) throw new Error('Mastodon HTTP ' + res.status);
      return res.json();
    }).then(function (statuses) {
      return statuses.filter(function (st) { return st.visibility === 'public'; })
        .slice(0, PER_SOURCE_LIMIT)
        .map(function (st) {
          var s = st.reblog || st;
          return {
            source: 'mastodon',
            date: new Date(s.created_at),
            url: s.url || st.url,
            html: s.content,
            boostOf: st.reblog ? s.account.display_name + ' (@' + s.account.acct + ')' : undefined,
            spoiler: s.spoiler_text || undefined,
            media: (s.media_attachments || []).map(function (m) {
              return {
                url: m.type === 'image' ? (m.preview_url || m.url) : (m.url || m.preview_url),
                alt: m.description || '',
                kind: m.type
              };
            })
          };
        });
    });
  }

  function renderMedia(media) {
    if (!media || !media.length) return '';
    var count = 0;
    var cells = media.map(function (m) {
      var alt = escapeHtml(m.alt);
      if (m.kind === 'image') {
        count++;
        return '<img loading="lazy" src="' + escapeHtml(m.url) + '" alt="' + alt + '" class="rounded-md w-full object-cover">';
      }
      if (m.kind === 'gifv' || m.kind === 'video') {
        count++;
        return '<video controls muted playsinline loop src="' + escapeHtml(m.url) + '"' +
          (alt ? ' aria-label="' + alt + '"' : '') +
          ' class="rounded-md w-full"></video>';
      }
      return '';
    }).join('');
    if (!count) return '';
    return '<div class="mt-2 grid gap-2' + (count > 1 ? ' grid-cols-2' : '') + '">' + cells + '</div>';
  }

  function renderItem(item) {
    var html = '<article class="feed-item">';
    if (item.boostOf) {
      html += '<p class="text-xs text-gray-500 dark:text-slate-400 mb-1">Boosted ' + escapeHtml(item.boostOf) + '</p>';
    }

    var body;
    if (item.source === 'crucialtracks') {
      body = '<div class="flex gap-3">' +
        (item.artwork ? '<img src="' + escapeHtml(item.artwork) + '" alt="" class="w-12 h-12 rounded object-cover shrink-0" loading="lazy">' : '') +
        '<div class="min-w-0">' +
        '<a href="' + escapeHtml(item.url) + '" class="font-medium text-gray-900 hover:text-primary dark:text-slate-100">' + escapeHtml(item.title) + '</a>' +
        (item.audio ? '<audio controls preload="none" class="feed-audio" src="' + escapeHtml(item.audio) + '"></audio>' : '') +
        '<div class="feed-content text-sm text-gray-600 dark:text-slate-300">' + (item.html || '') + '</div>' +
        '</div></div>';
    } else {
      body = '<div class="feed-content text-sm text-gray-600 dark:text-slate-300">' + (item.html || '') + '</div>' + renderMedia(item.media);
    }

    if (item.spoiler) {
      html += '<details><summary class="cursor-pointer text-gray-700 dark:text-slate-300">CW: ' + escapeHtml(item.spoiler) + '</summary>' + body + '</details>';
    } else {
      html += body;
    }

    html += '<footer class="flex items-center gap-3 mt-3">' +
      '<span class="feed-badge">' + (item.source === 'crucialtracks' ? 'Crucial Tracks' : 'Mastodon') + '</span>' +
      '<time datetime="' + item.date.toISOString() + '" title="' + escapeHtml(item.date.toLocaleString()) + '" class="text-xs text-gray-500 dark:text-slate-400">' + escapeHtml(relativeTime(item.date)) + '</time>' +
      '<a href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener noreferrer" class="ml-auto text-gray-400 hover:text-primary dark:hover:text-primary" aria-label="Open original">↗</a>' +
      '</footer>';

    return html + '</article>';
  }

  function renderFallback(container) {
    container.innerHTML =
      '<div class="feed-item">' +
      '<p class="text-sm text-gray-600 dark:text-slate-300 mb-2">Couldn’t load activity.</p>' +
      '<ul class="space-y-1 text-sm">' +
      '<li><a class="text-primary hover:underline" href="https://www.crucialtracks.org/profile/kpl">Crucial Tracks</a></li>' +
      '<li><a class="text-primary hover:underline" rel="me" href="https://social.lol/@kpl">@kpl@social.lol on Mastodon</a></li>' +
      '<li><a class="text-primary hover:underline" href="https://photos.lawver.net">Kevin’s Photos</a></li>' +
      '</ul></div>';
  }

  function init() {
    var container = document.getElementById('social-stream');
    if (!container) return;

    var skeleton = '<div class="p-5 space-y-3" aria-hidden="true">' +
      new Array(4 + 1).join('<div class="skeleton-row"></div>') +
      '</div>';
    container.innerHTML = skeleton;

    Promise.allSettled([fetchCrucialTracks(), fetchMastodon()]).then(function (results) {
      var items = [];
      results.forEach(function (r) {
        if (r.status === 'fulfilled') items = items.concat(r.value);
      });
      if (!items.length) {
        renderFallback(container);
        return;
      }
      items.sort(function (a, b) { return b.date - a.date; });
      container.innerHTML = items.slice(0, MAX_ITEMS).map(renderItem).join('');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
