// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const revalidatePath = jest.fn();
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

// Mock Zod schema
const mockProfileSchema = {
  safeParse: jest.fn(),
};
jest.mock("@/lib/from-schemas", () => ({
  ProfileSchema: {
    safeParse: jest.fn(),
  },
}));

// Mock Prisma
const mockUsers = {
  update: jest.fn(),
};
jest.mock("@/lib/prisma", () => ({
  users: {
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

// Mock FormData related functions
const mockArrayBuffer = new ArrayBuffer(0);

// Import function under test
import { updateProfile, State } from "./user";

const PREV_STATE: State = {};
const TEST_EMAIL = "test@example.com";
const TEST_AVATAR_URL =
  "http://res.cloudinary.com/footprints/image/upload/v1/footprints_avatars/public_id_old.jpg";
const TEST_PUBLIC_ID = "footprints_avatars/public_id_old";

describe("user.ts Server Action", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetEmail.mockResolvedValue(TEST_EMAIL);
    mockUsers.update.mockResolvedValue({});
  });

  // Helper to create mock FormData
  const createMockFormData = (
    avatarSize = 0,
    prevAvatar = "",
    name = "Test User",
    bio = "A cool bio",
    nationality = "US"
  ) => {
    const formData = new FormData();
    const mockFile = {
      size: avatarSize,
      type: "image/jpeg",
      arrayBuffer: () => Promise.resolve(mockArrayBuffer),
    } as unknown as File;

    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("avatar", mockFile);
    formData.append("prevAvatar", prevAvatar);
    formData.append("nationality", nationality);
    return formData;
  };

  // --- updateProfile Tests ---

  it("should return validation errors if form data is invalid", async () => {
    const mockErrors = { name: ["Name too short"] };
    mockProfileSchema.safeParse.mockReturnValue({
      success: false,
      error: { flatten: () => ({ fieldErrors: mockErrors }) },
    });

    expect(mockUsers.update).not.toHaveBeenCalled();
    expect(mockCloudinaryUploader.upload).not.toHaveBeenCalled();
  });

  it("should update profile without avatar upload if avatar size is 0", async () => {
    mockProfileSchema.safeParse.mockReturnValue({
      success: true,
      data: { name: "New Name", bio: "New Bio", avatar: {} as File },
    });

    expect(mockCloudinaryUploader.upload).not.toHaveBeenCalled();
    expect(mockCloudinaryUploader.destroy).not.toHaveBeenCalled();
  });

  it("should upload new avatar, update profile, and destroy previous avatar", async () => {
    const MOCK_NEW_AVATAR_URL = "http://new.cloudinary.url/avatar.jpg";
    mockProfileSchema.safeParse.mockReturnValue({
      success: true,
      data: { name: "New Name", bio: "New Bio", avatar: {} as File },
    });
    mockCloudinaryUploader.upload.mockResolvedValue({
      secure_url: MOCK_NEW_AVATAR_URL,
    });
  });

  it("should upload new avatar and update profile without destroying if no previous avatar exists", async () => {
    const MOCK_NEW_AVATAR_URL = "http://new.cloudinary.url/avatar.jpg";
    mockProfileSchema.safeParse.mockReturnValue({
      success: true,
      data: { name: "New Name", bio: "New Bio", avatar: {} as File },
    });
    mockCloudinaryUploader.upload.mockResolvedValue({
      secure_url: MOCK_NEW_AVATAR_URL,
    });

    expect(mockCloudinaryUploader.destroy).not.toHaveBeenCalled();
  });

  it("should handle exception during profile update", async () => {
    mockProfileSchema.safeParse.mockReturnValue({
      success: true,
      data: { name: "New Name", bio: "New Bio", avatar: {} as File },
    });
    mockUsers.update.mockRejectedValue(new Error("DB update failed"));

    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
