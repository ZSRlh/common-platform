import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import type { MockMethod } from 'vite-plugin-mock';

// 需要在vite.config.ts 的 viteMockServe 中配置 ignore: /^index/
const modules: Record<string, { default: MockMethod[] }> = import.meta.glob('./modules/**/*.ts', { eager: true });
const mockModules: MockMethod[] = [];
console.log(modules)
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return;
  }
  mockModules.push(...modules[key].default);
});

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
