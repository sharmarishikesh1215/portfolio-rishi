import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X, Heart, Moon, Sun, Play, Fish } from 'lucide-react';
import confetti from 'canvas-confetti';

// Cat & SDET dialogues
const CAT_DIALOGUES = [
  "Meow! 100% test coverage purr-fection! 🐾",
  "Paws-ing to inspect your DOM tree... Zero bugs! 🧐",
  "If it passes CI/CD, I sits! 📦✨",
  "Catching bugs faster than laser pointers! 🐞✨",
  "Need an SDET? Rishi wrote all this clean code! 🐱",
  "Running `cat test-results.log`... All green! 🟢",
  "Automated testing pipeline: Purr-fect! 🚀",
  "Click me again for more automated head-scritches! ❤️",
  "9 lives, 0 flaky tests! 🐾",
  "Continuous Integration? More like Continuous Purring! ✨",
  "Playwright & Selenium tested & cat-approved! 🐾",
  "Did someone say fish treats or test suites? 🐟",
];

export type CatPose = 'sploot' | 'sit' | 'walk' | 'meow' | 'pet' | 'jump' | 'loaf';

export const CatMascot: React.FC = () => {
  const [pose, setPose] = useState<CatPose>('sploot');
  const [positionX, setPositionX] = useState<number>(75); // % from left
  const [direction, setDirection] = useState<1 | -1>(-1); // 1: right, -1: left
  const [speech, setSpeech] = useState<string | null>("Meow! I'm Mochi, Rishi's QA cat! 🐾");
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    try {
      return localStorage.getItem('cat_minimized') === 'true';
    } catch {
      return false;
    }
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [walkFrame, setWalkFrame] = useState<number>(0);
  const [treatFalling, setTreatFalling] = useState<boolean>(false);

  const speechTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Web Audio 8-bit kitten sound synthesizer
  const playSound = useCallback((type: 'meow' | 'purr' | 'jump' | 'chomp') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'meow') {
        // Classic kitten "me-o-w~" frequency curve (rise and fall)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(820, now + 0.1);
        osc.frequency.exponentialRampToValueAtTime(460, now + 0.28);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.28);
      } else if (type === 'jump') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(360, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(740, ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.14, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.14);
      } else if (type === 'chomp') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(260, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.14, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      }
    } catch {
      // Audio context error handling
    }
  }, [soundEnabled]);

  const showSpeech = useCallback((text: string, duration = 4000) => {
    setSpeech(text);
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setSpeech(null);
    }, duration);
  }, []);

  // Walk cycle animation ticker
  useEffect(() => {
    if (pose !== 'walk') return;
    const interval = setInterval(() => {
      setWalkFrame((f) => (f + 1) % 4);
    }, 180);
    return () => clearInterval(interval);
  }, [pose]);

  // Autonomous behavior loop
  useEffect(() => {
    if (isMinimized || isHovered || pose === 'loaf' || pose === 'jump' || pose === 'meow') return;

    const interval = setInterval(() => {
      const rand = Math.random();

      if (rand < 0.35) {
        // Sploot pose (like in reference image!)
        setPose('sploot');
        setTimeout(() => {
          setPose((p) => (p === 'sploot' ? 'sit' : p));
        }, 5000 + Math.random() * 3000);
      } else if (rand < 0.6) {
        // Sit upright
        setPose('sit');
        setTimeout(() => {
          setPose((p) => (p === 'sit' ? 'walk' : p));
        }, 3500 + Math.random() * 2000);
      } else {
        // Walk along bottom
        setPose('walk');
        setPositionX((prev) => {
          const step = (Math.random() * 8 + 5) * direction;
          let next = prev + step;
          if (next > 86) {
            next = 86;
            setDirection(-1);
          } else if (next < 10) {
            next = 10;
            setDirection(1);
          }
          return next;
        });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [direction, isMinimized, isHovered, pose]);

  // Occasional random chatter
  useEffect(() => {
    if (isMinimized) return;
    const interval = setInterval(() => {
      if (!speech && Math.random() > 0.4 && pose !== 'loaf') {
        const randomQuote = CAT_DIALOGUES[Math.floor(Math.random() * CAT_DIALOGUES.length)];
        showSpeech(randomQuote, 4500);
      }
    }, 24000);
    return () => clearInterval(interval);
  }, [isMinimized, speech, pose, showSpeech]);

  // Click: Jump & Meow with confetti
  const handleCatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('meow');
    setPose('jump');

    // Heart particles
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: rect.width / 2 + (Math.random() * 20 - 10),
      y: -10,
    };
    setHearts((prev) => [...prev.slice(-3), newHeart]);

    // Confetti
    try {
      const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
      const yRatio = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 16,
        startVelocity: 16,
        spread: 60,
        origin: { x: xRatio, y: yRatio },
        colors: ['#BA9A93', '#FFFBEA', '#DE7382', '#F43F5E', '#10B981'],
        disableForReducedMotion: true,
      });
    } catch {
      // safe
    }

    const randomQuote = CAT_DIALOGUES[Math.floor(Math.random() * CAT_DIALOGUES.length)];
    showSpeech(randomQuote, 4000);

    setTimeout(() => {
      setPose('meow');
      setTimeout(() => {
        setPose('sploot');
      }, 1000);
    }, 600);
  };

  // Hover: Petting
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (pose !== 'loaf') {
      setPose('pet');
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (pose === 'pet') {
      setPose('sploot');
    }
  };

  // Toss Fish Treat
  const handleTossTreat = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (treatFalling) return;
    setTreatFalling(true);
    setPose('jump');
    playSound('jump');
    showSpeech("Ooh! Fresh fish for passing test cases! 🐟", 3000);

    setTimeout(() => {
      playSound('chomp');
      setTreatFalling(false);
      setPose('pet');
      showSpeech("*Crunch crunch* Purr... 100% delicious! Good SDET cat! 🐾", 3500);
      setTimeout(() => setPose('sploot'), 2000);
    }, 1100);
  };

  // Toggle Loaf / Sploot
  const toggleLoaf = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pose === 'loaf') {
      setPose('sploot');
      playSound('meow');
      showSpeech("Stretching out into a cute sploot! 🐱", 3000);
    } else {
      setPose('loaf');
      showSpeech("Loafing around while regression suite runs... Zzz 💤", 3500);
    }
  };

  // Trigger Meow
  const handleManualMeow = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('meow');
    setPose('meow');
    showSpeech("MEOW! All release checks purr-fectly green! 🐱✅", 3000);
    setTimeout(() => setPose('sploot'), 1400);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
    try {
      localStorage.setItem('cat_minimized', 'true');
    } catch {
      // safe
    }
  };

  const handleRestore = () => {
    setIsMinimized(false);
    try {
      localStorage.setItem('cat_minimized', 'false');
    } catch {
      // safe
    }
    showSpeech("I'm back! Ready to test! 🐾", 3000);
    playSound('meow');
  };

  // Minimized corner badge
  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleRestore}
        className="fixed bottom-5 right-5 z-50 p-2.5 rounded-full bg-white dark:bg-apple-dark-surface border border-black/10 dark:border-white/15 shadow-apple-lg flex items-center gap-2 group backdrop-blur-md transition-all cursor-pointer"
        title="Summon Pixel Cat"
      >
        <div className="w-7 h-7 rounded-full bg-pink-500/15 flex items-center justify-center text-pink-500">
          <span className="text-base select-none">🐱</span>
        </div>
        <span className="text-xs font-semibold text-apple-light-primary dark:text-apple-dark-primary pr-2">
          Summon Mochi
        </span>
      </motion.button>
    );
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 pointer-events-none z-40 select-none overflow-visible"
      style={{ height: 160 }}
    >
      {/* Floating Animated Cat along bottom positionX */}
      <motion.div
        className="absolute bottom-2 pointer-events-auto cursor-pointer"
        animate={{
          left: `${positionX}%`,
          y: pose === 'jump' ? [-6, -34, -4] : 0,
        }}
        transition={{
          left: { duration: 3.5, ease: 'easeInOut' },
          y: { duration: 0.6, ease: 'easeInOut' },
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCatClick}
      >
        {/* Falling Fish Treat */}
        <AnimatePresence>
          {treatFalling && (
            <motion.div
              initial={{ y: -70, opacity: 0, rotate: -45 }}
              animate={{ y: -6, opacity: 1, rotate: 180 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1.0, ease: 'easeIn' }}
              className="absolute left-1/2 -translate-x-1/2 -top-12 text-2xl z-30 pointer-events-none"
            >
              🐟
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Heart Particles */}
        <AnimatePresence>
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -45, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute text-pink-500 pointer-events-none z-30"
              style={{ left: h.x, top: h.y }}
            >
              <Heart className="w-4 h-4 fill-pink-500" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Speech Bubble */}
        <AnimatePresence>
          {speech && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.92 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 min-w-[210px] max-w-[280px] p-2.5 rounded-2xl bg-white/95 dark:bg-apple-dark-surface/95 backdrop-blur-md border border-black/10 dark:border-white/15 shadow-apple-lg text-xs font-medium text-apple-light-primary dark:text-apple-dark-primary text-center pointer-events-none z-50"
            >
              <p className="leading-snug">{speech}</p>
              {/* Little Speech Pointer */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-apple-dark-surface border-r border-b border-black/10 dark:border-white/15 rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Action Toolbar (Reveals on Hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 rounded-full bg-white/95 dark:bg-apple-dark-surface/95 backdrop-blur-md border border-black/10 dark:border-white/15 shadow-apple-sm z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleManualMeow}
                title="Meow 🐱"
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-pink-500 transition-colors"
              >
                <Play className="w-3 h-3 fill-pink-500" />
              </button>

              <button
                type="button"
                onClick={handleTossTreat}
                title="Toss Fish 🐟"
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-blue-500 transition-colors"
              >
                <Fish className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={toggleLoaf}
                title={pose === 'loaf' ? 'Stretch out (Sploot)' : 'Loaf mode 💤'}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-indigo-500 transition-colors"
              >
                {pose === 'loaf' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => setSoundEnabled((prev) => !prev)}
                title={soundEnabled ? 'Mute Sounds' : 'Enable 8-Bit Meow 🔊'}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-apple-light-secondary dark:text-apple-dark-secondary transition-colors"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-blue-500" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={handleMinimize}
                title="Minimize Mascot"
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-red-400 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AUTHENTIC 2D PIXEL-ART CAT SPRITE (EXACTLY MATCHING USER'S IMAGE) */}
        <motion.div
          className="relative inline-block"
          style={{ transformOrigin: 'bottom center' }}
          animate={{
            scaleX: direction,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Ground Ambient Shadow */}
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-black/25 dark:bg-black/50 blur-[2px] pointer-events-none"
            style={{
              width: pose === 'sploot' ? 96 : 74,
              height: 7,
            }}
          />

          {/* RENDER THE EXACT PIXEL ART ACCORDING TO CURRENT POSE */}
          {pose === 'sploot' ? (
            // ==========================================
            // POSE 1: SPLOOT / STRETCH (EXACT MATCH TO REFERENCE PHOTO!)
            // ==========================================
            <motion.svg
              width="104"
              height="60"
              viewBox="0 0 52 30"
              className="overflow-visible"
              style={{ shapeRendering: 'crispEdges' }}
              animate={{
                y: [0, -1, 0], // Gentle breathing
              }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Palette from reference image:
                  Outline: #261C14
                  Coat (Warm taupe): #BA9A93
                  Light coat highlight: #CCAFA8
                  Cream (belly/face/paws): #FFFBEA
                  Pink (ears/blush): #DE7382
              */}

              {/* BLACK/DARK-BROWN OUTLINE */}
              {/* Ears */}
              <rect x="27" y="3" width="5" height="1" fill="#261C14" />
              <rect x="26" y="4" width="2" height="3" fill="#261C14" />
              <rect x="31" y="4" width="2" height="2" fill="#261C14" />

              <rect x="38" y="3" width="5" height="1" fill="#261C14" />
              <rect x="37" y="4" width="2" height="2" fill="#261C14" />
              <rect x="42" y="4" width="2" height="3" fill="#261C14" />

              {/* Head Outline */}
              <rect x="32" y="5" width="6" height="1" fill="#261C14" />
              <rect x="25" y="7" width="2" height="6" fill="#261C14" />
              <rect x="43" y="7" width="2" height="6" fill="#261C14" />
              <rect x="24" y="13" width="2" height="4" fill="#261C14" />
              <rect x="44" y="13" width="2" height="4" fill="#261C14" />
              <rect x="25" y="17" width="2" height="2" fill="#261C14" />
              <rect x="43" y="17" width="2" height="2" fill="#261C14" />
              <rect x="27" y="19" width="16" height="1" fill="#261C14" />

              {/* Back / Body Outline */}
              <rect x="15" y="12" width="11" height="2" fill="#261C14" />
              <rect x="12" y="14" width="4" height="2" fill="#261C14" />
              <rect x="8" y="17" width="5" height="2" fill="#261C14" />
              <rect x="7" y="19" width="2" height="4" fill="#261C14" />
              <rect x="8" y="23" width="6" height="2" fill="#261C14" />

              {/* Front Outstretched Paw Outline */}
              <rect x="38" y="18" width="2" height="4" fill="#261C14" />
              <rect x="39" y="21" width="5" height="2" fill="#261C14" />
              <rect x="43" y="19" width="2" height="3" fill="#261C14" />

              {/* Underbelly Baseline Outline */}
              <rect x="14" y="24" width="10" height="2" fill="#261C14" />
              <rect x="23" y="23" width="14" height="2" fill="#261C14" />
              <rect x="36" y="22" width="4" height="2" fill="#261C14" />

              {/* Back Stretched Legs Outline (Sploot) */}
              <rect x="11" y="25" width="8" height="2" fill="#261C14" />
              <rect x="18" y="23" width="2" height="3" fill="#261C14" />

              {/* TAIL (Curved with white tip, swaying gently) */}
              <motion.g
                animate={{ rotate: [-8, 8, -8] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ originX: '15px', originY: '15px' }}
              >
                {/* Tail Outline */}
                <rect x="7" y="11" width="5" height="2" fill="#261C14" />
                <rect x="11" y="12" width="6" height="2" fill="#261C14" />
                <rect x="16" y="14" width="3" height="2" fill="#261C14" />
                <rect x="6" y="12" width="2" height="3" fill="#261C14" />
                <rect x="7" y="14" width="6" height="2" fill="#261C14" />
                {/* Tail Fill: Taupe root, Cream tip */}
                <rect x="12" y="13" width="5" height="2" fill="#BA9A93" />
                <rect x="8" y="12" width="5" height="2" fill="#FFFBEA" />
              </motion.g>

              {/* COLOR FILLS */}
              {/* TAUPE COAT (Back & Upper Head) */}
              {/* Head top cap */}
              <rect x="27" y="6" width="16" height="6" fill="#BA9A93" />
              {/* Body back */}
              <rect x="15" y="13" width="13" height="7" fill="#BA9A93" />
              <rect x="12" y="15" width="4" height="6" fill="#BA9A93" />

              {/* PINK INNER EARS & BLUSH */}
              <rect x="28" y="4" width="3" height="4" fill="#DE7382" />
              <rect x="39" y="4" width="3" height="4" fill="#DE7382" />
              {/* Rosy Pink Cheeks */}
              <rect x="26" y="12" width="3" height="3" fill="#DE7382" />
              <rect x="41" y="12" width="3" height="3" fill="#DE7382" />

              {/* CREAM CHUBBY FACE & UNDERBELLY */}
              {/* Face bottom half */}
              <rect x="29" y="11" width="12" height="8" fill="#FFFBEA" />
              <rect x="27" y="12" width="16" height="6" fill="#FFFBEA" />
              {/* Body cream underside */}
              <rect x="16" y="17" width="21" height="6" fill="#FFFBEA" />
              {/* Back Sploot foot cream */}
              <rect x="8" y="19" width="6" height="4" fill="#FFFBEA" />
              <rect x="12" y="23" width="6" height="2" fill="#FFFBEA" />
              {/* Front Outstretched Paw Cream */}
              <rect x="39" y="18" width="4" height="4" fill="#D6D1B9" />

              {/* BIG EXPRESSIVE PIXEL EYES */}
              {/* Left Eye */}
              <rect x="30" y="10" width="3" height="3" fill="#261C14" />
              <rect x="30" y="10" width="1" height="1" fill="#FFFFFF" /> {/* Eye shine */}
              {/* Right Eye */}
              <rect x="37" y="10" width="3" height="3" fill="#261C14" />
              <rect x="37" y="10" width="1" height="1" fill="#FFFFFF" /> {/* Eye shine */}

              {/* CUTE INVERTED V CAT MOUTH */}
              <rect x="34" y="13" width="2" height="1" fill="#261C14" />
              <rect x="33" y="14" width="1" height="1" fill="#261C14" />
              <rect x="36" y="14" width="1" height="1" fill="#261C14" />
            </motion.svg>
          ) : pose === 'sit' ? (
            // ==========================================
            // POSE 2: UPRIGHT SITTING CAT
            // ==========================================
            <motion.svg
              width="80"
              height="64"
              viewBox="0 0 40 32"
              className="overflow-visible"
              style={{ shapeRendering: 'crispEdges' }}
              animate={{
                y: [0, -1.5, 0],
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Upright sitting cat */}
              {/* Outline */}
              <rect x="12" y="3" width="4" height="1" fill="#261C14" />
              <rect x="22" y="3" width="4" height="1" fill="#261C14" />
              <rect x="10" y="4" width="3" height="3" fill="#261C14" />
              <rect x="25" y="4" width="3" height="3" fill="#261C14" />
              <rect x="16" y="5" width="6" height="1" fill="#261C14" />

              <rect x="9" y="7" width="2" height="9" fill="#261C14" />
              <rect x="27" y="7" width="2" height="9" fill="#261C14" />
              <rect x="11" y="16" width="16" height="1" fill="#261C14" />

              {/* Body Outline */}
              <rect x="11" y="17" width="2" height="11" fill="#261C14" />
              <rect x="25" y="17" width="2" height="11" fill="#261C14" />
              <rect x="12" y="28" width="15" height="2" fill="#261C14" />

              {/* Tail Curved Beside */}
              <motion.g
                animate={{ rotate: [-6, 8, -6] }}
                transition={{ duration: 1.0, repeat: Infinity, ease: 'easeInOut' }}
                style={{ originX: '26px', originY: '24px' }}
              >
                <rect x="26" y="19" width="6" height="2" fill="#261C14" />
                <rect x="30" y="15" width="2" height="5" fill="#261C14" />
                <rect x="28" y="13" width="3" height="3" fill="#261C14" />
                <rect x="27" y="20" width="4" height="1" fill="#BA9A93" />
                <rect x="29" y="14" width="2" height="5" fill="#FFFBEA" />
              </motion.g>

              {/* FILLS */}
              {/* Head Top Taupe */}
              <rect x="11" y="6" width="16" height="5" fill="#BA9A93" />
              {/* Pink Ears */}
              <rect x="13" y="4" width="3" height="3" fill="#DE7382" />
              <rect x="22" y="4" width="3" height="3" fill="#DE7382" />

              {/* Face Bottom Cream */}
              <rect x="11" y="11" width="16" height="5" fill="#FFFBEA" />
              {/* Pink Cheeks */}
              <rect x="10" y="12" width="3" height="3" fill="#DE7382" />
              <rect x="25" y="12" width="3" height="3" fill="#DE7382" />

              {/* Eyes */}
              <rect x="14" y="10" width="3" height="3" fill="#261C14" />
              <rect x="14" y="10" width="1" height="1" fill="#FFFFFF" />
              <rect x="21" y="10" width="3" height="3" fill="#261C14" />
              <rect x="21" y="10" width="1" height="1" fill="#FFFFFF" />

              {/* Inverted V Mouth */}
              <rect x="18" y="13" width="2" height="1" fill="#261C14" />

              {/* Body: Taupe back, Cream chest */}
              <rect x="13" y="17" width="12" height="11" fill="#BA9A93" />
              <rect x="16" y="17" width="6" height="11" fill="#FFFBEA" />

              {/* White Front Paws */}
              <rect x="14" y="25" width="4" height="3" fill="#FFFBEA" />
              <rect x="20" y="25" width="4" height="3" fill="#FFFBEA" />
            </motion.svg>
          ) : pose === 'walk' ? (
            // ==========================================
            // POSE 3: WALKING / PROWLING CAT
            // ==========================================
            <motion.svg
              width="88"
              height="60"
              viewBox="0 0 44 30"
              className="overflow-visible"
              style={{ shapeRendering: 'crispEdges' }}
              animate={{
                y: walkFrame % 2 === 0 ? 0 : -2,
              }}
              transition={{ duration: 0.18 }}
            >
              {/* Walking Cat Outline */}
              <rect x="27" y="3" width="4" height="1" fill="#261C14" />
              <rect x="36" y="3" width="4" height="1" fill="#261C14" />
              <rect x="25" y="5" width="3" height="7" fill="#261C14" />
              <rect x="39" y="5" width="3" height="7" fill="#261C14" />
              <rect x="14" y="11" width="13" height="2" fill="#261C14" />
              <rect x="11" y="13" width="4" height="2" fill="#261C14" />
              <rect x="10" y="15" width="2" height="6" fill="#261C14" />

              {/* Tail Held High in Air */}
              <motion.g
                animate={{ rotate: [-6, 6, -6] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{ originX: '12px', originY: '14px' }}
              >
                <rect x="9" y="5" width="2" height="9" fill="#261C14" />
                <rect x="7" y="3" width="4" height="2" fill="#261C14" />
                <rect x="10" y="6" width="1" height="8" fill="#BA9A93" />
                <rect x="8" y="4" width="2" height="3" fill="#FFFBEA" />
              </motion.g>

              {/* FILLS */}
              <rect x="27" y="5" width="13" height="6" fill="#BA9A93" />
              <rect x="27" y="11" width="13" height="6" fill="#FFFBEA" />
              <rect x="12" y="13" width="16" height="8" fill="#BA9A93" />
              <rect x="16" y="16" width="12" height="5" fill="#FFFBEA" />

              {/* Pink Ears & Cheeks */}
              <rect x="28" y="4" width="3" height="3" fill="#DE7382" />
              <rect x="37" y="4" width="3" height="3" fill="#DE7382" />
              <rect x="26" y="12" width="2" height="3" fill="#DE7382" />
              <rect x="39" y="12" width="2" height="3" fill="#DE7382" />

              {/* Eyes */}
              <rect x="30" y="10" width="3" height="3" fill="#261C14" />
              <rect x="30" y="10" width="1" height="1" fill="#FFFFFF" />
              <rect x="36" y="10" width="3" height="3" fill="#261C14" />
              <rect x="36" y="10" width="1" height="1" fill="#FFFFFF" />

              {/* Mouth */}
              <rect x="34" y="13" width="2" height="1" fill="#261C14" />

              {/* Alternating Paws Walk Cycle */}
              {walkFrame === 0 || walkFrame === 2 ? (
                <>
                  <rect x="14" y="21" width="3" height="7" fill="#261C14" />
                  <rect x="14" y="25" width="2" height="3" fill="#FFFBEA" />
                  <rect x="19" y="21" width="3" height="5" fill="#261C14" />
                  <rect x="19" y="24" width="2" height="2" fill="#FFFBEA" />
                  <rect x="26" y="21" width="3" height="7" fill="#261C14" />
                  <rect x="26" y="25" width="2" height="3" fill="#FFFBEA" />
                  <rect x="31" y="21" width="3" height="5" fill="#261C14" />
                  <rect x="31" y="24" width="2" height="2" fill="#FFFBEA" />
                </>
              ) : (
                <>
                  <rect x="16" y="21" width="3" height="5" fill="#261C14" />
                  <rect x="16" y="24" width="2" height="2" fill="#FFFBEA" />
                  <rect x="17" y="21" width="3" height="7" fill="#261C14" />
                  <rect x="17" y="25" width="2" height="3" fill="#FFFBEA" />
                  <rect x="24" y="21" width="3" height="5" fill="#261C14" />
                  <rect x="24" y="24" width="2" height="2" fill="#FFFBEA" />
                  <rect x="29" y="21" width="3" height="7" fill="#261C14" />
                  <rect x="29" y="25" width="2" height="3" fill="#FFFBEA" />
                </>
              )}
            </motion.svg>
          ) : pose === 'meow' ? (
            // ==========================================
            // POSE 4: MEOWING WITH OPEN MOUTH
            // ==========================================
            <motion.svg
              width="80"
              height="64"
              viewBox="0 0 40 32"
              className="overflow-visible"
              style={{ shapeRendering: 'crispEdges' }}
              animate={{
                rotate: [0, -4, 0, -2, 0],
              }}
              transition={{ duration: 0.35, repeat: 2 }}
            >
              {/* Head Tilted Up Meowing */}
              <rect x="12" y="2" width="4" height="1" fill="#261C14" />
              <rect x="22" y="2" width="4" height="1" fill="#261C14" />
              <rect x="10" y="3" width="3" height="3" fill="#261C14" />
              <rect x="25" y="3" width="3" height="3" fill="#261C14" />
              <rect x="9" y="6" width="2" height="9" fill="#261C14" />
              <rect x="27" y="6" width="2" height="9" fill="#261C14" />

              {/* Fills */}
              <rect x="11" y="5" width="16" height="5" fill="#BA9A93" />
              <rect x="11" y="10" width="16" height="6" fill="#FFFBEA" />
              <rect x="13" y="3" width="3" height="3" fill="#DE7382" />
              <rect x="22" y="3" width="3" height="3" fill="#DE7382" />
              <rect x="10" y="11" width="3" height="3" fill="#DE7382" />
              <rect x="25" y="11" width="3" height="3" fill="#DE7382" />

              {/* Happy Eyes: ^ ^ */}
              <path d="M13 10L14.5 9L16 10" stroke="#261C14" strokeWidth="1.5" fill="none" />
              <path d="M22 10L23.5 9L25 10" stroke="#261C14" strokeWidth="1.5" fill="none" />

              {/* OPEN MEOW MOUTH WITH PINK TONGUE */}
              <rect x="17" y="12" width="4" height="3" fill="#7F1D1D" />
              <rect x="18" y="13" width="2" height="2" fill="#F43F5E" />

              {/* Body */}
              <rect x="13" y="16" width="12" height="12" fill="#BA9A93" />
              <rect x="16" y="16" width="6" height="12" fill="#FFFBEA" />

              {/* Front Paws */}
              <rect x="14" y="25" width="4" height="3" fill="#FFFBEA" />
              <rect x="20" y="25" width="4" height="3" fill="#FFFBEA" />

              {/* Pixel "MEOW!" Puff */}
              <motion.g
                initial={{ opacity: 0, x: 2, scale: 0.8 }}
                animate={{ opacity: [0, 1, 0], x: [-2, -8, -12], scale: [0.8, 1.2, 1.3] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <text x="0" y="8" fill="#EC4899" fontSize="6" fontWeight="bold" fontFamily="monospace">
                  MEOW!
                </text>
              </motion.g>
            </motion.svg>
          ) : pose === 'pet' ? (
            // ==========================================
            // POSE 5: BEING PETTED / PURRING BLISS
            // ==========================================
            <motion.svg
              width="80"
              height="64"
              viewBox="0 0 40 32"
              className="overflow-visible"
              style={{ shapeRendering: 'crispEdges' }}
              animate={{
                y: [0, 1.5, 0], // Leaning into the petting hand
              }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Petting Bliss Head */}
              <rect x="12" y="4" width="14" height="2" fill="#261C14" />
              <rect x="10" y="6" width="2" height="9" fill="#261C14" />
              <rect x="26" y="6" width="2" height="9" fill="#261C14" />

              {/* Ears flattened in pleasure */}
              <rect x="9" y="4" width="4" height="3" fill="#BA9A93" />
              <rect x="25" y="4" width="4" height="3" fill="#BA9A93" />

              {/* Fills */}
              <rect x="12" y="6" width="14" height="4" fill="#BA9A93" />
              <rect x="12" y="10" width="14" height="6" fill="#FFFBEA" />

              {/* Deep Pink Cheeks */}
              <rect x="11" y="11" width="3" height="3" fill="#DE7382" />
              <rect x="24" y="11" width="3" height="3" fill="#DE7382" />

              {/* Blissful Smiling Closed Eyes: ^ ^ */}
              <path d="M13 10L14.5 9L16 10" stroke="#261C14" strokeWidth="1.6" fill="none" />
              <path d="M22 10L23.5 9L25 10" stroke="#261C14" strokeWidth="1.6" fill="none" />

              {/* Inverted V Mouth */}
              <rect x="18" y="13" width="2" height="1" fill="#261C14" />

              {/* Body */}
              <rect x="13" y="16" width="12" height="12" fill="#BA9A93" />
              <rect x="16" y="16" width="6" height="12" fill="#FFFBEA" />

              {/* Front Paws */}
              <rect x="14" y="25" width="4" height="3" fill="#FFFBEA" />
              <rect x="20" y="25" width="4" height="3" fill="#FFFBEA" />

              {/* Floating Hearts */}
              <motion.g
                animate={{ opacity: [0, 1, 0], y: [-2, -8, -12] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <text x="17" y="2" fill="#EC4899" fontSize="7" fontWeight="bold">
                  ♥
                </text>
              </motion.g>
            </motion.svg>
          ) : pose === 'loaf' ? (
            // ==========================================
            // POSE 6: CLASSIC CAT LOAF / SLEEPING
            // ==========================================
            <motion.svg
              width="88"
              height="52"
              viewBox="0 0 44 26"
              className="overflow-visible"
              style={{ shapeRendering: 'crispEdges' }}
              animate={{
                y: [0, -1, 0],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Cat Loaf with Paws Tucked In */}
              <rect x="8" y="6" width="14" height="2" fill="#261C14" />
              <rect x="6" y="8" width="2" height="12" fill="#261C14" />
              <rect x="22" y="8" width="16" height="2" fill="#261C14" />
              <rect x="37" y="10" width="2" height="10" fill="#261C14" />
              <rect x="7" y="20" width="31" height="2" fill="#261C14" />

              {/* Ears */}
              <rect x="9" y="4" width="3" height="3" fill="#DE7382" />
              <rect x="18" y="4" width="3" height="3" fill="#DE7382" />

              {/* Fills */}
              <rect x="8" y="8" width="14" height="5" fill="#BA9A93" />
              <rect x="8" y="13" width="14" height="7" fill="#FFFBEA" />
              <rect x="22" y="10" width="15" height="10" fill="#BA9A93" />
              <rect x="22" y="16" width="15" height="4" fill="#FFFBEA" />

              {/* Sleeping Eyes: ◡ ◡ */}
              <path d="M10 13L11.5 14L13 13" stroke="#261C14" strokeWidth="1.5" fill="none" />
              <path d="M17 13L18.5 14L20 13" stroke="#261C14" strokeWidth="1.5" fill="none" />

              {/* Pink Cheeks */}
              <rect x="8" y="14" width="2" height="2" fill="#DE7382" />
              <rect x="20" y="14" width="2" height="2" fill="#DE7382" />

              {/* Inverted V Mouth */}
              <rect x="14" y="15" width="2" height="1" fill="#261C14" />

              {/* Tail Curled Around Body */}
              <rect x="33" y="16" width="4" height="4" fill="#FFFBEA" />

              {/* Floating Zzz */}
              <motion.g
                animate={{ opacity: [0, 1, 0], y: [-2, -8, -14], x: [0, 2, 4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              >
                <text x="14" y="4" fill="#6366F1" fontSize="5" fontWeight="bold" fontFamily="monospace">
                  z
                </text>
                <text x="18" y="1" fill="#818CF8" fontSize="6" fontWeight="bold" fontFamily="monospace">
                  Z
                </text>
              </motion.g>
            </motion.svg>
          ) : (
            // ==========================================
            // POSE 7: JUMP / POUNCE
            // ==========================================
            <motion.svg
              width="88"
              height="60"
              viewBox="0 0 44 30"
              className="overflow-visible"
              style={{ shapeRendering: 'crispEdges' }}
            >
              {/* Leaping Cat in Mid-Air */}
              <rect x="27" y="2" width="13" height="6" fill="#BA9A93" />
              <rect x="27" y="8" width="13" height="6" fill="#FFFBEA" />
              <rect x="12" y="8" width="16" height="8" fill="#BA9A93" />
              <rect x="16" y="11" width="12" height="5" fill="#FFFBEA" />

              {/* Pink Ears & Cheeks */}
              <rect x="28" y="1" width="3" height="3" fill="#DE7382" />
              <rect x="37" y="1" width="3" height="3" fill="#DE7382" />
              <rect x="26" y="9" width="2" height="3" fill="#DE7382" />
              <rect x="39" y="9" width="2" height="3" fill="#DE7382" />

              {/* Big Eyes */}
              <rect x="30" y="7" width="3" height="3" fill="#261C14" />
              <rect x="30" y="7" width="1" height="1" fill="#FFFFFF" />
              <rect x="36" y="7" width="3" height="3" fill="#261C14" />
              <rect x="36" y="7" width="1" height="1" fill="#FFFFFF" />

              {/* Outstretched Paws in Mid-Air */}
              <rect x="38" y="14" width="5" height="3" fill="#FFFBEA" />
              <rect x="37" y="14" width="6" height="3" stroke="#261C14" strokeWidth="0.8" fill="none" />

              <rect x="6" y="16" width="6" height="3" fill="#FFFBEA" />
              <rect x="5" y="16" width="7" height="3" stroke="#261C14" strokeWidth="0.8" fill="none" />

              {/* Tail in Air */}
              <rect x="8" y="5" width="2" height="8" fill="#BA9A93" />
              <rect x="6" y="3" width="3" height="3" fill="#FFFBEA" />
            </motion.svg>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
