// Mock external dependencies before importing the module under test

// Mock Next.js utilities
const mockRedirect = jest.fn();
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));
const mockSetCookie = jest.fn();
jest.mock("next/headers", () => ({
  cookies: () => ({
    set: mockSetCookie,
  }),
}));

// Mock Zod schema
const mockLoginSchema = {
  safeParse: jest.fn(),
};
jest.mock("@/lib/from-schemas", () => ({
  LoginSchema: {
    safeParse: jest.fn(),
  },
}));

// Mock Prisma
const mockUsers = {
  findUnique: jest.fn(),
  create: jest.fn(),
};
jest.mock("@/lib/prisma", () => ({
  users: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

// Mock Auth utilities
const mockJwtSign = jest.fn();
const mockJwtVerify = jest.fn();
const mockTokenExpiredError = class TokenExpiredError extends Error {};
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
  TokenExpiredError: class TokenExpiredError extends Error {},
}));

const mockBcryptHash = jest.fn();
const mockBcryptCompare = jest.fn();
jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

const mockSendMail = jest.fn();
jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

import { signup, login, confirmAccount, State } from "./signup-login";

const PREV_STATE: State = {};
const TEST_EMAIL = "test@example.com";
const TEST_PASSWORD = "password123";
const TEST_TOKEN = "mock-jwt-token";
const TEST_HASHED_PASSWORD = "hashed-password";

describe("signup-login.ts Server Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLoginSchema.safeParse.mockClear();
    mockUsers.findUnique.mockClear();
    mockUsers.create.mockClear();
    mockBcryptHash.mockResolvedValue(TEST_HASHED_PASSWORD);
    mockJwtSign.mockReturnValue(TEST_TOKEN);
  });

  // Helper to create mock FormData
  const createMockFormData = (email = TEST_EMAIL, password = TEST_PASSWORD) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    return formData;
  };

  describe("confirmAccount", () => {
    const mockPayload = {
      type: "email_verification",
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      iat: 1,
      exp: 2,
    };

    it("should return error if user already exists", async () => {
      mockJwtVerify.mockReturnValue(mockPayload);
      mockUsers.findUnique.mockResolvedValue({ email: TEST_EMAIL });

      const result = await confirmAccount(TEST_TOKEN);

      expect(result).toEqual({ msg: "Verification failed" });
      expect(mockUsers.create).not.toHaveBeenCalled();
    });

    it("should return error if token type is invalid", async () => {
      mockJwtVerify.mockReturnValue({ ...mockPayload, type: "other" });

      const result = await confirmAccount(TEST_TOKEN);

      expect(result).toEqual({ msg: "Verification failed" });
    });

    it("should return error for expired token", async () => {
      mockJwtVerify.mockImplementation(() => {
        throw new mockTokenExpiredError("Token expired");
      });

      const result = await confirmAccount(TEST_TOKEN);

      expect(result).toEqual({ msg: "Verification failed" });
    });

    it("should return generic error for other JWT errors", async () => {
      mockJwtVerify.mockImplementation(() => {
        throw new Error("Some other error");
      });

      const result = await confirmAccount(TEST_TOKEN);

      expect(result).toEqual({
        msg: "Verification failed",
      });
    });
  });
});
