import { describe, expect, it } from "vitest";
import { isHttpUrl, resumeFileName } from "./applications";

describe("resumeFileName", () => {
  it("strips the uuid prefix from a stored path", () => {
    expect(resumeFileName("solidity-engineer/a1b2c3d4-e5f6-7890-abcd-ef1234567890-Jane_Doe.pdf")).toBe(
      "Jane_Doe.pdf",
    );
  });

  it("returns null for empty values", () => {
    expect(resumeFileName(null)).toBeNull();
    expect(resumeFileName("")).toBeNull();
  });
});

describe("isHttpUrl", () => {
  it("accepts http(s) profiles", () => {
    expect(isHttpUrl("https://linkedin.com/in/ada")).toBe(true);
  });

  it("rejects handles", () => {
    expect(isHttpUrl("@telegram")).toBe(false);
  });
});
