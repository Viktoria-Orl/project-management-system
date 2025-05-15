import { CreateUpdateTask } from "../state/issues.rtk";

export const taskModalDraftStorage = {
  // cохранение черновика
  save(values: Partial<CreateUpdateTask>) {
    localStorage.setItem("taskModalDraft", JSON.stringify(values));
  },
  // Загрузка черновика
  load(): Partial<CreateUpdateTask> | null {
    const data = localStorage.getItem("taskModalDraft");
    return data ? (JSON.parse(data) as Partial<CreateUpdateTask>) : null;
  },
  // Удаление черновика
  clear() {
    localStorage.removeItem("taskModalDraft");
  },
};
