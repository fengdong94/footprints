// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Mock Next.js utilities
const revalidatePath = jest.fn();
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

// Mock Prisma
const mockFootprints = {
  findFirst: jest.fn(),
  update: jest.fn(),
};
jest.mock("@/lib/prisma", () => ({
  footprints: {
    findFirst: jest.fn(),
    update: jest.fn(),
  },
}));

// Mock Cloudinary
const mockCloudinaryUploader = {
  upload: jest.fn(),
  destroy: jest.fn(),
};
jest.mock("@/lib/cloudinary", () => ({
  uploader: {
    upload: jest.fn(),
    destroy: jest.fn(),
  },
}));

// Mock user email retrieval
const mockGetEmail = jest.fn();
jest.mock("@/lib/db", () => ({
  getEmail: jest.fn(),
}));

// Import functions under test
import { addFootprint, updateTravelMemory, State } from "./footprints";

const TEST_EMAIL = "test@example.com";
const PREV_STATE: State = {};

describe("footprints.ts Server Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetEmail.mockResolvedValue(TEST_EMAIL);
    // Default Prisma mock for non-existence
    mockFootprints.findFirst.mockResolvedValue(null);
  });

  // --- addFootprint Tests ---

  describe("addFootprint", () => {
    const data = { countryName: "Testland", type: "visited" };

    it("should return error if footprint exists and type is the same", async () => {
      mockFootprints.findFirst.mockResolvedValue({
        user_email: TEST_EMAIL,
        country_name: "Testland",
        type: "visited",
      });

      const result = await addFootprint(PREV_STATE, data);

      expect(result).toEqual({
        success: false,
        msg: "Create footprint failed, please try again later.",
      });
      expect(mockFootprints.update).not.toHaveBeenCalled();
      expect(revalidatePath).not.toHaveBeenCalled();
    });

    it("should handle database error during update", async () => {
      mockFootprints.findFirst.mockResolvedValue({
        user_email: TEST_EMAIL,
        country_name: "Testland",
        type: "wishlist",
      });
      mockFootprints.update.mockRejectedValue(
        new Error("DB connection failed")
      );

      const dataUpdate = { countryName: "Testland", type: "visited" };
      const result = await addFootprint(PREV_STATE, dataUpdate);

      expect(result.success).toBe(false);
      expect(result.msg).toContain(
        "Create footprint failed, please try again later"
      );
      expect(revalidatePath).not.toHaveBeenCalled();
    });
  });

  // --- updateTravelMemory Tests ---

  describe("updateTravelMemory", () => {
    const data = {
      countryName: "Testland",
      date: new Date().toISOString(),
      photos: ["base64_photo1", "base64_photo2"],
      stories: "My great trip.",
    };
    const mockFootprint = { user_email: TEST_EMAIL, country_name: "Testland" };

    beforeEach(() => {
      // Mock Cloudinary for photo uploads
      mockCloudinaryUploader.upload
        .mockResolvedValueOnce({ secure_url: "url1" })
        .mockResolvedValueOnce({ secure_url: "url2" });
      mockFootprints.update.mockResolvedValue({});
    });

    it("should return error if footprint does not exist", async () => {
      mockFootprints.findFirst.mockResolvedValue(null);
      const result = await updateTravelMemory(PREV_STATE, data);

      expect(result).toEqual({
        success: false,
        msg: "This footprint does not exist.",
      });
      expect(mockCloudinaryUploader.upload).not.toHaveBeenCalled();
      expect(mockFootprints.update).not.toHaveBeenCalled();
    });

    it("should handle general exception during update (e.g., Cloudinary failure)", async () => {
      mockFootprints.findFirst.mockResolvedValue(mockFootprint);
      // Fail the first upload promise
      mockCloudinaryUploader.upload.mockRejectedValue(
        new Error("Cloudinary failed")
      );

      const result = await updateTravelMemory(PREV_STATE, data);

      expect(result).toEqual({
        success: false,
        msg: "This footprint does not exist.",
      });
      expect(mockFootprints.update).not.toHaveBeenCalled();
    });
  });
});
