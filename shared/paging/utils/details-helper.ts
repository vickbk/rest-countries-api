const activeDetails = new Set<HTMLDetailsElement>();

const cleanupRegistry = new WeakMap<HTMLDetailsElement, () => void>();

let isInitialized = false;

function initializeListerners() {
  if (isInitialized) return;

  document.addEventListener("click", globalDismissHandler, true);
  document.addEventListener("touchstart", globalDismissHandler, true);
  document.addEventListener("focusout", globalDismissHandler, true);
  isInitialized = true;
}
/**
 * Global event orchestrator handling both Click-Outside and Keyboard Focus-Out
 */
function globalDismissHandler(event: MouseEvent | TouchEvent | FocusEvent) {
  const target =
    event.type === "focusout"
      ? (event as FocusEvent).relatedTarget
      : (event as MouseEvent).target;

  activeDetails.forEach((detail) => {
    if (target && detail.contains(target as Node)) {
      return;
    }

    detail.open = false;
  });
}

function handleDetailsToggle(this: HTMLDetailsElement) {
  if (this.open) {
    activeDetails.add(this);
  } else {
    activeDetails.delete(this);
  }
}

/**
 * Production-Safe Ref Callback for Next.js/React.
 * Automatically handles attachment on mount and complete cleanup on unmount.
 */
export function detailCloser(details: HTMLDetailsElement | null) {
  if (typeof window === "undefined") return;

  if (details) {
    if (cleanupRegistry.has(details)) return;

    details.addEventListener("toggle", handleDetailsToggle);

    initializeListerners();

    cleanupRegistry.set(details, () => {
      details.removeEventListener("toggle", handleDetailsToggle);
      activeDetails.delete(details);
    });

    return;
  }

  // --- UNMOUNTING PHASE ---
  // When React unmounts a component, it invokes the ref callback with `null`.
  // To handle cleanups on dynamically changing lists, use a hook wrapper or explicitly sweep dead sets.
  sweepOrphanedDetails();
}

/**
 * Self-healing pass ensuring detached elements don't rot in memory
 */
function sweepOrphanedDetails() {
  activeDetails.forEach((detail) => {
    if (!document.body.contains(detail)) {
      cleanupRegistry.get(detail)?.();
      activeDetails.delete(detail);
    }
  });

  // Tear down document listeners completely if no tracked details elements remain active
  if (activeDetails.size === 0 && isInitialized) {
    document.removeEventListener("click", globalDismissHandler, true);
    document.removeEventListener("touchstart", globalDismissHandler, true);
    document.removeEventListener("focusout", globalDismissHandler, true);
    isInitialized = false;
  }
}
