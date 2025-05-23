import getOptions from "./getOptions";

describe("getOptions tests", () => {
  it("Should return array of { value, label } objects for array of strings", () => {
    const input = ["item1", "item2"];
    const output = [
      { value: "item1", label: "item1" },
      { value: "item2", label: "item2" },
    ];
    expect(getOptions(input)).toStrictEqual(output);
  });
  it("Should return empty array for empty input", () => {
    expect(getOptions([])).toStrictEqual([]);
  });
  it("Should return empty array of empty strings for same input", () => {
    const input = ["", " "];
    const output = [
      { value: "", label: "" },
      { value: " ", label: " " },
    ];
    expect(getOptions(input)).toStrictEqual(output);
  });
});
