import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Visited from "./visited";

type IconButtonProps = {
  label: string;
};

jest.mock("@/components/ui/icon-button", () => {
  return function MockIconButton({ label }: IconButtonProps) {
    return <button>{label}</button>;
  };
});

jest.mock(
  "./country-list",
  () =>
    function MockCountryList() {
      return <div>Mock Country List</div>;
    }
);

describe("Visited Component", () => {
  it("renders the visited button", () => {
    render(<Visited countries={[]} />);
    expect(screen.getByText("visited")).toBeInTheDocument();
  });
});
