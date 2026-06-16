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
    .splide__video { position: absolute; inset: 0; z-index: 1; display: block !important; }
    .splide__video__wrapper,
    .splide__video__wrapper > div { position: absolute; inset: 0; width: 100% !important; height: 100% !important; display: block !important; }
    .splide__video__wrapper iframe { position: absolute; inset: 0; width: 100% !important; height: 100% !important; }
    [data-video-thumb] { position: absolute; inset: 0; z-index: 15; }
    [data-video-thumb] .hero-play-btn { pointer-events: none; color: #000; }
    [data-video-thumb] .hero-play-btn svg { fill: #000; width: 22px; height: 26px; }
    [data-video-thumb] .hero-play-btn svg * { fill: #000; }
    [data-video-timeline] { position: relative; cursor: pointer; flex: 1; background: rgba(214, 242, 119, 0.25); }
    [data-video-progress] { position: absolute; top: 0; left: 0; height: 100%; width: 0%; pointer-events: none; background: #D6F277; }
    [data-video-play-pause], [data-video-mute] { display: flex; align-items: center; }
    [data-video-mute] { aspect-ratio: 1; width: 40px; height: 40px; cursor: pointer; }
    [data-video-play-pause] svg, [data-video-mute] svg { display: block; height: 100%; width: auto; aspect-ratio: 1; }
  `
  document.head.appendChild(style)
}

function initHeroSlider(): void {
  const el = document.querySelector<HTMLElement>('[data-hero-slider]')
  if (!el) return

  let activeIframe: HTMLIFrameElement | null = null
  let isPlaying = false
  let isMuted = false
  let videoDuration = 0
  const registeredSdkPlayers = new WeakSet<object>()

  const ICON_PLAY   = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D6F277"><polygon points="5,3 19,12 5,21"/></svg>'
  const ICON_PAUSE  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D6F277"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>'
  const ICON_VOL    = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D6F277"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>'
  const ICON_MUTED  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D6F277"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H4v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'

  const setPlayPauseIcon = (playing: boolean) => {
    el.querySelectorAll<HTMLElement>('[data-video-play-pause]').forEach(btn => {
      btn.innerHTML = playing ? ICON_PAUSE : ICON_PLAY
    })
  }

  const setMuteIcon = (muted: boolean) => {
    el.querySelectorAll<HTMLElement>('[data-video-mute]').forEach(btn => {
      btn.innerHTML = muted ? ICON_MUTED : ICON_VOL
    })
  }

  const initControlIcons = () => {
    setPlayPauseIcon(false)
    setMuteIcon(false)
    setProgress(0)
  }

  // Send a postMessage to the active Vimeo iframe (plain object, not JSON string)
  const vimeoMsg = (method: string, value?: unknown) => {
    if (!activeIframe?.contentWindow) return
    const payload: Record<string, unknown> = { method }
    if (value !== undefined) payload.value = value
    activeIframe.contentWindow.postMessage(payload, 'https://player.vimeo.com')
  }

  const splide = new Splide(el, {
    type: 'fade',
    rewind: true,
    pagination: false,
    arrows: false,
    video: {
      autoplay: false,
      mute: false,
      hideControls: true,
      disableOverlayUI: true,
      playerOptions: {
        vimeo: {
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

  splide.on('video:play', (extPlayer: any) => {
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
    isPlaying = true
    setPlayPauseIcon(true)

    const iframe = slide?.querySelector<HTMLIFrameElement>('iframe')
    if (iframe) {
      activeIframe = iframe
      // Use the extension's bundled Vimeo SDK player for event registration so the
      // correct player_id is included — raw postMessage without player_id is silently ignored.
      const sdkPlayer = extPlayer?.player?.player
      if (sdkPlayer && typeof sdkPlayer.on === 'function' && !registeredSdkPlayers.has(sdkPlayer)) {
        registeredSdkPlayers.add(sdkPlayer)
        sdkPlayer.on('timeupdate', ({ percent }: any) => setProgress(percent))
        sdkPlayer.on('durationchange', ({ duration }: any) => { videoDuration = duration })
      }
    }
  })

  splide.on('video:pause', () => {
    isPlaying = false
    setPlayPauseIcon(false)
  })

  splide.on('move', (_newIndex: number, prevIndex: number) => {
    const leavingSlide = getSlide(prevIndex)
    leavingSlide?.querySelectorAll<HTMLElement>('[data-video-thumb]').forEach(t => { t.style.display = '' })
    el.querySelectorAll<HTMLElement>('.hero-video-controls').forEach(c => { c.style.display = 'none' })
    activeIframe = null
    isPlaying = false
    isMuted = false
    videoDuration = 0
    setPlayPauseIcon(false)
    setProgress(0)
  })

  const videoComponent = () => (splide.Components as any).Video

  // Thumbnail / overlay → start video
  el.addEventListener('click', e => {
    const target = e.target as HTMLElement
    if (!isPlaying && (target.closest('[data-video-thumb]') || target.closest('.splide__video__play'))) {
      videoComponent()?.play()
    }
  })

  // Custom controls: stopPropagation prevents PlayerUI's slide-level click from toggling play/pause
  el.querySelectorAll<HTMLElement>('.hero-video-controls').forEach(controls => {
    controls.addEventListener('click', e => {
      e.stopPropagation()
      if (!activeIframe) return
      const target = e.target as HTMLElement

      if (target.closest('[data-video-mute]')) {
        isMuted = !isMuted
        vimeoMsg('setMuted', isMuted)
        setMuteIcon(isMuted)
        return
      }

      const timeline = target.closest<HTMLElement>('[data-video-timeline]')
      if (timeline) {
        const rect = timeline.getBoundingClientRect()
        const percent = Math.max(0, Math.min(1, ((e as MouseEvent).clientX - rect.left) / rect.width))
        vimeoMsg('setCurrentTime', percent * videoDuration)
        return
      }

      if (target.closest('[data-video-play-pause]')) {
        if (isPlaying) videoComponent()?.pause()
        else videoComponent()?.play()
      }
    })
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
