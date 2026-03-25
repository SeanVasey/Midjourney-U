import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import App from "./App";
import { SECTIONS } from "./data/sections";

afterEach(cleanup);

const TOTAL = SECTIONS.length;

describe("App", () => {
  it("renders the hero slide on initial load", () => {
    render(<App />);
    expect(screen.getByText("Midjourney")).toBeInTheDocument();
    expect(screen.getByText("VASEY MULTIMEDIA PRESENTS")).toBeInTheDocument();
    expect(screen.getByText("SWIPE OR TAP TO BEGIN")).toBeInTheDocument();
  });

  it("shows slide counter", () => {
    render(<App />);
    const counters = screen.getAllByText((_content, element) => {
      return element?.textContent === `01 / ${String(TOTAL).padStart(2, "0")}`;
    });
    expect(counters.length).toBeGreaterThanOrEqual(1);
  });

  it("renders navigation dots for all slides", () => {
    render(<App />);
    const dots = screen.getAllByRole("button", { name: /Go to slide/ });
    expect(dots).toHaveLength(TOTAL);
  });

  it("navigates to next slide via next button", async () => {
    render(<App />);
    const nextBtns = screen.getAllByRole("button", { name: "Next slide" });
    fireEvent.click(nextBtns[0]);

    await new Promise((r) => setTimeout(r, 300));

    const headings = screen.getAllByText("The Big Picture");
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it("disables previous button on first slide", () => {
    render(<App />);
    const prevBtns = screen.getAllByRole("button", { name: "Previous slide" });
    expect(prevBtns[0]).toBeDisabled();
  });
});
