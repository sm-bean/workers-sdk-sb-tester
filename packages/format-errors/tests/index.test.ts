import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

describe("test test", () => {
    it("should", async () => {
        const err = new Error("error error error");
        const resp = await SELF.fetch(`https://format-errors.example.com`, {
            method: "POST",
            body: JSON.stringify(err),
        })
        expect(resp).toMatchInlineSnapshot(`Response {}`)
    })
})