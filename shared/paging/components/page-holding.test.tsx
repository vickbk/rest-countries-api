import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useMemo } from "react";
import { describe, expect, it } from "vitest";
import { createCloseDetailOnBlurRef } from "../utils/details-helper";

function BasicDetails() {
  const detailsRef = useMemo(() => createCloseDetailOnBlurRef(), []);

  return (
    <div>
      <button type="button">Outside</button>
      <details data-testid="root-details" ref={detailsRef}>
        <summary>Show previous pages</summary>
        <button type="button">Inside page</button>
      </details>
    </div>
  );
}

function NestedDetails() {
  const parentRef = useMemo(() => createCloseDetailOnBlurRef(), []);
  const childRef = useMemo(() => createCloseDetailOnBlurRef(), []);

  return (
    <div>
      <button type="button">Outside</button>
      <details data-testid="parent-details" ref={parentRef}>
        <summary>Parent pages</summary>
        <details data-testid="child-details" ref={childRef}>
          <summary>Child pages</summary>
          <button type="button">Deep page</button>
        </details>
      </details>
    </div>
  );
}

describe("Details dismiss helper", () => {
  it("should close an open details element when clicking outside", async () => {
    const user = userEvent.setup();
    render(<BasicDetails />);

    const details = screen.getByTestId("root-details") as HTMLDetailsElement;
    const summary = screen.getByText("Show previous pages");
    const outsideButton = screen.getByRole("button", { name: /Outside/i });

    await user.click(summary);
    expect(details).toHaveAttribute("open");

    await user.click(outsideButton);
    expect(details).not.toHaveAttribute("open");
  });

  it("should close when keyboard focus leaves the details tree", async () => {
    const user = userEvent.setup();
    render(<BasicDetails />);

    const details = screen.getByTestId("root-details") as HTMLDetailsElement;
    const summary = screen.getByText("Show previous pages");
    const outsideButton = screen.getByRole("button", { name: /Outside/i });

    await user.click(summary);
    expect(details).toHaveAttribute("open");

    await user.tab();
    expect(outsideButton).toHaveFocus();
    expect(details).not.toHaveAttribute("open");
  });

  it("should keep details open when interacting with an inner page button", async () => {
    const user = userEvent.setup();
    render(<BasicDetails />);

    const summary = screen.getByText("Show previous pages");
    const innerButton = screen.getByRole("button", { name: /Inside page/i });
    const details = screen.getByTestId("root-details") as HTMLDetailsElement;

    await user.click(summary);
    expect(details).toHaveAttribute("open");

    await user.click(innerButton);
    expect(details).toHaveAttribute("open");
  });

  it("should keep parent details open when a nested child details tree receives interaction", async () => {
    const user = userEvent.setup();
    render(<NestedDetails />);

    const parentDetails = screen.getByTestId(
      "parent-details",
    ) as HTMLDetailsElement;
    const childDetails = screen.getByTestId(
      "child-details",
    ) as HTMLDetailsElement;
    const parentSummary = screen.getByText("Parent pages");
    const childSummary = screen.getByText("Child pages");
    const outsideButton = screen.getByRole("button", { name: /Outside/i });

    await user.click(parentSummary);
    await user.click(childSummary);

    expect(parentDetails).toHaveAttribute("open");
    expect(childDetails).toHaveAttribute("open");

    await user.click(outsideButton);
    expect(parentDetails).not.toHaveAttribute("open");
    expect(childDetails).not.toHaveAttribute("open");
  });
});
