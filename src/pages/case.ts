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
    .splide__video { position: absolute; inset: 0; z-index: 1; display: block !important; }
    .splide__video__wrapper,
    .splide__video__wrapper > div { position: absolute; inset: 0; width: 100% !important; height: 100% !important; display: block !important; }
    .splide__video__wrapper iframe { position: absolute; inset: 0; width: 100% !important; height: 100% !important; }
    [data-video-thumb] { position: absolute; inset: 0; z-index: 15; }
    [data-video-thumb] .hero-play-btn { pointer-events: none; }
  `
  document.head.appendChild(style)
}

function initHeroSlider(): void {
  const el = document.querySelector<HTMLElement>('[data-hero-slider]')
  if (!el) return

  let activePlayer: Player | null = null

  const ICON_PLAY     = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21"/></svg>'
  const ICON_PAUSE    = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>'
  const ICON_FULLSCR  = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>'

  const setPlayPauseIcon = (playing: boolean) => {
    el.querySelectorAll<HTMLElement>('[data-video-play-pause]').forEach(btn => {
      btn.innerHTML = playing ? ICON_PAUSE : ICON_PLAY
    })
  }

  const initControlIcons = () => {
    el.querySelectorAll<HTMLElement>('[data-video-fullscreen]').forEach(btn => {
      btn.innerHTML = ICON_FULLSCR
    })
    setPlayPauseIcon(false)
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

  const getSlide = (index: number) =>
    el.querySelectorAll<HTMLElement>('.splide__slide')[index]

  const setProgress = (percent: number) => {
    el.querySelectorAll<HTMLElement>('[data-video-progress]').forEach(bar => {
      bar.style.width = `${percent * 100}%`
    })
  }

  splide.on('video:play', (player: Player) => {
    activePlayer = player

    const slide = getSlide(splide.index)
    slide?.querySelectorAll<HTMLElement>('[data-video-thumb]').forEach(t => { t.style.display = 'none' })

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

    player.on('timeupdate', ({ percent }: { percent: number }) => setProgress(percent))
  })

  splide.on('video:pause', () => setPlayPauseIcon(false))

  splide.on('move', (_newIndex: number, prevIndex: number) => {
    const leavingSlide = getSlide(prevIndex)
    leavingSlide?.querySelectorAll<HTMLElement>('[data-video-thumb]').forEach(t => { t.style.display = '' })
    el.querySelectorAll<HTMLElement>('.hero-video-controls').forEach(c => { c.style.display = 'none' })
    activePlayer = null
    setPlayPauseIcon(false)
    setProgress(0)
  })

  const videoComponent = () => (splide.Components as any).Video

  el.addEventListener('click', e => {
    const target = e.target as HTMLElement

    if (!activePlayer && (target.closest('[data-video-thumb]') || target.closest('.splide__video__play'))) {
      videoComponent()?.play()
      return
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

    const timeline = target.closest<HTMLElement>('[data-video-timeline]')
    if (timeline && activePlayer) {
      const rect = timeline.getBoundingClientRect()
      const percent = Math.max(0, Math.min(1, ((e as MouseEvent).clientX - rect.left) / rect.width))
      activePlayer.getDuration().then(duration => {
        activePlayer!.setCurrentTime(percent * duration)
      })
    }
  })

  splide.mount({ Video })
  initControlIcons()
}

document.addEventListener('DOMContentLoaded', () => {
  injectSliderStyles()
  initHeroHeading()
  initResultsButton()
  initTagLinks()
  initHeroSlider()
})
