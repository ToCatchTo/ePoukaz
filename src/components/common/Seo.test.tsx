import { render, waitFor } from '@testing-library/react'
import { test, expect } from 'vitest'
import { Seo } from './Seo'

test('nastaví title s brandem, description a canonical', async () => {
  render(<Seo title="Ceník" description="Popis ceníku." path="/cenik" />)
  await waitFor(() => expect(document.title).toBe('Ceník | ePoukaz online'))
  const desc = document.querySelector('meta[name="description"]')
  expect(desc?.getAttribute('content')).toBe('Popis ceníku.')
  const canonical = document.querySelector('link[rel="canonical"]')
  expect(canonical?.getAttribute('href')).toBe('https://epoukazonline.cz/cenik')
})

test('bez title použije jen brand', async () => {
  render(<Seo description="Domů." path="/" />)
  await waitFor(() => expect(document.title).toBe('ePoukaz online'))
})
