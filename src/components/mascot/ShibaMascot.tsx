import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X, Heart, Sparkles, Moon, Sun, Cookie, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

// Fun SDET dialogues
const SHIBA_DIALOGUES = [
  "Woof! 100% test coverage detected! 🐾",
  "Paws-ing to inspect your DOM tree... Looks solid! 🧐",
  "Zero bugs escaped this sprint! Good job! 🐶✨",
  "Need an SDET? Rishi is the goodest engineer! 🐾",
  "Automated testing pipeline: ALL GREEN! 🚀",
  "Sniffing for memory leaks... Clean! 🦴",
  "Click me again for more automated cuddles! ❤️",
  "Running nightly regression matrix... Passed! 🟢",
  "Continuous Integration? More like Continuous Goodness! ✨",
  "Playwright & Selenium verified by doggo engineering! 🐕",
  "10/10 would deploy this build to production! 🚀",
  "Did someone say treats or test cases? 🦴",
];

export type ShibaPose = 'loaf' | 'sit' | 'walk' | 'bark' | 'pet' | 'jump';

export const ShibaMascot: React.FC = () => {
  const [pose, setPose] = useState<ShibaPose>('walk');
  const [positionX, setPositionX] = useState<number>(75); // % from left
  const [direction, setDirection] = useState<1 | -1>(-1); // 1: right, -1: left
  const [speech, setSpeech] = useState<string | null>("Woof! I'm Pixel, your QA pup! 🐾");
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    try {
      return localStorage.getItem('shiba_minimized') === 'true';
    } catch {
      return false;
    }
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [walkFrame, setWalkFrame] = useState<number>(0);
  const [treatFalling, setTreatFalling] = useState<boolean>(false);

  const speechTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 8-Bit Retro Puppy Sound Synthesizer via Web Audio API
  const playSound = useCallback((type: 'woof' | 'bark' | 'jump' | 'chomp' | 'whimper') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'woof' || type === 'bark') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(560, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'jump') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.14);
      } else if (type === 'chomp') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(240, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
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

  // Walk cycle frame ticker
  useEffect(() => {
    if (pose !== 'walk') return;
    const interval = setInterval(() => {
      setWalkFrame((f) => (f + 1) % 4);
    }, 180);
    return () => clearInterval(interval);
  }, [pose]);

  // Autonomous Behavior Loop (Walking, Sitting, Loafing)
  useEffect(() => {
    if (isMinimized || isHovered || pose === 'loaf' || pose === 'jump' || pose === 'bark') return;

    const interval = setInterval(() => {
      const rand = Math.random();

      if (rand < 0.35) {
        // Sit and look around
        setPose('sit');
        setTimeout(() => {
          setPose((p) => (p === 'sit' ? 'walk' : p));
        }, 3200 + Math.random() * 2000);
      } else if (rand < 0.5) {
        // Rest in a cute loaf pose
        setPose('loaf');
        setTimeout(() => {
          setPose((p) => (p === 'loaf' ? 'sit' : p));
        }, 5000 + Math.random() * 3000);
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
        const randomQuote = SHIBA_DIALOGUES[Math.floor(Math.random() * SHIBA_DIALOGUES.length)];
        showSpeech(randomQuote, 4500);
      }
    }, 24000);
    return () => clearInterval(interval);
  }, [isMinimized, speech, pose, showSpeech]);

  // Click handler: Bark / Jump with confetti
  const handleShibaClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Trigger Bark sound & animation
    playSound('bark');
    setPose('jump');

    // Heart particles
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: rect.width / 2 + (Math.random() * 20 - 10),
      y: -10,
    };
    setHearts((prev) => [...prev.slice(-3), newHeart]);

    // Mini confetti
    try {
      const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
      const yRatio = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 16,
        startVelocity: 16,
        spread: 60,
        origin: { x: xRatio, y: yRatio },
        colors: ['#FFA733', '#FFFFFF', '#000000', '#F43F5E', '#10B981'],
        disableForReducedMotion: true,
      });
    } catch {
      // safe
    }

    const randomQuote = SHIBA_DIALOGUES[Math.floor(Math.random() * SHIBA_DIALOGUES.length)];
    showSpeech(randomQuote, 4000);

    setTimeout(() => {
      setPose('bark');
      setTimeout(() => {
        setPose('sit');
      }, 1000);
    }, 600);
  };

  // Hover: Petting reaction
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (pose !== 'loaf') {
      setPose('pet');
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (pose === 'pet') {
      setPose('sit');
    }
  };

  // Toss Treat
  const handleTossTreat = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (treatFalling) return;
    setTreatFalling(true);
    setPose('jump');
    playSound('jump');
    showSpeech("Ooh! Catching the snack! 🦴", 3000);

    setTimeout(() => {
      playSound('chomp');
      setTreatFalling(false);
      setPose('pet');
      showSpeech("*Nom nom* 100% delicious! Good SDET companion! 🐾", 3500);
      setTimeout(() => setPose('sit'), 2000);
    }, 1100);
  };

  // Toggle Loaf / Sleep
  const toggleLoaf = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pose === 'loaf') {
      setPose('sit');
      playSound('woof');
      showSpeech("Yawn... Back on QA patrol! 🐕", 3000);
    } else {
      setPose('loaf');
      showSpeech("Loafing like in the pixel drawing... Zzz 💤", 3500);
    }
  };

  // Trigger Bark
  const handleManualBark = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('bark');
    setPose('bark');
    showSpeech("BARK! All test assertions verified! 🐶✅", 3000);
    setTimeout(() => setPose('sit'), 1400);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
    try {
      localStorage.setItem('shiba_minimized', 'true');
    } catch {
      // safe
    }
  };

  const handleRestore = () => {
    setIsMinimized(false);
    try {
      localStorage.setItem('shiba_minimized', 'false');
    } catch {
      // safe
    }
    showSpeech("I'm back! Ready to test! 🐾", 3000);
    playSound('woof');
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
        title="Summon Pixel Shiba"
      >
        <div className="w-7 h-7 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-500">
          <span className="text-base select-none">🐕</span>
        </div>
        <span className="text-xs font-semibold text-apple-light-primary dark:text-apple-dark-primary pr-2">
          Summon Pixel
        </span>
      </motion.button>
    );
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 pointer-events-none z-40 select-none overflow-visible"
      style={{ height: 160 }}
    >
      {/* Floating Animated Shiba along bottom positionX */}
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
        onClick={handleShibaClick}
      >
        {/* Falling Bone Treat */}
        <AnimatePresence>
          {treatFalling && (
            <motion.div
              initial={{ y: -70, opacity: 0, rotate: -45 }}
              animate={{ y: -6, opacity: 1, rotate: 180 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1.0, ease: 'easeIn' }}
              className="absolute left-1/2 -translate-x-1/2 -top-12 text-2xl z-30 pointer-events-none"
            >
              🦴
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
              className="absolute text-red-500 pointer-events-none z-30"
              style={{ left: h.x, top: h.y }}
            >
              <Heart className="w-4 h-4 fill-red-500" />
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
                onClick={handleManualBark}
                title="Bark / Speak 🐕"
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-amber-600 transition-colors"
              >
                <Play className="w-3 h-3 fill-amber-500" />
              </button>

              <button
                type="button"
                onClick={handleTossTreat}
                title="Toss Treat 🦴"
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-amber-500 transition-colors"
              >
                <Cookie className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={toggleLoaf}
                title={pose === 'loaf' ? 'Wake up' : 'Loaf like in the picture 💤'}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-indigo-500 transition-colors"
              >
                {pose === 'loaf' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => setSoundEnabled((prev) => !prev)}
                title={soundEnabled ? 'Mute Sounds' : 'Enable 8-Bit Bark & Chimes 🔊'}
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

        {/* AUTHENTIC 2D PIXEL-ART SHIBA SPRITE (EXACTLY MATCHING USER'S IMAGE) */}
        <motion.div
          className="relative inline-block"
          style={{ transformOrigin: 'bottom center' }}
          animate={{
            scaleX: direction,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Ground Soft Ambient Shadow */}
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-black/25 dark:bg-black/50 blur-[2px] pointer-events-none"
            style={{
              width: pose === 'loaf' ? 84 : 68,
              height: 7,
            }}
          />

          {/* RENDER THE EXACT PIXEL ART ACCORDING TO CURRENT POSE */}
          {pose === 'loaf' ? (
            // ==========================================
            // POSE 1: LOAF / SLEEP (EXACT MATCH TO REFERENCE PHOTO)
            // ==========================================
            <motion.svg
              width="90"
              height="52"
              viewBox="0 0 45 26"
              className="overflow-visible"
              style={{ shapeRendering: 'crispEdges' }}
              animate={{
                y: [0, -1, 0], // Gentle breathing
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Reference image: Flat horizontal loaf shiba with snout resting on ground, curled tail */}

              {/* BLACK OUTLINE (1px crisp borders) */}
              {/* Head outline */}
              <rect x="7" y="6" width="6" height="1" fill="#000" />
              <rect x="6" y="7" width="2" height="1" fill="#000" />
              <rect x="12" y="7" width="2" height="1" fill="#000" />
              <rect x="5" y="8" width="2" height="4" fill="#000" />
              <rect x="13" y="8" width="2" height="3" fill="#000" />
              <rect x="4" y="12" width="2" height="3" fill="#000" />
              <rect x="3" y="15" width="2" height="7" fill="#000" />
              <rect x="4" y="22" width="37" height="2" fill="#000" /> {/* Bottom baseline */}

              {/* Ears outline */}
              <rect x="6" y="5" width="2" height="2" fill="#000" />
              <rect x="8" y="4" width="2" height="2" fill="#000" />
              <rect x="10" y="5" width="2" height="3" fill="#000" />
              <rect x="16" y="5" width="3" height="2" fill="#000" />
              <rect x="18" y="7" width="2" height="4" fill="#000" />

              {/* Back / Body outline */}
              <rect x="19" y="8" width="13" height="2" fill="#000" />
              <rect x="31" y="9" width="4" height="2" fill="#000" />
              <rect x="34" y="11" width="2" height="4" fill="#000" />
              <rect x="33" y="15" width="2" height="4" fill="#000" />

              {/* Tail outline (curled on back) */}
              <rect x="35" y="8" width="4" height="2" fill="#000" />
              <rect x="38" y="9" width="3" height="2" fill="#000" />
              <rect x="40" y="11" width="2" height="5" fill="#000" />
              <rect x="38" y="15" width="3" height="3" fill="#000" />
              <rect x="35" y="17" width="3" height="2" fill="#000" />
              <rect x="37" y="12" width="2" height="3" fill="#000" /> {/* inner tail curl */}

              {/* Tucked Paws outline */}
              <rect x="25" y="17" width="5" height="1" fill="#000" />
              <rect x="24" y="18" width="1" height="4" fill="#000" />
              <rect x="30" y="18" width="1" height="4" fill="#000" />

              {/* ORANGE COAT FILL (#FFA733) */}
              <rect x="7" y="7" width="5" height="8" fill="#FFA733" />
              <rect x="5" y="11" width="12" height="6" fill="#FFA733" />
              <rect x="12" y="8" width="22" height="11" fill="#FFA733" />
              <rect x="34" y="12" width="2" height="6" fill="#FFA733" />
              {/* Back hind fold */}
              <rect x="32" y="18" width="4" height="4" fill="#FFA733" />
              {/* Ear orange */}
              <rect x="7" y="6" width="3" height="2" fill="#FFA733" />
              <rect x="17" y="7" width="2" height="3" fill="#FFA733" />
              {/* Tail orange */}
              <rect x="36" y="13" width="3" height="4" fill="#FFA733" />

              {/* WHITE CHEST, SNOUT & UNDERBELLY (#FFFFFF) */}
              {/* Snout white patch */}
              <rect x="5" y="15" width="6" height="7" fill="#FFFFFF" />
              <rect x="11" y="16" width="9" height="6" fill="#FFFFFF" />
              {/* White eyebrows */}
              <rect x="8" y="13" width="2" height="2" fill="#FFFFFF" />
              <rect x="14" y="13" width="2" height="2" fill="#FFFFFF" />
              {/* Ear white fluff */}
              <rect x="17" y="8" width="1" height="3" fill="#FFFFFF" />
              {/* Tail white fluffy curl */}
              <rect x="36" y="10" width="3" height="3" fill="#FFFFFF" />
              <rect x="38" y="11" width="2" height="4" fill="#FFFFFF" />
              {/* Front tucked paw white */}
              <rect x="25" y="18" width="5" height="4" fill="#FFFFFF" />
              {/* Back foot white */}
              <rect x="36" y="20" width="3" height="2" fill="#FFFFFF" />

              {/* BLACK NOSE (#000) */}
              <rect x="4" y="16" width="3" height="3" fill="#000" />
              <rect x="5" y="19" width="1" height="1" fill="#000" />

              {/* SLEEPING CLOSED EYE (Cute curved line like photo: ◡) */}
              <rect x="9" y="16" width="3" height="1" fill="#000" />
              <rect x="10" y="17" width="2" height="1" fill="#000" />

              {/* Gentle floating Zzz */}
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
          ) : pose === 'sit' ? (
            // ==========================================
            // POSE 2: SITTING UPRIGHT & ALERT
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
              {/* Upright Pixel Sitting Shiba */}
              {/* Outline */}
              <rect x="14" y="3" width="4" height="2" fill="#000" />
              <rect x="24" y="3" width="4" height="2" fill="#000" />
              <rect x="12" y="5" width="2" height="8" fill="#000" />
              <rect x="28" y="5" width="2" height="8" fill="#000" />
              <rect x="8" y="12" width="4" height="2" fill="#000" />
              <rect x="7" y="14" width="2" height="5" fill="#000" />
              <rect x="9" y="19" width="3" height="2" fill="#000" />
              <rect x="11" y="21" width="2" height="9" fill="#000" />
              <rect x="13" y="30" width="22" height="2" fill="#000" /> {/* Bottom */}
              <rect x="29" y="13" width="6" height="2" fill="#000" />
              <rect x="33" y="15" width="2" height="15" fill="#000" />

              {/* Tail outline wagging */}
              <motion.g
                animate={{ rotate: [-6, 12, -6] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{ originX: '32px', originY: '20px' }}
              >
                <rect x="33" y="10" width="4" height="2" fill="#000" />
                <rect x="36" y="12" width="2" height="5" fill="#000" />
                <rect x="33" y="17" width="3" height="2" fill="#000" />
                <rect x="34" y="12" width="2" height="5" fill="#FFFFFF" />
                <rect x="32" y="14" width="2" height="3" fill="#FFA733" />
              </motion.g>

              {/* ORANGE COAT */}
              <rect x="14" y="5" width="14" height="8" fill="#FFA733" />
              <rect x="12" y="13" width="18" height="8" fill="#FFA733" />
              <rect x="20" y="21" width="13" height="9" fill="#FFA733" />
              {/* Ears */}
              <rect x="15" y="4" width="2" height="2" fill="#FFA733" />
              <rect x="25" y="4" width="2" height="2" fill="#FFA733" />

              {/* WHITE CHEST, SNOUT & SOCKS */}
              <rect x="9" y="14" width="6" height="5" fill="#FFFFFF" />
              <rect x="15" y="15" width="7" height="13" fill="#FFFFFF" />
              <rect x="13" y="26" width="4" height="4" fill="#FFFFFF" />
              <rect x="21" y="26" width="4" height="4" fill="#FFFFFF" />

              {/* White eyebrow dots */}
              <rect x="15" y="8" width="2" height="2" fill="#FFFFFF" />
              <rect x="24" y="8" width="2" height="2" fill="#FFFFFF" />

              {/* NOSE */}
              <rect x="7" y="14" width="3" height="3" fill="#000" />

              {/* OPEN HAPPY EYES */}
              <rect x="16" y="11" width="2" height="3" fill="#000" />
              <rect x="16" y="11" width="1" height="1" fill="#FFF" />
              <rect x="24" y="11" width="2" height="3" fill="#000" />
              <rect x="24" y="11" width="1" height="1" fill="#FFF" />

              {/* RED COLLAR & GOLD MEDAL */}
              <rect x="15" y="19" width="14" height="2" fill="#EF4444" />
              <rect x="18" y="21" width="2" height="2" fill="#F59E0B" />
            </motion.svg>
          ) : pose === 'walk' ? (
            // ==========================================
            // POSE 3: WALKING / TROTTING CYCLE
            // ==========================================
            <motion.svg
              width="86"
              height="60"
              viewBox="0 0 43 30"
              className="overflow-visible"
              style={{ shapeRendering: 'crispEdges' }}
              animate={{
                y: walkFrame % 2 === 0 ? 0 : -2, // Bouncing gait
              }}
              transition={{ duration: 0.18 }}
            >
              {/* Walking Body Outline */}
              <rect x="10" y="3" width="4" height="2" fill="#000" />
              <rect x="18" y="3" width="3" height="2" fill="#000" />
              <rect x="8" y="5" width="2" height="7" fill="#000" />
              <rect x="21" y="5" width="2" height="4" fill="#000" />
              <rect x="23" y="9" width="13" height="2" fill="#000" />
              <rect x="36" y="11" width="2" height="6" fill="#000" />
              <rect x="4" y="11" width="4" height="2" fill="#000" />
              <rect x="3" y="13" width="2" height="5" fill="#000" />
              <rect x="5" y="18" width="6" height="2" fill="#000" />

              {/* Tail wagging bounce */}
              <g style={{ transform: walkFrame % 2 === 0 ? 'translateY(0)' : 'translateY(-1px)' }}>
                <rect x="34" y="5" width="5" height="2" fill="#000" />
                <rect x="38" y="7" width="2" height="5" fill="#000" />
                <rect x="35" y="12" width="3" height="2" fill="#000" />
                <rect x="36" y="7" width="2" height="4" fill="#FFFFFF" />
                <rect x="34" y="9" width="2" height="3" fill="#FFA733" />
              </g>

              {/* ORANGE BODY */}
              <rect x="10" y="5" width="11" height="8" fill="#FFA733" />
              <rect x="12" y="11" width="23" height="9" fill="#FFA733" />

              {/* WHITE SNOUT & CHEST */}
              <rect x="5" y="13" width="6" height="5" fill="#FFFFFF" />
              <rect x="11" y="14" width="7" height="6" fill="#FFFFFF" />

              {/* Eyebrow dots */}
              <rect x="11" y="7" width="2" height="2" fill="#FFFFFF" />
              <rect x="17" y="7" width="2" height="2" fill="#FFFFFF" />

              {/* Black Nose */}
              <rect x="3" y="13" width="3" height="3" fill="#000" />

              {/* Eye */}
              <rect x="12" y="9" width="2" height="3" fill="#000" />
              <rect x="12" y="9" width="1" height="1" fill="#FFF" />

              {/* Red Collar */}
              <rect x="11" y="17" width="9" height="2" fill="#EF4444" />

              {/* LEGS: 4-Frame alternating trot */}
              {walkFrame === 0 || walkFrame === 2 ? (
                <>
                  {/* Leg 1 forward */}
                  <rect x="11" y="20" width="3" height="7" fill="#000" />
                  <rect x="11" y="20" width="2" height="5" fill="#FFA733" />
                  <rect x="11" y="25" width="2" height="2" fill="#FFFFFF" />
                  {/* Leg 2 back */}
                  <rect x="17" y="20" width="3" height="6" fill="#000" />
                  <rect x="17" y="20" width="2" height="4" fill="#FFA733" />
                  <rect x="17" y="24" width="2" height="2" fill="#FFFFFF" />
                  {/* Hind 1 */}
                  <rect x="27" y="20" width="3" height="7" fill="#000" />
                  <rect x="27" y="20" width="2" height="5" fill="#FFA733" />
                  <rect x="27" y="25" width="2" height="2" fill="#FFFFFF" />
                  {/* Hind 2 */}
                  <rect x="32" y="20" width="3" height="6" fill="#000" />
                  <rect x="32" y="20" width="2" height="4" fill="#FFA733" />
                  <rect x="32" y="24" width="2" height="2" fill="#FFFFFF" />
                </>
              ) : (
                <>
                  {/* Leg 1 back */}
                  <rect x="13" y="20" width="3" height="6" fill="#000" />
                  <rect x="13" y="20" width="2" height="4" fill="#FFA733" />
                  <rect x="13" y="24" width="2" height="2" fill="#FFFFFF" />
                  {/* Leg 2 forward */}
                  <rect x="15" y="20" width="3" height="7" fill="#000" />
                  <rect x="15" y="20" width="2" height="5" fill="#FFA733" />
                  <rect x="15" y="25" width="2" height="2" fill="#FFFFFF" />
                  {/* Hind 1 back */}
                  <rect x="25" y="20" width="3" height="6" fill="#000" />
                  <rect x="25" y="20" width="2" height="4" fill="#FFA733" />
                  <rect x="25" y="24" width="2" height="2" fill="#FFFFFF" />
                  {/* Hind 2 forward */}
                  <rect x="30" y="20" width="3" height="7" fill="#000" />
                  <rect x="30" y="20" width="2" height="5" fill="#FFA733" />
                  <rect x="30" y="25" width="2" height="2" fill="#FFFFFF" />
                </>
              )}
            </motion.svg>
          ) : pose === 'bark' ? (
            // ==========================================
            // POSE 4: BARKING ("WOOF!") WITH OPEN MOUTH & SOUNDWAVES
            // ==========================================
            <motion.svg
              width="86"
              height="64"
              viewBox="0 0 43 32"
              className="overflow-visible"
              style={{ shapeRendering: 'crispEdges' }}
              animate={{
                rotate: [0, -6, 0, -4, 0],
              }}
              transition={{ duration: 0.35, repeat: 2 }}
            >
              {/* Head tilted up barking */}
              <rect x="12" y="2" width="4" height="2" fill="#000" />
              <rect x="20" y="2" width="3" height="2" fill="#000" />
              <rect x="10" y="4" width="2" height="8" fill="#000" />
              <rect x="23" y="4" width="2" height="5" fill="#000" />
              <rect x="25" y="9" width="13" height="2" fill="#000" />
              <rect x="37" y="11" width="2" height="8" fill="#000" />

              {/* Open mouth outline */}
              <rect x="3" y="9" width="7" height="2" fill="#000" />
              <rect x="2" y="11" width="2" height="4" fill="#000" />
              <rect x="4" y="15" width="4" height="2" fill="#000" />
              <rect x="7" y="17" width="4" height="2" fill="#000" />

              {/* ORANGE */}
              <rect x="12" y="4" width="11" height="8" fill="#FFA733" />
              <rect x="13" y="11" width="23" height="10" fill="#FFA733" />

              {/* WHITE SNOUT */}
              <rect x="4" y="11" width="6" height="4" fill="#FFFFFF" />
              <rect x="8" y="15" width="5" height="4" fill="#FFFFFF" />

              {/* OPEN BARKING MOUTH WITH TONGUE */}
              <rect x="4" y="13" width="4" height="3" fill="#991B1B" />
              <rect x="5" y="14" width="2" height="2" fill="#F43F5E" />

              {/* Black Nose */}
              <rect x="2" y="10" width="3" height="3" fill="#000" />

              {/* Happy squinting eye: ^ */}
              <path d="M12 8L13 7L14 8" stroke="#000" strokeWidth="1.5" fill="none" />

              {/* Red Collar */}
              <rect x="12" y="17" width="9" height="2" fill="#EF4444" />

              {/* Legs planted firmly */}
              <rect x="12" y="21" width="3" height="9" fill="#000" />
              <rect x="12" y="21" width="2" height="6" fill="#FFA733" />
              <rect x="12" y="27" width="2" height="3" fill="#FFFFFF" />

              <rect x="29" y="21" width="3" height="9" fill="#000" />
              <rect x="29" y="21" width="2" height="6" fill="#FFA733" />
              <rect x="29" y="27" width="2" height="3" fill="#FFFFFF" />

              {/* Tail Wagging */}
              <rect x="36" y="6" width="4" height="2" fill="#000" />
              <rect x="39" y="8" width="2" height="5" fill="#000" />
              <rect x="37" y="8" width="2" height="4" fill="#FFFFFF" />

              {/* Animated Pixel Bark Waves / "WOOF!" */}
              <motion.g
                initial={{ opacity: 0, x: 2, scale: 0.8 }}
                animate={{ opacity: [0, 1, 0], x: [-2, -8, -14], scale: [0.8, 1.2, 1.4] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <text x="0" y="8" fill="#F59E0B" fontSize="7" fontWeight="bold" fontFamily="monospace">
                  WOOF!
                </text>
              </motion.g>
            </motion.svg>
          ) : pose === 'pet' ? (
            // ==========================================
            // POSE 5: BEING PETTED / BLISSFUL SMILE & BLUSHING
            // ==========================================
            <motion.svg
              width="82"
              height="58"
              viewBox="0 0 41 29"
              className="overflow-visible"
              style={{ shapeRendering: 'crispEdges' }}
              animate={{
                y: [0, 1.5, 0], // Leaning into the pet
              }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Petting bliss outline */}
              <rect x="12" y="5" width="4" height="2" fill="#000" />
              <rect x="20" y="5" width="3" height="2" fill="#000" />
              <rect x="10" y="7" width="2" height="7" fill="#000" />
              <rect x="23" y="7" width="2" height="5" fill="#000" />
              <rect x="25" y="11" width="12" height="2" fill="#000" />
              <rect x="36" y="13" width="2" height="8" fill="#000" />
              <rect x="6" y="13" width="4" height="2" fill="#000" />
              <rect x="5" y="15" width="2" height="5" fill="#000" />
              <rect x="7" y="20" width="5" height="2" fill="#000" />

              {/* ORANGE */}
              <rect x="12" y="7" width="11" height="8" fill="#FFA733" />
              <rect x="12" y="13" width="23" height="8" fill="#FFA733" />

              {/* WHITE SNOUT */}
              <rect x="7" y="15" width="6" height="5" fill="#FFFFFF" />
              <rect x="12" y="15" width="7" height="6" fill="#FFFFFF" />

              {/* NOSE */}
              <rect x="5" y="15" width="3" height="3" fill="#000" />

              {/* BLISSFUL SMILING CLOSED EYES: ^ ^ */}
              <path d="M12 12L13.5 11L15 12" stroke="#000" strokeWidth="1.6" fill="none" />
              <path d="M18 12L19.5 11L21 12" stroke="#000" strokeWidth="1.6" fill="none" />

              {/* PINK BLUSHING CHEEKS */}
              <rect x="9" y="16" width="3" height="2" fill="#F43F5E" opacity="0.85" />
              <rect x="20" y="16" width="3" height="2" fill="#F43F5E" opacity="0.85" />

              {/* EARS flattened back in delight */}
              <rect x="9" y="6" width="3" height="2" fill="#FFA733" />
              <rect x="23" y="6" width="3" height="2" fill="#FFA733" />

              {/* TAIL WAGGING SUPER FAST */}
              <motion.g
                animate={{ rotate: [-20, 20, -20] }}
                transition={{ duration: 0.18, repeat: Infinity }}
                style={{ originX: '33px', originY: '14px' }}
              >
                <rect x="33" y="7" width="4" height="2" fill="#000" />
                <rect x="36" y="9" width="2" height="5" fill="#000" />
                <rect x="34" y="9" width="2" height="4" fill="#FFFFFF" />
              </motion.g>

              {/* Legs */}
              <rect x="13" y="21" width="3" height="6" fill="#000" />
              <rect x="13" y="21" width="2" height="4" fill="#FFA733" />
              <rect x="13" y="25" width="2" height="2" fill="#FFFFFF" />

              <rect x="28" y="21" width="3" height="6" fill="#000" />
              <rect x="28" y="21" width="2" height="4" fill="#FFA733" />
              <rect x="28" y="25" width="2" height="2" fill="#FFFFFF" />

              {/* Floating Hearts */}
              <motion.g
                animate={{ opacity: [0, 1, 0], y: [-2, -8, -12] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <text x="14" y="2" fill="#F43F5E" fontSize="7" fontWeight="bold">
                  ♥
                </text>
              </motion.g>
            </motion.svg>
          ) : (
            // ==========================================
            // POSE 6: JOYFUL JUMP / LEAP
            // ==========================================
            <motion.svg
              width="86"
              height="60"
              viewBox="0 0 43 30"
              className="overflow-visible"
              style={{ shapeRendering: 'crispEdges' }}
            >
              {/* Leaping body in mid-air */}
              <rect x="10" y="2" width="4" height="2" fill="#000" />
              <rect x="18" y="2" width="3" height="2" fill="#000" />
              <rect x="8" y="4" width="2" height="7" fill="#000" />
              <rect x="21" y="4" width="2" height="4" fill="#000" />
              <rect x="23" y="8" width="13" height="2" fill="#000" />
              <rect x="36" y="10" width="2" height="6" fill="#000" />

              <rect x="4" y="10" width="4" height="2" fill="#000" />
              <rect x="3" y="12" width="2" height="5" fill="#000" />
              <rect x="5" y="17" width="6" height="2" fill="#000" />

              {/* ORANGE */}
              <rect x="10" y="4" width="11" height="8" fill="#FFA733" />
              <rect x="12" y="10" width="23" height="8" fill="#FFA733" />

              {/* WHITE */}
              <rect x="5" y="12" width="6" height="5" fill="#FFFFFF" />
              <rect x="11" y="13" width="7" height="6" fill="#FFFFFF" />

              {/* NOSE */}
              <rect x="3" y="12" width="3" height="3" fill="#000" />

              {/* Happy eyes */}
              <path d="M12 9L13 8L14 9" stroke="#000" strokeWidth="1.5" fill="none" />

              {/* LEGS EXTENDED FORWARD & BACK IN THE AIR */}
              <rect x="8" y="19" width="6" height="3" fill="#000" />
              <rect x="9" y="19" width="3" height="2" fill="#FFA733" />
              <rect x="6" y="19" width="3" height="2" fill="#FFFFFF" />

              <rect x="31" y="19" width="6" height="3" fill="#000" />
              <rect x="31" y="19" width="3" height="2" fill="#FFA733" />
              <rect x="34" y="19" width="3" height="2" fill="#FFFFFF" />

              {/* Tail waving high */}
              <rect x="35" y="3" width="4" height="2" fill="#000" />
              <rect x="38" y="5" width="2" height="5" fill="#000" />
              <rect x="36" y="5" width="2" height="4" fill="#FFFFFF" />
            </motion.svg>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
