import { test, expect } from '@playwright/test';

test.describe('Flujo Inicial QA (Zero Bug Policy)', () => {
  test('La Landing Page carga correctamente y muestra productos', async ({ page }) => {
    // 1. Visitamos la aplicación tal como lo haría un usuario
    await page.goto('/');

    // 2. Verificamos que no estemos ante el error "White Screen of Death" de Vite
    // por culpa del verbatimModuleSyntax u otro error de compilación.
    // Playwright buscará el Title principal de la bodega
    const heading = page.locator('text=Bodega El Caserito').first();
    await expect(heading).toBeVisible();

    // 3. Verificamos que el Fake API resuelve y muestra los productos después del delay
    const productCard = page.locator('text=Inca Kola 1.5L');
    await expect(productCard).toBeVisible({ timeout: 5000 });
  });
});
