jest.mock("@/lib/flags", () => ({
  USA: { emoji: "🇺🇸", name: "United States" },
  CAN: { emoji: "🇨🇦", name: "Canada" },
  GBR: { emoji: "🇬🇧", name: "United Kingdom" },
  NONE: { emoji: "", name: "No Flag" },
}));

import { cn, getFlagByISO } from "./utils";

describe("Utility Functions", () => {
  describe("cn", () => {
    it("should merge simple class strings", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
    });

    it("should handle conditional classes and remove falsy values", () => {
      expect(
        cn("base-class", false && "conditional-class", "another-class")
      ).toBe("base-class another-class");
    });

    it("should handle nested arrays", () => {
      expect(cn(["class1", ["class2", "class3"]], "class4")).toBe(
        "class1 class2 class3 class4"
      );
    });
  });

  describe("getFlagByISO", () => {
    it("should return the correct flag emoji for a valid ISO code", () => {
      expect(getFlagByISO("USA")).toBe("🇺🇸");
      expect(getFlagByISO("GBR")).toBe("🇬🇧");
    });

    it("should return a space for an undefined ISO code", () => {
      expect(getFlagByISO(undefined)).toBe(" ");
    });

    it("should return a space for an unknown ISO code", () => {
      expect(getFlagByISO("XYZ")).toBe(" ");
    });
  });
});
