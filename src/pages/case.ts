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
    .splide__slide { overflow: hidden; }
    .splide__video { position: absolute; inset: 0; }
    .splide__video__wrapper,
    .splide__video__wrapper > div { position: absolute; inset: 0; width: 100% !important; height: 100% !important; }
    .splide__video__wrapper iframe { position: absolute; inset: 0; width: 100% !important; height: 100% !important; }
    .splide__video__play { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; z-index: 10; cursor: pointer; }
    .hero-play-btn { pointer-events: none; }
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

  splide.on('video:play', () => {
    el.querySelectorAll<HTMLElement>('[data-video-thumb]').forEach(thumb => {
      thumb.style.display = 'none'
    })
    el.querySelectorAll<HTMLElement>('.splide__video__wrapper').forEach(wrapper => {
      wrapper.style.width = '100%'
      wrapper.style.height = '100%'
      const vimeoDiv = wrapper.querySelector<HTMLElement>('[data-vimeo-initialized]')
      if (vimeoDiv) {
        vimeoDiv.style.width = '100%'
        vimeoDiv.style.height = '100%'
      }
      const iframe = wrapper.querySelector<HTMLIFrameElement>('iframe')
      if (iframe) {
        iframe.style.width = '100%'
        iframe.style.height = '100%'
      }
    })
  })

  splide.mount({ Video })
}

document.addEventListener('DOMContentLoaded', () => {
  injectSliderStyles()
  initHeroHeading()
  initResultsButton()
  initTagLinks()
  initHeroSlider()
})
