// @ts-check
import { test, expect } from '@playwright/test'

const CAT_IMAGE_URL = 'https://cataas.com/cat/says/'
const LOCALHOST = 'http://localhost:5173/'

test('app show a random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST)

  const fact = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await fact.textContent()
  const src = await image.getAttribute('src')

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(src?.startsWith(CAT_IMAGE_URL)).toBeTruthy()
})
