import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X, Heart, Moon, Sun, Play, Fish, Compass, Navigation, Crosshair } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CAT_ANIMATIONS, SpriteFrame } from './catSpriteData';

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
  "End-to-end verified with feline precision! 🎯",
];

export type CatAction =
  | 'sploot'
  | 'sit'
  | 'walk'
  | 'run'
  | 'wash'
  | 'sleep'
  | 'meow'
  | 'pet'
  | 'startled';

export type MascotMode = 'patrol' | 'chase' | 'laser';

export const CatMascot: React.FC = () => {
  // Navigation & Position State
  const [catPos, setCatPos] = useState<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth * 0.75 : 800,
    y: typeof window !== 'undefined' ? window.innerHeight - 90 : 600,
  });
  const [direction, setDirection] = useState<1 | -1>(-1); // 1 = right, -1 = left
  const [mode, setMode] = useState<MascotMode>('chase'); // Default to popular Oneko chase mode!
  const [action, setAction] = useState<CatAction>('sploot');
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [speech, setSpeech] = useState<string | null>("Meow! I'm Mochi, Rishi's QA cat! 🐾 Move your mouse!");
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [treatFalling, setTreatFalling] = useState<boolean>(false);
  const [laserPos, setLaserPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    try {
      return localStorage.getItem('cat_minimized') === 'true';
    } catch {
      return false;
    }
  });

  const mousePosRef = useRef<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.5 : 400,
  });
  const idleTimerRef = useRef<number>(0);
  const speechTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasSleepingRef = useRef<boolean>(false);

  // Web Audio 8-bit kitten sound synthesizer
  const playSound = useCallback((type: 'meow' | 'purr' | 'jump' | 'chomp' | 'surprise') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'meow') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(840, now + 0.09);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.26);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.07);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.26);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.26);
      } else if (type === 'jump') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(340, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
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
      } else if (type === 'surprise') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(980, now + 0.1);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.12);
      }
    } catch {
      // AudioContext policy
    }
  }, [soundEnabled]);

  const showSpeech = useCallback((text: string, duration = 4000) => {
    setSpeech(text);
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setSpeech(null);
    }, duration);
  }, []);

  // Frame ticker customized by action for authentic retro cadence
  useEffect(() => {
    const delays: Record<CatAction, number> = {
      run: 100,      // Fast sprint
      walk: 140,     // Steady trot
      sploot: 200,   // Belly crawl / stretch
      wash: 220,     // Grooming face
      sleep: 360,    // Slow breathing
      meow: 180,     // Meow cycles
      pet: 140,      // Purring vibration
      sit: 280,      // Idle sitting
      startled: 300, // Surprise
    };

    const delay = delays[action] || 160;
    const timer = setInterval(() => {
      setFrameIndex((f) => f + 1);
    }, delay);

    return () => clearInterval(timer);
  }, [action]);

  // Mouse Listener for Chase & Laser Modes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (mode === 'laser') {
        setLaserPos({ x: e.clientX, y: e.clientY });
      }
      idleTimerRef.current = 0; // reset idle
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mode]);

  // Main Movement & Animation State Tick Loop (Runs every ~90ms for fluid responsiveness)
  useEffect(() => {
    if (isMinimized || isHovered) return;

    const interval = setInterval(() => {
      if (mode === 'chase' || mode === 'laser') {
        // ONEKO / LASER STYLE: Follow mouse pointer across screen
        const targetX = mousePosRef.current.x;
        const targetY = mousePosRef.current.y;
        const dx = targetX - catPos.x;
        const dy = targetY - catPos.y;
        const dist = Math.hypot(dx, dy);

        // Turn towards target
        if (Math.abs(dx) > 10) {
          setDirection(dx >= 0 ? 1 : -1);
        }

        if (dist > 52) {
          // If cat was asleep or splooting, trigger quick alert / startled animation
          if (wasSleepingRef.current) {
            wasSleepingRef.current = false;
            setAction('startled');
            playSound('surprise');
            return;
          }

          if (dist > 150) {
            // Far away: FAST SPRINT RUN
            const speed = Math.min(dist * 0.16, 16);
            const nextX = catPos.x + (dx / dist) * speed;
            const nextY = catPos.y + (dy / dist) * speed;
            setCatPos({ x: nextX, y: nextY });
            setAction('run');
          } else {
            // Medium distance: TROTTING WALK
            const speed = Math.min(dist * 0.12, 9);
            const nextX = catPos.x + (dx / dist) * speed;
            const nextY = catPos.y + (dy / dist) * speed;
            setCatPos({ x: nextX, y: nextY });
            setAction('walk');
          }
        } else {
          // Arrived at target!
          idleTimerRef.current += 1;
          const idleCount = idleTimerRef.current;

          if (mode === 'laser') {
            // In laser mode, pounce on the dot!
            setAction('sploot');
          } else {
            // Natural progression of cat behaviors near cursor:
            if (idleCount < 4) {
              setAction('sit'); // Alert sitting & looking at cursor
            } else if (idleCount < 9) {
              setAction('wash'); // Grooming face with paw
            } else if (idleCount < 16) {
              setAction('sploot'); // Iconic belly stretch crawl from photo!
            } else {
              setAction('sleep'); // Cozy loaf with floating Zzz
              wasSleepingRef.current = true;
            }
          }
        }
      } else {
        // PATROL MODE: Prowl along the bottom edge of viewport
        const groundY = window.innerHeight - 85;

        if (action === 'walk') {
          setCatPos((prev) => {
            const nextX = prev.x + 7 * direction;
            if (nextX > window.innerWidth - 110) {
              setDirection(-1);
              return { x: window.innerWidth - 110, y: groundY };
            } else if (nextX < 40) {
              setDirection(1);
              return { x: 40, y: groundY };
            }
            return { x: nextX, y: groundY };
          });

          // Chance to stop and stretch / sit / wash
          if (Math.random() < 0.07) {
            const rand = Math.random();
            if (rand < 0.45) {
              setAction('sploot'); // The reference image pose!
            } else if (rand < 0.75) {
              setAction('sit');
            } else {
              setAction('wash');
            }
          }
        } else if (action === 'sploot' || action === 'sit' || action === 'wash' || action === 'sleep') {
          // Stay in pose for a few seconds then resume walking
          if (Math.random() < 0.05) {
            setAction('walk');
          }
        }
      }
    }, 90);

    return () => clearInterval(interval);
  }, [mode, catPos, direction, action, isMinimized, isHovered, playSound]);

  // Occasional witty banter
  useEffect(() => {
    if (isMinimized) return;
    const interval = setInterval(() => {
      if (!speech && Math.random() > 0.45 && action !== 'sleep') {
        const randomQuote = CAT_DIALOGUES[Math.floor(Math.random() * CAT_DIALOGUES.length)];
        showSpeech(randomQuote, 4200);
      }
    }, 24000);
    return () => clearInterval(interval);
  }, [isMinimized, speech, action, showSpeech]);

  // Click handler (Jump & Meow with confetti)
  const handleCatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('meow');
    setAction('meow');

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
        particleCount: 18,
        startVelocity: 16,
        spread: 60,
        origin: { x: xRatio, y: yRatio },
        colors: ['#C7A99D', '#FDFFE3', '#DE7382', '#F43F5E', '#10B981'],
        disableForReducedMotion: true,
      });
    } catch {
      // safe
    }

    const randomQuote = CAT_DIALOGUES[Math.floor(Math.random() * CAT_DIALOGUES.length)];
    showSpeech(randomQuote, 4000);

    setTimeout(() => {
      setAction('sploot');
    }, 1400);
  };

  // Hover Petting
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (action !== 'sleep') {
      setAction('pet');
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (action === 'pet') {
      setAction('sploot');
    }
  };

  // Toss Fish Treat
  const handleTossTreat = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (treatFalling) return;
    setTreatFalling(true);
    setAction('run');
    playSound('jump');
    showSpeech("Ooh! Fresh fish for passing test cases! 🐟", 3000);

    setTimeout(() => {
      playSound('chomp');
      setTreatFalling(false);
      setAction('pet');
      showSpeech("*Crunch crunch* Purr... 100% delicious! Good SDET cat! 🐾", 3500);
      setTimeout(() => setAction('sploot'), 2000);
    }, 1100);
  };

  // Toggle Sleep / Sploot
  const toggleSleep = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (action === 'sleep') {
      setAction('sploot');
      playSound('meow');
      showSpeech("Stretching out into a cute sploot! 🐱", 3000);
    } else {
      setAction('sleep');
      showSpeech("Loafing around while regression suite runs... Zzz 💤", 3500);
    }
  };

  // Cycle Mascot Modes (Chase -> Laser -> Patrol)
  const cycleNavigationMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mode === 'chase') {
      setMode('laser');
      showSpeech("Laser Pointer Activated! Move mouse to play! 🔴✨", 3500);
      playSound('meow');
    } else if (mode === 'laser') {
      setMode('patrol');
      setCatPos((prev) => ({ x: prev.x, y: window.innerHeight - 85 }));
      showSpeech("Patrolling the bottom of your screen! 🐱", 3000);
    } else {
      setMode('chase');
      showSpeech("Oneko Cursor Chasing Active! Move your mouse! 🐾", 3500);
      playSound('meow');
    }
  };

  // Manual Meow
  const handleManualMeow = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('meow');
    setAction('meow');
    showSpeech("MEOW! All release checks purr-fectly green! 🐱✅", 3000);
    setTimeout(() => setAction('sploot'), 1400);
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

  // Retrieve current active sprite frame
  const framesList: SpriteFrame[] = CAT_ANIMATIONS[action] || CAT_ANIMATIONS.sploot;
  const currentSprite: SpriteFrame = framesList[frameIndex % framesList.length];

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
    <div className="fixed inset-0 pointer-events-none z-40 select-none overflow-hidden">
      {/* Laser Pointer Dot in Laser Mode */}
      {mode === 'laser' && (
        <div
          className="fixed pointer-events-none z-50 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_#EF4444] animate-ping"
          style={{ left: laserPos.x - 6, top: laserPos.y - 6 }}
        />
      )}

      {/* Dynamic Positioned Animated Cat */}
      <motion.div
        className="absolute pointer-events-auto cursor-pointer"
        animate={{
          x: catPos.x,
          y: catPos.y,
        }}
        transition={{
          x: { duration: 0.22, ease: 'linear' },
          y: { duration: 0.22, ease: 'easeOut' },
        }}
        style={{ left: 0, top: 0 }}
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
              className="absolute -top-9 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 rounded-full bg-white/95 dark:bg-apple-dark-surface/95 backdrop-blur-md border border-black/10 dark:border-white/15 shadow-apple-sm z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={cycleNavigationMode}
                title={
                  mode === 'chase'
                    ? 'Mode: Mouse Chase (Click for Laser)'
                    : mode === 'laser'
                    ? 'Mode: Laser Toy (Click for Patrol)'
                    : 'Mode: Bottom Patrol (Click for Chase)'
                }
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-emerald-500 transition-colors"
              >
                {mode === 'chase' ? (
                  <Compass className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                ) : mode === 'laser' ? (
                  <Crosshair className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                ) : (
                  <Navigation className="w-3.5 h-3.5 text-emerald-500" />
                )}
              </button>

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
                onClick={toggleSleep}
                title={action === 'sleep' ? 'Wake up into Sploot' : 'Cozy Loaf mode 💤'}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-indigo-500 transition-colors"
              >
                {action === 'sleep' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => setSoundEnabled((prev) => !prev)}
                title={soundEnabled ? 'Mute Sounds' : 'Enable 8-Bit Meows 🔊'}
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

        {/* AUTHENTIC 2D PIXEL-ART CAT SPRITE WITH FRAME-BY-FRAME ANIMATION */}
        <motion.div
          className="relative inline-block"
          style={{ transformOrigin: 'bottom center' }}
          animate={{
            scaleX: direction,
          }}
          transition={{ duration: 0.18 }}
        >
          {/* Ground Soft Ambient Shadow */}
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-black/25 dark:bg-black/45 blur-[2px] pointer-events-none"
            style={{
              width: action === 'sploot' ? 96 : action === 'run' ? 90 : 70,
              height: 6,
            }}
          />

          {/* RENDER THE ACTIVE FRAME FROM THE PRE-COMPILED PIXEL SPRITE ENGINE */}
          <svg
            width={currentSprite.width * 2.1}
            height={currentSprite.height * 2.1}
            viewBox={`0 0 ${currentSprite.width} ${currentSprite.height}`}
            className="overflow-visible select-none drop-shadow-sm"
            style={{ shapeRendering: 'crispEdges' }}
          >
            {currentSprite.rects.map((r, i) => (
              <rect
                key={i}
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                fill={r.fill}
              />
            ))}
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};
