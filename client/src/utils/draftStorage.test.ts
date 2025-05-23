import { taskModalDraftStorage } from "./draftStorage";

describe("taskModalDraftStorage tests", () => {
  it("Should save data to localStorage", () => {
    const values = { title: "title", description: "description" };
    taskModalDraftStorage.save(values);
    expect(localStorage.getItem("taskModalDraft")).toBe(JSON.stringify(values));
  });
  it("Should load data from localStorage", () => {
    const values2 = { title: "title2" };
    localStorage.setItem("taskModalDraft", JSON.stringify(values2));
    expect(taskModalDraftStorage.load()).toStrictEqual(values2);
  });
  it("Should delete data from localStorage", () => {
    localStorage.setItem(
      "taskModalDraft",
      JSON.stringify({ description: "description3" }),
    );
    taskModalDraftStorage.clear();
    expect(localStorage.getItem("taskModalDraft")).toBeNull();
  });
});
