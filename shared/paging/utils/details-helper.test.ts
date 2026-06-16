import { beforeEach, describe, expect, it, vi } from "vitest";
import { detailCloser } from "./details-helper";

describe("detailCloser DOM Utility", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  // ============ Section 1: Operational Flow & Events ============
  describe("Operational Flow & State Transitions", () => {
    it("should process the entire operational pipeline (lines 28-73)", () => {
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      details.appendChild(summary);
      document.body.appendChild(details);

      // Mount phase
      detailCloser(details);

      // Trigger toggle event to force handleDetailsToggle execution
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      // Trigger a click outside to force globalDismissHandler execution (Line 28+)
      const outsideButton = document.createElement("button");
      document.body.appendChild(outsideButton);

      outsideButton.click();

      // Assert that our runtime handlers successfully modified DOM state
      expect(details.open).toBe(false);

      // Unmount phase: Remove from DOM and invoke the null sweep
      document.body.removeChild(details);
      detailCloser(null);
    });
  });
  // ============ Section 2: Initialization & Standard Binding ============
  describe("Initialization & Standard Binding", () => {
    it("should bind toggle listener when passing a details element", () => {
      const details = document.createElement("details");
      const addEventListenerSpy = vi.spyOn(details, "addEventListener");

      detailCloser(details);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "toggle",
        expect.any(Function),
      );
      addEventListenerSpy.mockRestore();
    });

    it("should attach global document listeners on first registration", () => {
      const details = document.createElement("details");
      document.body.appendChild(details);

      detailCloser(details);
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      // Verify the listener is active by testing dismissal
      const outsideButton = document.createElement("button");
      document.body.appendChild(outsideButton);

      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "target", {
        value: outsideButton,
        enumerable: true,
      });
      document.dispatchEvent(clickEvent);

      expect(details.open).toBe(false);

      document.body.removeChild(details);
      document.body.removeChild(outsideButton);
    });

    it("should prevent double binding for the same element", () => {
      const details = document.createElement("details");
      const addEventListenerSpy = vi.spyOn(details, "addEventListener");

      detailCloser(details);
      const callCountAfterFirst = addEventListenerSpy.mock.calls.length;

      detailCloser(details);
      const callCountAfterSecond = addEventListenerSpy.mock.calls.length;

      expect(callCountAfterSecond).toBe(callCountAfterFirst);
      addEventListenerSpy.mockRestore();
    });

    it("should not re-initialize global listeners if already initialized", () => {
      const details1 = document.createElement("details");
      const details2 = document.createElement("details");
      const addEventListenerSpy = vi.spyOn(document, "addEventListener");

      detailCloser(details1);
      const firstCallCount = addEventListenerSpy.mock.calls.length;

      detailCloser(details2);
      const secondCallCount = addEventListenerSpy.mock.calls.length;

      expect(secondCallCount).toBe(firstCallCount);
      addEventListenerSpy.mockRestore();
    });
  });

  // ============ Section 3: State Transition Tracking ============
  describe("State Transition Tracking", () => {
    it("should track element when toggle event fires with open=true", () => {
      const details = document.createElement("details");
      document.body.appendChild(details);

      detailCloser(details);
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      // Verify it was added to activeDetails by attempting to close via click outside
      const outsideClick = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(outsideClick, "target", {
        value: document.body,
        enumerable: true,
      });
      document.dispatchEvent(outsideClick);

      expect(details.open).toBe(false);

      document.body.removeChild(details);
    });

    it("should untrack element when toggle event fires with open=false", () => {
      const details = document.createElement("details");
      document.body.appendChild(details);

      detailCloser(details);
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      details.open = false;
      details.dispatchEvent(new Event("toggle"));

      // Element should no longer be tracked; clicking outside shouldn't affect it
      const initialState = details.open;
      const outsideClick = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(outsideClick, "target", {
        value: document.body,
        enumerable: true,
      });
      document.dispatchEvent(outsideClick);

      expect(details.open).toBe(initialState);

      document.body.removeChild(details);
    });
  });

  // ============ Section 4: Global Click & Touch Invalidation ============
  describe("Global Click & Touch Invalidation", () => {
    it("should close details element on click outside", () => {
      const details = document.createElement("details");
      const outsideElement = document.createElement("button");
      document.body.appendChild(details);
      document.body.appendChild(outsideElement);

      detailCloser(details);
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "target", {
        value: outsideElement,
        enumerable: true,
      });
      document.dispatchEvent(clickEvent);

      expect(details.open).toBe(false);

      document.body.removeChild(details);
      document.body.removeChild(outsideElement);
    });

    it("should close details element on touchstart outside", () => {
      const details = document.createElement("details");
      const outsideElement = document.createElement("button");
      document.body.appendChild(details);
      document.body.appendChild(outsideElement);

      detailCloser(details);
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      const touchEvent = new TouchEvent("touchstart", { bubbles: true });
      Object.defineProperty(touchEvent, "target", {
        value: outsideElement,
        enumerable: true,
      });
      document.dispatchEvent(touchEvent);

      expect(details.open).toBe(false);

      document.body.removeChild(details);
      document.body.removeChild(outsideElement);
    });

    it("should keep details open when clicking on summary inside", () => {
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      details.appendChild(summary);
      document.body.appendChild(details);

      detailCloser(details);
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "target", {
        value: summary,
        enumerable: true,
      });
      document.dispatchEvent(clickEvent);

      expect(details.open).toBe(true);

      document.body.removeChild(details);
    });

    it("should keep details open when clicking on button inside", () => {
      const details = document.createElement("details");
      const button = document.createElement("button");
      details.appendChild(button);
      document.body.appendChild(details);

      detailCloser(details);
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "target", {
        value: button,
        enumerable: true,
      });
      document.dispatchEvent(clickEvent);

      expect(details.open).toBe(true);

      document.body.removeChild(details);
    });

    it("should handle click event with null target gracefully", () => {
      const details = document.createElement("details");
      document.body.appendChild(details);

      detailCloser(details);
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "target", {
        value: null,
        enumerable: true,
      });
      document.dispatchEvent(clickEvent);

      expect(details.open).toBe(false);

      document.body.removeChild(details);
    });
  });

  // ============ Section 5: Keyboard Interoperability (Focus-Out) ============
  describe("Keyboard Interoperability (Focus-Out)", () => {
    it("should close details when focus moves outside via focusout event", () => {
      const details = document.createElement("details");
      const outsideButton = document.createElement("button");
      document.body.appendChild(details);
      document.body.appendChild(outsideButton);

      detailCloser(details);
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      const focusoutEvent = new FocusEvent("focusout", { bubbles: true });
      Object.defineProperty(focusoutEvent, "relatedTarget", {
        value: outsideButton,
        enumerable: true,
      });
      details.dispatchEvent(focusoutEvent);

      expect(details.open).toBe(false);

      document.body.removeChild(details);
      document.body.removeChild(outsideButton);
    });

    it("should keep details open when focus moves between internal elements", () => {
      const details = document.createElement("details");
      const button1 = document.createElement("button");
      const button2 = document.createElement("button");
      details.appendChild(button1);
      details.appendChild(button2);
      document.body.appendChild(details);

      detailCloser(details);
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      const focusoutEvent = new FocusEvent("focusout", { bubbles: true });
      Object.defineProperty(focusoutEvent, "relatedTarget", {
        value: button2,
        enumerable: true,
      });
      button1.dispatchEvent(focusoutEvent);

      expect(details.open).toBe(true);

      document.body.removeChild(details);
    });

    it("should handle focusout with null relatedTarget", () => {
      const details = document.createElement("details");
      document.body.appendChild(details);

      detailCloser(details);
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      const focusoutEvent = new FocusEvent("focusout", { bubbles: true });
      Object.defineProperty(focusoutEvent, "relatedTarget", {
        value: null,
        enumerable: true,
      });
      document.dispatchEvent(focusoutEvent);

      expect(details.open).toBe(false);

      document.body.removeChild(details);
    });
  });

  // ============ Section 6: Recursive Tree Protection ============
  describe("Recursive Tree Protection (Nested Details)", () => {
    it("should keep both parent and child details open when clicking deep button", () => {
      const parent = document.createElement("details");
      const child = document.createElement("details");
      const deepButton = document.createElement("button");

      parent.appendChild(child);
      child.appendChild(deepButton);
      document.body.appendChild(parent);

      detailCloser(parent);
      detailCloser(child);

      parent.open = true;
      parent.dispatchEvent(new Event("toggle"));
      child.open = true;
      child.dispatchEvent(new Event("toggle"));

      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "target", {
        value: deepButton,
        enumerable: true,
      });
      document.dispatchEvent(clickEvent);

      expect(parent.open).toBe(true);
      expect(child.open).toBe(true);

      document.body.removeChild(parent);
    });

    it("should close only child when clicking between parent and child boundaries", () => {
      const parent = document.createElement("details");
      const child = document.createElement("details");
      const parentButton = document.createElement("button");

      parent.appendChild(parentButton);
      parent.appendChild(child);
      document.body.appendChild(parent);

      detailCloser(parent);
      detailCloser(child);

      parent.open = true;
      parent.dispatchEvent(new Event("toggle"));
      child.open = true;
      child.dispatchEvent(new Event("toggle"));

      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "target", {
        value: parentButton,
        enumerable: true,
      });
      document.dispatchEvent(clickEvent);

      expect(parent.open).toBe(true);
      expect(child.open).toBe(false);

      document.body.removeChild(parent);
    });

    it("should close both parent and child when clicking outside entire tree", () => {
      const parent = document.createElement("details");
      const child = document.createElement("details");
      const outsideButton = document.createElement("button");

      parent.appendChild(child);
      document.body.appendChild(parent);
      document.body.appendChild(outsideButton);

      detailCloser(parent);
      detailCloser(child);

      parent.open = true;
      parent.dispatchEvent(new Event("toggle"));
      child.open = true;
      child.dispatchEvent(new Event("toggle"));

      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "target", {
        value: outsideButton,
        enumerable: true,
      });
      document.dispatchEvent(clickEvent);

      expect(parent.open).toBe(false);
      expect(child.open).toBe(false);

      document.body.removeChild(parent);
      document.body.removeChild(outsideButton);
    });

    it("should handle deeply nested hierarchy (3+ levels)", () => {
      const level1 = document.createElement("details");
      const level2 = document.createElement("details");
      const level3 = document.createElement("details");
      const deepButton = document.createElement("button");

      level1.appendChild(level2);
      level2.appendChild(level3);
      level3.appendChild(deepButton);
      document.body.appendChild(level1);

      detailCloser(level1);
      detailCloser(level2);
      detailCloser(level3);

      level1.open = true;
      level1.dispatchEvent(new Event("toggle"));
      level2.open = true;
      level2.dispatchEvent(new Event("toggle"));
      level3.open = true;
      level3.dispatchEvent(new Event("toggle"));

      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "target", {
        value: deepButton,
        enumerable: true,
      });
      document.dispatchEvent(clickEvent);

      expect(level1.open).toBe(true);
      expect(level2.open).toBe(true);
      expect(level3.open).toBe(true);

      document.body.removeChild(level1);
    });
  });

  // ============ Section 7: Lifecycle Garbage Collection & Unmounting ============
  describe("Lifecycle Garbage Collection & Unmounting", () => {
    it("should clean up element when passed null after removal from DOM", () => {
      const details = document.createElement("details");
      document.body.appendChild(details);

      detailCloser(details);
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      document.body.removeChild(details);
      detailCloser(null);

      // After cleanup, the element should no longer be tracked
      // Create a new details to verify listeners still work
      const newDetails = document.createElement("details");
      document.body.appendChild(newDetails);
      detailCloser(newDetails);
      newDetails.open = true;
      newDetails.dispatchEvent(new Event("toggle"));

      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "target", {
        value: document.body,
        enumerable: true,
      });
      document.dispatchEvent(clickEvent);

      expect(newDetails.open).toBe(false);

      document.body.removeChild(newDetails);
    });

    it("should tear down all document listeners when no details remain active", () => {
      const details = document.createElement("details");
      document.body.appendChild(details);

      detailCloser(details);
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      document.body.removeChild(details);
      detailCloser(null);

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        true,
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "touchstart",
        expect.any(Function),
        true,
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "focusout",
        expect.any(Function),
        true,
      );

      removeEventListenerSpy.mockRestore();
    });

    it("should preserve global listeners if other details remain tracked", () => {
      const details1 = document.createElement("details");
      const details2 = document.createElement("details");
      document.body.appendChild(details1);
      document.body.appendChild(details2);

      detailCloser(details1);
      detailCloser(details2);

      details1.open = true;
      details1.dispatchEvent(new Event("toggle"));
      details2.open = true;
      details2.dispatchEvent(new Event("toggle"));

      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      document.body.removeChild(details1);
      detailCloser(null);

      // Global listeners should NOT be removed because details2 is still tracked
      expect(removeEventListenerSpy).not.toHaveBeenCalledWith(
        "click",
        expect.any(Function),
        true,
      );

      removeEventListenerSpy.mockRestore();

      document.body.removeChild(details2);
    });

    it("should remove event listener from element on cleanup", () => {
      const details = document.createElement("details");
      document.body.appendChild(details);

      const removeEventListenerSpy = vi.spyOn(details, "removeEventListener");

      detailCloser(details);
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      document.body.removeChild(details);
      detailCloser(null);

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "toggle",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });

    it("should handle multiple mount/unmount cycles", () => {
      const createAndCleanupDetails = () => {
        const details = document.createElement("details");
        document.body.appendChild(details);
        detailCloser(details);
        details.open = true;
        details.dispatchEvent(new Event("toggle"));

        const clickEvent = new MouseEvent("click", { bubbles: true });
        Object.defineProperty(clickEvent, "target", {
          value: document.body,
          enumerable: true,
        });
        document.dispatchEvent(clickEvent);

        document.body.removeChild(details);
        detailCloser(null);
      };

      createAndCleanupDetails();
      createAndCleanupDetails();
      createAndCleanupDetails();

      // After all cleanup, body should be empty
      expect(document.body.children.length).toBe(0);
    });
  });

  // ============ Section 8: Edge Cases & Error Resilience ============
  describe("Edge Cases & Error Resilience", () => {
    it("should handle undefined or missing toggle event handler gracefully", () => {
      const details = document.createElement("details");
      document.body.appendChild(details);

      expect(() => {
        detailCloser(details);
      }).not.toThrow();

      document.body.removeChild(details);
    });

    it("should handle rapid successive calls with same element", () => {
      const details = document.createElement("details");
      document.body.appendChild(details);

      expect(() => {
        detailCloser(details);
        detailCloser(details);
        detailCloser(details);
      }).not.toThrow();

      document.body.removeChild(details);
    });

    it("should handle detached elements in activeDetails set", () => {
      const details1 = document.createElement("details");
      const details2 = document.createElement("details");
      document.body.appendChild(details1);
      document.body.appendChild(details2);

      detailCloser(details1);
      detailCloser(details2);

      details1.open = true;
      details1.dispatchEvent(new Event("toggle"));
      details2.open = true;
      details2.dispatchEvent(new Event("toggle"));

      document.body.removeChild(details1);

      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "target", {
        value: document.body,
        enumerable: true,
      });

      expect(() => {
        document.dispatchEvent(clickEvent);
      }).not.toThrow();

      expect(details2.open).toBe(false);

      document.body.removeChild(details2);
    });

    it("should handle event with null target gracefully", () => {
      const details = document.createElement("details");
      document.body.appendChild(details);

      detailCloser(details);
      details.open = true;
      details.dispatchEvent(new Event("toggle"));

      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "target", {
        value: null,
        enumerable: true,
      });

      expect(() => {
        document.dispatchEvent(clickEvent);
      }).not.toThrow();

      document.body.removeChild(details);
    });

    it("should work with multiple details opened and closed in sequence", () => {
      const details1 = document.createElement("details");
      const details2 = document.createElement("details");
      const details3 = document.createElement("details");
      document.body.appendChild(details1);
      document.body.appendChild(details2);
      document.body.appendChild(details3);

      detailCloser(details1);
      detailCloser(details2);
      detailCloser(details3);

      details1.open = true;
      details1.dispatchEvent(new Event("toggle"));

      details2.open = true;
      details2.dispatchEvent(new Event("toggle"));

      details3.open = true;
      details3.dispatchEvent(new Event("toggle"));

      expect(details1.open).toBe(true);
      expect(details2.open).toBe(true);
      expect(details3.open).toBe(true);

      const clickEvent = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(clickEvent, "target", {
        value: document.body,
        enumerable: true,
      });
      document.dispatchEvent(clickEvent);

      expect(details1.open).toBe(false);
      expect(details2.open).toBe(false);
      expect(details3.open).toBe(false);

      document.body.removeChild(details1);
      document.body.removeChild(details2);
      document.body.removeChild(details3);
    });
  });

  // ============ Section 9: SSR Safe-Guard Execution ============
  describe("SSR Safe-Guard Execution", () => {
    it("should safely exit when window is undefined (SSR environment)", () => {
      vi.stubGlobal("window", undefined);

      const details = document.createElement("details");
      expect(() => {
        detailCloser(details);
      }).not.toThrow();

      vi.unstubAllGlobals();
    });

    it("should return early without errors when passed null in SSR context", () => {
      vi.stubGlobal("window", undefined);

      expect(() => {
        detailCloser(null);
      }).not.toThrow();

      vi.unstubAllGlobals();
    });
  });
});
