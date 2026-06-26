import Splide from '@splidejs/splide'
import { Video } from '@splidejs/splide-extension-video'
import splideCss from '@splidejs/splide/dist/css/splide-core.min.css'
import css from './hero-slider.css'

let stylesInjected = false

function extractVimeoId(url: string): string | null {
  const match = url.trim().match(/(?:vimeo\.com\/(?:video\/)?|^)(\d+)/)
  return match ? match[1] : null
}

export function injectHeroSliderStyles(): void {
  if (stylesInjected) return
  stylesInjected = true
  const style = document.createElement('style')
  style.textContent = splideCss + css
  document.head.appendChild(style)
}

export function initHeroSlider(container: HTMLElement | string = '[data-hero-slider]'): void {
  const el = typeof container === 'string'
    ? document.querySelector<HTMLElement>(container)
    : container
  if (!el) return

  const list = el.querySelector<HTMLElement>('.splide__list')
  if (!list) return

  // Prepend video slide — Webflow has already rendered image slides in the list
  const videoUrl = el.getAttribute('data-hero-video-url')?.trim()
  if (videoUrl) {
    const vimeoId = extractVimeoId(videoUrl)
    if (vimeoId) {
      const slide = document.createElement('div')
      slide.className = 'splide__slide'
      slide.setAttribute('data-splide-vimeo', vimeoId)

      const thumb = document.createElement('div')
      thumb.setAttribute('data-video-thumb', '')

      const thumbUrl = el.getAttribute('data-hero-video-thumb')
      if (thumbUrl) {
        const img = document.createElement('img')
        img.src = thumbUrl
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;'
        thumb.appendChild(img)
      }

      slide.appendChild(thumb)
      list.prepend(slide)
    }
  }

  if (!list.querySelector('.splide__slide')) return

  injectHeroSliderStyles()

  let activeIframe: HTMLIFrameElement | null = null
  let activeSdkPlayer: any = null
  let isPlaying = false
  let isMuted = false
  let subsEnabled = false
  let subsAvailable = false
  let availableTracks: any[] = []
  let videoDuration = 0
  const registeredSdkPlayers = new WeakSet<object>()

  const ICON_PLAY   = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D6F277"><polygon points="5,3 19,12 5,21"/></svg>'
  const ICON_PAUSE  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D6F277"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>'
  const ICON_VOL    = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D6F277"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>'
  const ICON_MUTED  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D6F277"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H4v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'
  const ICON_CC_OFF = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="1" y="5" width="22" height="14" rx="3" fill="none" stroke="#D6F277" stroke-width="1.5"/><text x="12" y="12" text-anchor="middle" dominant-baseline="central" fill="#D6F277" font-size="9" font-family="Arial,sans-serif" font-weight="bold">CC</text></svg>'
  const ICON_CC_ON  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="1" y="5" width="22" height="14" rx="3" fill="#D6F277"/><text x="12" y="12" text-anchor="middle" dominant-baseline="central" fill="#000" font-size="9" font-family="Arial,sans-serif" font-weight="bold">CC</text></svg>'

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

  const setSubtitleIcon = (enabled: boolean) => {
    el.querySelectorAll<HTMLElement>('[data-video-subtitle]').forEach(btn => {
      btn.innerHTML = enabled ? ICON_CC_ON : ICON_CC_OFF
    })
  }

  const setSubtitleAvailable = (available: boolean) => {
    el.querySelectorAll<HTMLElement>('[data-video-subtitle]').forEach(btn => {
      btn.style.opacity = available ? '' : '0.3'
      btn.style.pointerEvents = available ? '' : 'none'
    })
  }

  const setProgress = (percent: number) => {
    el.querySelectorAll<HTMLElement>('[data-video-progress]').forEach(bar => {
      bar.style.width = `${percent * 100}%`
    })
  }

  const vimeoMsg = (method: string, value?: unknown) => {
    if (!activeIframe?.contentWindow) return
    const payload: Record<string, unknown> = { method }
    if (value !== undefined) payload.value = value
    activeIframe.contentWindow.postMessage(payload, 'https://player.vimeo.com')
  }

  // Move controls and progress bar into the slider element before mounting
  document.querySelectorAll<HTMLElement>('.hero-video-controls').forEach(controls => {
    el.appendChild(controls)
  })

  const progressBar = document.createElement('div')
  progressBar.setAttribute('data-slide-progress-bar', '')
  el.appendChild(progressBar)

  const splide = new Splide(el, {
    type: 'slide',
    rewind: true,
    pagination: false,
    arrows: false,
    autoplay: true,
    interval: 9000,
    pauseOnHover: true,
    resetProgress: false,
    video: {
      autoplay: false,
      mute: false,
      hideControls: true,
      disableOverlayUI: false,
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

  splide.on('video:play', (extPlayer: any) => {
    const slide = getSlide(splide.index)
    slide?.querySelectorAll<HTMLElement>('[data-video-thumb]').forEach(t => { t.style.opacity = '0' })

    el.querySelectorAll<HTMLElement>('.splide__video__wrapper').forEach(wrapper => {
      wrapper.style.width = '100%'
      wrapper.style.height = '100%'
      const vimeoDiv = wrapper.querySelector<HTMLElement>('[data-vimeo-initialized]')
      if (vimeoDiv) { vimeoDiv.style.width = '100%'; vimeoDiv.style.height = '100%' }
      const iframe = wrapper.querySelector<HTMLIFrameElement>('iframe')
      if (iframe) { iframe.style.width = '100%'; iframe.style.height = '100%' }
    })

    el.querySelectorAll<HTMLElement>('.hero-video-controls').forEach(c => { c.style.display = 'flex' })
    ;(splide.Components as any).Autoplay?.pause()
    progressBar.style.opacity = '0'
    isPlaying = true
    setPlayPauseIcon(true)

    const iframe = slide?.querySelector<HTMLIFrameElement>('iframe')
    if (iframe) {
      activeIframe = iframe
      const sdkPlayer = extPlayer?.player?.player
      if (sdkPlayer && typeof sdkPlayer.on === 'function') {
        activeSdkPlayer = sdkPlayer
        if (!registeredSdkPlayers.has(sdkPlayer)) {
          registeredSdkPlayers.add(sdkPlayer)
          sdkPlayer.on('timeupdate', ({ percent }: any) => setProgress(percent))
          sdkPlayer.on('durationchange', ({ duration }: any) => { videoDuration = duration })
        }
        sdkPlayer.getTextTracks().then((tracks: any[]) => {
          availableTracks = tracks
          subsAvailable = tracks.length > 0
          setSubtitleAvailable(subsAvailable)
        })
      }
    }
  })

  splide.on('video:pause', () => {
    isPlaying = false
    setPlayPauseIcon(false)
    ;(splide.Components as any).Autoplay?.play()
    progressBar.style.opacity = ''
  })

  splide.on('move', (_newIndex: number, prevIndex: number) => {
    const leavingSlide = getSlide(prevIndex)
    leavingSlide?.querySelectorAll<HTMLElement>('[data-video-thumb]').forEach(t => { t.style.opacity = '' })
    el.querySelectorAll<HTMLElement>('.hero-video-controls').forEach(c => { c.style.display = 'none' })
    activeIframe = null
    activeSdkPlayer = null
    isPlaying = false
    isMuted = false
    subsEnabled = false
    subsAvailable = false
    availableTracks = []
    videoDuration = 0
    setPlayPauseIcon(false)
    setSubtitleIcon(false)
    setSubtitleAvailable(false)
    setProgress(0)
    progressBar.style.width = '0%'
  })

  const videoComponent = () => (splide.Components as any).Video

  el.addEventListener('click', e => {
    const target = e.target as HTMLElement
    if (!target.closest('[data-video-thumb]')) return
    if (isPlaying) videoComponent()?.pause()
    else videoComponent()?.play()
  })

  el.querySelectorAll<HTMLElement>('.hero-video-controls').forEach(controls => {
    controls.addEventListener('click', e => {
      e.stopPropagation()
      if (!activeIframe) return
      const target = e.target as HTMLElement

      if (target.closest('[data-video-subtitle]') && activeSdkPlayer && subsAvailable) {
        subsEnabled = !subsEnabled
        if (subsEnabled) activeSdkPlayer.enableTextTrack(availableTracks[0].language)
        else activeSdkPlayer.disableTextTrack()
        setSubtitleIcon(subsEnabled)
        return
      }

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

  splide.on('autoplay:playing', (rate: number) => {
    progressBar.style.width = `${rate * 100}%`
  })

  setPlayPauseIcon(false)
  setMuteIcon(false)
  setSubtitleIcon(false)
  setSubtitleAvailable(false)
  setProgress(0)
  splide.mount({ Video })
}
