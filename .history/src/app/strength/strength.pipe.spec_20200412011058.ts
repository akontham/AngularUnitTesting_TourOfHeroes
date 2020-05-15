import { StrengthPipe } from "./strength.pipe";

// Example of isolated unit testing a pipe
describe("strength pipe", () => {
  it("should display weak if the value is less than 5", () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(5)).toBe("5 (weak)");
  });

  it("should display strong if value is 19 ", () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(19)).toBe("19 (strong)");
  });

  it("should display unbelievable if the value is 20 ", () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(20)).toEqual("20 (unbelievable)");
  });
});
