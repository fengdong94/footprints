import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Wishlist from "./wishlist";

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

describe("Wishlist Component", () => {
  it("renders the wishlist button", () => {
    render(<Wishlist countries={[]} />);
    expect(screen.getByText("wishlist")).toBeInTheDocument();
  });
});
