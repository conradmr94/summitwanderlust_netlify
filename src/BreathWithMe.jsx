import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wind, ArrowLeft, Clock, Bell, BellOff, X, Mail, Send } from 'lucide-react';

const BreathWithMe = () => {
  const navigate = useNavigate();
  const [isBreathing, setIsBreathing] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('inhale'); // 'inhale', 'hold', 'exhale'
  const [scale, setScale] = useState(1.0);
  const [opacity, setOpacity] = useState(0.8);
  const [remainingTime, setRemainingTime] = useState(60);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [bellSoundEnabled, setBellSoundEnabled] = useState(true);
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const [show478Modal, setShow478Modal] = useState(false);
  const [use478, setUse478] = useState(false);
  const [breathInterval, setBreathInterval] = useState(4.0);
  const [isAdjustingInterval, setIsAdjustingInterval] = useState(false);
  const [lastDragAngle, setLastDragAngle] = useState(null);
  
  // Contact form state
  const [formTitle, setFormTitle] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null);
  
  // 4-7-8 durations
  const [inhaleDur, setInhaleDur] = useState(4.0);
  const [holdDur, setHoldDur] = useState(0.0);
  const [exhaleDur, setExhaleDur] = useState(4.0);
  
  const timerRef = useRef(null);
  const sessionStartTimeRef = useRef(null);
  const circleRef = useRef(null);
  const durationPickerRef = useRef(null);

  // Duration picker options
  const durationOptions = [];
  for (let i = 15; i <= 60; i += 15) {
    durationOptions.push(i);
  }
  for (let i = 120; i <= 3600; i += 60) {
    durationOptions.push(i);
  }

  const currentPhaseDuration = () => {
    if (use478) {
      switch (currentPhase) {
        case 'inhale': return inhaleDur;
        case 'hold': return holdDur;
        case 'exhale': return exhaleDur;
        default: return 4.0;
      }
    } else {
      return breathInterval;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    return `${secs}`;
  };

  const formatIntervalNumber = (seconds) => {
    const rounded = Math.round(seconds * 10) / 10;
    if (Math.abs(Math.round(rounded) - rounded) < 0.0001) {
      return Math.round(rounded).toString();
    }
    return rounded.toFixed(1);
  };

  const formatDurationLabel = (seconds) => {
    if (seconds < 60) return `${seconds} sec`;
    if (seconds === 60) return '1 min';
    return `${seconds / 60} min`;
  };

  const updateCurrentPhase = () => {
    if (use478) {
      const cycle = inhaleDur + holdDur + exhaleDur;
      const t = totalElapsedTime % cycle;
      let newPhase;
      if (t < inhaleDur) {
        newPhase = 'inhale';
      } else if (t < inhaleDur + holdDur) {
        newPhase = 'hold';
      } else {
        newPhase = 'exhale';
      }
      if (newPhase !== currentPhase) {
        setCurrentPhase(newPhase);
        updateBreathingAnimation(newPhase);
      }
    } else {
      const cycle = breathInterval * 2.0;
      const t = totalElapsedTime % cycle;
      const newPhase = t < breathInterval ? 'inhale' : 'exhale';
      if (newPhase !== currentPhase) {
        setCurrentPhase(newPhase);
        updateBreathingAnimation(newPhase);
      }
    }
  };

  const updateBreathingAnimation = (phase) => {
    const duration = currentPhaseDuration();
    switch (phase) {
      case 'inhale':
        setScale(1.4);
        setOpacity(1.0);
        break;
      case 'hold':
        setScale(1.4);
        setOpacity(0.9);
        break;
      case 'exhale':
        setScale(0.8);
        setOpacity(0.6);
        break;
    }
  };

  const toggleBreathing = () => {
    if (isBreathing) {
      stopBreathing();
    } else {
      startBreathing();
    }
  };

  const startBreathing = () => {
    setIsBreathing(true);
    setRemainingTime(selectedDuration);
    setTotalElapsedTime(0);
    setCurrentPhase('inhale');
    sessionStartTimeRef.current = Date.now();
    updateBreathingAnimation('inhale');

    timerRef.current = setInterval(() => {
      setTotalElapsedTime(prev => {
        const newTime = prev + 0.1;
        const newRemaining = Math.max(0, selectedDuration - Math.floor(newTime));
        setRemainingTime(newRemaining);
        if (newRemaining <= 0) {
          stopBreathing();
        }
        return newTime;
      });
    }, 100);
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setScale(1.0);
    setOpacity(1.0);
    setCurrentPhase('inhale');
    setTotalElapsedTime(0);
    sessionStartTimeRef.current = null;
  };

  useEffect(() => {
    if (isBreathing) {
      updateCurrentPhase();
    }
  }, [totalElapsedTime, isBreathing]);

  // Handle circle drag for interval adjustment
  const handleCircleDragStart = (e) => {
    if (isBreathing || use478) return;
    setIsAdjustingInterval(true);
    e.preventDefault();
    e.stopPropagation();
    
    const rect = circleRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const angle = Math.atan2(dy, dx);
    setLastDragAngle(angle);
  };

  const handleCircleDrag = (e) => {
    if (!isAdjustingInterval || isBreathing || use478) return;
    e.preventDefault();
    e.stopPropagation();
    
    const rect = circleRef.current?.getBoundingClientRect();
    if (!rect || lastDragAngle === null) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const angle = Math.atan2(dy, dx);
    
    let delta = angle - lastDragAngle;
    if (delta > Math.PI) delta -= 2 * Math.PI;
    if (delta < -Math.PI) delta += 2 * Math.PI;
    
    const secondsPerRevolution = 4.0;
    const deltaSeconds = (delta / (2 * Math.PI)) * secondsPerRevolution;
    const newInterval = Math.max(2.0, Math.min(10.0, breathInterval + deltaSeconds));
    setBreathInterval(newInterval);
    setInhaleDur(newInterval);
    setExhaleDur(newInterval);
    setHoldDur(0.0);
    setLastDragAngle(angle);
  };

  const handleDragEnd = () => {
    setLastDragAngle(null);
    setIsAdjustingInterval(false);
  };

  const apply478Pattern = () => {
    setUse478(true);
    setInhaleDur(4.0);
    setHoldDur(7.0);
    setExhaleDur(8.0);
    setShow478Modal(false);
  };

  const disable478Pattern = () => {
    setUse478(false);
    setHoldDur(0.0);
    setInhaleDur(breathInterval);
    setExhaleDur(breathInterval);
    setShow478Modal(false);
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale': return 'BREATHE IN';
      case 'hold': return 'HOLD';
      case 'exhale': return 'BREATHE OUT';
      default: return 'START';
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(formTitle || 'Contact from Breathe With Me');
    const body = encodeURIComponent(formMessage);
    const mailtoLink = `mailto:admin@summitwanderlust.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message and clear form
    setSubmitStatus('success');
    setFormTitle('');
    setFormMessage('');
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-900">
      {/* Top Navigation */}
      <div className="sticky top-0 z-20 p-6 bg-stone-50/80 backdrop-blur-sm">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* iPhone Frame Section - Try It Out */}
        <div className="mb-16">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-light text-stone-900 mb-2">Try It Out</h2>
            <p className="text-stone-600 mb-8">Experience the breathing exercise</p>
            
            {/* iPhone Frame */}
            <div className="relative">
              {/* iPhone Frame */}
              <div className="bg-black rounded-[3rem] p-2 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                
                {/* Screen */}
                <div className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-[2.5rem] overflow-hidden" style={{ width: '375px', height: '812px' }}>
                  {/* Status Bar */}
                  <div className="h-12 flex items-center justify-between px-6 pt-2">
                    <div className="text-xs font-semibold text-stone-900">9:41</div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 border border-stone-900 rounded-sm">
                        <div className="w-3 h-1.5 bg-stone-900 rounded-sm m-0.5"></div>
                      </div>
                      <svg className="w-5 h-3" viewBox="0 0 24 12" fill="none">
                        <path d="M1 6C1 6 2.5 2 6 2C9.5 2 11 6 11 6C11 6 12.5 2 16 2C19.5 2 21 6 21 6C21 6 22.5 10 19 10C15.5 10 14 6 14 6C14 6 12.5 10 9 10C5.5 10 4 6 4 6" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="flex flex-col h-[calc(100%-3rem)]">
                    {/* Top Section */}
                    <div className="flex-1 flex flex-col items-center justify-center pt-8 pb-4">
                      {!isBreathing && (
                        <div className="text-center mb-6 transition-opacity">
                          <h1 className="text-3xl font-light text-stone-900 mb-1">Breathe</h1>
                          <p className="text-sm text-stone-600">Find your calm</p>
                        </div>
                      )}

                      <div className="flex-1 flex items-center justify-center">
                        {/* Breathing Circle Container */}
                        <div 
                          ref={circleRef}
                          className="relative"
                          style={{ width: '320px', height: '320px' }}
                          onMouseDown={handleCircleDragStart}
                          onMouseMove={handleCircleDrag}
                          onMouseUp={handleDragEnd}
                          onMouseLeave={handleDragEnd}
                          onTouchStart={handleCircleDragStart}
                          onTouchMove={handleCircleDrag}
                          onTouchEnd={handleDragEnd}
                        >
                          {/* Multiple layered circles for depth */}
                          {[0, 1, 2].map((index) => (
                            <div
                              key={index}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                              style={{
                                width: `${220 + index * 40}px`,
                                height: `${220 + index * 40}px`,
                                background: `radial-gradient(circle, rgba(96, 165, 250, ${0.15 - index * 0.04}) 0%, rgba(147, 197, 253, ${0.08 - index * 0.02}) 50%, transparent 100%)`,
                                transform: `translate(-50%, -50%) scale(${isBreathing ? scale * (1.0 + index * 0.1) : 1.0})`,
                                opacity: isBreathing ? opacity * (1.0 - index * 0.15) : 0.4,
                                transition: isBreathing ? `transform ${currentPhaseDuration()}s ease-in-out, opacity ${currentPhaseDuration()}s ease-in-out` : 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
                              }}
                            />
                          ))}

                          {/* Central breathing circle */}
                          <button
                            onClick={toggleBreathing}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full bg-gradient-to-br from-blue-400 to-blue-500 shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-95"
                            style={{
                              transform: 'translate(-50%, -50%) scale(' + scale + ')',
                              transition: isBreathing ? `transform ${currentPhaseDuration()}s ease-in-out` : 'transform 0.5s ease-in-out',
                              boxShadow: '0 20px 60px rgba(96, 165, 250, 0.3)',
                            }}
                          >
                            {/* Inner circle border */}
                            <div
                              className="absolute w-[130px] h-[130px] rounded-full border-2 border-white/30"
                              style={{
                                transform: `scale(${scale})`,
                                transition: isBreathing ? `transform ${currentPhaseDuration()}s ease-in-out` : 'transform 0.5s ease-in-out',
                              }}
                            />

                            <div className="relative z-10 text-center">
                              {isBreathing ? (
                                <div className="text-white">
                                  <div className="text-sm font-medium tracking-wider uppercase">
                                    {getPhaseText()}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-white">
                                  <Wind className="w-8 h-8 mx-auto mb-2 opacity-80" strokeWidth={1.5} />
                                  {isAdjustingInterval && !use478 ? (
                                    <div className="text-xs font-medium tracking-wider">
                                      {formatIntervalNumber(breathInterval)}
                                    </div>
                                  ) : (
                                    <div className="text-xs font-medium tracking-wider">START</div>
                                  )}
                                </div>
                              )}
                            </div>
                          </button>

                          {/* Outer interactive ring (visual feedback) */}
                          {isAdjustingInterval && (
                            <div
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border-[28px] border-white/25 pointer-events-none"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section - Controls */}
                    <div className="pb-6 pt-4 px-4">
                      {isBreathing ? (
                        <div className="text-center space-y-3">
                          <div className="text-4xl font-thin text-stone-900">
                            {formatTime(remainingTime)}
                          </div>
                          <button
                            onClick={stopBreathing}
                            className="px-6 py-2.5 rounded-full bg-white/70 backdrop-blur-sm border border-stone-200 text-blue-500 font-medium text-sm hover:bg-white/90 transition-all"
                          >
                            Stop
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {/* Transition Sounds Toggle */}
                          <button
                            onClick={() => setBellSoundEnabled(!bellSoundEnabled)}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-all ${
                              bellSoundEnabled
                                ? 'bg-blue-500/20 border border-blue-500/30 text-blue-600'
                                : 'bg-white/70 backdrop-blur-sm border border-stone-200 text-stone-700'
                            }`}
                          >
                            {bellSoundEnabled ? (
                              <Bell className="w-3.5 h-3.5" />
                            ) : (
                              <BellOff className="w-3.5 h-3.5" />
                            )}
                            <span className="text-xs">Transition Sounds</span>
                          </button>

                          {/* Controls Row */}
                          <div className="flex gap-2">
                            {/* Duration Button */}
                            <button
                              onClick={() => setShowDurationPicker(true)}
                              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-2xl font-medium text-xs tracking-wide bg-blue-500/20 border border-blue-500/30 text-blue-600"
                            >
                              <Clock className="w-3 h-3" />
                              <span>Duration</span>
                              {use478 && (
                                <span className="px-1 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
                                  4-7-8
                                </span>
                              )}
                            </button>

                            {/* 4-7-8 Button */}
                            <button
                              onClick={() => setShow478Modal(true)}
                              className={`px-3 py-2 rounded-2xl font-semibold text-xs tracking-wide transition-all ${
                                use478
                                  ? 'bg-blue-500/20 border border-blue-500/30 text-blue-600'
                                  : 'bg-white/70 backdrop-blur-sm border border-stone-200 text-stone-700'
                              }`}
                            >
                              4-7-8
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-stone-200">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-semibold text-stone-900">Get in Touch</h2>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-stone-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                  placeholder="Enter message title"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none bg-white"
                  placeholder="Enter your message..."
                  required
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                  Your email client should open shortly with the message prepared.
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                <span>Open Email to admin@summitwanderlust.com</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Duration Picker Modal */}
      {showDurationPicker && (
        <DurationPickerContent
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
          durationOptions={durationOptions}
          formatDurationLabel={formatDurationLabel}
          use478={use478}
          onClose={() => setShowDurationPicker(false)}
        />
      )}

      {/* 4-7-8 Modal */}
      {show478Modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-4 shadow-2xl max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-800">4-7-8 Breathing</h3>
              <button
                onClick={() => setShow478Modal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4 p-3 bg-stone-50 rounded-xl max-h-56 overflow-y-auto">
              <p className="text-sm text-stone-600 mb-3">
                A simple pattern to relax the nervous system: inhale through the nose for 4 seconds, hold your breath for 7 seconds, and exhale slowly through the mouth for 8 seconds. Repeat gently without forcing the breath.
              </p>
              <div className="space-y-2 text-sm font-medium text-stone-700">
                <div className="flex items-center gap-2">
                  <span>↓</span>
                  <span>Inhale: 4s</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏸</span>
                  <span>Hold: 7s</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>↑</span>
                  <span>Exhale: 8s</span>
                </div>
              </div>
            </div>

            <p className="text-sm font-semibold text-stone-700 mb-3">Use this method now?</p>

            <div className="flex gap-3">
              <button
                onClick={apply478Pattern}
                className="flex-1 py-2.5 rounded-xl bg-blue-400 text-white font-medium"
              >
                Yes
              </button>
              <button
                onClick={disable478Pattern}
                className="flex-1 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-600 font-medium"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Separate component for duration picker to handle scroll effect
const DurationPickerContent = ({ selectedDuration, setSelectedDuration, durationOptions, formatDurationLabel, use478, onClose }) => {
  const pickerRef = useRef(null);

  useEffect(() => {
    // Scroll to selected duration when modal opens
    if (pickerRef.current) {
      const selectedIndex = durationOptions.indexOf(selectedDuration);
      const itemHeight = 80;
      const scrollPosition = selectedIndex * itemHeight;
      pickerRef.current.scrollTop = scrollPosition;
    }
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl p-4 shadow-2xl max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-stone-600" />
            <h3 className="text-lg font-semibold text-stone-800">Duration</h3>
            {use478 && (
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                4-7-8
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wheel-style picker */}
        <div className="py-4 relative h-48 overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
            
            <div 
              ref={pickerRef}
              className="overflow-y-auto snap-y snap-mandatory h-full w-full scroll-smooth"
              onScroll={(e) => {
                // Find closest option based on scroll position
                const scrollTop = e.target.scrollTop;
                const itemHeight = 80; // h-20 = 80px
                const closestIndex = Math.round(scrollTop / itemHeight);
                if (closestIndex >= 0 && closestIndex < durationOptions.length) {
                  const closestOption = durationOptions[closestIndex];
                  if (closestOption !== selectedDuration) {
                    setSelectedDuration(closestOption);
                  }
                }
              }}
            >
              {durationOptions.map((opt, index) => {
                const selectedIndex = durationOptions.indexOf(selectedDuration);
                const distance = Math.abs(index - selectedIndex);
                const isSelected = opt === selectedDuration;
                const opacity = Math.max(0.25, 1.0 - 0.22 * distance);
                const scale = isSelected ? 1.0 : Math.max(0.9, 1.0 - 0.04 * distance);
                
                return (
                  <div
                    key={opt}
                    id={`duration-${opt}`}
                    onClick={() => {
                      setSelectedDuration(opt);
                      const element = document.getElementById(`duration-${opt}`);
                      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="snap-center flex items-center justify-center h-20 cursor-pointer transition-all"
                    style={{
                      opacity,
                      transform: `scale(${scale})`,
                    }}
                  >
                    <span className={`text-2xl ${isSelected ? 'font-semibold' : 'font-normal'} text-stone-800`}>
                      {formatDurationLabel(opt)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-blue-400 text-white font-medium hover:bg-blue-500 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default BreathWithMe;
