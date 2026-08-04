# Original media

This directory retains the full-resolution source photography and original hero video.

The public site serves responsive AVIF images from `public/gallery/`, an optimized hero poster from `public/media/`, and a compressed, silent background video from `public/media/`. Keeping the originals outside `public/` prevents Vite and Netlify from copying roughly 228 MB of unused source media into every deployment.
