import Splide from '@splidejs/splide'
import { Video } from '@splidejs/splide-extension-video'

function initHeroHeading(): void {
  const heading = document.querySelector<HTMLElement>('[data-case-hero-heading]')
  if (!heading || heading.textContent?.trim()) return
  const name = document.querySelector<HTMLElement>('[data-case-name]')
  if (name?.textContent) heading.textContent = name.textContent
}

function initResultsButton(): void {
  const btn = document.querySelector<HTMLElement>('[data-results-btn]')
  if (!btn) return
  btn.style.display = document.getElementById('results') ? '' : 'none'
}

function initTagLinks(): void {
  document.querySelectorAll<HTMLAnchorElement>('[data-tag-link]').forEach(tag => {
    const slug = tag.dataset.tagSlug
    if (slug) tag.href = `/cases?tag=${encodeURIComponent(slug)}`
  })
}

function injectSliderStyles(): void {
  const style = document.createElement('style')
  style.textContent = `
    .splide__video { position: absolute; inset: 0; width: 100%; height: 100%; }
    .splide__video iframe { width: 100%; height: 100%; }
  `
  document.head.appendChild(style)
}

function initHeroSlider(): void {
  const el = document.querySelector<HTMLElement>('[data-hero-slider]')
  if (!el) return

  const splide = new Splide(el, {
    type: 'fade',
    rewind: true,
    pagination: true,
    arrows: true,
    video: {
      autoplay: false,
      mute: false,
    },
  })

  const setThumbVisibility = (visible: boolean) => {
    el.querySelectorAll<HTMLElement>('[data-video-thumb]').forEach(thumb => {
      thumb.style.display = visible ? '' : 'none'
    })
  }

  splide.on('video:play', () => setThumbVisibility(false))
  splide.on('video:pause', () => setThumbVisibility(true))
  splide.on('video:end', () => setThumbVisibility(true))

  splide.mount({ Video })
}

document.addEventListener('DOMContentLoaded', () => {
  injectSliderStyles()
  initHeroHeading()
  initResultsButton()
  initTagLinks()
  initHeroSlider()
})
