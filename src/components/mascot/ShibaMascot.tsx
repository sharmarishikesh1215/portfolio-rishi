import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Moon, Sun, Bug, Cookie, Volume2, VolumeX, X, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

// Fun SDET & Quality Engineer dialogues for the Shiba
const SHIBA_DIALOGUES = [
  "Woof! 100% test coverage detected! 🐾",
  "Paws-ing to inspect your DOM tree... Looks solid! 🧐",
  "Zero bugs escaped this sprint! Good job! 🐶✨",
  "Need an SDET? Rishi is the goodest engineer! 🐾",
  "Automated testing pipeline: PASSED! 🚀",
  "Sniffing for memory leaks... Clean! 🦴",
  "Click me again for more automated cuddles! ❤️",
  "Running nightly regression matrix... All green! 🟢",
  "Continuous Integration? More like Continuous Goodness! ✨",
  "Playwright & Selenium verified by doggo engineering! 🐕",
  "10/10 would deploy this build to production! 🚀",
  "Did someone say treats or test cases? 🦴",
];

export const ShibaMascot: React.FC = () => {
  const [positionX, setPositionX] = useState<number>(80); // percentage 10% - 90%
  const [direction, setDirection] = useState<1 | -1>(-1); // 1 = right, -1 = left
  const [actionState, setActionState] = useState<'idle' | 'walking' | 'sitting' | 'sleeping' | 'happy' | 'hunting'>('walking');
  const [speech, setSpeech] = useState<string | null>("Hi there! I'm Pixel, Rishi's QA pup! 🐾");
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
  const [treatFalling, setTreatFalling] = useState<boolean>(false);
  const [bugHunting, setBugHunting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const speechTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Web Audio Synth for cute 8-bit puppy sound effects
  const playSound = useCallback((type: 'woof' | 'jump' | 'chomp' | 'snore') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'woof') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(480, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'jump') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'chomp') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch {
      // AudioContext could be blocked by browser policy until gesture
    }
  }, [soundEnabled]);

  const showSpeech = useCallback((text: string, duration = 4500) => {
    setSpeech(text);
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setSpeech(null);
    }, duration);
  }, []);

  // Roaming loop along the screen bottom
  useEffect(() => {
    if (isMinimized || actionState === 'sleeping' || actionState === 'hunting' || isHovered) return;

    const interval = setInterval(() => {
      // 30% chance to pause and sit/sniff, 70% chance to roam
      const shouldPause = Math.random() < 0.35;

      if (shouldPause) {
        setActionState('sitting');
        setTimeout(() => {
          setActionState((curr) => (curr === 'sitting' ? 'walking' : curr));
        }, 3000 + Math.random() * 2500);
      } else {
        setActionState('walking');
        setPositionX((prev) => {
          // Wander between 8% and 88% of screen width
          const step = (Math.random() * 10 + 6) * direction;
          let next = prev + step;

          if (next > 88) {
            next = 88;
            setDirection(-1);
          } else if (next < 8) {
            next = 8;
            setDirection(1);
          }
          return next;
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [direction, actionState, isMinimized, isHovered]);

  // Periodic speech bubble chatter
  useEffect(() => {
    if (isMinimized) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.4 && !speech && actionState !== 'sleeping') {
        const randomQuote = SHIBA_DIALOGUES[Math.floor(Math.random() * SHIBA_DIALOGUES.length)];
        showSpeech(randomQuote, 5000);
      }
    }, 22000);

    return () => clearInterval(interval);
  }, [isMinimized, speech, actionState, showSpeech]);

  // Click handler (Happy Bounce, Confetti & Dialogue)
  const handleShibaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('woof');

    // Add heart animation
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: rect.width / 2 + (Math.random() * 20 - 10),
      y: -10,
    };
    setHearts((prev) => [...prev.slice(-4), newHeart]);

    // Small celebratory confetti burst around the dog
    try {
      const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
      const yRatio = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 15,
        startVelocity: 18,
        spread: 70,
        origin: { x: xRatio, y: yRatio },
        colors: ['#F59E0B', '#EF4444', '#10B981', '#EC4899', '#6366F1'],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }

    setActionState('happy');
    const randomQuote = SHIBA_DIALOGUES[Math.floor(Math.random() * SHIBA_DIALOGUES.length)];
    showSpeech(randomQuote, 4000);

    setTimeout(() => {
      setActionState((curr) => (curr === 'happy' ? 'walking' : curr));
    }, 1800);
  };

  // Toss Treat Action
  const handleGiveTreat = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (treatFalling) return;
    setTreatFalling(true);
    setActionState('happy');
    showSpeech("Ooh! A snack for passing all test assertions! 🦴", 3500);

    setTimeout(() => {
      playSound('chomp');
      setTreatFalling(false);
      showSpeech("*Crunch crunch* 100% tasty! Good QA companion! 🐾", 3000);
    }, 1200);
  };

  // Bug Hunt Action
  const handleBugHunt = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (bugHunting) return;
    setBugHunting(true);
    setActionState('hunting');
    showSpeech("Scanning repository for bugs... Found one! 🐞", 3000);

    setTimeout(() => {
      playSound('jump');
      showSpeech("POUNCE! Bug resolved in Jira: PROD-000! ✅", 3500);
      setBugHunting(false);
      setActionState('happy');
    }, 2400);
  };

  // Toggle sleep mode
  const toggleSleep = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (actionState === 'sleeping') {
      setActionState('walking');
      showSpeech("Yawn... Back on test automation patrol! 🐶", 3000);
      playSound('jump');
    } else {
      setActionState('sleeping');
      showSpeech("Taking a quick nap while the Jenkins build runs... Zzz 💤", 3000);
    }
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
    showSpeech("I'm back! Ready to test everything! 🐾", 3000);
    playSound('woof');
  };

  // If minimized, display a cute small paw badge in the bottom-right corner
  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleRestore}
        className="fixed bottom-5 right-5 z-50 p-2.5 rounded-full bg-white dark:bg-apple-dark-surface border border-black/10 dark:border-white/15 shadow-apple-lg flex items-center gap-2 group backdrop-blur-md transition-all cursor-pointer"
        title="Summon Shiba QA Mascot"
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
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 pointer-events-none z-40 select-none overflow-visible"
      style={{ height: 160 }}
    >
      {/* Floating Animated Shiba along bottom positionX */}
      <motion.div
        className="absolute bottom-2 pointer-events-auto cursor-pointer"
        animate={{
          left: `${positionX}%`,
          y: actionState === 'happy' ? [-4, -28, 0, -12, 0] : actionState === 'hunting' ? [0, -16, 0] : 0,
        }}
        transition={{
          left: { duration: 3.2, ease: 'easeInOut' },
          y: { duration: actionState === 'happy' ? 0.7 : 0.4, repeat: actionState === 'happy' ? 1 : 0 },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleShibaClick}
      >
        {/* Falling Bone Treat */}
        <AnimatePresence>
          {treatFalling && (
            <motion.div
              initial={{ y: -70, opacity: 0, rotate: -45 }}
              animate={{ y: -5, opacity: 1, rotate: 180 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeIn' }}
              className="absolute left-1/2 -translate-x-1/2 -top-12 text-2xl z-30 pointer-events-none"
            >
              🦴
            </motion.div>
          )}
        </AnimatePresence>

        {/* Crawling Bug during Hunt */}
        <AnimatePresence>
          {bugHunting && (
            <motion.div
              initial={{ x: direction === 1 ? 55 : -55, y: 15, opacity: 0 }}
              animate={{ x: direction === 1 ? 25 : -25, y: 15, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1.8 }}
              className="absolute text-xl z-20 pointer-events-none animate-bounce"
            >
              🐞
            </motion.div>
          )}
        </AnimatePresence>

        {/* Heart Particles Burst */}
        <AnimatePresence>
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -45, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
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

        {/* Shiba Interactive Hover Controls Toolbar */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 rounded-full bg-white/95 dark:bg-apple-dark-surface/95 backdrop-blur-md border border-black/10 dark:border-white/15 shadow-apple-sm z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleGiveTreat}
                title="Give Bone Treat 🦴"
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-amber-500 transition-colors"
              >
                <Cookie className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleBugHunt}
                title="Hunt a Bug 🐞"
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-emerald-500 transition-colors"
              >
                <Bug className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={toggleSleep}
                title={actionState === 'sleeping' ? 'Wake up' : 'Take a nap 💤'}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-indigo-500 transition-colors"
              >
                {actionState === 'sleeping' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => setSoundEnabled((prev) => !prev)}
                title={soundEnabled ? 'Mute Sounds' : 'Enable Bark & Chimes 🔊'}
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

        {/* 3D Pixel Art Shiba Dog Figure */}
        <motion.div
          className="relative inline-block"
          style={{ transformOrigin: 'bottom center' }}
          animate={{
            scaleX: direction,
            rotate: actionState === 'sleeping' ? 12 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Ground Soft Ambient Shadow */}
          <motion.div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-black/20 dark:bg-black/40 blur-[2px] pointer-events-none"
            animate={{
              scale: actionState === 'happy' ? [1, 0.7, 1] : [1, 1.05, 1],
              opacity: actionState === 'happy' ? [0.3, 0.15, 0.3] : 0.35,
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />

          {/* SVGs rendering the 3D / Isometric Pixel Shiba */}
          <svg
            width="78"
            height="72"
            viewBox="0 0 78 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)]"
          >
            {/* TAIL (Animated wagging) */}
            <motion.g
              animate={{
                rotate: actionState === 'happy' ? [-25, 25, -25] : isHovered ? [-20, 20, -20] : [-8, 8, -8],
              }}
              transition={{
                duration: actionState === 'happy' ? 0.18 : isHovered ? 0.25 : 0.65,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ originX: '18px', originY: '42px' }}
            >
              {/* Curled Shiba Tail in Isometric Pixel style */}
              <rect x="8" y="24" width="8" height="8" rx="2" fill="#D97706" />
              <rect x="14" y="20" width="8" height="8" rx="2" fill="#F59E0B" />
              <rect x="12" y="26" width="6" height="6" fill="#FDE68A" />
              <rect x="18" y="28" width="6" height="8" fill="#D97706" />
              <rect x="12" y="34" width="8" height="10" rx="2" fill="#F59E0B" />
            </motion.g>

            {/* HIND LEGS */}
            <motion.rect
              x="20"
              y="52"
              width="7"
              height="14"
              rx="2"
              fill="#D97706"
              animate={{
                y: actionState === 'walking' ? [0, -5, 0] : 0,
              }}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'linear' }}
            />
            {/* White sock */}
            <rect x="20" y="62" width="7" height="4" rx="1.5" fill="#FEF3C7" />

            <motion.rect
              x="30"
              y="52"
              width="7"
              height="14"
              rx="2"
              fill="#B45309"
              animate={{
                y: actionState === 'walking' ? [-5, 0, -5] : 0,
              }}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'linear' }}
            />
            {/* White sock */}
            <rect x="30" y="62" width="7" height="4" rx="1.5" fill="#FDE68A" />

            {/* BODY CHUBBY TORSO */}
            {/* 3D shading layers for pixel voxel feel */}
            <rect x="22" y="32" width="34" height="24" rx="6" fill="#D97706" />
            <rect x="24" y="30" width="30" height="22" rx="5" fill="#F59E0B" />
            {/* White Underbelly and chest patch */}
            <rect x="36" y="36" width="18" height="16" rx="4" fill="#FEF3C7" />
            <rect x="42" y="38" width="12" height="12" rx="3" fill="#FFFFFF" />

            {/* FRONT LEGS */}
            <motion.rect
              x="44"
              y="52"
              width="7"
              height="14"
              rx="2"
              fill="#D97706"
              animate={{
                y: actionState === 'walking' ? [-4, 0, -4] : 0,
              }}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'linear' }}
            />
            <rect x="44" y="62" width="7" height="4" rx="1.5" fill="#FEF3C7" />

            <motion.rect
              x="52"
              y="52"
              width="7"
              height="14"
              rx="2"
              fill="#B45309"
              animate={{
                y: actionState === 'walking' ? [0, -4, 0] : 0,
              }}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'linear' }}
            />
            <rect x="52" y="62" width="7" height="4" rx="1.5" fill="#FDE68A" />

            {/* RED COLLAR & QA GOLDEN MEDAL */}
            <rect x="48" y="28" width="18" height="6" rx="2" fill="#EF4444" />
            {/* Golden SDET Badge / Checkmark Tag */}
            <circle cx="56" cy="34" r="3.5" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
            <path d="M54.5 34L55.5 35.2L57.5 33" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />

            {/* HEAD (with breathing motion) */}
            <motion.g
              animate={{
                y: actionState === 'sleeping' ? [2, 3, 2] : [0, -2, 0],
              }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* EARS */}
              {/* Left Ear */}
              <motion.polygon
                points="42,14 47,4 53,14"
                fill="#D97706"
                animate={{ rotate: isHovered ? [0, -6, 0] : 0 }}
                transition={{ duration: 0.3 }}
              />
              <polygon points="44,13 47,7 51,13" fill="#F472B6" />

              {/* Right Ear */}
              <motion.polygon
                points="60,14 65,4 71,14"
                fill="#D97706"
                animate={{ rotate: isHovered ? [0, 6, 0] : 0 }}
                transition={{ duration: 0.3 }}
              />
              <polygon points="62,13 65,7 69,13" fill="#F472B6" />

              {/* HEAD BLOCK (3D voxel layered) */}
              <rect x="40" y="12" width="34" height="24" rx="6" fill="#D97706" />
              <rect x="41" y="11" width="32" height="22" rx="5" fill="#F59E0B" />

              {/* WHITE CHEEKS & MUZZLE (Signature Shiba feature) */}
              <rect x="45" y="18" width="26" height="14" rx="4" fill="#FEF3C7" />
              <rect x="51" y="21" width="18" height="11" rx="4" fill="#FFFFFF" />

              {/* WHITE EYEBROW DOTS */}
              <circle cx="49" cy="15" r="1.8" fill="#FFFFFF" />
              <circle cx="65" cy="15" r="1.8" fill="#FFFFFF" />

              {/* EYES */}
              {actionState === 'sleeping' ? (
                // Sleeping closed eyes: - -
                <>
                  <line x1="47" y1="20" x2="52" y2="20" stroke="#1F2937" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="62" y1="20" x2="67" y2="20" stroke="#1F2937" strokeWidth="1.8" strokeLinecap="round" />
                  {/* Floating Zzz */}
                  <text x="68" y="8" fill="#6366F1" fontSize="10" fontWeight="bold" className="animate-pulse">
                    z
                  </text>
                  <text x="74" y="2" fill="#818CF8" fontSize="12" fontWeight="bold" className="animate-bounce">
                    Z
                  </text>
                </>
              ) : isHovered || actionState === 'happy' ? (
                // Happy squinting joyful eyes: ^ ^
                <>
                  <path d="M47 21C48.5 19 50.5 19 52 21" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
                  <path d="M62 21C63.5 19 65.5 19 67 21" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
                  {/* Pink blushing cheeks */}
                  <ellipse cx="45" cy="24" rx="2.5" ry="1.5" fill="#F472B6" opacity="0.8" />
                  <ellipse cx="69" cy="24" rx="2.5" ry="1.5" fill="#F472B6" opacity="0.8" />
                </>
              ) : (
                // Standard alert, shiny black puppy eyes
                <>
                  <circle cx="49" cy="20" r="2.2" fill="#111827" />
                  <circle cx="48.2" cy="19.2" r="0.8" fill="#FFFFFF" />
                  <circle cx="65" cy="20" r="2.2" fill="#111827" />
                  <circle cx="64.2" cy="19.2" r="0.8" fill="#FFFFFF" />
                </>
              )}

              {/* CUTE BLACK TRIANGULAR NOSE & MOUTH */}
              <polygon points="58,23 60,25 62,23" fill="#111827" />
              {/* Cute W-shaped puppy mouth */}
              <path d="M58 26C58.8 27.2 59.8 27.2 60 26C60.2 27.2 61.2 27.2 62 26" stroke="#4B5563" strokeWidth="1" strokeLinecap="round" />
              {/* Little pink tongue when happy */}
              {(actionState === 'happy' || isHovered) && (
                <path d="M59 26C59 27.5 60.5 27.5 60.5 26" fill="#F43F5E" />
              )}
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};
