const http = require('http');
const port = process.env.PORT || 10000;

// CC0 public-domain images via Openverse (all verified HTTP 200)
const IMAGES = {
  lashes: [
    'https://cdn.stocksnap.io/img-thumbs/960w/CE58F84144.jpg',
    'https://cdn.stocksnap.io/img-thumbs/960w/2B47ZJBEU3.jpg',
    'https://cdn.stocksnap.io/img-thumbs/960w/JIFO7XQG38.jpg',
    'https://cdn.stocksnap.io/img-thumbs/960w/89XBUQFTSG.jpg'
  ],
  sea: [
    'https://live.staticflickr.com/326/18811979759_c9c3ae9cfe_b.jpg',
    'https://cdn.stocksnap.io/img-thumbs/960w/1CFC9715A4.jpg',
    'https://live.staticflickr.com/3847/14577031498_98af86e66a_b.jpg',
    'https://cdn.stocksnap.io/img-thumbs/960w/OAEJYGIFC9.jpg'
  ],
  personal: [
    'https://upload.wikimedia.org/wikipedia/commons/4/4c/Turquoise_mountain_lake_%28Unsplash%29.jpg',
    'https://cdn.stocksnap.io/img-thumbs/960w/WPOWZBGDTU.jpg',
    'https://live.staticflickr.com/65535/48493035987_281fddc74b_b.jpg',
    'https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvYnMxOTUwLWltYWdlLWt3dng0dG5iLmpwZw.jpg'
  ]
};

const THEMES = {
  lashes: {
    label: 'LASHES · BEAUTY',
    bg: 'linear-gradient(135deg, #fde2e4 0%, #fad2e1 45%, #e2b8d8 100%)',
    chip: '#d6336c'
  },
  sea: {
    label: 'OCEAN · SAILING',
    bg: 'linear-gradient(135deg, #dbeafe 0%, #a5d8ff 45%, #7dd3fc 100%)',
    chip: '#0369a1'
  },
  personal: {
    label: 'WELCOME',
    bg: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 45%, #fbcfe8 100%)',
    chip: '#b45309'
  }
};

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

http.createServer((req, res) => {
  const host = (req.headers.host || 'render-spare.onrender.com').split(':')[0];
  const siteUrl = 'https://' + host;
  const title = process.env.SITE_TITLE || host;
  const themeName = THEMES[process.env.SITE_THEME] ? process.env.SITE_THEME : 'personal';
  const theme = THEMES[themeName];
  const tagline = process.env.SITE_TAGLINE || '';
  const imgs = IMAGES[themeName];
  const cards = imgs.map((u, i) =>
    '<img src="' + esc(u) + '" alt="' + esc(title) + ' ' + (i + 1) + '" loading="lazy" onerror="this.style.display=\'none\'">'
  ).join('\n      ');

  const html = '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>' + esc(title) + '</title>\n<style>\n'
    + 'body { margin: 0; font-family: -apple-system, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; background: ' + theme.bg + '; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box; }\n'
    + '.card { max-width: 720px; width: 100%; background: rgba(255,255,255,.93); border-radius: 24px; padding: 40px 32px 28px; box-shadow: 0 20px 60px rgba(0,0,0,.18); text-align: center; box-sizing: border-box; }\n'
    + '.chip { display: inline-block; padding: 6px 16px; border-radius: 999px; font-size: 12px; letter-spacing: 3px; background: ' + theme.chip + '; color: #fff; }\n'
    + 'h1 { font-size: 42px; line-height: 1.15; margin: 20px 0 10px; color: #222; word-break: break-word; }\n'
    + '.tagline { font-size: 17px; color: #555; margin: 0 0 20px; line-height: 1.6; }\n'
    + '.url { display: inline-block; font-size: 15px; background: #f1f3f5; border-radius: 999px; padding: 9px 20px; color: #333; text-decoration: none; word-break: break-all; }\n'
    + '.url:hover { background: #e7f5ff; color: ' + theme.chip + '; }\n'
    + '.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 28px; }\n'
    + '.grid img { width: 100%; height: 180px; object-fit: cover; border-radius: 14px; display: block; box-shadow: 0 4px 14px rgba(0,0,0,.12); }\n'
    + 'footer { margin-top: 24px; font-size: 12px; color: #999; }\n'
    + '@media (max-width: 520px) { h1 { font-size: 30px; } .card { padding: 28px 20px 22px; } .grid img { height: 130px; } }\n'
    + '</style>\n'
    + '<script type="text/javascript">\n'
    + '    (function(c,l,a,r,i,t,y){\n'
    + '        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n'
    + '        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;\n'
    + '        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\n'
    + '    })(window, document, "clarity", "script", "zj6cbc3ftv");\n'
    + '</script>\n'
    + '<script>\n'
    + '    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.people.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSurveyShown onSurveyClosed".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);\n'
    + '    posthog.init(\'phc_mhcFki63vsBuLmrtH9ntxCkwHVaqGMTJ5BqeyXrkvv5n\',{api_host:\'https://us.i.posthog.com\'})\n'
    + '</script>\n'
    + '</head>\n<body>\n<div class="card">\n'
    + '<span class="chip">' + esc(theme.label) + '</span>\n'
    + '<h1>' + esc(title) + '</h1>\n'
    + (tagline ? '<p class="tagline">' + esc(tagline) + '</p>\n' : '')
    + '<a class="url" href="' + esc(siteUrl) + '">' + esc(siteUrl) + '</a>\n'
    + '<div class="grid">\n      ' + cards + '\n    </div>\n'
    + '<footer>Photos: CC0 public domain &middot; via Openverse</footer>\n'
    + '</div>\n</body>\n</html>';

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}).listen(port, () => console.log('listening on ' + port));
