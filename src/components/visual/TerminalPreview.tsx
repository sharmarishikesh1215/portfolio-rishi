import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle2, ShieldCheck, Terminal, Layers } from 'lucide-react';

interface TestLog {
  id: string;
  type: 'info' | 'pass' | 'warn' | 'suite';
  text: string;
  duration?: string;
}

const SUITES = {
  web: {
    name: 'Selenium E-Commerce TestNG Suite',
    framework: 'Selenium 4.x + TestNG + POM',
    logs: [
      { id: '1', type: 'suite', text: '⚡ Initializing ThreadLocal WebDriver instance [Chrome 131.0]' },
      { id: '2', type: 'info', text: '  → Navigating to target environment: https://store-staging.internal' },
      { id: '3', type: 'pass', text: '✓ [AuthTest] verifySecureLoginWithTokenValidation', duration: '412ms' },
      { id: '4', type: 'pass', text: '✓ [SearchTest] verifyCatalogDebounceQuery_CategoryFiltered', duration: '320ms' },
      { id: '5', type: 'pass', text: '✓ [CartTest] verifyStatefulCartPersistenceAcrossTabRefresh', duration: '584ms' },
      { id: '6', type: 'pass', text: '✓ [CheckoutTest] verifyTokenizedStripePaymentGateway', duration: '890ms' },
      { id: '7', type: 'suite', text: '🎉 Suite Complete: 4 Passed, 0 Failed, 0 Flaky. Allure Report generated.' },
    ],
  },
  api: {
    name: 'Banking API RestAssured Contract Suite',
    framework: 'Java 21 + RestAssured + JSONSchema',
    logs: [
      { id: '1', type: 'suite', text: '⚡ Establishing mTLS Session with Financial Gateway' },
      { id: '2', type: 'pass', text: '✓ [POST /v2/auth/oauth2] Token lifecycle & cryptographic signature valid', duration: '145ms' },
      { id: '3', type: 'pass', text: '✓ [GET /v2/accounts/ledger] Schema matches accounts.schema.v3.json', duration: '82ms' },
      { id: '4', type: 'pass', text: '✓ [POST /v2/transfers/p2p] IdempotencyKey prevents double-spend race condition', duration: '198ms' },
      { id: '5', type: 'pass', text: '✓ [POST /v2/transfers] Strict 400 Bad Request on negative fund balance', duration: '64ms' },
      { id: '6', type: 'suite', text: '🎉 Contract Validated: 100% assertions satisfied. 0 regressions.' },
    ],
  },
  infra: {
    name: 'Infrastructure & Observability Sanity',
    framework: 'Linux Shell + Kafka + Redis + Grafana',
    logs: [
      { id: '1', type: 'suite', text: '⚡ Running Distributed Node Pre-flight Checks' },
      { id: '2', type: 'pass', text: '✓ [Kafka Engine] Broker connectivity active, consumer group lag: 0 msgs', duration: '35ms' },
      { id: '3', type: 'pass', text: '✓ [KeyDB / Redis] Memory eviction policy = volatile-lru, ping = PONG', duration: '12ms' },
      { id: '4', type: 'pass', text: '✓ [Grafana SRE] Prometheus synthetic probe latency < 20ms threshold', duration: '48ms' },
      { id: '5', type: 'suite', text: '🎉 Environment Sanity: Green. Safe for Zero-Downtime Deployment.' },
    ],
  },
};

export const TerminalPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'web' | 'api' | 'infra'>('web');
  const [visibleCount, setVisibleCount] = useState(SUITES.web.logs.length);
  const [isRunning, setIsRunning] = useState(false);

  const currentSuite = SUITES[activeTab];

  const handleRunSuite = () => {
    if (isRunning) return;
    setIsRunning(true);
    setVisibleCount(0);

    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= currentSuite.logs.length) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 280);
  };

  useEffect(() => {
    setVisibleCount(currentSuite.logs.length);
    setIsRunning(false);
  }, [activeTab]);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-apple-lg transition-all duration-300">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]/90 border border-black/10" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/90 border border-black/10" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]/90 border border-black/10" />
          <span className="ml-2 text-xs font-mono text-apple-light-secondary dark:text-apple-dark-secondary hidden sm:inline">
            rishi@sdet-pipeline: ~/{activeTab}-runner
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center p-0.5 rounded-lg bg-black/5 dark:bg-white/10 text-[11px] font-medium">
          <button
            onClick={() => setActiveTab('web')}
            type="button"
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === 'web'
                ? 'bg-white dark:bg-white/20 text-apple-light-primary dark:text-apple-dark-primary shadow-sm font-semibold'
                : 'text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary'
            }`}
          >
            Web / UI
          </button>
          <button
            onClick={() => setActiveTab('api')}
            type="button"
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === 'api'
                ? 'bg-white dark:bg-white/20 text-apple-light-primary dark:text-apple-dark-primary shadow-sm font-semibold'
                : 'text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary'
            }`}
          >
            REST API
          </button>
          <button
            onClick={() => setActiveTab('infra')}
            type="button"
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === 'infra'
                ? 'bg-white dark:bg-white/20 text-apple-light-primary dark:text-apple-dark-primary shadow-sm font-semibold'
                : 'text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary'
            }`}
          >
            Infra / Kafka
          </button>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed min-h-[220px] flex flex-col justify-between">
        <div className="space-y-2">
          <div className="text-[11px] text-apple-light-secondary dark:text-apple-dark-secondary pb-1 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-apple-light-accent dark:text-apple-dark-accent" />
              {currentSuite.framework}
            </span>
            <span className="text-emerald-500 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> CI/CD Gate Passing
            </span>
          </div>

          {currentSuite.logs.slice(0, visibleCount).map((log) => (
            <div
              key={log.id}
              className={`flex items-start justify-between gap-3 animate-in fade-in duration-200 ${
                log.type === 'pass'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : log.type === 'suite'
                  ? 'text-apple-light-accent dark:text-apple-dark-accent font-semibold pt-1'
                  : 'text-apple-light-secondary dark:text-apple-dark-secondary'
              }`}
            >
              <span className="break-all">{log.text}</span>
              {log.duration && (
                <span className="text-[11px] text-apple-light-secondary/70 dark:text-apple-dark-secondary/70 shrink-0 font-mono">
                  {log.duration}
                </span>
              )}
            </div>
          ))}

          {isRunning && (
            <div className="flex items-center gap-2 text-apple-light-secondary dark:text-apple-dark-secondary animate-pulse pt-1">
              <span className="w-2 h-3.5 bg-apple-light-accent dark:bg-apple-dark-accent inline-block"></span>
              <span>Running assertions across threads...</span>
            </div>
          )}
        </div>

        {/* Footer Bar with Execution Trigger */}
        <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
          <span className="text-[11px] text-apple-light-secondary dark:text-apple-dark-secondary">
            Deterministic &bull; Zero False Positives
          </span>
          <button
            onClick={handleRunSuite}
            disabled={isRunning}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-black/5 dark:bg-white/10 hover:bg-apple-light-accent hover:text-white dark:hover:bg-apple-dark-accent dark:hover:text-black text-apple-light-primary dark:text-apple-dark-primary transition-colors disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Executing...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Suite Again</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

