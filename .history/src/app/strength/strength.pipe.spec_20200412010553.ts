import { StrengthPipe } from "./strength.pipe";

// Example of isolated unit testing a pipe
describe("strength pipe", () => {
  it("should display weak if the value is less than 5", () => {
    let pipe = new StrengthPipe();
  });
});
