/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { render } from "@testing-library/react";
import Map from "./map";
import React, { RefObject } from "react";
import mapboxgl from "mapbox-gl";

// Mock mapbox-gl library
// mock the Map constructor and the on method
const mockMap = {
  on: jest.fn(),
  addControl: jest.fn(),
  remove: jest.fn(),
  getLayer: jest.fn(),
  getSource: jest.fn(),
  addSource: jest.fn(),
  addLayer: jest.fn(),
  setPaintProperty: jest.fn(),
  setFilter: jest.fn(),
  getCanvas: jest.fn(() => ({ style: {} })),
};
jest.mock("mapbox-gl", () => ({
  Map: jest.fn(() => mockMap),
  // Also mock other Mapbox utilities if needed, e.g., for flyTo, events
  Popup: jest.fn(),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    setHTML: jest.fn().mockReturnThis(),
    addTo: jest.fn().mockReturnThis(),
    remove: jest.fn().mockReturnThis(),
  })),
  // Ensure access token is set, even if it's mocked out
  accessToken: "",
}));

// Mock custom hooks and context
jest.mock("../hooks", () => ({
  useSetCountryList: jest.fn(),
  useHighlight: jest.fn(),
  useClick: jest.fn(),
  useFootprints: jest.fn(),
}));

// Mock context provider
jest.mock("../context", () => ({
  CountryListContext: require("react").createContext({
    setCountryList: jest.fn(),
    countryList: [],
    countryMap: {},
  }),
}));

const mockFootprints = [
  {
    country_name: "France",
    type: "VISITED",
    date: "2023-01-01",
    photos: [],
    stories: null,
    user_email: "test@example.com",
  },
];

const mockMapRef: RefObject<mapboxgl.Map | null> = { current: null };
const mockSetSelectedCountry = jest.fn();

// --- TESTS ---
describe("Map Component", () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls hooks on map load", () => {
    render(
      <Map
        selectedCountry={undefined}
        setSelectedCountry={mockSetSelectedCountry}
        prevCountry={undefined}
        footprints={mockFootprints}
        mapRef={mockMapRef}
      />
    );

    expect(require("../hooks").useSetCountryList).toHaveBeenCalledTimes(1);
    expect(require("../hooks").useHighlight).toHaveBeenCalledTimes(1);
    expect(require("../hooks").useClick).toHaveBeenCalledTimes(1);
    expect(require("../hooks").useFootprints).toHaveBeenCalledTimes(1);
  });

  it("includes the required map container div", () => {
    const { container } = render(
      <Map
        selectedCountry={undefined}
        setSelectedCountry={mockSetSelectedCountry}
        prevCountry={undefined}
        footprints={mockFootprints}
        mapRef={mockMapRef}
      />
    );

    const mapDiv = document.createElement("div");
    mapDiv.id = "map";
    mapDiv.setAttribute("data-testid", "map-container");
    container.appendChild(mapDiv);

    expect(mapboxgl.Map).toHaveBeenCalledWith(
      expect.objectContaining({ container: "map" })
    );
  });
});
