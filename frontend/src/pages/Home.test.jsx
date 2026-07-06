import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

vi.mock("../api/customers", () => ({
  getCustomers: vi.fn(),
}));

import { getCustomers } from "../api/customers";

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the customer list once loaded", async () => {
    getCustomers.mockResolvedValue({
      data: { count: 1, data: [{ _id: "1", legalEntityId: "le_1", accountHolderId: "ah_1" }] },
    });

    renderHome();

    expect(await screen.findByText("le_1")).toBeInTheDocument();
    expect(screen.getByText("ah_1")).toBeInTheDocument();
  });

  it("renders an empty state when there are no customers", async () => {
    getCustomers.mockResolvedValue({ data: { count: 0, data: [] } });

    renderHome();

    expect(await screen.findByText("No customers yet.")).toBeInTheDocument();
  });

  it("renders an error state when the request fails", async () => {
    getCustomers.mockRejectedValue({ response: { data: { message: "Boom" } } });

    renderHome();

    expect(await screen.findByText("Boom")).toBeInTheDocument();
  });
});
