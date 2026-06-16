import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Paging } from "./paging-element";

describe("Paging Integration", () => {
  const mockUpdateFunction = vi.fn();

  beforeEach(() => {
    mockUpdateFunction.mockClear();
    vi.clearAllMocks();
  });

  it("should render pagination controls", () => {
    render(
      <Paging page={0} totalPages={5} updateFunction={mockUpdateFunction} />,
    );

    const lists = screen.getAllByRole("list");
    expect(lists.length).toBeGreaterThan(0);
    expect(lists[0]).toBeInTheDocument();
  });

  it("should display page 1 button", () => {
    render(
      <Paging page={0} totalPages={5} updateFunction={mockUpdateFunction} />,
    );

    expect(
      screen.getByRole("button", { name: /Go to Page 1/i }),
    ).toBeInTheDocument();
  });

  it("should display last page button", () => {
    render(
      <Paging page={0} totalPages={5} updateFunction={mockUpdateFunction} />,
    );

    expect(
      screen.getByRole("button", { name: /Go to Page 5/i }),
    ).toBeInTheDocument();
  });

  it("should call updateFunction when page button clicked", async () => {
    const user = userEvent.setup();
    render(
      <Paging page={0} totalPages={5} updateFunction={mockUpdateFunction} />,
    );

    const page2Button = screen.getByRole("button", { name: /Go to Page 2/i });
    await user.click(page2Button);

    await expect(mockUpdateFunction).toHaveBeenCalledWith(1);
  });

  it("should show next button when not on last page", () => {
    render(
      <Paging page={0} totalPages={5} updateFunction={mockUpdateFunction} />,
    );

    const nextButton = screen.getByRole("button", { name: /Go to next page/i });
    expect(nextButton).toBeInTheDocument();
  });

  it("should not show next button on last page", () => {
    render(
      <Paging page={4} totalPages={5} updateFunction={mockUpdateFunction} />,
    );

    expect(
      screen.queryByRole("button", { name: /Go to next page/i }),
    ).not.toBeInTheDocument();
  });

  it("should show previous button when not on first page", () => {
    render(
      <Paging page={2} totalPages={5} updateFunction={mockUpdateFunction} />,
    );

    const prevButton = screen.getByRole("button", {
      name: /Go to previous page/i,
    });
    expect(prevButton).toBeInTheDocument();
  });

  it("should not show previous button on first page", () => {
    render(
      <Paging page={0} totalPages={5} updateFunction={mockUpdateFunction} />,
    );

    expect(
      screen.queryByRole("button", { name: /Go to previous page/i }),
    ).not.toBeInTheDocument();
  });

  it("should navigate to next page", async () => {
    const user = userEvent.setup();
    render(
      <Paging page={1} totalPages={5} updateFunction={mockUpdateFunction} />,
    );

    const nextButton = screen.getByRole("button", { name: /Go to next page/i });
    await user.click(nextButton);

    await expect(mockUpdateFunction).toHaveBeenCalledWith(2);
  });

  it("should navigate to previous page", async () => {
    const user = userEvent.setup();
    render(
      <Paging page={2} totalPages={5} updateFunction={mockUpdateFunction} />,
    );

    const prevButton = screen.getByRole("button", {
      name: /Go to previous page/i,
    });
    await user.click(prevButton);

    await expect(mockUpdateFunction).toHaveBeenCalledWith(1);
  });

  it("should mark current page as active", async () => {
    render(
      <Paging page={2} totalPages={5} updateFunction={mockUpdateFunction} />,
    );

    const currentB = await screen.findByRole("button", {
      name: /go to page 3/i,
    });
    await expect(currentB).toHaveAttribute("disabled");
  });

  it("should handle single page", () => {
    render(
      <Paging page={0} totalPages={1} updateFunction={mockUpdateFunction} />,
    );

    const pageButtons = screen.getAllByRole("button", { name: /Go to Page/i });
    expect(pageButtons.length).toBeGreaterThan(0);
    expect(
      screen.queryByRole("button", { name: /Go to next page/i }),
    ).not.toBeInTheDocument();
  });

  it("should reset to page 0 if current page exceeds total pages", async () => {
    const { rerender } = render(
      <Paging page={4} totalPages={5} updateFunction={mockUpdateFunction} />,
    );

    rerender(
      <Paging page={4} totalPages={2} updateFunction={mockUpdateFunction} />,
    );

    await expect(mockUpdateFunction).toHaveBeenCalledWith(0);
  });

  it("should display correct number of page buttons", () => {
    render(
      <Paging page={0} totalPages={3} updateFunction={mockUpdateFunction} />,
    );

    expect(
      screen.getByRole("button", { name: /Go to Page 1/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Go to Page 3/i }),
    ).toBeInTheDocument();
  });
});
