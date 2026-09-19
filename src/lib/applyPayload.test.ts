import { describe, expect, it } from "vitest";
import { applySchema } from "@/lib/applyPayload";

describe("applySchema", () => {
  const valid = {
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    contact: "@ada",
    location: "USA, Seattle",
    social: "https://linkedin.com/in/ada",
    experience: 5,
  };

  it("accepts a complete application payload", () => {
    expect(applySchema.parse(valid).email).toBe("ada@example.com");
  });

  it("rejects invalid email", () => {
    expect(applySchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects experience outside range", () => {
    expect(applySchema.safeParse({ ...valid, experience: 61 }).success).toBe(false);
  });
});
