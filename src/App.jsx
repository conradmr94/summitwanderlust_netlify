import React, { useState, useEffect, useRef } from 'react';
import { Compass, Map, TreePine, Mountain, Tent, Wind, Footprints, MapPin, Camera, Backpack, Navigation, Sun, Cloud, Star, ArrowDown, Menu, X, Play, Home, Volume2, Dumbbell, Trophy, Award, Zap, Target, Lock, Unlock, TrendingUp, ChevronLeft, ChevronRight, CircleDot, Grid, Layers, Image as ImageIcon, ZoomIn, Heart, Share2, Download, Maximize2 } from 'lucide-react';

const SummitWanderlustAdventure = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [revealedElements, setRevealedElements] = useState(new Set());
  const [stickyNavScale, setStickyNavScale] = useState(1);
  const [heroTextOffset, setHeroTextOffset] = useState(0);
  const parallaxRef = useRef(null);
  const videoRef = useRef(null);
  const observerRefs = useRef([]);
  
  // Gamification State
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('summitWanderlust_xp');
    return saved ? parseInt(saved) : 0;
  });
  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem('summitWanderlust_level');
    return saved ? parseInt(saved) : 1;
  });
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('summitWanderlust_achievements');
    return saved ? JSON.parse(saved) : [];
  });
  const [collectibles, setCollectibles] = useState(() => {
    const saved = localStorage.getItem('summitWanderlust_collectibles');
    return saved ? JSON.parse(saved) : [];
  });
  const [showStats, setShowStats] = useState(false);
  const [showAchievement, setShowAchievement] = useState(null);
  const [levelUp, setLevelUp] = useState(false);
  
  // Image Gallery State
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isGalleryAnimating, setIsGalleryAnimating] = useState(false);
  const [galleryTouchStart, setGalleryTouchStart] = useState(0);
  const [galleryTouchEnd, setGalleryTouchEnd] = useState(0);
  const [isGalleryDragging, setIsGalleryDragging] = useState(false);
  const [galleryDragOffset, setGalleryDragOffset] = useState(0);
  const [isGalleryFullscreen, setIsGalleryFullscreen] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  
  // Collectible locations (random positions)
  const collectibleLocations = [
    { id: 'compass', name: 'Golden Compass', x: 15, y: 25, chapter: 0, icon: Compass },
    { id: 'crystal', name: 'Mountain Crystal', x: 75, y: 60, chapter: 1, icon: Star },
    { id: 'feather', name: 'Eagle Feather', x: 30, y: 45, chapter: 2, icon: Wind },
    { id: 'stone', name: 'Ancient Stone', x: 65, y: 30, chapter: 3, icon: Mountain },
    { id: 'map', name: 'Treasure Map', x: 50, y: 70, chapter: 4, icon: Map },
  ];
  
  // Achievement definitions
  const achievementList = [
    { id: 'first_steps', name: 'First Steps', desc: 'Begin your journey', xp: 50, icon: Footprints },
    { id: 'explorer', name: 'Explorer', desc: 'Visit all chapters', xp: 200, icon: Map },
    { id: 'collector', name: 'Collector', desc: 'Find all collectibles', xp: 300, icon: Backpack },
    { id: 'dedicated', name: 'Dedicated', desc: 'Reach level 5', xp: 500, icon: Trophy },
    { id: 'master', name: 'Master Explorer', desc: 'Reach level 10', xp: 1000, icon: Award },
  ];

  // Calculate XP needed for next level
  const xpForNextLevel = level * 100;
  const xpProgress = (xp % 100) / 100 * 100;
  
  // Add XP function
  const addXP = (amount, reason) => {
    const newXP = xp + amount;
    setXp(newXP);
    localStorage.setItem('summitWanderlust_xp', newXP.toString());
    
    // Check for level up
    const newLevel = Math.floor(newXP / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      localStorage.setItem('summitWanderlust_level', newLevel.toString());
      setLevelUp(true);
      setTimeout(() => setLevelUp(false), 3000);
    }
    
    // Show XP notification
    if (reason) {
      // Could add a toast notification here
    }
  };
  
  // Unlock achievement
  const unlockAchievement = (achievementId) => {
    if (!achievements.includes(achievementId)) {
      const achievement = achievementList.find(a => a.id === achievementId);
      if (achievement) {
        setAchievements([...achievements, achievementId]);
        localStorage.setItem('summitWanderlust_achievements', JSON.stringify([...achievements, achievementId]));
        addXP(achievement.xp, achievement.name);
        setShowAchievement(achievement);
        setTimeout(() => setShowAchievement(null), 4000);
      }
    }
  };
  
  // Collect item
  const collectItem = (itemId) => {
    if (!collectibles.includes(itemId)) {
      setCollectibles([...collectibles, itemId]);
      localStorage.setItem('summitWanderlust_collectibles', JSON.stringify([...collectibles, itemId]));
      addXP(25, 'Collectible found!');
      
      // Check if all collected
      if (collectibles.length + 1 === collectibleLocations.length) {
        unlockAchievement('collector');
      }
    }
  };
  
  useEffect(() => {
    // Initial loading animation
    setTimeout(() => setIsLoading(false), 2000);
    
    // Unlock first achievement
    setTimeout(() => unlockAchievement('first_steps'), 2500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      
      setScrollY(scrolled);
      setScrollProgress(progress);
      
      // Update current chapter based on scroll
      const chapterHeight = window.innerHeight * 2;
      const newChapter = Math.floor(scrolled / chapterHeight);
      setCurrentChapter(newChapter);
      
      // Sticky nav scaling effect
      setStickyNavScale(Math.max(0.8, 1 - scrolled * 0.0002));
      
      // Hero text parallax
      setHeroTextOffset(scrolled * 0.3);
      
      // Award XP for scrolling (once per chapter)
      if (newChapter !== currentChapter && newChapter > currentChapter) {
        addXP(10, 'Chapter explored');
      }
    };

    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    // Intersection Observer for reveal animations and active section detection
    const observerOptions = {
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      rootMargin: '-50px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          setRevealedElements(prev => new Set(prev).add(entry.target.id));
        }
      });
    }, observerOptions);

    // Observe all elements with reveal animations
    observerRefs.current.forEach(ref => {
      if (ref) revealObserver.observe(ref);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      revealObserver.disconnect();
    };
  }, [currentChapter]);

  // Section observer for sidebar navigation - separate effect to ensure DOM is ready
  useEffect(() => {
    const sectionObserverOptions = {
      threshold: [0, 0.3, 0.5, 0.7, 1],
      rootMargin: '-20% 0px -20% 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let activeIndex = -1;
      
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          const sectionId = entry.target.id;
          const sectionIndex = parseInt(sectionId.split('-')[1]);
          if (!isNaN(sectionIndex)) {
            activeIndex = sectionIndex;
          }
        }
      });
      
      if (maxRatio > 0 && activeIndex >= 0) {
        setActiveSection(activeIndex);
      }
    }, sectionObserverOptions);

    // Observe all chapter sections
    const observeSections = () => {
      const chapterSections = ['chapter-0', 'chapter-1', 'chapter-2', 'chapter-3', 'chapter-4', 'chapter-5'];
      chapterSections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          sectionObserver.observe(element);
        }
      });
    };

    // Wait for React to render
    const timeoutId = setTimeout(observeSections, 200);
    
    return () => {
      clearTimeout(timeoutId);
      sectionObserver.disconnect();
    };
  }, []); // Run once on mount

  // Check achievements on state changes
  useEffect(() => {
    // Check explorer achievement
    if (currentChapter >= 4 && !achievements.includes('explorer')) {
      unlockAchievement('explorer');
    }
    
    // Check level achievements
    if (level >= 5 && !achievements.includes('dedicated')) {
      unlockAchievement('dedicated');
    }
    if (level >= 10 && !achievements.includes('master')) {
      unlockAchievement('master');
    }
  }, [currentChapter, level, achievements]);

  const chapters = [
    "The Journey Begins",
    "Tools for Adventure",
    "Mountain Sanctuary",
    "Nature's Symphony",
    "Your Story Awaits",
    "Adventure Gallery"
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Gallery images using your local images
  const galleryImages = [
    { id: 1, url: "/01.jpg", title: "Mountain Vista", description: "The journey begins" },
    { id: 2, url: "/02.JPG", title: "Breathe With Me", description: "Find your center" },
    { id: 3, url: "/03.JPG", title: "Move With Me", description: "Train like a mountaineer" },
    { id: 4, url: "/04.JPG", title: "Mountain Hideaway", description: "Your basecamp" },
    { id: 5, url: "/05.JPG", title: "Nature's Symphony", description: "Immersive soundscapes" },
    { id: 6, url: "/06.JPG", title: "Adventure Awaits", description: "Where will your path lead?" },
    { id: 7, url: "/07.JPG", title: "Summit Views", description: "Peak experiences" },
    { id: 8, url: "/08.JPG", title: "Trail Memories", description: "Captured moments" },
    { id: 9, url: "/09.JPG", title: "Wilderness", description: "Untamed beauty" },
    { id: 10, url: "/10.JPG", title: "The Journey", description: "Every step counts" }
  ];

  // Gallery navigation functions
  const nextGallerySlide = () => {
    if (isGalleryAnimating) return;
    setIsGalleryAnimating(true);
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    setTimeout(() => setIsGalleryAnimating(false), 500);
  };

  const prevGallerySlide = () => {
    if (isGalleryAnimating) return;
    setIsGalleryAnimating(true);
    setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setTimeout(() => setIsGalleryAnimating(false), 500);
  };

  const goToGallerySlide = (index) => {
    if (isGalleryAnimating) return;
    setIsGalleryAnimating(true);
    setGalleryIndex(index);
    setTimeout(() => setIsGalleryAnimating(false), 500);
  };

  // Gallery touch handlers
  const handleGalleryTouchStart = (e) => {
    setGalleryTouchStart(e.targetTouches[0].clientX);
    setIsGalleryDragging(true);
  };

  const handleGalleryTouchMove = (e) => {
    setGalleryTouchEnd(e.targetTouches[0].clientX);
    if (isGalleryDragging) {
      const diff = galleryTouchStart - e.targetTouches[0].clientX;
      setGalleryDragOffset(-diff);
    }
  };

  const handleGalleryTouchEnd = () => {
    setIsGalleryDragging(false);
    if (!galleryTouchStart || !galleryTouchEnd) return;
    
    const distance = galleryTouchStart - galleryTouchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && galleryIndex < galleryImages.length - 1) {
      nextGallerySlide();
    }
    if (isRightSwipe && galleryIndex > 0) {
      prevGallerySlide();
    }
    
    setGalleryDragOffset(0);
  };

  // Gallery keyboard navigation
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

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 flex items-center justify-center z-50">
        <div className="text-center">
          <Compass className="w-20 h-20 text-stone-300 animate-spin mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-2">Summit Wanderlust</h1>
          <p className="text-white/80 animate-pulse">Preparing your adventure...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-white overflow-x-hidden">
      
      {/* Enhanced Progress Bar with Adventure Theme */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-stone-900/50 z-50">
        <div 
          className="h-full bg-stone-200 transition-all duration-300 relative overflow-hidden"
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Dynamic Chapter Indicator with Adventure Progress */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
        <div className="bg-stone-900/95 backdrop-blur-lg px-6 py-3 rounded-full border border-stone-700/50 shadow-xl flex items-center gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-stone-300" />
            <p className="text-sm text-white font-medium tracking-wider">
              {chapters[Math.min(currentChapter, chapters.length - 1)]}
            </p>
          </div>
          <div className="h-4 w-px bg-stone-700/50" />
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-stone-300" />
            <span className="text-xs font-bold text-white">{xp} XP</span>
          </div>
          <div className="h-4 w-px bg-stone-700/50" />
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4 text-stone-300" />
            <span className="text-xs font-bold text-white">Lv.{level}</span>
          </div>
        </div>
      </div>
      
      {/* Level Up Animation */}
      {levelUp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="bg-stone-900/95 backdrop-blur-lg rounded-3xl p-12 border-4 border-stone-400 shadow-2xl animate-bounce">
            <div className="text-center">
              <Trophy className="w-20 h-20 text-stone-300 mx-auto mb-4 animate-pulse" />
              <h2 className="text-4xl font-bold text-white mb-2">LEVEL UP!</h2>
              <p className="text-2xl text-white/90">You reached Level {level}!</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Achievement Unlocked Animation */}
      {showAchievement && (
        <div className="fixed top-24 right-6 z-[100] bg-stone-900/95 backdrop-blur-lg rounded-2xl p-6 border-2 border-stone-400 shadow-2xl animate-slide-in">
          <div className="flex items-center gap-4">
            <div className="bg-stone-800/50 p-3 rounded-xl border border-stone-700/50">
              {React.createElement(showAchievement.icon, { className: "w-8 h-8 text-stone-300" })}
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-300">Achievement Unlocked!</p>
              <p className="text-lg font-bold text-white">{showAchievement.name}</p>
              <p className="text-xs text-white/70">+{showAchievement.xp} XP</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Panel Toggle */}
      <button
        onClick={() => setShowStats(!showStats)}
        className="fixed top-6 left-6 z-50 bg-stone-900/90 backdrop-blur p-3 rounded-full hover:bg-stone-800 transition-all duration-300 shadow-lg border border-stone-700/50"
      >
        <Trophy className="w-6 h-6 text-stone-300" />
      </button>
      
      {/* Stats Panel */}
      {showStats && (
        <div className="fixed top-20 left-6 z-40 bg-stone-900/95 backdrop-blur-xl rounded-2xl p-6 border border-stone-700/50 shadow-xl w-80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Adventure Stats</h3>
            <button onClick={() => setShowStats(false)}>
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>
          
          {/* Level & XP */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-white">Level {level}</span>
              <span className="text-xs text-white/70">{xp} XP</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2">
              <div 
                className="bg-stone-300 h-2 rounded-full transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <p className="text-xs text-white/60 mt-1">{xpForNextLevel - xp} XP to next level</p>
          </div>
          
          {/* Collectibles */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white mb-2">Collectibles</h4>
            <div className="grid grid-cols-5 gap-2">
              {collectibleLocations.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-all ${
                      collectibles.includes(item.id)
                        ? 'bg-stone-700 border-stone-400 text-stone-200'
                        : 'bg-stone-800 border-stone-700 text-stone-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-white/70 mt-2">{collectibles.length}/{collectibleLocations.length} found</p>
          </div>
          
          {/* Achievements */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Achievements</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {achievementList.map((achievement) => {
                const Icon = achievement.icon;
                const unlocked = achievements.includes(achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      unlocked ? 'bg-stone-800/50 border border-stone-700/50' : 'bg-stone-800/50 border border-stone-700/50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${unlocked ? 'bg-stone-700/50 border border-stone-600/50' : 'bg-stone-800 border border-stone-700'}`}>
                      {unlocked ? (
                        <Icon className="w-4 h-4 text-stone-300" />
                      ) : (
                        <Lock className="w-4 h-4 text-stone-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-semibold ${unlocked ? 'text-white' : 'text-white/50'}`}>
                        {achievement.name}
                      </p>
                      <p className={`text-xs ${unlocked ? 'text-white/70' : 'text-white/40'}`}>
                        {achievement.desc}
                      </p>
                    </div>
                    {unlocked && (
                      <span className="text-xs font-bold text-stone-300">+{achievement.xp}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation Compass */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 right-6 z-50 bg-stone-900/90 backdrop-blur p-3 rounded-full hover:bg-stone-800 transition-all duration-300 group shadow-lg border border-stone-700/50"
      >
        {menuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Compass className="w-6 h-6 text-white group-hover:rotate-45 transition-transform duration-500" />
        )}
      </button>

      {/* Adventure Menu */}
      {menuOpen && (
        <div className="fixed top-20 right-6 z-40 bg-stone-900/95 backdrop-blur-xl rounded-2xl p-6 border border-stone-700/50 shadow-xl">
          <nav className="space-y-4">
            {['Basecamp', 'Gear Up', 'The Lodge', 'Soundscapes', 'Join Us', 'Gallery'].map((item, i) => (
              <a
                key={item}
                href={`#chapter-${i}`}
                onClick={() => scrollToSection(`chapter-${i}`)}
                className="block text-white hover:text-stone-300 transition-colors flex items-center group"
              >
                <MapPin className="w-4 h-4 mr-3 text-stone-400 group-hover:text-stone-300" />
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Chapter 1: Hero - The Journey Begins */}
      <section id="chapter-0" className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          {/* Video Layer */}
          {!videoError ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/01.jpg"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0001})`,
              }}
              onError={(e) => {
                console.log('Video error:', e);
                setVideoError(true);
              }}
              onLoadStart={() => {
                // Video started loading
              }}
            >
              <source src="/01.mp4?t=1" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
          
          {/* Fallback background image - shown if video fails to load */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/01.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0001})`,
              opacity: videoError ? 0.4 : 0,
              pointerEvents: 'none',
              zIndex: videoError ? 0 : -1,
            }}
          />
          
          {/* Overlay Layers */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/30 to-stone-900/50"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          />
          
          {/* Fog Layer */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
        </div>

        {/* Floating Elements with Advanced Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-1/4 left-1/4"
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20 - scrollY * 0.2}px)`,
              animation: 'float 6s ease-in-out infinite'
            }}
          >
            <TreePine className="w-12 h-12 text-stone-600/20" />
          </div>
          <div 
            className="absolute top-3/4 right-1/3"
            style={{
              transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15 - scrollY * 0.3}px)`,
              animation: 'float 8s ease-in-out infinite'
            }}
          >
            <Mountain className="w-16 h-16 text-stone-500/20" />
          </div>
          <div 
            className="absolute bottom-1/4 left-1/3"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10 - scrollY * 0.4}px)`,
              animation: 'float 5s ease-in-out infinite'
            }}
          >
            <Tent className="w-10 h-10 text-stone-600/20" />
          </div>
        </div>
        
        {/* Collectible - Chapter 0 */}
        {collectibleLocations.find(c => c.chapter === 0) && (() => {
          const collectible = collectibleLocations.find(c => c.chapter === 0);
          const Icon = collectible.icon;
          const found = collectibles.includes(collectible.id);
          return (
            <button
              onClick={() => !found && collectItem(collectible.id)}
              className={`absolute z-20 pointer-events-auto transition-all duration-300 ${
                found ? 'opacity-30 scale-75' : 'opacity-100 hover:scale-110 animate-pulse cursor-pointer'
              }`}
              style={{ left: `${collectible.x}%`, top: `${collectible.y}%` }}
              title={found ? 'Already collected!' : `Click to collect: ${collectible.name}`}
            >
              <div className={`p-3 rounded-full backdrop-blur-lg border-2 ${
                found 
                  ? 'bg-stone-200/50 border-stone-400' 
                  : 'bg-stone-100/90 border-stone-500 shadow-lg'
              }`}>
                <Icon className={`w-6 h-6 ${found ? 'text-stone-600' : 'text-stone-700'}`} />
              </div>
            </button>
          );
        })()}

        {/* Main Content with Advanced Parallax */}
        <div 
          className="relative z-10 text-center px-6 max-w-5xl"
          style={{
            transform: `translateY(${heroTextOffset}px)`,
            opacity: Math.max(0, 1 - scrollY * 0.001)
          }}
        >
          {/* Animated Icon */}
          <div 
            className="mb-8 inline-block"
            style={{
              animation: 'rotateIn 1s ease-out',
              transform: `scale(${1 - scrollY * 0.0005})`
            }}
          >
            <div className="bg-stone-900/80 backdrop-blur-sm rounded-full p-6 border border-stone-700/50 shadow-lg">
              <Mountain className="w-16 h-16 text-stone-300" />
            </div>
          </div>
          
          {/* Title with Split Text Animation */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span 
              className="block text-white/90 font-light text-2xl md:text-3xl mb-4 tracking-widest"
              style={{
                animation: 'slideInLeft 1s ease-out 0.2s both',
                transform: `translateX(${scrollY * 0.1}px)`
              }}
            >
              SUMMIT
            </span>
            <span 
              className="bg-gradient-to-r from-stone-300 via-white to-stone-200 bg-clip-text text-transparent"
              style={{
                animation: 'slideInRight 1s ease-out 0.4s both',
                transform: `translateX(${scrollY * -0.1}px)`
              }}
            >
              WANDERLUST
            </span>
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-white/90 mb-12 font-light tracking-wide"
            style={{
              animation: 'slideInUp 1s ease-out 0.6s both'
            }}
          >
            Where every breath is an adventure
          </p>
          
          {/* CTA Button with Hover Effect */}
          <div style={{ animation: 'scaleIn 1s ease-out 0.8s both' }}>
            <button 
              onClick={() => scrollToSection('chapter-1')}
              className="group relative bg-stone-800 px-10 py-5 rounded-full text-lg font-medium text-white overflow-hidden border border-stone-600/50"
            >
              <span className="relative z-10">Begin Your Journey</span>
              <Footprints className="relative z-10 inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-stone-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>
          
          {/* Scroll Indicator */}
          <div 
            className="mt-20"
            style={{
              opacity: Math.max(0, 1 - scrollY * 0.005)
            }}
          >
            <div className="animate-bounce">
              <ArrowDown className="w-8 h-8 text-white/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Apps - Tools for Adventure */}
      <section id="chapter-1" className="min-h-screen relative py-20 px-6">
        <div className="max-w-7xl mx-auto" style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
          {/* Section Title with Reveal Animation */}
          <div 
            id="apps-title"
            ref={el => observerRefs.current[0] = el}
            className={`text-center mb-32 pt-12 reveal-fade ${
              revealedElements.has('apps-title') ? 'revealed' : ''
            }`}
            style={{
              transform: `translateY(${Math.max(0, 100 - (scrollY - 800) * 0.1)}px)`
            }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white/70 font-light block text-xl md:text-2xl mb-4 tracking-widest">
                CHAPTER TWO
              </span>
              <span className="bg-gradient-to-r from-stone-300 to-white bg-clip-text text-transparent">
                Your Digital Compass
              </span>
            </h2>
            <p className="text-xl text-white/80">Apps designed for the mindful explorer</p>
          </div>

          {/* App Cards with 3D Effect and Reveal */}
          <div className="grid md:grid-cols-2 gap-12 mt-8">
            {/* Breathe With Me */}
            <div
              id="app-breathe"
              ref={el => observerRefs.current[1] = el}
              className={`group relative reveal-slide-up stagger-delay-1 ${
                revealedElements.has('app-breathe') ? 'revealed' : ''
              }`}
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.2s ease-out'
              }}
            >
              <div className="relative bg-stone-900/80 backdrop-blur-lg rounded-3xl overflow-hidden border border-stone-700/50 hover:border-stone-600 transition-all duration-500 shadow-lg">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b45309' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}/>
                </div>
                
                {/* Image Section - Using your image */}
                <div className="h-64 relative overflow-hidden">
                  <img
                    src="/02.JPG"
                    alt="Breathe With Me"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-800/30 to-transparent" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-6 right-6 bg-stone-900/90 backdrop-blur p-4 rounded-2xl shadow-lg border border-stone-700/50">
                    <Wind className="w-8 h-8 text-stone-300" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 relative">
                  <h3 className="text-3xl font-bold mb-4 text-white">Breathe With Me</h3>
                  <p className="text-white/80 mb-6 text-lg">
                    Find your center in nature's rhythm. Guided breathing journeys inspired by mountain air and forest whispers.
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {['Alpine Breathing Exercises', 'Forest Meditation Walks', 'Mountain Peak Mindfulness'].map((feature) => (
                      <div key={feature} className="flex items-center text-white/80">
                        <Cloud className="w-5 h-5 mr-3 text-stone-300" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-stone-800 py-4 rounded-xl font-medium text-white hover:bg-stone-700 hover:shadow-lg transition-all duration-300 border border-stone-600/50">
                    Explore the App
                  </button>
                </div>
              </div>
            </div>

            {/* Move With Me */}
            <div
              id="app-move"
              ref={el => observerRefs.current[2] = el}
              className={`group relative reveal-slide-up stagger-delay-2 ${
                revealedElements.has('app-move') ? 'revealed' : ''
              }`}
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * -5}deg) rotateX(${-mousePosition.y * 5}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.2s ease-out'
              }}
            >
              <div className="relative bg-stone-900/80 backdrop-blur-lg rounded-3xl overflow-hidden border border-stone-700/50 hover:border-stone-600 transition-all duration-500 shadow-lg">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b45309' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}/>
                </div>
                
                {/* Image Section - Using your image */}
                <div className="h-64 relative overflow-hidden">
                  <img
                    src="/03.JPG"
                    alt="Move With Me"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-800/30 to-transparent" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg">
                    <Mountain className="w-8 h-8 text-stone-700" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 relative">
                  <h3 className="text-3xl font-bold mb-4 text-white">Move With Me</h3>
                  <p className="text-white/80 mb-6 text-lg">
                    Train like a mountaineer. Build strength and endurance with workouts inspired by trail adventures.
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {['Trail Running Programs', 'Summit Training Plans', 'Outdoor Yoga Sessions'].map((feature) => (
                      <div key={feature} className="flex items-center text-white/80">
                        <Footprints className="w-5 h-5 mr-3 text-stone-300" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-stone-800 py-4 rounded-xl font-medium text-white hover:bg-stone-700 hover:shadow-lg transition-all duration-300 border border-stone-600/50">
                    Start Training
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Collectible - Chapter 1 */}
        {collectibleLocations.find(c => c.chapter === 1) && (() => {
          const collectible = collectibleLocations.find(c => c.chapter === 1);
          const Icon = collectible.icon;
          const found = collectibles.includes(collectible.id);
          return (
            <button
              onClick={() => !found && collectItem(collectible.id)}
              className={`fixed z-20 pointer-events-auto transition-all duration-300 ${
                found ? 'opacity-30 scale-75' : 'opacity-100 hover:scale-110 animate-pulse cursor-pointer'
              }`}
              style={{ left: `${collectible.x}%`, top: `${collectible.y}%` }}
              title={found ? 'Already collected!' : `Click to collect: ${collectible.name}`}
            >
              <div className={`p-3 rounded-full backdrop-blur-lg border-2 ${
                found 
                  ? 'bg-stone-200/50 border-stone-400' 
                  : 'bg-stone-100/90 border-stone-500 shadow-lg'
              }`}>
                <Icon className={`w-6 h-6 ${found ? 'text-stone-600' : 'text-stone-700'}`} />
              </div>
            </button>
          );
        })()}
      </section>

      {/* Chapter 3: Airbnb - Mountain Sanctuary */}
      <section id="chapter-2" className="min-h-screen relative py-20">
        {/* Parallax Background - Using your image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/04.JPG')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: `translateY(${(scrollY - 1600) * 0.3}px)`,
            opacity: 0.2
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6" style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
          <div 
            className="text-center mb-20"
            style={{
              transform: `translateY(${(scrollY - 2000) * 0.1}px)`,
              opacity: Math.max(0, Math.min(1, (scrollY - 1800) / 200))
            }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white/70 font-light block text-xl md:text-2xl mb-4 tracking-widest">
                CHAPTER THREE
              </span>
              <span className="bg-gradient-to-r from-stone-300 to-white bg-clip-text text-transparent">
                Mountain Hideaway
              </span>
            </h2>
            <p className="text-xl text-white/80">Your basecamp in the Colorado wilderness</p>
          </div>

          {/* Lodge Card */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Images Grid - Using your images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden h-48 group">
                  <img
                    src="/05.JPG"
                    alt="Mountain View"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                </div>
                <div className="relative rounded-2xl overflow-hidden h-64 group">
                  <img
                    src="/06.JPG"
                    alt="Cabin Interior"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative rounded-2xl overflow-hidden h-64 group">
                  <img
                    src="/07.JPG"
                    alt="Hot Tub"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                </div>
                <div className="relative rounded-2xl overflow-hidden h-48 group">
                  <img
                    src="/04.JPG"
                    alt="Forest Trail"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-stone-900/90 backdrop-blur-lg rounded-3xl p-10 border border-stone-700/50 shadow-xl">
              <div className="flex items-center mb-6">
                <Home className="w-10 h-10 text-stone-300 mr-4" />
                <div>
                  <h3 className="text-3xl font-bold text-white">Summit View Lodge</h3>
                  <p className="text-stone-300">Evergreen, Colorado</p>
                </div>
              </div>
              
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Wake to misty mountain mornings. Find solitude by the fireplace. 
                Reconnect with nature from your private hot tub under star-filled skies.
                This is more than a stay—it's your wilderness retreat.
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Mountain />, text: "Peak Views" },
                  { icon: <TreePine />, text: "Private Forest" },
                  { icon: <Tent />, text: "Fire Pit" },
                  { icon: <Star />, text: "Stargazing Deck" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center text-white/80">
                    <span className="w-5 h-5 mr-3 text-stone-300">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
              
              <button className="w-full bg-gradient-to-r from-amber-700 to-green-800 py-4 rounded-xl font-medium text-white hover:shadow-lg hover:shadow-amber-700/30 transition-all duration-300">
                Reserve Your Escape
              </button>
            </div>
          </div>
        </div>
        
        {/* Collectible - Chapter 2 */}
        {collectibleLocations.find(c => c.chapter === 2) && (() => {
          const collectible = collectibleLocations.find(c => c.chapter === 2);
          const Icon = collectible.icon;
          const found = collectibles.includes(collectible.id);
          return (
            <button
              onClick={() => !found && collectItem(collectible.id)}
              className={`fixed z-20 pointer-events-auto transition-all duration-300 ${
                found ? 'opacity-30 scale-75' : 'opacity-100 hover:scale-110 animate-pulse cursor-pointer'
              }`}
              style={{ left: `${collectible.x}%`, top: `${collectible.y}%` }}
              title={found ? 'Already collected!' : `Click to collect: ${collectible.name}`}
            >
              <div className={`p-3 rounded-full backdrop-blur-lg border-2 ${
                found 
                  ? 'bg-stone-200/50 border-stone-400' 
                  : 'bg-stone-100/90 border-stone-500 shadow-lg'
              }`}>
                <Icon className={`w-6 h-6 ${found ? 'text-stone-600' : 'text-stone-700'}`} />
              </div>
            </button>
          );
        })()}
      </section>

      {/* Chapter 4: YouTube - Nature's Symphony */}
      <section id="chapter-3" className="min-h-screen relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div 
            className="text-center mb-20"
            style={{
              transform: `translateY(${(scrollY - 3200) * 0.1}px)`,
              opacity: Math.max(0, Math.min(1, (scrollY - 3000) / 200))
            }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white/70 font-light block text-xl md:text-2xl mb-4 tracking-widest">
                CHAPTER FOUR
              </span>
              <span className="bg-gradient-to-r from-stone-300 to-white bg-clip-text text-transparent">
                Nature's Orchestra
              </span>
            </h2>
            <p className="text-xl text-white/80">Immersive soundscapes from the wild</p>
          </div>

          {/* Video Gallery - Using your images */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Dawn in the Redwoods",
                duration: "3:42:00",
                views: "892K",
                thumbnail: "/05.JPG"
              },
              {
                title: "Alpine Storm Approach",
                duration: "2:18:00",
                views: "567K",
                thumbnail: "/06.JPG"
              },
              {
                title: "Cascade Falls Journey",
                duration: "4:05:00",
                views: "1.2M",
                thumbnail: "/07.JPG"
              }
            ].map((video, index) => (
              <div
                key={index}
                className="group relative cursor-pointer"
                style={{
                  transform: `translateY(${index % 2 === 0 ? (scrollY - 3200) * 0.05 : (scrollY - 3200) * 0.03}px)`,
                }}
              >
                <div className="relative rounded-2xl overflow-hidden bg-stone-900/80 backdrop-blur border border-stone-700/50 hover:border-stone-600 transition-all duration-500 shadow-lg">
                  {/* Thumbnail */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-stone-800/80 backdrop-blur p-5 rounded-full group-hover:scale-110 group-hover:bg-stone-700/80 transition-all duration-300 border border-stone-600/50">
                        <Play className="w-8 h-8 text-white fill-white translate-x-0.5" />
                      </div>
                    </div>
                    
                    {/* Duration */}
                    <span className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur px-3 py-1 rounded-lg text-sm text-white">
                      {video.duration}
                    </span>
                  </div>
                  
                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-stone-300 transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span className="flex items-center">
                        <Volume2 className="w-4 h-4 mr-2" />
                        Nature ASMR
                      </span>
                      <span>{video.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button className="bg-stone-800 px-10 py-5 rounded-full font-medium text-white hover:bg-stone-700 hover:scale-105 transition-all duration-500 shadow-xl border border-stone-600/50 inline-flex items-center">
              <Camera className="w-5 h-5 mr-3" />
              Explore Full Collection
            </button>
          </div>
        </div>
      </section>

      {/* Chapter 5: Call to Adventure */}
      <section id="chapter-4" className="min-h-screen relative flex items-center justify-center py-20">
        {/* Map Background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10,10 L30,5 L50,15 L70,8 L90,12 L95,30 L85,50 L90,70 L80,90 L60,85 L40,95 L20,85 L10,65 L5,45 L10,25 Z' stroke='%23b45309' stroke-width='0.5' fill='none'/%3E%3Cpath d='M30,30 L70,30 L70,70 L30,70 Z' stroke='%2316620e' stroke-width='0.3' fill='none' stroke-dasharray='2,2'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="mb-8">
            <Map className="w-20 h-20 text-stone-300 mx-auto animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-stone-300 via-white to-stone-200 bg-clip-text text-transparent">
              Your Adventure Awaits
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
            Join thousands of wanderers who've discovered that the summit isn't a destination—it's 
            a way of being. Where will your path lead today?
          </p>
          
          {/* Image Upload Section */}
          <div className="bg-stone-900/90 backdrop-blur-lg rounded-3xl p-12 border-2 border-dashed border-stone-700/50 mb-12 shadow-lg">
            <Backpack className="w-16 h-16 mx-auto mb-6 text-stone-300" />
            <h3 className="text-2xl font-semibold mb-4 text-white">Pack Your Memories</h3>
            <p className="text-white/80 mb-6">
              Your images are already integrated! All 7 of your photos are now part of this adventure story.
            </p>
            <div className="inline-flex items-center bg-stone-800/50 px-6 py-3 rounded-lg border border-stone-700/50">
              <Camera className="w-5 h-5 mr-2 text-stone-300" />
              <span className="text-sm text-white">Images loaded and ready</span>
            </div>
          </div>
          
          {/* Final CTA */}
          <button 
            onClick={() => scrollToSection('chapter-0')}
            className="group bg-stone-800 px-12 py-6 rounded-full text-xl font-medium text-white hover:bg-stone-700 hover:scale-105 transition-all duration-500 shadow-2xl border border-stone-600/50"
          >
            Start Your Journey
            <Compass className="inline-block ml-3 w-6 h-6 group-hover:rotate-45 transition-transform duration-500" />
          </button>
        </div>
      </section>

      {/* Chapter 6: Adventure Gallery */}
      <section id="chapter-5" className="min-h-screen relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Title with Reveal Animation */}
          <div 
            id="gallery-title"
            ref={el => observerRefs.current[10] = el}
            className={`text-center mb-20 reveal-fade ${
              revealedElements.has('gallery-title') ? 'revealed' : ''
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white/70 font-light block text-xl md:text-2xl mb-4 tracking-widest">
                CHAPTER SIX
              </span>
              <span className="bg-gradient-to-r from-stone-300 to-white bg-clip-text text-transparent">
                Adventure Gallery
              </span>
            </h2>
            <p className="text-xl text-white/80">Explore your journey through images</p>
          </div>

          {/* Swipeable Carousel */}
          <div 
            id="gallery-carousel"
            ref={el => observerRefs.current[11] = el}
            className={`reveal-scale ${
              revealedElements.has('gallery-carousel') ? 'revealed' : ''
            }`}
          >
            <div className="relative bg-stone-900/80 backdrop-blur-lg rounded-3xl overflow-hidden border border-stone-700/50 shadow-2xl">
              <div 
                className="relative h-[600px] overflow-hidden cursor-grab active:cursor-grabbing"
                onTouchStart={handleGalleryTouchStart}
                onTouchMove={handleGalleryTouchMove}
                onTouchEnd={handleGalleryTouchEnd}
              >
                {/* Images Container */}
                <div 
                  className="flex h-full transition-transform duration-500 ease-out"
                  style={{ 
                    transform: `translateX(calc(-${galleryIndex * 100}% + ${galleryDragOffset}px))`,
                    transition: isGalleryDragging ? 'none' : 'transform 0.5s ease-out'
                  }}
                >
                  {galleryImages.map((image, index) => (
                    <div
                      key={image.id}
                      className="min-w-full h-full relative"
                    >
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent" />
                      
                      {/* Image Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-3xl font-bold mb-2 text-white">{image.title}</h3>
                        <p className="text-lg text-white/80">{image.description}</p>
                      </div>
                      
                      {/* Image Number */}
                      <div className="absolute top-6 right-6 bg-stone-900/50 backdrop-blur px-4 py-2 rounded-full border border-stone-700/50">
                        <span className="text-sm text-white">{index + 1} / {galleryImages.length}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevGallerySlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-stone-800/80 backdrop-blur hover:bg-stone-700/80 transition-all p-3 rounded-full border border-stone-600/50"
                  disabled={galleryIndex === 0}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                
                <button
                  onClick={nextGallerySlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-stone-800/80 backdrop-blur hover:bg-stone-700/80 transition-all p-3 rounded-full border border-stone-600/50"
                  disabled={galleryIndex === galleryImages.length - 1}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToGallerySlide(index)}
                      className={`transition-all duration-300 ${
                        galleryIndex === index 
                          ? 'w-8 h-2 bg-stone-300 rounded-full' 
                          : 'w-2 h-2 bg-stone-600 rounded-full hover:bg-stone-500'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="bg-stone-900/50 p-4 flex space-x-2 overflow-x-auto border-t border-stone-700/50">
                {galleryImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => goToGallerySlide(index)}
                    className={`relative min-w-[100px] h-16 rounded overflow-hidden transition-all ${
                      galleryIndex === index 
                        ? 'ring-2 ring-stone-400 scale-110' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid Gallery */}
          <div 
            id="gallery-grid"
            ref={el => observerRefs.current[12] = el}
            className={`mt-20 reveal-fade ${
              revealedElements.has('gallery-grid') ? 'revealed' : ''
            }`}
          >
            <h3 className="text-3xl font-bold mb-8 text-center text-white">All Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg aspect-video bg-stone-800"
                  onClick={() => {
                    setSelectedGalleryImage(image);
                    setIsGalleryFullscreen(true);
                    setGalleryIndex(index);
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <ZoomIn className="w-10 h-10 mx-auto mb-2 text-white" />
                      <p className="text-lg font-semibold text-white">{image.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Lightbox Modal */}
      {isGalleryFullscreen && selectedGalleryImage && (
        <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4">
          <button
            onClick={() => setIsGalleryFullscreen(false)}
            className="absolute top-4 right-4 bg-stone-800/80 backdrop-blur hover:bg-stone-700/80 p-3 rounded-full transition-all border border-stone-600/50"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="max-w-6xl max-h-[90vh] relative">
            <img
              src={selectedGalleryImage.url}
              alt={selectedGalleryImage.title}
              className="max-w-full max-h-[90vh] object-contain"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-3xl font-bold mb-2 text-white">{selectedGalleryImage.title}</h3>
              <p className="text-lg text-white/80">{selectedGalleryImage.description}</p>
            </div>

            {/* Navigation in fullscreen */}
            <button
              onClick={prevGallerySlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-stone-800/80 backdrop-blur hover:bg-stone-700/80 p-4 rounded-full transition-all border border-stone-600/50"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            
            <button
              onClick={nextGallerySlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-stone-800/80 backdrop-blur hover:bg-stone-700/80 p-4 rounded-full transition-all border border-stone-600/50"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Footer - The Map */}
      <footer className="py-16 px-6 border-t border-stone-800/50 bg-stone-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center mb-4">
                <Mountain className="w-8 h-8 text-stone-300 mr-3" />
                <span className="text-2xl font-bold text-white">Summit Wanderlust</span>
              </div>
              <p className="text-white/80">
                Building tools and spaces for the mindful adventurer.
              </p>
            </div>
            
            {/* Trail Map */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center">
                <Map className="w-5 h-5 mr-2" />
                Trail Map
              </h4>
              <div className="space-y-2 text-white/80">
                <a href="#chapter-0" onClick={() => scrollToSection('chapter-0')} className="block hover:text-stone-300 transition-colors">Base Camp</a>
                <a href="#chapter-1" onClick={() => scrollToSection('chapter-1')} className="block hover:text-stone-300 transition-colors">Digital Tools</a>
                <a href="#chapter-2" onClick={() => scrollToSection('chapter-2')} className="block hover:text-stone-300 transition-colors">Mountain Lodge</a>
                <a href="#chapter-3" onClick={() => scrollToSection('chapter-3')} className="block hover:text-stone-300 transition-colors">Nature Sounds</a>
              </div>
            </div>
            
            {/* Coordinates */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center">
                <Navigation className="w-5 h-5 mr-2" />
                Find Us
              </h4>
              <p className="text-white/80 font-mono text-sm">
                39.6564° N, 105.3568° W<br />
                Elevation: 8,465 ft<br />
                Colorado, USA
              </p>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-stone-800/50">
            <p className="text-white/60">
              © 2025 Summit Wanderlust · Leave only footprints, take only memories
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 bg-stone-900/90 backdrop-blur p-4 rounded-full hover:bg-stone-800 transition-all duration-300 shadow-lg border border-stone-700/50 group ${
          scrollY > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{
          transform: `scale(${scrollY > 500 ? 1 : 0}) rotate(${scrollY * 0.1}deg)`
        }}
      >
        <Mountain className="w-6 h-6 text-stone-300 group-hover:scale-110 transition-transform" />
      </button>

      {/* Side Progress Indicator */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <div className="space-y-2">
          {['Base', 'Tools', 'Lodge', 'Sounds', 'Journey', 'Gallery'].map((label, i) => (
            <div 
              key={label}
              className="group flex items-center cursor-pointer"
              onClick={() => {
                const section = document.getElementById(`chapter-${i}`);
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === i 
                    ? 'bg-stone-300 w-8' 
                    : 'bg-stone-700 group-hover:bg-stone-600'
                }`}
              />
              <span 
                className={`ml-3 text-xs transition-all duration-300 ${
                  activeSection === i 
                    ? 'text-stone-300 opacity-100' 
                    : 'text-stone-600 opacity-0 group-hover:opacity-100'
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = SummitWanderlustAdventure;
export default App;
