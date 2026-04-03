import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  Compass, Mountain, Wind, Footprints, MapPin, Camera,
  ArrowDown, Menu, X, Play, Home, Volume2, Target, ChevronLeft, ChevronRight,
  ZoomIn, Heart, Layers, Sparkles, GraduationCap, Shield, Mic, Star,
  TreePine, Tent, ScanLine, Calculator, UtensilsCrossed, ShoppingCart,
  Grid, Users, Zap
} from 'lucide-react';
import BreathWithMe from './BreathWithMe';
import PrivacyPolicy from './PrivacyPolicy';
import Lovocado from './Lovocado';
import LovocadoPrivacyPolicy from './LovocadoPrivacyPolicy';
import Motive from './Motive';
import MotivePrivacyPolicy from './MotivePrivacyPolicy';
import IGotYou from './IGotYou';

// ── Pixel art hiker character — 4-frame walk cycle ─────────────────────────
const PixelChar = ({ frame = 0 }) => {
  const hat   = '#4a3218';
  const face  = '#f2c18a';
  const eye   = '#18100a';
  const J     = '#1e6640';
  const pack  = '#7a5c10';
  const leg   = '#1c3a7a';
  const boot  = '#2a1a08';
  return (
    <svg
      width="44" height="66"
      viewBox="0 0 8 12"
      style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges', display: 'block' }}
    >
      <rect x="2" y="0" width="4" height="1" fill={hat}/>
      <rect x="1" y="1" width="6" height="1" fill={hat}/>
      <rect x="2" y="2" width="4" height="3" fill={face}/>
      <rect x="2" y="3" width="1" height="1" fill={eye}/>
      <rect x="5" y="3" width="1" height="1" fill={eye}/>
      <rect x="0" y="5" width="1" height="2" fill={J}/>
      <rect x="1" y="5" width="5" height="2" fill={J}/>
      <rect x="6" y="5" width="2" height="2" fill={pack}/>
      {/* Legs — 4-frame walk: neutral → left-step → neutral-dip → right-step */}
      {frame === 0 && (<>
        <rect x="2" y="7" width="2" height="3" fill={leg}/>
        <rect x="4" y="7" width="2" height="3" fill={leg}/>
        <rect x="2" y="10" width="2" height="1" fill={boot}/>
        <rect x="4" y="10" width="2" height="1" fill={boot}/>
      </>)}
      {frame === 1 && (<>
        <rect x="1" y="7" width="2" height="4" fill={leg}/>
        <rect x="1" y="10" width="3" height="1" fill={boot}/>
        <rect x="4" y="8" width="2" height="2" fill={leg}/>
        <rect x="3" y="10" width="3" height="1" fill={boot}/>
      </>)}
      {frame === 2 && (<>
        <rect x="2" y="7" width="2" height="3" fill={leg}/>
        <rect x="4" y="7" width="2" height="3" fill={leg}/>
        <rect x="2" y="9" width="2" height="2" fill={boot}/>
        <rect x="4" y="9" width="2" height="2" fill={boot}/>
      </>)}
      {frame === 3 && (<>
        <rect x="5" y="7" width="2" height="4" fill={leg}/>
        <rect x="4" y="10" width="3" height="1" fill={boot}/>
        <rect x="2" y="8" width="2" height="2" fill={leg}/>
        <rect x="2" y="10" width="3" height="1" fill={boot}/>
      </>)}
    </svg>
  );
};

// ── Trail bezier helper ──────────────────────────────────────────────────
const bzP = (t,ax,ay,bx,by,cx,cy,dx,dy) => {
  const m=1-t;
  return [m*m*m*ax+3*m*m*t*bx+3*m*t*t*cx+t*t*t*dx, m*m*m*ay+3*m*m*t*by+3*m*t*t*cy+t*t*t*dy];
};
// Bezier segments matching the canvas trail (canvas coords 0-240, 0-150)
const TRAIL_SEGS = [
  [115,126, 98,124, 82,119, 67,111],  // 0: start → lovocado
  [ 67,111, 55,103, 40, 90, 48, 75],  // 1: lovocado → breathe
  [ 48, 75, 54, 62, 76, 50, 96, 45],  // 2: breathe → yammoing
  [ 96, 45,110, 38,128, 28,144, 24],  // 3: yammoing → sss
  [144, 24,160, 22,178, 28,187, 45],  // 4: sss → deva
  [187, 45,196, 60,188, 76,158, 87],  // 5: deva → igottyou
];
// Trail index for each app node (0 = start point)
const NODE_IDX = { lovocado:1, breathe:2, yammoing:3, sss:4, deva:5, igottyou:6 };

const SummitWanderlustAdventure = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealedElements, setRevealedElements] = useState(new Set());
  const observerRefs = useRef([]);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const mapCanvasRef = useRef(null);

  // Roster carousel state
  const [rosterIdx, setRosterIdx] = useState(0);

  // Gallery state
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isGalleryAnimating, setIsGalleryAnimating] = useState(false);
  const [isGalleryFullscreen, setIsGalleryFullscreen] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);

  // Trail map state
  const [mapSelectedApp, setMapSelectedApp] = useState(null);
  const [hikerPos, setHikerPos] = useState({ x: 48, y: 84 });
  const [hikerWalking, setHikerWalking] = useState(false);
  const [walkFrame, setWalkFrame] = useState(0);
  const [visitedCamps, setVisitedCamps] = useState(new Set());
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [hikerFacing, setHikerFacing] = useState(1);      // 1 = right, -1 = left
  const [hoveredNode, setHoveredNode] = useState(null);
  const [travelingTo, setTravelingTo] = useState(null);   // app object while walking
  const [arrivedCamp, setArrivedCamp] = useState(null);   // appId briefly on arrival
  const hikerTrailIdxRef = useRef(0);
  const hikerAnimRef = useRef(null);
  const hikerDivRef = useRef(null);
  const mapSectionRef = useRef(null);
  const dustContainerRef = useRef(null);
  const trailPathRef = useRef(null);
  const frameCountRef = useRef(0);
  const [mapVisible, setMapVisible] = useState(false);

  const galleryImages = [
    { id: 1, url: '/01.jpg' }, { id: 2, url: '/02.JPG' },
    { id: 3, url: '/03.JPG' }, { id: 4, url: '/04.JPG' },
    { id: 5, url: '/05.JPG' }, { id: 6, url: '/06.JPG' },
    { id: 7, url: '/07.JPG' }, { id: 8, url: '/08.JPG' },
    { id: 9, url: '/09.JPG' }, { id: 10, url: '/10.JPG' },
  ];

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        setScrollY(scrolled);
        setScrollProgress(maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setRevealedElements(prev => new Set(prev).add(entry.target.id));
        }
      });
    }, { threshold: 0.1, rootMargin: '-20px' });

    const timeoutId = setTimeout(() => {
      observerRefs.current.forEach(ref => { if (ref) revealObserver.observe(ref); });
    }, 100);

    const sectionObserver = new IntersectionObserver((entries) => {
      let maxRatio = 0, activeIndex = -1;
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          const idx = parseInt(entry.target.id.split('-')[1]);
          if (!isNaN(idx)) activeIndex = idx;
        }
      });
      if (maxRatio > 0 && activeIndex >= 0) setActiveSection(activeIndex);
    }, { threshold: [0, 0.5, 1], rootMargin: '-20% 0px -20% 0px' });

    const observeSections = () => {
      ['chapter-0','chapter-1','chapter-2','chapter-3','chapter-4','chapter-5'].forEach(id => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
      });
    };
    const sectionTimeout = setTimeout(observeSections, 200);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(sectionTimeout);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  // Map section visibility — used to hide global nav chrome that clashes with the game HUD
  useEffect(() => {
    const el = mapSectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setMapVisible(entry.isIntersecting), { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Custom cursor — direct DOM manipulation to avoid React re-renders on every mousemove
  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;
    const move = (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
    };
    const enter = () => { dot.style.opacity = '1'; ring.style.opacity = '1'; };
    const leave = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; };
    const hoverOn = (e) => { if (e.target.closest('a,button')) ring.classList.add('hovering'); };
    const hoverOff = () => ring.classList.remove('hovering');
    document.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseenter', enter);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseover', hoverOn);
    document.addEventListener('mouseout', hoverOff);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseenter', enter);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseover', hoverOn);
      document.removeEventListener('mouseout', hoverOff);
    };
  }, []);

  useEffect(() => {
    if (!isGalleryFullscreen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevGallerySlide();
      if (e.key === 'ArrowRight') nextGallerySlide();
      if (e.key === 'Escape') setIsGalleryFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryFullscreen, galleryIndex]);

  useEffect(() => {
    if (!hikerWalking) { setWalkFrame(0); return; }
    const id = setInterval(() => setWalkFrame(f => (f + 1) % 4), 170);
    return () => clearInterval(id);
  }, [hikerWalking]);

  // Idle breathing bob
  useEffect(() => {
    if (hikerWalking) return;
    let t = 0, rafId;
    const bob = () => {
      t += 0.04;
      const yo = Math.sin(t) * 2;
      if (hikerDivRef.current) {
        hikerDivRef.current.style.transform = `translate(-50%, calc(-100% + ${yo}px)) scaleX(${hikerFacing})`;
      }
      rafId = requestAnimationFrame(bob);
    };
    rafId = requestAnimationFrame(bob);
    return () => cancelAnimationFrame(rafId);
  }, [hikerWalking, hikerFacing]);

  // Canvas pixel-art map
  useEffect(() => {
    const canvas = mapCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const W = 240, H = 150, skyH = 50;
    const PI2 = Math.PI * 2;

    // ── 1. SKY ──
    const sky = ctx.createLinearGradient(0, 0, 0, skyH);
    sky.addColorStop(0, '#1e6cb0'); sky.addColorStop(1, '#5aa8dc');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, skyH);
    ctx.fillStyle = 'rgba(255,255,255,0.86)';
    const cloud = (cx,cy) => { ctx.fillRect(cx,cy,14,4); ctx.fillRect(cx+2,cy-2,10,4); ctx.fillRect(cx+4,cy-4,6,4); };
    cloud(12,10); cloud(70,7); cloud(134,9); cloud(192,11);

    // ── 2. GROUND BASE ──
    const gnd = ctx.createLinearGradient(0,skyH,0,H);
    gnd.addColorStop(0,'#46a820'); gnd.addColorStop(1,'#388418');
    ctx.fillStyle = gnd; ctx.fillRect(0,skyH,W,H-skyH);

    // ── 3. BIOME SHAPES (solid terrain regions, not overlays) ──
    // Forest floor (left)
    ctx.fillStyle = '#1e5c0c';
    ctx.beginPath(); ctx.moveTo(0,skyH); ctx.bezierCurveTo(22,skyH,62,skyH+8,66,skyH+26); ctx.bezierCurveTo(70,skyH+42,52,skyH+52,36,skyH+58); ctx.bezierCurveTo(18,skyH+64,0,skyH+62,0,skyH+58); ctx.closePath(); ctx.fill();

    // Fortress hill (right, raised terrain — actual solid hill, not overlay)
    ctx.fillStyle = '#5c3a10';
    ctx.beginPath(); ctx.moveTo(148,skyH+18); ctx.bezierCurveTo(168,skyH+8,208,skyH+12,W,skyH+20); ctx.lineTo(W,H); ctx.lineTo(140,H); ctx.bezierCurveTo(136,H-12,140,skyH+48,148,skyH+18); ctx.closePath(); ctx.fill();
    // Hill edge highlight (slope line)
    ctx.strokeStyle = 'rgba(180,120,50,0.4)'; ctx.lineWidth=1.5; ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(148,skyH+18); ctx.bezierCurveTo(172,skyH+8,212,skyH+12,W,skyH+20); ctx.stroke();

    // Campus area (SSS): gentle purple rise
    ctx.fillStyle = 'rgba(42,10,76,0.30)';
    ctx.beginPath(); ctx.ellipse(144,44,56,34,0,0,PI2); ctx.fill();
    ctx.fillStyle = 'rgba(28,6,54,0.20)';
    ctx.beginPath(); ctx.ellipse(144,32,36,22,0,0,PI2); ctx.fill();

    // Meadow patch (lovocado)
    ctx.fillStyle = 'rgba(88,196,28,0.26)';
    ctx.beginPath(); ctx.ellipse(68,120,46,28,0,0,PI2); ctx.fill();

    // ── 4. MOUNTAINS ──
    const mtn = (cx,cy,w,h,body,snow) => {
      ctx.fillStyle=body; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx-w/2,cy+h); ctx.lineTo(cx+w/2,cy+h); ctx.closePath(); ctx.fill();
      const sh=Math.floor(h*0.28); ctx.fillStyle=snow; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx-Math.floor(w*0.17),cy+sh); ctx.lineTo(cx+Math.floor(w*0.17),cy+sh); ctx.closePath(); ctx.fill();
    };
    mtn(18,0,30,22,'#24283e','#c0caf0'); mtn(52,-1,34,24,'#24283e','#c0caf0'); mtn(88,1,28,20,'#24283e','#c0caf0');
    mtn(120,0,32,22,'#2a1248','#b8a4f0'); mtn(154,-1,30,22,'#24283e','#c0caf0');
    mtn(190,0,34,23,'#24283e','#c0caf0'); mtn(220,1,26,19,'#24283e','#c0caf0');
    mtn(34,8,26,17,'#383c58','#d2dcff'); mtn(68,5,28,20,'#30205a','#ccc4f4');
    mtn(104,6,30,20,'#30145a','#be98ff'); mtn(140,7,26,17,'#383c58','#d2dcff');
    mtn(174,6,28,19,'#383c58','#d2dcff'); mtn(212,8,24,16,'#383c58','#d2dcff');

    // ── 5. FOOTHILL BAND (anchors mountains to ground — creates horizon) ──
    // Deep shadow band — fills the gap between mountain bases (y≈22) and terrain (y≈50)
    ctx.fillStyle = '#1a3a08';
    ctx.beginPath(); ctx.moveTo(0,20); ctx.bezierCurveTo(40,18,80,22,120,19); ctx.bezierCurveTo(160,16,200,20,W,18); ctx.lineTo(W,60); ctx.lineTo(0,62); ctx.closePath(); ctx.fill();
    // Dark far hills (overlaps mountain bases, creates the connection)
    ctx.fillStyle = '#244c0a';
    ctx.beginPath(); ctx.moveTo(0,34); ctx.bezierCurveTo(32,30,64,37,96,32); ctx.bezierCurveTo(128,27,160,35,192,30); ctx.bezierCurveTo(216,27,232,33,W,31); ctx.lineTo(W,52); ctx.lineTo(0,54); ctx.closePath(); ctx.fill();
    // Lighter midground hills
    ctx.fillStyle = '#306010';
    ctx.beginPath(); ctx.moveTo(0,40); ctx.bezierCurveTo(38,36,76,43,114,38); ctx.bezierCurveTo(152,33,190,41,W,38); ctx.lineTo(W,52); ctx.lineTo(0,54); ctx.closePath(); ctx.fill();

    // ── 6. LAKE ──
    ctx.fillStyle='#0a44a0'; ctx.beginPath(); ctx.ellipse(22,82,16,10,0,0,PI2); ctx.fill();
    ctx.fillStyle='#1c68c4'; ctx.beginPath(); ctx.ellipse(21,81,11,7,0,0,PI2); ctx.fill();
    ctx.fillStyle='#54a4e0'; ctx.beginPath(); ctx.ellipse(19,79,6,3,0,0,PI2); ctx.fill();
    ctx.fillStyle='rgba(180,230,255,0.7)'; ctx.fillRect(13,77,8,2); ctx.fillRect(16,79,4,1);

    // ── 7. TREES (varied height — not perfectly uniform rows) ──
    const pine = (x,y,dark) => {
      const [c1,c2] = dark ? ['#124e36','#0a2e20'] : ['#1a6040','#10503a'];
      ctx.fillStyle=c1; ctx.fillRect(x+2,y,2,3); ctx.fillRect(x+1,y+2,4,3); ctx.fillRect(x,y+4,6,4); ctx.fillRect(x+1,y+7,4,2);
      ctx.fillStyle=c2; ctx.fillRect(x+2,y+8,2,3);
    };
    const yv = (x,a) => [0,-a,a,-a,0,a,0,-a][Math.floor(x/6)%8];
    const sk = (x,p) => Math.floor(x/6)%p === p-1;
    // Left forest (6 tapering rows with y-variation and occasional gaps)
    for(let x=-2;x<66;x+=6)             pine(x, 38+yv(x,2), true);
    for(let x=0;x<62;x+=6) if(!sk(x,5)) pine(x, 50+yv(x,2), true);
    for(let x=-2;x<56;x+=6)             pine(x, 62+yv(x,2), true);
    for(let x=0;x<48;x+=6) if(!sk(x,4)) pine(x, 74+yv(x,1), false);
    for(let x=0;x<38;x+=6)             pine(x, 86+yv(x,1), false);
    for(let x=0;x<26;x+=6)             pine(x, 97+yv(x,1), false);
    // Mountain tree line
    for(let x=78;x<116;x+=6) if(!sk(x,4)) pine(x, 46+yv(x,2), true);
    for(let x=82;x<112;x+=6)              pine(x, 58+yv(x,1), true);
    // Right fortress (stepped rows with gaps)
    for(let x=148;x<240;x+=6)             pine(x, 38+yv(x,2), true);
    for(let x=152;x<238;x+=6) if(!sk(x,5)) pine(x, 50+yv(x,2), true);
    for(let x=152;x<234;x+=6)             pine(x, 62+yv(x,1), true);
    for(let x=154;x<228;x+=6) if(!sk(x,4)) pine(x, 74+yv(x,1), true);
    for(let x=156;x<218;x+=6)             pine(x, 86+yv(x,1), true);
    // Meadow round-trees
    const rtree=(x,y)=>{ ctx.fillStyle='#247016'; ctx.fillRect(x,y+2,8,6); ctx.fillStyle='#42ae1e'; ctx.fillRect(x+1,y,6,6); ctx.fillRect(x,y+3,8,3); ctx.fillStyle='#6ed436'; ctx.fillRect(x+2,y+1,4,2); ctx.fillStyle='#784618'; ctx.fillRect(x+3,y+7,2,3); };
    [30,40,52,84,96,108].forEach(x=>rtree(x,98)); [34,44,88,100].forEach(x=>rtree(x,112));

    // ── 8. ROCKS ──
    const rk=(x,y)=>{ ctx.fillStyle='#5e5e6e'; ctx.fillRect(x,y,5,3); ctx.fillRect(x+1,y-1,3,1); ctx.fillStyle='#8686a0'; ctx.fillRect(x+1,y,1,1); };
    [[184,56],[194,62],[178,68],[200,68],[188,76],[204,54],[192,82]].forEach(([x,y])=>rk(x,y));

    // ── 9. FLOWERS ──
    const fl=(x,y,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,2,2);};
    [[36,106,'#ff88bb'],[46,114,'#ffaacc'],[54,104,'#fff'],[60,110,'#ffee44'],[68,116,'#ff88bb'],[76,108,'#88ffcc'],
     [42,120,'#ffaacc'],[58,122,'#fff'],[66,118,'#ffee44'],[52,126,'#ff6688'],[72,120,'#ffbbdd'],[80,116,'#88ffaa']].forEach(([x,y,c])=>fl(x,y,c));

    // ── 10. RIVER ──
    ctx.lineCap='round'; ctx.lineJoin='round';
    ctx.strokeStyle='#1058a4'; ctx.lineWidth=2.5;
    ctx.beginPath(); ctx.moveTo(96,45); ctx.quadraticCurveTo(62,62,48,75); ctx.quadraticCurveTo(34,80,22,82); ctx.stroke();
    ctx.strokeStyle='#46a0dc'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(96,45); ctx.quadraticCurveTo(62,62,48,75); ctx.quadraticCurveTo(34,80,22,82); ctx.stroke();

    // ── 11. TRAIL (shadow → dirt → surface) ──
    const tp=()=>{
      ctx.beginPath(); ctx.moveTo(115,126);
      ctx.bezierCurveTo(98,124,82,119,67,111);
      ctx.bezierCurveTo(55,103,40,90,48,75);
      ctx.bezierCurveTo(54,62,76,50,96,45);
      ctx.bezierCurveTo(110,38,128,28,144,24);
      ctx.bezierCurveTo(160,22,178,28,187,45);
      ctx.bezierCurveTo(196,60,188,76,158,87);
    };
    ctx.lineCap='round'; ctx.lineJoin='round';
    ctx.strokeStyle='rgba(0,0,0,0.4)'; ctx.lineWidth=3; tp(); ctx.stroke();
    ctx.strokeStyle='#6a4610'; ctx.lineWidth=2; tp(); ctx.stroke();
    ctx.strokeStyle='#ac8020'; ctx.lineWidth=1; tp(); ctx.stroke();

    // ── 12. FOOTPRINTS (on trail surface) ──
    const bzP=(t,ax,ay,bx,by,cx,cy,dx,dy)=>{const m=1-t;return[m*m*m*ax+3*m*m*t*bx+3*m*t*t*cx+t*t*t*dx,m*m*m*ay+3*m*m*t*by+3*m*t*t*cy+t*t*t*dy];};
    ctx.fillStyle='rgba(46,24,4,0.48)';
    [[115,126,98,124,82,119,67,111],[67,111,55,103,40,90,48,75],[48,75,54,62,76,50,96,45],
     [96,45,110,38,128,28,144,24],[144,24,160,22,178,28,187,45],[187,45,196,60,188,76,158,87]
    ].forEach(([ax,ay,bx,by,cx,cy,dx,dy])=>{
      for(let i=0;i<8;i++){
        const [px,py]=bzP((i+0.5)/8,ax,ay,bx,by,cx,cy,dx,dy);
        const s=i%2===0?-1.5:1.5;
        ctx.fillRect(Math.round(px+s)-1,Math.round(py)-1,2,3);
        ctx.fillRect(Math.round(px+s),Math.round(py)+2,1,2);
      }
    });

    // ── 13. TRAIL HIGHLIGHT + DASHES ──
    ctx.strokeStyle='rgba(235,195,90,0.45)'; ctx.lineWidth=0.6; tp(); ctx.stroke();
    ctx.strokeStyle='rgba(255,215,120,0.28)'; ctx.lineWidth=0.5; ctx.setLineDash([2,7]); tp(); ctx.stroke();
    ctx.setLineDash([]);

    // ── 14. CAMP LANDMARKS ──
    // Helper: scale landmark ~18% smaller around its center
    const lm = (cx, cy, fn) => {
      ctx.save(); ctx.translate(cx,cy); ctx.scale(0.82,0.82); ctx.translate(-cx,-cy); fn(); ctx.restore();
    };

    // Mini-environments (ground layer, drawn before buildings)
    // lovocado: warm meadow patch, flower cluster, door path
    ctx.fillStyle='rgba(88,196,28,0.32)'; ctx.beginPath(); ctx.ellipse(67,112,14,5,0,0,PI2); ctx.fill();
    ctx.fillStyle='#ff88bb'; ctx.fillRect(52,112,2,2); ctx.fillRect(57,111,2,2); ctx.fillRect(62,113,2,2);
    ctx.fillStyle='#ffcc44'; ctx.fillRect(55,112,2,2); ctx.fillRect(60,112,2,2);
    ctx.fillStyle='#9a9080'; ctx.fillRect(67,111,2,2); ctx.fillRect(69,110,2,2);
    // breathe: reeds at bank, stepping stones, deeper water
    ctx.fillStyle='#4a9030'; ctx.fillRect(34,72,1,5); ctx.fillRect(36,71,1,6); ctx.fillRect(38,72,1,5);
    ctx.fillStyle='#3a7028'; ctx.fillRect(33,73,1,4); ctx.fillRect(37,70,1,5);
    ctx.fillStyle='#8898a0'; ctx.fillRect(35,76,3,2); ctx.fillRect(40,76,3,2); ctx.fillRect(44,76,3,2);
    ctx.fillStyle='#0a5888'; ctx.fillRect(25,79,5,3); ctx.fillRect(22,81,4,3);
    // yammoing: stacked crates, herb tufts, warm path stones
    ctx.fillStyle='#b08040'; ctx.fillRect(78,43,5,4); ctx.fillRect(80,41,4,3);
    ctx.fillStyle='#c89050'; ctx.fillRect(78,43,5,1); ctx.fillRect(80,41,4,1);
    ctx.fillStyle='#60a020'; ctx.fillRect(82,46,2,3); ctx.fillRect(85,45,2,4); ctx.fillRect(84,47,2,3);
    ctx.fillStyle='#aa9880'; ctx.fillRect(97,47,2,2); ctx.fillRect(101,47,2,2); ctx.fillRect(105,47,2,2);
    // sss: purple ground shadow, rocky ridge, accent grass
    ctx.fillStyle='rgba(40,10,70,0.42)'; ctx.beginPath(); ctx.ellipse(144,25,14,5,0,0,PI2); ctx.fill();
    ctx.fillStyle='#5a5a7a'; ctx.fillRect(130,22,5,3); ctx.fillRect(135,21,4,2); ctx.fillRect(153,22,5,3); ctx.fillRect(158,21,4,2);
    ctx.fillStyle='#3a1a5e'; ctx.fillRect(131,25,3,2); ctx.fillRect(154,25,3,2);
    ctx.fillStyle='#5a2080'; ctx.fillRect(136,24,2,2); ctx.fillRect(139,23,1,2); ctx.fillRect(150,24,2,2); ctx.fillRect(153,23,1,2);
    // deva: dark stone shadow, stone tiles, sharp grass
    ctx.fillStyle='rgba(20,30,40,0.52)'; ctx.beginPath(); ctx.ellipse(187,48,18,6,0,0,PI2); ctx.fill();
    ctx.fillStyle='#4a5060'; ctx.fillRect(172,44,3,2); ctx.fillRect(176,45,3,2); ctx.fillRect(200,44,3,2); ctx.fillRect(204,45,3,2);
    ctx.fillStyle='#1e2a18'; ctx.fillRect(173,47,2,2); ctx.fillRect(178,46,2,2); ctx.fillRect(201,47,2,2);
    // igottyou: dusty ground ring, campfire glow, worn path
    ctx.fillStyle='rgba(150,95,25,0.3)'; ctx.beginPath(); ctx.ellipse(158,89,20,6,0,0,PI2); ctx.fill();
    ctx.fillStyle='rgba(255,110,20,0.16)'; ctx.beginPath(); ctx.ellipse(168,86,9,4,0,0,PI2); ctx.fill();
    ctx.fillStyle='#7a6040'; ctx.fillRect(144,89,4,2); ctx.fillRect(148,88,3,2); ctx.fillRect(151,87,3,2);

    // Scaled landmarks (0.82× around each camp center)
    lm(67,107,()=>{
      ctx.fillStyle='#b05050'; ctx.fillRect(65,101,2,3);
      ctx.fillStyle='#c84878'; ctx.fillRect(61,103,12,2);
      ctx.fillStyle='#e06090'; ctx.fillRect(62,105,10,2);
      ctx.fillStyle='#f5e8c0'; ctx.fillRect(63,107,9,5);
      ctx.fillStyle='#a0602a'; ctx.fillRect(66,110,3,2);
      ctx.fillStyle='#88ccff'; ctx.fillRect(63,108,2,2); ctx.fillRect(69,108,2,2);
      ctx.fillStyle='#2ea030'; ctx.fillRect(56,107,4,4); ctx.fillRect(57,105,2,3);
      ctx.fillStyle='#c84878'; ctx.fillRect(58,107,1,1); ctx.fillRect(57,106,1,1);
      ctx.fillStyle='#2ea030'; ctx.fillRect(74,107,4,4); ctx.fillRect(75,105,2,3);
      ctx.fillStyle='#c84878'; ctx.fillRect(75,107,1,1); ctx.fillRect(76,106,1,1);
    });
    lm(47,71,()=>{
      ctx.fillStyle='#d04020';
      ctx.fillRect(40,66,16,2); ctx.fillRect(41,64,14,2);
      ctx.fillRect(40,68,2,8); ctx.fillRect(54,68,2,8);
      ctx.fillStyle='rgba(255,255,255,0.65)';
      ctx.fillRect(47,67,1,4); ctx.fillRect(49,68,1,3);
    });
    lm(96,40,()=>{
      ctx.fillStyle='#28b054'; ctx.fillRect(86,37,20,2);
      ctx.fillStyle='#1a8040';
      ctx.fillRect(87,35,2,2); ctx.fillRect(91,35,2,2); ctx.fillRect(95,35,2,2); ctx.fillRect(99,35,2,2); ctx.fillRect(103,35,2,2);
      ctx.fillStyle='#c8943c'; ctx.fillRect(87,39,18,3);
      ctx.fillStyle='#a07030'; ctx.fillRect(87,42,18,3);
      ctx.fillStyle='#784618'; ctx.fillRect(87,37,1,7); ctx.fillRect(104,37,1,7);
    });
    lm(144,17,()=>{
      ctx.fillStyle='#8898b4'; ctx.fillRect(140,15,9,10);
      ctx.fillStyle='#aabcd0'; ctx.fillRect(140,15,2,10);
      ctx.fillStyle='#8898b4'; ctx.fillRect(140,13,2,2); ctx.fillRect(144,13,2,2); ctx.fillRect(148,13,2,2);
      ctx.fillStyle='#c0d4e8'; ctx.fillRect(141,10,7,4); ctx.fillRect(142,9,5,1);
      ctx.fillStyle='#e8f4ff'; ctx.fillRect(143,10,3,2);
      ctx.fillStyle='#ffe080'; ctx.fillRect(141,18,2,2); ctx.fillRect(146,18,2,2);
      ctx.fillStyle='#2a1810'; ctx.fillRect(143,22,2,3);
    });
    lm(187,40,()=>{
      ctx.fillStyle='#5a7090'; ctx.fillRect(183,33,10,13);
      ctx.fillStyle='#4a6080'; ctx.fillRect(183,33,2,13);
      ctx.fillStyle='#5a7090'; ctx.fillRect(181,31,3,2); ctx.fillRect(186,31,3,2); ctx.fillRect(191,31,2,2);
      ctx.fillStyle='#ffe080'; ctx.fillRect(185,38,2,3); ctx.fillRect(189,38,2,3);
      ctx.fillStyle='#ff6020'; ctx.fillRect(185,37,2,1); ctx.fillRect(189,37,2,1);
      ctx.fillStyle='#2a1810'; ctx.fillRect(186,42,4,5);
    });
    lm(158,82,()=>{
      ctx.fillStyle='#8a6a40'; ctx.fillRect(154,76,6,12);
      ctx.fillStyle='#aa8a60'; ctx.fillRect(154,76,2,12); ctx.fillRect(152,74,10,3);
      ctx.fillStyle='rgba(255,240,100,0.4)'; ctx.fillRect(153,71,8,4);
      ctx.fillStyle='#ffe040'; ctx.fillRect(155,72,4,3);
      ctx.fillStyle='#7a5020'; ctx.fillRect(165,85,5,2);
      ctx.fillStyle='#c84000'; ctx.fillRect(166,83,3,2);
      ctx.fillStyle='#ffa820'; ctx.fillRect(167,82,1,2);
    });
  }, []);

  const nextGallerySlide = () => {
    if (isGalleryAnimating) return;
    setIsGalleryAnimating(true);
    setGalleryIndex(prev => (prev + 1) % galleryImages.length);
    setTimeout(() => setIsGalleryAnimating(false), 500);
  };
  const prevGallerySlide = () => {
    if (isGalleryAnimating) return;
    setIsGalleryAnimating(true);
    setGalleryIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
    setTimeout(() => setIsGalleryAnimating(false), 500);
  };
  const goToGallerySlide = (index) => {
    if (isGalleryAnimating) return;
    setIsGalleryAnimating(true);
    setGalleryIndex(index);
    setTimeout(() => setIsGalleryAnimating(false), 500);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const sections = [
    { label: 'Base', id: 'chapter-0' },
    { label: 'Apps', id: 'chapter-1' },
    { label: 'Lodge', id: 'chapter-2' },
    { label: 'Sounds', id: 'chapter-3' },
    { label: 'Join', id: 'chapter-4' },
    { label: 'Gallery', id: 'chapter-5' },
  ];

  const apps = [
    {
      id: 'breathe',
      name: 'BreatheMindful',
      tagline: 'Wellness companion',
      description: 'Guided breathing, walking tracking, Pomodoro focus sessions, sleep tracking, and customizable background sounds—all in one calm space.',
      gradient: 'from-sky-900 via-indigo-950 to-stone-950',
      iconBg: 'bg-sky-900/60 border-sky-700/40',
      icon: Wind,
      accentColor: 'text-sky-300',
      glow: '14, 165, 233',
      features: [
        { text: 'Guided Breathing Exercises', icon: Wind },
        { text: 'Walking & Step Tracking', icon: Footprints },
        { text: 'Pomodoro Focus Sessions', icon: Target },
        { text: 'Custom Background Sounds', icon: Volume2 },
      ],
      cta: { label: 'Try It Now', action: () => navigate('/breathe-with-me'), style: 'bg-sky-800 hover:bg-sky-700 border-sky-600/50' },
    },
    {
      id: 'yammoing',
      name: 'Yammoing',
      tagline: 'AI nutrition companion',
      description: 'Snap a photo to analyze food with AI, track calories, find diet-based restaurants, discover recipes from your fridge, and monitor air quality.',
      gradient: 'from-emerald-900 via-teal-950 to-stone-950',
      iconBg: 'bg-emerald-900/60 border-emerald-700/40',
      icon: ScanLine,
      accentColor: 'text-emerald-300',
      glow: '16, 185, 129',
      features: [
        { text: 'AI Photo Food Analysis', icon: Camera },
        { text: 'AI Calorie & Nutrition Tracking', icon: Calculator },
        { text: 'Personal AI Nutritionist', icon: Heart },
        { text: 'Diet-Based Restaurant Finder', icon: MapPin },
        { text: 'Fridge & Pantry Recipes', icon: UtensilsCrossed },
        { text: 'Smart Shopping Lists', icon: ShoppingCart },
      ],
      cta: { label: 'App Store', href: 'https://apps.apple.com/us/app/yammoing/id6757343455', style: 'bg-gradient-to-r from-amber-700 to-emerald-700 hover:from-amber-600 hover:to-emerald-600 border-emerald-600/30' },
      ctaSecondary: { label: 'Website', href: 'https://yammoing.com/' },
    },
    {
      id: 'sss',
      name: 'Secret Student Society',
      tagline: 'University community hub',
      description: 'Connect with verified students, review professors, find roommates, explore the marketplace, and navigate every corner of campus life.',
      gradient: 'from-violet-900 via-purple-950 to-stone-950',
      iconBg: 'bg-violet-900/60 border-violet-700/40',
      icon: GraduationCap,
      accentColor: 'text-violet-300',
      glow: '124, 58, 237',
      features: [
        { text: 'Course Reviews & Professor Ratings', icon: Star },
        { text: 'Student Marketplace', icon: ShoppingCart },
        { text: 'Community Feed & Social Posts', icon: Users },
        { text: 'Campus Events, Jobs & Groups', icon: MapPin },
      ],
      cta: { label: 'Visit Site', href: 'https://secret-student-society--secretstudentsociety-f6eab.us-central1.hosted.app/', style: 'bg-violet-800 hover:bg-violet-700 border-violet-600/50' },
    },
    {
      id: 'deva',
      name: 'Deva',
      tagline: 'Security-first IDE',
      description: 'Built on VS Code, Deva embeds real-time vulnerability scanning, AI-powered fixes, and a voice-enabled assistant directly into your editor.',
      gradient: 'from-zinc-800 via-slate-900 to-stone-950',
      iconBg: 'bg-zinc-800/60 border-zinc-600/40',
      icon: Shield,
      accentColor: 'text-zinc-300',
      glow: '113, 113, 122',
      features: [
        { text: 'Real-Time Vulnerability Scanner', icon: Zap },
        { text: 'AI-Powered Code Remediation', icon: Sparkles },
        { text: 'Dependency Graph & Analysis', icon: Layers },
        { text: 'Voice-Enabled Chat Assistant', icon: Volume2 },
      ],
      cta: { label: 'Visit devseccode.com', href: 'https://devseccode.com', style: 'bg-zinc-700 hover:bg-zinc-600 border-zinc-500/50' },
    },
    {
      id: 'igottyou',
      name: 'I Got You',
      tagline: 'Personal safety companion',
      description: 'Voice triggers, back taps, fake calls, stealth recording, and auto-alerts—quietly waiting in your pocket when you need them most.',
      gradient: 'from-rose-900 via-red-950 to-stone-950',
      iconBg: 'bg-rose-900/60 border-rose-700/40',
      icon: Mic,
      accentColor: 'text-rose-300',
      glow: '225, 29, 72',
      features: [
        { text: 'Voice-Triggered Emergency Alerts', icon: Mic },
        { text: 'Back Tap to Record or Call', icon: Shield },
        { text: 'Fake Call to Escape Situations', icon: Play },
        { text: 'Stealth Video Recording', icon: Camera },
      ],
      cta: { label: 'Learn More', action: () => navigate('/i-got-you'), style: 'bg-gradient-to-r from-rose-800 to-purple-900 hover:from-rose-700 hover:to-purple-800 border-rose-600/30' },
    },
    {
      id: 'lovocado',
      name: 'Lovocado',
      tagline: 'The couple app for connection',
      description: 'Share moments, plan dates, sync schedules, and grow together with shared goals, reminders, and a space that\'s just for the two of you.',
      gradient: 'from-pink-900 via-rose-950 to-stone-950',
      iconBg: 'bg-pink-900/60 border-pink-700/40',
      icon: Heart,
      accentColor: 'text-pink-300',
      glow: '236, 72, 153',
      features: [
        { text: 'Shared Calendar & Schedules', icon: Grid },
        { text: 'Date Ideas & Bucket List', icon: Heart },
        { text: 'Private Moments & Memories', icon: Camera },
        { text: 'Relationship Goals & Milestones', icon: Target },
      ],
      cta: { label: 'Try it now', action: () => navigate('/lovocado'), style: 'bg-gradient-to-r from-pink-700 to-rose-700 hover:from-pink-600 hover:to-rose-600 border-pink-500/30' },
    },
  ];

  // Trail map — centered, terrain-driven composition
  const mapNodes = {
    lovocado: { x: 28, y: 74 },  // meadow, bottom-left
    breathe:  { x: 20, y: 50 },  // forest lake
    yammoing: { x: 40, y: 30 },  // mountain pass
    sss:      { x: 60, y: 16 },  // summit peak
    deva:     { x: 78, y: 30 },  // fortress ridge
    igottyou: { x: 66, y: 58 },  // base camp
  };

  const handleMapNodeClick = (appId) => {
    if (hikerWalking) return;
    const destIdx = NODE_IDX[appId];
    if (destIdx === undefined) return;
    const fromIdx = hikerTrailIdxRef.current;
    if (fromIdx === destIdx) {
      // Already here — just open panel
      setMapSelectedApp(apps.find(a => a.id === appId) || null);
      return;
    }

    if (hikerAnimRef.current) cancelAnimationFrame(hikerAnimRef.current);
    const destApp = apps.find(a => a.id === appId) || null;
    setHikerWalking(true);
    setMapSelectedApp(null);
    setTravelingTo(destApp);
    frameCountRef.current = 0;

    const dir = destIdx > fromIdx ? 1 : -1;
    const steps = [];
    for (let i = fromIdx; i !== destIdx; i += dir) {
      steps.push({ segIdx: dir > 0 ? i : i - 1, reverse: dir < 0 });
    }

    // Draw full remaining path on the SVG overlay
    const updateTrailSVG = (si) => {
      if (!trailPathRef.current) return;
      if (si >= steps.length) { trailPathRef.current.setAttribute('d', ''); return; }
      const { segIdx: s0, reverse: r0 } = steps[si];
      const seg0 = TRAIL_SEGS[s0];
      let d = `M ${r0 ? seg0[6] : seg0[0]} ${r0 ? seg0[7] : seg0[1]}`;
      for (let ri = si; ri < steps.length; ri++) {
        const { segIdx: rsi, reverse: rrev } = steps[ri];
        const [sa,sb,sc,sd,se,sf,sg,sh] = TRAIL_SEGS[rsi];
        d += rrev ? ` C ${se} ${sf} ${sc} ${sd} ${sa} ${sb}`
                  : ` C ${sc} ${sd} ${se} ${sf} ${sg} ${sh}`;
      }
      trailPathRef.current.setAttribute('d', d);
    };

    let stepIdx = 0, t = 0;
    const SPEED = 0.018;   // cozy walking pace (~55 frames/seg ≈ 0.9s/seg)
    let lastStepIdx = -1;

    const animate = () => {
      if (stepIdx >= steps.length) {
        // ── Arrived ──
        const last = steps[steps.length - 1];
        const [ax,ay,,,,, dx,dy] = TRAIL_SEGS[last.segIdx];
        setHikerPos({ x: (last.reverse ? ax : dx) / 240 * 100, y: (last.reverse ? ay : dy) / 150 * 100 });
        hikerTrailIdxRef.current = destIdx;
        setHikerWalking(false);
        setTravelingTo(null);
        setMapSelectedApp(destApp);
        setVisitedCamps(prev => new Set(prev).add(appId));
        setArrivedCamp(appId);
        setTimeout(() => setArrivedCamp(null), 750);
        if (trailPathRef.current) trailPathRef.current.setAttribute('d', '');
        return;
      }

      const { segIdx, reverse } = steps[stepIdx];
      const [ax,ay,bx,by,cx,cy,dx,dy] = TRAIL_SEGS[segIdx];
      const et = reverse ? 1 - t : t;
      const [px, py] = bzP(et, ax,ay, bx,by, cx,cy, dx,dy);

      const m = 1 - et;
      const tx = 3*m*m*(bx-ax) + 6*m*et*(cx-bx) + 3*et*et*(dx-cx);
      const facing = (reverse ? tx > 0 : tx < 0) ? -1 : 1;
      const xp = px / 240 * 100, yp = py / 150 * 100;
      const yBob = Math.sin(t * Math.PI * 10) * 1.2;

      if (hikerDivRef.current) {
        hikerDivRef.current.style.left = `${xp}%`;
        hikerDivRef.current.style.top = `${yp}%`;
        hikerDivRef.current.style.transform = `translate(-50%, calc(-100% + ${yBob}px)) scaleX(${facing})`;
        if (Math.abs(tx) > 0.1) setHikerFacing(facing);
      }

      // Update SVG trail on segment change
      if (stepIdx !== lastStepIdx) {
        lastStepIdx = stepIdx;
        updateTrailSVG(stepIdx);
      }

      // Emit dust puff every 6 frames
      frameCountRef.current++;
      if (frameCountRef.current % 6 === 0 && dustContainerRef.current) {
        const dust = document.createElement('div');
        dust.style.cssText = `position:absolute;left:${xp}%;top:calc(${yp}% + 1px);width:5px;height:3px;border-radius:50%;background:rgba(155,115,50,0.52);transform:translate(-50%,0);animation:dustFade 0.52s ease-out forwards;pointer-events:none;z-index:22;`;
        dustContainerRef.current.appendChild(dust);
        setTimeout(() => { if (dust.parentNode) dust.remove(); }, 560);
      }

      t += SPEED;
      if (t >= 1) { t = 0; stepIdx++; }
      hikerAnimRef.current = requestAnimationFrame(animate);
    };

    updateTrailSVG(0);
    hikerAnimRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="bg-stone-950 text-white overflow-x-hidden">

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-stone-900 z-50">
        <div
          className="h-full bg-stone-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Nav — Menu Toggle (hidden during game map to avoid competing with HUD) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`fixed top-5 right-5 z-50 bg-stone-900/90 backdrop-blur-sm p-3 rounded-full border border-stone-800 hover:border-stone-600 transition-all ${mapVisible ? 'hidden' : ''}`}
        aria-label="Menu"
      >
        {menuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
      </button>

      {/* Brand mark — hidden when game map HUD is visible (duplicate label) */}
      <div className={`fixed top-5 left-5 z-50 items-center gap-2 pointer-events-none ${mapVisible ? 'hidden' : 'flex'}`}>
        <Mountain className="w-5 h-5 text-stone-400" />
        <span className="text-xs tracking-widest uppercase text-stone-500 font-medium">Summit Wanderlust</span>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="fixed top-16 right-5 z-40 bg-stone-900/98 backdrop-blur-xl rounded-2xl p-5 border border-stone-800 shadow-2xl min-w-[200px]">
          <nav className="space-y-1">
            {[
              { label: 'Basecamp', id: 'chapter-0' },
              { label: 'Our Apps', id: 'chapter-1' },
              { label: 'The Lodge', id: 'chapter-2' },
              { label: 'Soundscapes', id: 'chapter-3' },
              { label: 'Join Us', id: 'chapter-4' },
              { label: 'Gallery', id: 'chapter-5' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left px-3 py-2 text-stone-300 hover:text-white hover:bg-stone-800/70 rounded-lg transition-all text-sm"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Side Section Dots — hidden when game map HUD is visible */}
      <div className={`fixed left-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-3 ${mapVisible ? 'hidden' : 'hidden lg:flex'}`}>
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(s.id)}
            className="group flex items-center gap-2"
            title={s.label}
          >
            <div className={`rounded-full transition-all duration-300 ${
              activeSection === i ? 'w-6 h-2 bg-stone-300' : 'w-2 h-2 bg-stone-700 group-hover:bg-stone-500'
            }`} />
            <span className={`text-xs transition-all duration-200 ${
              activeSection === i ? 'text-stone-400 opacity-100' : 'opacity-0 group-hover:opacity-100 text-stone-500'
            }`}>{s.label}</span>
          </button>
        ))}
      </div>

      {/* ───── HERO ───── */}
      <section id="chapter-0" className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Video background */}
        <video
          autoPlay loop muted playsInline preload="metadata"
          poster="/01.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        >
          <source src="/01.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950/80 via-stone-900/70 to-stone-950/80" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(#d6d3d1 1px, transparent 1px), linear-gradient(90deg, #d6d3d1 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Animated floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-[520px] h-[520px] bg-stone-800/25 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-stone-700/15 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute top-1/2 right-1/3 w-56 h-56 bg-stone-600/10 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '3s' }} />
        {/* Mountain silhouette — grounded at bottom of hero */}
        <Mountain className="absolute opacity-[0.03] text-stone-300 pointer-events-none"
          style={{ width: 700, height: 700, bottom: -320, left: '50%', transform: 'translateX(-50%)' }} />

        <div className="relative z-10 text-center px-6 w-full max-w-4xl">
          <Mountain className="w-10 h-10 text-stone-400 mx-auto mb-6" />

          <p className="word-reveal text-xs tracking-[0.4em] uppercase text-stone-400 mb-5 font-medium" style={{ animationDelay: '0.05s' }}>
            Summit Wanderlust
          </p>

          <h1
            className="text-6xl md:text-8xl font-bold mb-6 leading-none tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="word-reveal text-white block" style={{ animationDelay: '0.2s' }}>Building</span>
            <span
              className="word-reveal block bg-gradient-to-r from-stone-300 via-white to-stone-300 bg-clip-text text-transparent"
              style={{ animationDelay: '0.38s' }}
            >
              tools &amp; spaces
            </span>
            <span className="word-reveal block text-stone-300 text-4xl md:text-5xl font-light" style={{ animationDelay: '0.56s' }}>
              for mindful adventurers
            </span>
          </h1>

          <p className="word-reveal text-lg text-stone-300 mb-12 max-w-xl mx-auto leading-relaxed" style={{ animationDelay: '0.72s' }}>
            Apps, retreats, and soundscapes designed for those who move with intention.
          </p>

          <div className="word-reveal" style={{ animationDelay: '0.88s' }}>
            <button
              onClick={() => scrollToSection('chapter-1')}
              className="inline-flex items-center gap-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 hover:border-stone-500 text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105"
            >
              Explore Our Work
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ───── APPS TRAIL MAP ───── */}
      <section id="chapter-1" ref={mapSectionRef} className="relative">
        <div
          id="apps-title"
          ref={el => observerRefs.current[0] = el}
          className="relative w-full overflow-hidden"
          style={{ height: '100vh', minHeight: 620, background: '#264814' }}
        >
          {/* Canvas terrain */}
          <canvas ref={mapCanvasRef} width={240} height={150}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Active trail segment SVG overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 240 150" preserveAspectRatio="none"
            style={{ zIndex: 12 }}>
            <defs>
              <filter id="trailGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.2" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <path ref={trailPathRef} d="" fill="none"
              stroke="rgba(255,220,60,0.55)" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"
              filter="url(#trailGlow)"
            />
          </svg>

          {/* Dust particle container */}
          <div ref={dustContainerRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 22 }} />

          {/* Edge vignette */}
          <div className="absolute inset-0 pointer-events-none z-10"
            style={{ background: 'radial-gradient(ellipse at 50% 36%, transparent 30%, rgba(0,0,0,0.44) 100%)' }}
          />

          {/* ── TOP HUD BAR ── */}
          <div className="absolute top-0 left-0 right-0 z-30 flex items-center"
            style={{ height:52, background:'rgba(2,2,2,0.90)', borderBottom:'1px solid rgba(255,220,60,0.12)', backdropFilter:'blur(4px)', padding:'0 18px', gap:12 }}>
            {/* Left: world title */}
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontFamily:'monospace', fontSize:'8px', fontWeight:'bold', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,230,100,0.6)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>Summit Wanderlust</p>
            </div>
            {/* Center: chapter */}
            <div style={{ textAlign:'center', flexShrink:0 }}>
              <p style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(255,255,255,0.28)', marginBottom:1 }}>Chapter II</p>
              <p style={{ fontFamily:'monospace', fontSize:'11px', fontWeight:'bold', letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,244,190,0.82)', whiteSpace:'nowrap' }}>Digital Compass</p>
            </div>
            {/* Right: utility buttons */}
            <div style={{ flex:1, display:'flex', justifyContent:'flex-end', alignItems:'center', gap:8 }}>
              <button onClick={() => setShowQuestLog(s => !s)}
                style={{ fontFamily:'monospace', fontSize:'8px', fontWeight:'bold', letterSpacing:'0.14em', textTransform:'uppercase', color: showQuestLog ? '#000' : 'rgba(255,230,100,0.82)', background: showQuestLog ? 'rgba(255,220,60,0.95)' : 'rgba(255,255,255,0.05)', border:`1px solid ${showQuestLog ? 'rgba(255,220,60,1)' : 'rgba(255,220,60,0.28)'}`, padding:'5px 12px', cursor:'pointer', transition:'all 0.15s', whiteSpace:'nowrap' }}>
                {showQuestLog ? '✕ Close' : '≡ Quest Log'}
              </button>
            </div>
          </div>

          {/* ── Quest Log panel ── */}
          {showQuestLog && (
            <div className="absolute right-0 z-25 overflow-y-auto"
              style={{
                top: 52, width: 230, height: 'calc(100% - 52px)',
                background: 'rgba(4,3,1,0.96)',
                borderLeft: '2px solid rgba(255,220,60,0.3)',
                boxShadow: '-8px 0 32px rgba(0,0,0,0.7)',
                animation: 'slideInRight 0.2s cubic-bezier(0.2,0,0.2,1) both',
              }}>
              {/* Header */}
              <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ fontFamily:'monospace', fontSize:'7px', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(255,220,60,0.55)', marginBottom:4 }}>Chapter II</p>
                <p style={{ fontFamily:'monospace', fontSize:'13px', fontWeight:'bold', letterSpacing:'0.06em', textTransform:'uppercase', color:'#fff' }}>Quest Log</p>
                <p style={{ fontFamily:'monospace', fontSize:'8px', color:'rgba(255,255,255,0.3)', marginTop:3 }}>{visitedCamps.size}/6 camps discovered</p>
              </div>

              {/* Progress bar */}
              <div style={{ margin:'0 16px', height:3, background:'rgba(255,255,255,0.08)', borderRadius:2 }}>
                <div style={{ height:'100%', width:`${(visitedCamps.size/6)*100}%`, background:'rgba(255,220,60,0.7)', borderRadius:2, transition:'width 0.4s' }}/>
              </div>

              {/* App entries */}
              <div style={{ padding: '8px 0 80px' }}>
                {apps.map((app, i) => {
                  const isVisited = visitedCamps.has(app.id);
                  const isSelected = mapSelectedApp?.id === app.id;
                  const I = app.icon;
                  return (
                    <button key={app.id}
                      onClick={() => { handleMapNodeClick(app.id); setShowQuestLog(false); }}
                      className="w-full flex items-start gap-3 text-left"
                      style={{
                        padding: '11px 16px',
                        background: isSelected ? `rgba(${app.glow},0.14)` : 'transparent',
                        borderLeft: `3px solid ${isSelected ? `rgb(${app.glow})` : isVisited ? `rgba(${app.glow},0.4)` : 'rgba(255,255,255,0.06)'}`,
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        cursor: 'pointer',
                        transition: 'background 0.12s',
                      }}
                    >
                      {/* Status circle */}
                      <div style={{
                        width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                        background: isVisited ? `rgba(${app.glow},0.9)` : 'rgba(255,255,255,0.06)',
                        border: `1.5px solid ${isVisited ? `rgb(${app.glow})` : 'rgba(255,255,255,0.18)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: isVisited ? `0 0 6px rgba(${app.glow},0.5)` : 'none',
                      }}>
                        {isVisited
                          ? <span style={{ fontSize:'8px', color:'#000', fontWeight:'bold', lineHeight:1 }}>✓</span>
                          : <span style={{ fontSize:'8px', color:'rgba(255,255,255,0.3)', lineHeight:1 }}>{i+1}</span>
                        }
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <I style={{ width:10, height:10, color:`rgba(${app.glow},${isVisited?'0.9':'0.45'})`, flexShrink:0 }}/>
                          <p style={{ fontFamily:'monospace', fontSize:'9px', fontWeight:'bold', letterSpacing:'0.08em', textTransform:'uppercase', color: isVisited ? '#fff' : 'rgba(255,255,255,0.45)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{app.name}</p>
                        </div>
                        <p style={{ fontFamily:'monospace', fontSize:'8px', color:`rgba(${app.glow},${isVisited?'0.7':'0.3'})`, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{app.tagline}</p>
                        {!isVisited && (
                          <p style={{ fontFamily:'monospace', fontSize:'7px', color:'rgba(255,255,255,0.2)', marginTop:2, letterSpacing:'0.05em' }}>[ undiscovered ]</p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Compass (bottom-right, above HUD) ── */}
          <div className="absolute z-20 pointer-events-none" style={{ bottom:58, right:18, opacity:0.45 }}>
            <svg width="36" height="36" viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.7"/>
              <line x1="26" y1="6" x2="26" y2="46" stroke="rgba(255,255,255,0.38)" strokeWidth="0.8"/>
              <line x1="6" y1="26" x2="46" y2="26" stroke="rgba(255,255,255,0.38)" strokeWidth="0.8"/>
              <polygon points="26,6 23,17 29,17" fill="rgba(255,228,80,0.92)"/>
              <polygon points="26,46 23,35 29,35" fill="rgba(255,255,255,0.2)"/>
              <circle cx="26" cy="26" r="2" fill="rgba(255,255,255,0.65)"/>
              <text x="26" y="4" textAnchor="middle" fill="rgba(255,228,80,1)" fontSize="5" fontFamily="monospace">N</text>
            </svg>
          </div>

          {/* ── Trailhead ── */}
          <div className="absolute flex flex-col items-center pointer-events-none z-20"
            style={{ left:'48%', top:'84%', transform:'translate(-50%,-50%)' }}>
            <div style={{ width:8,height:8,borderRadius:'50%',border:'1.5px solid rgba(200,140,36,0.85)',background:'rgba(20,12,2,0.88)',boxShadow:'0 0 6px rgba(170,110,16,0.5)' }}/>
            <span style={{ fontFamily:'monospace',fontSize:'5px',color:'rgba(200,145,36,0.55)',marginTop:2,letterSpacing:'0.22em',textTransform:'uppercase',textShadow:'1px 1px 0 rgba(0,0,0,0.9)' }}>START</span>
          </div>

          {/* ── Hiker ── */}
          <div ref={hikerDivRef} className="absolute z-30 pointer-events-none" style={{
            left:`${hikerPos.x}%`, top:`${hikerPos.y}%`,
            transform:'translate(-50%, -100%)',
            filter:'drop-shadow(0 3px 8px rgba(0,0,0,0.95))',
          }}>
            <PixelChar frame={walkFrame} />
            {/* Ground shadow */}
            <div style={{
              position:'absolute', bottom:-3, left:'50%',
              transform:'translateX(-50%)',
              width:22, height:5, borderRadius:'50%',
              background:'rgba(0,0,0,0.38)', filter:'blur(2px)',
            }}/>
          </div>

          {/* ── Camp markers ── */}
          {apps.map((app) => {
            const node = mapNodes[app.id];
            if (!node) return null;
            const isSelected = mapSelectedApp?.id === app.id;
            const isVisited = visitedCamps.has(app.id);
            const isHovered = hoveredNode === app.id;
            const Icon = app.icon;
            return (
              <button key={app.id} onClick={() => handleMapNodeClick(app.id)}
                onMouseEnter={() => setHoveredNode(app.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="absolute z-20 flex flex-col items-center"
                style={{ left:`${node.x}%`, top:`${node.y}%`, transform:'translate(-50%,-100%)', background:'none', border:'none', cursor: hikerWalking ? 'not-allowed' : 'pointer', padding:0, gap:0 }}
              >
                {/* Landmark icon */}
                <div style={{
                  width:22, height:22,
                  background: isSelected ? `rgba(${app.glow},0.22)` : isVisited ? `rgba(${app.glow},0.12)` : 'rgba(8,6,2,0.75)',
                  border: `1.5px solid ${isSelected ? `rgb(${app.glow})` : `rgba(${app.glow},${isVisited ? '0.7' : '0.4'})`}`,
                  borderRadius: 3,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  boxShadow: isSelected ? `0 0 14px rgba(${app.glow},0.8), 0 0 4px rgba(${app.glow},0.4)` : isHovered ? `0 0 8px rgba(${app.glow},0.5)` : 'none',
                  transition: arrivedCamp === app.id ? 'none' : 'all 0.15s',
                  transform: isSelected && arrivedCamp !== app.id ? 'scale(1.15)' : isHovered && arrivedCamp !== app.id ? 'scale(1.08)' : 'scale(1)',
                  animation: arrivedCamp === app.id ? 'arrivalBounce 0.75s cubic-bezier(0.36,0.07,0.19,0.97) both' : 'none',
                }}>
                  <Icon style={{ width:11, height:11, color: isSelected ? `rgb(${app.glow})` : `rgba(${app.glow},${isVisited ? '0.9' : '0.55'})` }}/>
                </div>

                {/* Post */}
                <div style={{
                  width:1.5,
                  height: isSelected ? 10 : 7,
                  background: isSelected ? `rgb(${app.glow})` : `rgba(${app.glow},${isVisited ? '0.6' : '0.35'})`,
                  transition:'all 0.15s',
                }}/>

                {/* Ground dot + selected pulse ring */}
                <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center', marginTop:2 }}>
                  {isSelected && (
                    <div style={{
                      position:'absolute', width:16, height:16, borderRadius:'50%',
                      border:`1px solid rgba(${app.glow},0.55)`,
                      animation:'ringPulse 1.5s ease-out infinite',
                    }}/>
                  )}
                  <div style={{
                    width: isSelected ? 6 : 4,
                    height: isSelected ? 6 : 4,
                    borderRadius:'50%',
                    background: isSelected ? `rgb(${app.glow})` : `rgba(${app.glow},${isVisited ? '0.5' : '0.28'})`,
                    border:'1px solid rgba(0,0,0,0.5)',
                    boxShadow: isSelected ? `0 0 8px rgba(${app.glow},0.7)` : 'none',
                    transition:'all 0.15s',
                  }}/>
                </div>
              </button>
            );
          })}

          {/* ── Camp labels — marker layer above hiker (z=38) ── */}
          {apps.map((app) => {
            const node = mapNodes[app.id];
            if (!node) return null;
            const isSelected = mapSelectedApp?.id === app.id;
            const isVisited = visitedCamps.has(app.id);
            const isHovered = hoveredNode === app.id;
            return (
              <div key={`label-${app.id}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${node.x}%`,
                  top: `max(58px, calc(${node.y}% - 92px))`,
                  transform: 'translateX(-50%)',
                  zIndex: 38,
                  fontFamily: 'monospace',
                  fontSize: isSelected ? '9px' : '6px',
                  fontWeight: isSelected ? 'bold' : 'normal',
                  color: isSelected ? '#fff' : isHovered ? `rgba(${app.glow},0.9)` : `rgba(${app.glow},${isVisited ? '0.45' : '0.28'})`,
                  textTransform: 'uppercase',
                  letterSpacing: isSelected ? '0.1em' : '0.06em',
                  whiteSpace: 'nowrap',
                  padding: isSelected ? '2px 7px 3px' : '1px 4px 1px',
                  background: isSelected ? 'rgba(2,2,2,0.96)' : isHovered ? 'rgba(2,2,2,0.82)' : 'rgba(2,2,2,0.5)',
                  border: `1px solid ${isSelected ? `rgba(${app.glow},0.65)` : `rgba(${app.glow},0.15)`}`,
                  textShadow: isSelected ? `0 0 8px rgba(${app.glow},0.5)` : 'none',
                  transition: 'all 0.12s',
                }}>
                {isVisited && !isSelected && <span style={{ marginRight:2, opacity:0.6 }}>✓ </span>}
                {app.name}
              </div>
            );
          })}

          {/* ── Location panel — game HUD style ── */}
          {mapSelectedApp && !hikerWalking && (() => {
            const app = mapSelectedApp;
            const I = app.icon;
            const doEnter = () => {
              if (app.cta.href) window.open(app.cta.href, '_blank', 'noopener noreferrer');
              else if (app.cta.action) app.cta.action();
            };
            return (
              <div className="absolute bottom-0 left-0 right-0 z-40"
                style={{
                  background: 'rgba(4,3,2,0.97)',
                  borderTop: `1px solid rgba(${app.glow},0.5)`,
                  animation: 'slideUpHUD 0.18s cubic-bezier(0.2,0,0.2,1) both',
                }}>
                <div style={{ height:1, background:`linear-gradient(90deg, transparent, rgba(${app.glow},0.4) 30%, rgba(${app.glow},0.4) 70%, transparent)` }}/>
                <div className="flex items-center gap-4" style={{ padding:'10px 18px 12px' }}>
                  {/* Camp icon */}
                  <div style={{ background:`rgba(${app.glow},0.08)`, border:`1px solid rgba(${app.glow},0.3)`, borderRadius:3, padding:'6px', flexShrink:0 }}>
                    <I style={{ width:16, height:16, color:`rgb(${app.glow})` }}/>
                  </div>
                  {/* Name + one-liner */}
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily:'monospace', fontSize:'11px', fontWeight:'bold', letterSpacing:'0.1em', textTransform:'uppercase', color:'#fff', lineHeight:1.2 }}>{app.name}</p>
                    <p style={{ fontFamily:'monospace', fontSize:'8px', color:`rgba(${app.glow},0.65)`, marginTop:3, letterSpacing:'0.03em' }}>{app.tagline}</p>
                  </div>
                  {/* Single action */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex flex-col items-end gap-1">
                      <button onClick={doEnter}
                        style={{ fontFamily:'monospace', fontSize:'9px', fontWeight:'bold', textTransform:'uppercase', letterSpacing:'0.14em', color:'#000', background:`rgb(${app.glow})`, padding:'8px 20px', border:'none', cursor:'pointer', whiteSpace:'nowrap', boxShadow:`0 0 12px rgba(${app.glow},0.45)` }}>
                        Enter Camp →
                      </button>
                      <p style={{ fontFamily:'monospace', fontSize:'7px', color:'rgba(255,255,255,0.2)', letterSpacing:'0.12em', textAlign:'right' }}>{visitedCamps.size}/6 visited</p>
                    </div>
                    <button onClick={() => setMapSelectedApp(null)}
                      style={{ color:'rgba(255,255,255,0.22)', background:'none', border:'1px solid rgba(255,255,255,0.08)', padding:'5px 8px', cursor:'pointer', fontFamily:'monospace', fontSize:'10px', lineHeight:1, flexShrink:0 }}>
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── Status bar (always visible, slim) ── */}
          {(!mapSelectedApp || hikerWalking) && (
            <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center px-5"
              style={{ height:44, background:'rgba(0,0,0,0.82)', borderTop: hikerWalking && travelingTo ? `1px solid rgba(${travelingTo.glow},0.35)` : '1px solid rgba(255,255,255,0.12)' }}>
              {hikerWalking && travelingTo ? (<>
                <div style={{ width:7, height:7, borderRadius:'50%', background:`rgb(${travelingTo.glow})`, animation:'beaconPulse 0.9s ease-in-out infinite', marginRight:10, flexShrink:0 }}/>
                <span style={{ fontFamily:'monospace', fontSize:'8px', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginRight:6 }}>Traveling to</span>
                <span style={{ fontFamily:'monospace', fontSize:'10px', fontWeight:'bold', letterSpacing:'0.1em', textTransform:'uppercase', color:`rgba(${travelingTo.glow},0.9)` }}>{travelingTo.name}</span>
                <span style={{ fontFamily:'monospace', fontSize:'8px', color:'rgba(255,255,255,0.18)', marginLeft:'auto', letterSpacing:'0.12em' }}>{visitedCamps.size}/6 visited</span>
              </>) : (<>
                <span style={{ fontFamily:'monospace', fontSize:'10px', color:'rgba(255,255,255,0.45)', letterSpacing:'0.07em' }}>
                  ▲  Click a camp to explore
                </span>
                {visitedCamps.size > 0 && (
                  <span style={{ marginLeft:'auto', fontFamily:'monospace', fontSize:'9px', color:'rgba(255,255,255,0.3)', letterSpacing:'0.14em' }}>{visitedCamps.size}/6 camps visited</span>
                )}
              </>)}
            </div>
          )}
        </div>

        {/* ── Apps Coverflow ── */}
        <div className="bg-stone-950 py-12 border-t border-stone-900/60 overflow-hidden">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-600 mb-10 text-center font-medium">Full roster</p>

          {/* 3D stage */}
          <div
            className="relative flex items-center justify-center"
            style={{ height: 420, perspective: '1100px', perspectiveOrigin: '50% 50%' }}
          >
            {apps.map((app, i) => {
              const Icon = app.icon;
              const offset = i - rosterIdx;
              const abs = Math.abs(offset);
              if (abs > 2) return null;

              const cfgs = [
                { scale: 1,    ry: 0,                       tx: 0,           opacity: 1,    z: 30 },
                { scale: 0.82, ry: offset < 0 ? 38 : -38,  tx: offset * 195, opacity: 0.85, z: 20 },
                { scale: 0.64, ry: offset < 0 ? 52 : -52,  tx: offset * 178, opacity: 0.5,  z: 10 },
              ];
              const { scale, ry, tx, opacity, z } = cfgs[abs];

              return (
                <div
                  key={app.id}
                  onClick={() => abs !== 0 && setRosterIdx(i)}
                  style={{
                    position: 'absolute',
                    width: 230,
                    transform: `translateX(${tx}px) rotateY(${ry}deg) scale(${scale})`,
                    zIndex: z,
                    opacity,
                    transition: 'all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: abs !== 0 ? 'pointer' : 'default',
                    transformOrigin: 'center center',
                  }}
                >
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      border: abs === 0 ? `1px solid rgba(${app.glow},0.5)` : '1px solid rgba(255,255,255,0.08)',
                      boxShadow: abs === 0
                        ? `0 12px 50px rgba(${app.glow},0.3), 0 2px 8px rgba(0,0,0,0.6)`
                        : '0 4px 24px rgba(0,0,0,0.6)',
                    }}
                  >
                    {/* Gradient photo area */}
                    <div className={`bg-gradient-to-br ${app.gradient} relative overflow-hidden flex items-end p-4`} style={{ height: 260 }}>
                      <Icon className="absolute -right-4 -top-4 w-48 h-48 text-white/[0.06] rotate-12 pointer-events-none" />
                      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
                      {/* App icon top-right */}
                      <div className={`absolute top-4 right-4 p-2.5 rounded-xl border ${app.iconBg} backdrop-blur-sm`}>
                        <Icon className={`w-5 h-5 ${app.accentColor}`} />
                      </div>
                      {/* Tagline overlay at bottom */}
                      <div className="relative z-10">
                        <p className={`text-xs uppercase tracking-wider ${app.accentColor} opacity-80 mb-1`}>{app.tagline}</p>
                      </div>
                    </div>

                    {/* Bottom strip */}
                    <div className="bg-stone-950 px-4 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-bold text-white">{app.name}</h3>
                        {app.cta.href ? (
                          <a
                            href={app.cta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className={`w-7 h-7 rounded-full flex items-center justify-center border text-xs transition-all duration-300 ${app.cta.style}`}
                            title={app.cta.label}
                          >
                            <ArrowDown className="w-3 h-3 text-white" />
                          </a>
                        ) : (
                          <button
                            onClick={e => { e.stopPropagation(); app.cta.action(); }}
                            className={`w-7 h-7 rounded-full flex items-center justify-center border text-xs transition-all duration-300 ${app.cta.style}`}
                            title={app.cta.label}
                          >
                            <ArrowDown className="w-3 h-3 text-white" />
                          </button>
                        )}
                      </div>
                      {abs === 0 && (
                        <p className="text-stone-500 text-xs leading-relaxed line-clamp-2">{app.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nav row */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setRosterIdx(n => (n - 1 + apps.length) % apps.length)}
              className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center hover:bg-stone-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-stone-300" />
            </button>
            {apps.map((app, i) => (
              <button
                key={app.id}
                onClick={() => setRosterIdx(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === rosterIdx ? 20 : 6,
                  height: 6,
                  background: i === rosterIdx ? '#a8a29e' : '#44403c',
                }}
              />
            ))}
            <button
              onClick={() => setRosterIdx(n => (n + 1) % apps.length)}
              className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center hover:bg-stone-700 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-stone-300" />
            </button>
          </div>
        </div>
      </section>

      {/* ───── MOUNTAIN SANCTUARY ───── */}
      <section id="chapter-2" className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/60 to-stone-950 -z-10" />
        {/* Decorative element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-900/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-4">Chapter Three</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Mountain Hideaway
            </h2>
            <p className="text-stone-400 text-lg">Your basecamp in the High Sierras</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            {/* Amenity icons instead of heavy images */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Mountain, label: 'Summit Views', sub: '6,225 ft elevation' },
                { icon: TreePine, label: 'Private Forest', sub: 'Old-growth pine' },
                { icon: Tent, label: 'Fire Pit', sub: 'Cedar-wood nights' },
                { icon: Star, label: 'Stargazing Deck', sub: 'Dark sky certified' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5 flex flex-col gap-3 hover:border-stone-600 transition-colors">
                  <Icon className="w-7 h-7 text-amber-500/70" />
                  <div>
                    <p className="text-white text-sm font-semibold">{label}</p>
                    <p className="text-stone-500 text-xs mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-5">
                <Home className="w-6 h-6 text-amber-500/70" />
                <div>
                  <h3 className="text-2xl font-bold text-white">Summit View Lodge</h3>
                  <p className="text-stone-400 text-sm">Sierra Nevada Mountains, California</p>
                </div>
              </div>

              <p className="text-stone-400 leading-relaxed mb-8">
                Wake to misty mountain mornings. Find solitude by the fireplace.
                Reconnect with nature from your private hot tub under star-filled skies.
                This is more than a stay—it&apos;s your wilderness retreat.
              </p>

              <div className="flex items-center gap-3 text-stone-500 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span className="font-mono">39.0968° N, 120.0324° W</span>
              </div>

              <p className="text-stone-500 text-sm leading-relaxed mb-6">
                We&apos;re building this retreat right now. Every detail crafted for the mindful adventurer — opening our doors in Spring 2027.
              </p>

              <div className="w-full py-3 rounded-xl text-sm font-medium text-amber-300/80 bg-amber-950/40 border border-amber-800/30 text-center tracking-wide">
                Opening Spring 2027
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── NATURE'S ORCHESTRA ───── */}
      <section id="chapter-3" className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/50 to-stone-950 -z-10" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-4">Chapter Four</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Nature&apos;s Orchestra
            </h2>
            <p className="text-stone-400 text-lg">Immersive soundscapes from the wild</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Easy Listening',
                location: 'Susie Lake, CA',
                duration: '2:21:01',
                thumbnail: 'https://img.youtube.com/vi/8bLDawl_ryg/mqdefault.jpg',
                url: 'https://youtu.be/8bLDawl_ryg?si=vfS77Wui0O2Ngkbq',
              },
              {
                title: 'Bossa Nova',
                location: 'Santa Catalina Island, CA',
                duration: '2:35:16',
                thumbnail: 'https://img.youtube.com/vi/pVsMWFrhnTE/mqdefault.jpg',
                url: 'https://youtu.be/pVsMWFrhnTE?si=DprVcul1kPo8rcxA',
              },
              {
                title: 'Study Lofi',
                location: 'Snowy Mountains',
                duration: '2:03:35',
                thumbnail: 'https://img.youtube.com/vi/32QuotAMzfE/mqdefault.jpg',
                url: 'https://youtu.be/32QuotAMzfE?si=bIShe7VkPgaG0GWf',
              },
            ].map((video, i) => (
              <a
                key={i}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-stone-900/60 border border-stone-800 hover:border-stone-600 rounded-2xl overflow-hidden transition-all duration-500 block"
              >
                <div className="relative h-44 overflow-hidden bg-stone-800">
                  {/* mqdefault = 320×180, tiny file size from YouTube CDN */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center group-hover:bg-stone-900/20 transition-all">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur-sm text-xs text-stone-300 px-2.5 py-1 rounded-lg">
                    {video.duration}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold mb-1 group-hover:text-stone-200 transition-colors">{video.title}</h3>
                  <p className="text-stone-500 text-sm flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    {video.location}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CALL TO ADVENTURE ───── */}
      <section id="chapter-4" className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/60 to-stone-950 -z-10" />
        <div className="absolute inset-0 opacity-[0.02] -z-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #d6d3d1 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-4">Chapter Five</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Adventure Awaits
          </h2>
          <p className="text-stone-400 text-lg leading-relaxed mb-16">
            Join thousands of wanderers who&apos;ve discovered that the summit isn&apos;t a destination—it&apos;s a way of being.
            Where will your path lead today?
          </p>

          <div className="grid grid-cols-3 gap-4 mb-16">
            {[
              { n: '6+', label: 'Apps Built' },
              { n: '10K+', label: 'Users' },
              { n: '∞', label: 'Adventures' },
            ].map(({ n, label }) => (
              <div key={label} className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6">
                <p className="text-3xl font-bold text-white mb-1">{n}</p>
                <p className="text-stone-500 text-sm">{label}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollToSection('chapter-0')}
            className="inline-flex items-center gap-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 hover:border-stone-500 text-white px-10 py-4 rounded-full font-medium tracking-wide transition-all duration-300"
          >
            <Compass className="w-5 h-5" />
            Start Your Journey
          </button>
        </div>
      </section>

      {/* ───── GALLERY ───── */}
      <section id="chapter-5" className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/50 to-stone-950 -z-10" />

        <div className="max-w-6xl mx-auto">
          <div
            id="gallery-title"
            ref={el => observerRefs.current[10] = el}
            className={`text-center mb-16 reveal-fade ${revealedElements.has('gallery-title') ? 'revealed' : ''}`}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-4">Chapter Six</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Adventure Gallery
            </h2>
            <p className="text-stone-400">Explore the journey through images</p>
          </div>

          {/* Carousel — only renders current slide to avoid loading all images at once */}
          <div
            id="gallery-carousel"
            ref={el => observerRefs.current[11] = el}
            className={`reveal-scale ${revealedElements.has('gallery-carousel') ? 'revealed' : ''}`}
          >
            <div className="relative bg-stone-900/60 border border-stone-800 rounded-2xl overflow-hidden">
              <div className="relative h-[500px] bg-stone-900">
                {/* Only render current image */}
                <img
                  src={galleryImages[galleryIndex].url}
                  alt={`Photo ${galleryIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  style={{ opacity: isGalleryAnimating ? 0.5 : 1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent" />

                <div className="absolute top-4 right-4 bg-stone-900/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-stone-700/50">
                  <span className="text-xs text-stone-300">{galleryIndex + 1} / {galleryImages.length}</span>
                </div>

                <button
                  onClick={prevGallerySlide}
                  disabled={galleryIndex === 0}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-stone-900/70 backdrop-blur-sm hover:bg-stone-800/90 p-3 rounded-full border border-stone-700/50 transition-all disabled:opacity-30"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={nextGallerySlide}
                  disabled={galleryIndex === galleryImages.length - 1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-stone-900/70 backdrop-blur-sm hover:bg-stone-800/90 p-3 rounded-full border border-stone-700/50 transition-all disabled:opacity-30"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {galleryImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToGallerySlide(i)}
                      className={`rounded-full transition-all duration-300 ${
                        galleryIndex === i ? 'w-6 h-2 bg-stone-200' : 'w-2 h-2 bg-stone-600 hover:bg-stone-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grid Gallery */}
          <div
            id="gallery-grid"
            ref={el => observerRefs.current[12] = el}
            className={`mt-16 reveal-fade ${revealedElements.has('gallery-grid') ? 'revealed' : ''}`}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square bg-stone-900"
                  onClick={() => {
                    setSelectedGalleryImage(image);
                    setIsGalleryFullscreen(true);
                    setGalleryIndex(index);
                  }}
                >
                  <img
                    src={image.url}
                    alt={`Photo ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ZoomIn className="w-7 h-7 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="py-16 px-6 border-t border-stone-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Mountain className="w-5 h-5 text-stone-500" />
                <span className="text-white font-semibold">Summit Wanderlust</span>
              </div>
              <p className="text-stone-500 text-sm leading-relaxed">
                Building tools and spaces for the mindful adventurer.
              </p>
            </div>

            <div>
              <h4 className="text-stone-400 text-xs uppercase tracking-widest mb-4">Navigate</h4>
              <div className="space-y-2 text-stone-500 text-sm">
                {[
                  { l: 'Basecamp', id: 'chapter-0' },
                  { l: 'Our Apps', id: 'chapter-1' },
                  { l: 'Mountain Lodge', id: 'chapter-2' },
                  { l: 'Nature Sounds', id: 'chapter-3' },
                ].map(item => (
                  <button key={item.id} onClick={() => scrollToSection(item.id)} className="block hover:text-stone-300 transition-colors">
                    {item.l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-stone-400 text-xs uppercase tracking-widest mb-4">Location</h4>
              <p className="text-stone-500 text-sm font-mono leading-relaxed">
                39.0968° N, 120.0324° W<br />
                Elevation: 6,225 ft<br />
                Lake Tahoe, California
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-900 flex items-center justify-between text-stone-600 text-xs">
            <span>© 2025 Summit Wanderlust</span>
            <span>Leave only footprints, take only memories</span>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 bg-stone-900/90 backdrop-blur-sm p-3 rounded-full border border-stone-800 hover:border-stone-600 transition-all duration-300 ${
          scrollY > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Mountain className="w-5 h-5 text-stone-400" />
      </button>

      {/* Custom cursor — desktop only, hidden on touch */}
      <div ref={cursorDotRef} className="cursor-dot hidden lg:block" style={{ opacity: 0 }} />
      <div ref={cursorRingRef} className="cursor-ring hidden lg:block" style={{ opacity: 0 }} />

      {/* Lightbox */}
      {isGalleryFullscreen && selectedGalleryImage && (
        <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4">
          <button
            onClick={() => setIsGalleryFullscreen(false)}
            className="absolute top-4 right-4 bg-stone-800/80 hover:bg-stone-700 p-3 rounded-full border border-stone-700 transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="max-w-5xl max-h-[90vh] relative">
            <img
              src={galleryImages[galleryIndex].url}
              alt={`Photo ${galleryIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>

          <button
            onClick={prevGallerySlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-stone-800/80 hover:bg-stone-700 p-4 rounded-full border border-stone-700 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextGallerySlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-stone-800/80 hover:bg-stone-700 p-4 rounded-full border border-stone-700 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SummitWanderlustAdventure />} />
      <Route path="/breathe-with-me" element={<BreathWithMe />} />
      <Route path="/breathe-with-me/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/lovocado" element={<Lovocado />} />
      <Route path="/lovocado/privacy-policy" element={<LovocadoPrivacyPolicy />} />
      <Route path="/motive" element={<Motive />} />
      <Route path="/motive/privacy-policy" element={<MotivePrivacyPolicy />} />
      <Route path="/i-got-you" element={<IGotYou />} />
    </Routes>
  );
};

export default App;
