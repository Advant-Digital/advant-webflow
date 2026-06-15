import Splide from '@splidejs/splide'
import { Video } from '@splidejs/splide-extension-video'
import Player from '@vimeo/player'

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
    [data-video-thumb] .hero-play-btn { pointer-events: none; }
  `
  document.head.appendChild(style)
}

function initHeroSlider(): void {
  const el = document.querySelector<HTMLElement>('[data-hero-slider]')
  if (!el) return

  let activePlayer: Player | null = null

  const setPlayPauseIcon = (playing: boolean) => {
    el.querySelectorAll<HTMLElement>('[data-video-play-pause]').forEach(btn => {
      btn.innerHTML = playing
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21"/></svg>'
    })
  }

  const splide = new Splide(el, {
    type: 'fade',
    rewind: true,
    pagination: true,
    arrows: true,
    video: {
      autoplay: false,
      mute: false,
      disableOverlayUI: true,
      playerOptions: {
        vimeo: {
          controls: false,
          title: false,
          byline: false,
          portrait: false,
          dnt: true,
        },
      },
    },
  })

  splide.on('video:play', (player: Player) => {
    activePlayer = player

    el.querySelectorAll<HTMLElement>('[data-video-thumb]').forEach(el => { el.style.display = 'none' })
    el.querySelectorAll<HTMLElement>('.splide__video__wrapper').forEach(wrapper => {
      wrapper.style.width = '100%'
      wrapper.style.height = '100%'
      const vimeoDiv = wrapper.querySelector<HTMLElement>('[data-vimeo-initialized]')
      if (vimeoDiv) { vimeoDiv.style.width = '100%'; vimeoDiv.style.height = '100%' }
      const iframe = wrapper.querySelector<HTMLIFrameElement>('iframe')
      if (iframe) { iframe.style.width = '100%'; iframe.style.height = '100%' }
    })

    el.querySelectorAll<HTMLElement>('.hero-video-controls').forEach(c => { c.style.display = 'flex' })
    setPlayPauseIcon(true)
  })

  splide.on('video:pause', () => setPlayPauseIcon(false))

  const videoComponent = () => (splide.Components as any).Video

  el.addEventListener('click', e => {
    const target = e.target as HTMLElement

    if (target.closest('[data-video-thumb]')) {
      videoComponent()?.play()
    }

    if (target.closest('[data-video-play-pause]') && activePlayer) {
      activePlayer.getPaused().then(paused => {
        if (paused) activePlayer!.play()
        else activePlayer!.pause()
      })
    }

    if (target.closest('[data-video-fullscreen]') && activePlayer) {
      activePlayer.requestFullscreen()
    }
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
