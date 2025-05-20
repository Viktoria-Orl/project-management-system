import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // позволяет принимать внешние подключения
    watch: {
      usePolling: true, // чтобы отслеживание файлов работало в Docker volume
    },
  },
});
