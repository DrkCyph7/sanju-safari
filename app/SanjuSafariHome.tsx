'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, Camera, Check, ChevronDown, Clock3, MapPin, Mail, Menu, MessageCircle, Phone, Star, X, Info, Compass, Image as ImageIcon, HelpCircle, CarFront, UserCheck, Binoculars, Bird, PawPrint, MessageSquare, User, Calendar, Users, Send, Tent } from 'lucide-react'
import { FaFacebookF, FaTripadvisor, FaGoogle } from 'react-icons/fa'
import { motion, useInView, AnimatePresence, useMotionValue, useSpring } from 'motion/react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { SplitText } from '@/components/SplitText'
import type { GalleryItem } from '@/lib/gallery'

const packages = [
  { title: 'Morning Safari', detail: 'First light, cool air, active wildlife.', duration: '4 hours', best: 'Best for first-time visitors', image: '/assets/safaris/morning-safari.png', bullets: ['Private jeep & tracker', 'Park gate assistance', 'Hotel pickup available'] },
  { title: 'Afternoon Safari', detail: 'Warm light, waterholes and long shadows.', duration: '4 hours', best: 'Best for golden hour', image: '/assets/safaris/afternoon-safari.png', bullets: ['Private jeep & tracker', 'Flexible pickup', 'Sunset wildlife viewing'] },
  { title: 'Full-Day Safari', detail: 'A slower, deeper day in elephant country.', duration: '10 hours', best: 'Best for photographers', image: '/assets/safaris/full-day-safari.png', bullets: ['Breakfast or lunch option', 'Private jeep & tracker', 'Multiple park zones'] },
  { title: 'Safari + ETH', detail: 'Wildlife and a visit to the Elephant Transit Home.', duration: 'Half day', best: 'Best for families', image: '/assets/safaris/safari-transit-home.png', bullets: ['Private jeep & tracker', 'Transit Home visit', 'Hotel pickup available'] },
]
const faqAnswers = [
  'Morning drives are cooler and often active. Afternoon drives bring warm light and longer shadows. Both have their own magic.', 'Most safaris run for around three hours. Full-day drives are about six hours with a break.', 'Bring water, sun protection, a light layer, binoculars and a camera. Neutral colours are comfortable.', 'Absolutely. We welcome families and can keep the pace easy for younger guests.', 'Wild animals are free to move, so sightings can never be promised. We can promise an attentive guide and a respectful drive.', 'No. Park entry fees are paid separately at the gate and vary by nationality.', 'We cover hotels and guesthouses around Udawalawe, with longer-distance pickup available by arrangement.', 'Please let us know as early as possible. We keep our policy fair and transparent based on notice given.',
]

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div className="section-intro" ref={ref}>
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 12, letterSpacing: '0.04em' }}
        animate={inView ? { opacity: 1, y: 0, letterSpacing: '0.16em' } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {eyebrow}
      </motion.p>
      <SplitText
        text={title}
        tag="h2"
        delay={0.05}
        stagger={0.03}
      />
      {copy && (
        <motion.p
          className="intro-copy"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          {copy}
        </motion.p>
      )}
    </div>
  )
}

// High-performance card with subtle lift and glow
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.article
      className={`${className} tilt-card-optimized`}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ position: 'relative' }}
    >
      {children}
    </motion.article>
  )
}

// Tactile, instantaneous response button
function MagnetButton({
  children,
  className,
  onClick,
  type = 'button',
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}) {
  return (
    <motion.button
      type={type}
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  )
}

// GPU-accelerated ambient cursor glow (fine-pointer only, zero overhead on mobile)
function GlowCursor() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const springX = useSpring(x, { stiffness: 180, damping: 24 })
  const springY = useSpring(y, { stiffness: 180, damping: 24 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: 320,
        height: 320,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1,
        background: 'radial-gradient(circle, rgba(255,193,94,0.08) 0%, rgba(255,138,61,0.02) 50%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  )
}

export default function SanjuSafariHome({ initialGallery = [] }: { initialGallery?: GalleryItem[] }) {
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery)
  const [menuOpen, setMenuOpen] = useState(false)
  const [wildlife, setWildlife] = useState('Elephants')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const [minDate, setMinDate] = useState<string>('')

  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0])
  }, [])

  // Find index of selected image in gallery
  const currentImageIndex = useMemo(() => {
    if (!selectedImage) return -1
    return gallery.findIndex((item) => item.src === selectedImage)
  }, [selectedImage, gallery])

  const showPrevImage = () => {
    if (gallery.length === 0) return
    const prevIndex = currentImageIndex <= 0 ? gallery.length - 1 : currentImageIndex - 1
    setSelectedImage(gallery[prevIndex].src)
  }

  const showNextImage = () => {
    if (gallery.length === 0) return
    const nextIndex = currentImageIndex >= gallery.length - 1 ? 0 : currentImageIndex + 1
    setSelectedImage(gallery[nextIndex].src)
  }

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const name = (formData.get('name') as string)?.trim() || 'Guest'
    const phone = (formData.get('phone') as string)?.trim() || ''
    const safari = (formData.get('safari') as string)?.trim() || 'Morning Safari'
    const rawDate = (formData.get('date') as string)?.trim() || ''
    const guests = (formData.get('guests') as string)?.trim() || '2'
    const pickup = (formData.get('pickup') as string)?.trim() || ''
    const message = (formData.get('message') as string)?.trim() || ''

    let dateDisplay = rawDate
    if (rawDate) {
      try {
        const d = new Date(rawDate + 'T00:00:00')
        if (!isNaN(d.getTime())) {
          dateDisplay = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        }
      } catch {
        dateDisplay = rawDate
      }
    }

    const templateParts: string[] = [
      '🐘 *SAFARI BOOKING INQUIRY — SANJU SAFARI*',
      '',
      `👤 *Name:* ${name}`,
      `📞 *Phone / WhatsApp:* ${phone}`,
      `🚙 *Safari Package:* ${safari}`,
      dateDisplay ? `📅 *Preferred Date:* ${dateDisplay}` : '',
      `👥 *Guests:* ${guests} ${guests === '1' ? 'person' : 'guests'}`,
      pickup ? `📍 *Pickup Location:* ${pickup}` : '📍 *Pickup Location:* To be arranged',
      message ? `💬 *Special Requests / Notes:*\n${message}` : '',
      '',
      '_Sent via Sanju Safari (udawalawesafaris.lk)_',
    ].filter((item) => item !== '')

    const text = templateParts.join('\n')
    const url = `https://wa.me/94763080364?text=${encodeURIComponent(text)}`

    setWhatsappUrl(url)
    setSubmitted(true)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Only fetch images from /api/gallery if initialGallery was empty to prevent redundant client network calls
  useEffect(() => {
    if (gallery.length > 0) return
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (data?.images && Array.isArray(data.images) && data.images.length > 0) {
          setGallery(data.images)
        }
      })
      .catch((err) => console.error('Failed to load gallery images from /api/gallery:', err))
  }, [gallery.length])

  const galleryRef = useRef<HTMLDivElement>(null)
  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const enquiry = (safari = 'Morning Safari') => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); const select = document.getElementById('safari-type') as HTMLSelectElement | null; if (select) select.value = safari }
  const wildlifeCopy = wildlife === 'Elephants' ? "The park\u2019s gentle giants are its heartbeat. Watch family groups move between grassland, scrub and water." : wildlife === 'Leopard' ? 'Elusive and patient, leopards are sometimes seen resting low in shade or crossing the track at first light.' : wildlife === 'Birds' ? 'From painted storks to kingfishers, more than 200 species bring constant movement to the wetlands.' : 'Look closely for mugger crocodiles, water buffalo, monkeys and monitor lizards in the margins.'

  useEffect(() => {
    if (menuOpen || selectedImage) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (selectedImage) setSelectedImage(null)
          else setMenuOpen(false)
        } else if (selectedImage) {
          if (e.key === 'ArrowLeft') showPrevImage()
          if (e.key === 'ArrowRight') showNextImage()
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen, selectedImage, currentImageIndex, gallery])

  return <main className="site-shell">
    <GlowCursor />

    {/* ── Topbar ── */}
    <motion.header
      className="topbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <a href="#home" className="brand" aria-label="Sanju Safari home">
        <motion.div
          className="brand-logo-wrap"
          whileHover={{ scale: 1.1, rotate: 3 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Image
            src="/assets/logo/LogoW.png"
            alt="Sanju Safari Logo"
            width={38}
            height={44}
            className="brand-logo"
            priority
          />
        </motion.div>
        <span className="brand-text">Sanju<br /><em>Safari</em></span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {[['About', <Info key="a" size={14} />], ['Safaris', <Compass key="s" size={14} />], ['Wildlife', <Binoculars key="w" size={14} />], ['Gallery', <ImageIcon key="g" size={14} />], ['FAQ', <HelpCircle key="f" size={14} />]].map(([item, icon], i) => (
          <motion.a
            key={item as string}
            href={`#${(item as string).toLowerCase()}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {icon} {item}
          </motion.a>
        ))}
      </nav>
      <div className="topbar-actions">
        <motion.a
          href="tel:+94763080364"
          className="top-call-button"
          aria-label="Direct call Sanju Safari at +94 76 308 0364"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <span className="call-pulse-dot" aria-hidden="true" />
          <Phone size={13} />
          <span>+94 76 308 0364</span>
        </motion.a>
        <MagnetButton className="book-button top-book" onClick={() => enquiry()}>
          Book <ArrowRight data-icon="inline-end" />
        </MagnetButton>
        <motion.a
          href="tel:+94763080364"
          className="mobile-topbar-call"
          aria-label="Call Sanju Safari +94 76 308 0364"
          whileTap={{ scale: 0.92 }}
        >
          <Phone size={18} />
        </motion.a>
        <button
          className="menu-button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </motion.header>

    {/* ── Mobile menu ── */}
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mobile-menu-header">
            <a href="#home" className="brand" aria-label="Sanju Safari home" onClick={() => setMenuOpen(false)}>
              <div className="brand-logo-wrap">
                <Image
                  src="/assets/logo/LogoW.png"
                  alt="Sanju Safari Logo"
                  width={38}
                  height={44}
                  className="brand-logo"
                />
              </div>
              <span className="brand-text">Sanju<br /><em>Safari</em></span>
            </a>
            <button className="close-menu" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X />
            </button>
          </div>
          <p className="eyebrow light">Sanju Safari</p>
          <nav aria-label="Mobile navigation">
            {['Home', 'About', 'Safaris', 'Wildlife', 'Gallery', 'FAQ', 'Contact'].map((item, i) => {
              const icons = [<Tent key="h" />, <Info key="a" />, <Compass key="s" />, <Binoculars key="w" />, <ImageIcon key="g" />, <HelpCircle key="f" />, <Phone key="c" />]
              return (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className="flex items-center justify-between"
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>{icons[i]} {item}</span><ArrowRight />
              </motion.a>
            )})}
          </nav>
          <div className="mobile-menu-actions">
            <a
              href="tel:+94763080364"
              className="mobile-call-cta"
            >
              <Phone size={18} />
              <span>Call Us: +94 76 308 0364</span>
            </a>
            <button
              className="book-button"
              onClick={() => { setMenuOpen(false); enquiry(); }}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Book a Safari <ArrowRight data-icon="inline-end" />
            </button>
          </div>
          <div className="menu-note">Private jeeps. Local knowledge. A quieter way into the wild.</div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* ── Hero ── */}
    <section id="home" className="hero">
      <Image src="/assets/hero/hero.png" alt="Elephants walking through golden grass at sunrise" fill priority sizes="100vw" className="hero-image" />
      <div className="hero-overlay" />
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="hero-content">
        <motion.div
          className="glass-kicker"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <span className="pulse-dot" aria-hidden="true" />
          Udawalawe National Park · Sri Lanka
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {['Into the', ''].map((line, li) => (
            <span key={li} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.2em', marginBottom: '-0.2em' }}>
              {line === '' ? (
                <motion.em
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ display: 'block', color: 'var(--gold)' }}
                >
                  Elephant Country.
                </motion.em>
              ) : (
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ display: 'block' }}
                >
                  {line}
                </motion.span>
              )}
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="hero-copy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          Private jeep safaris shaped by local knowledge, quiet roads and a deep respect for wild places.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <MagnetButton className="book-button" onClick={() => enquiry()}>Book your safari <ArrowRight /></MagnetButton>
          <motion.a
            className="outline-button"
            href={`https://wa.me/94763080364?text=${encodeURIComponent('Hello Sanju Safari! 👋 I would like to enquire about a private safari tour in Udawalawe.')}`}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <MessageCircle /> WhatsApp us
          </motion.a>
        </motion.div>
        <motion.div
          className="trust-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.95 }}
        >
          {[['Private jeeps only', <CarFront key="c"/>], ['Expert local trackers', <UserCheck key="u"/>], ['Hotel pickup available', <MapPin key="m"/>]].map(([t, icon], i) => (
            <motion.span
              key={t as string}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.95 + i * 0.08, duration: 0.35 }}
            >
              {icon} {t}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <a className="scroll-cue" href="#facts">
        <span>Scroll to explore</span>
        <ArrowDown />
      </a>
    </section>

    {/* ── Facts strip ── */}
    <section id="facts" className="facts-strip">
      <div className="marquee">
        <span>ELEPHANTS&nbsp; · &nbsp;LEOPARDS&nbsp; · &nbsp;200+ BIRDS&nbsp; · &nbsp;UDAWALAWE&nbsp; · &nbsp;</span>
        <span aria-hidden="true">ELEPHANTS&nbsp; · &nbsp;LEOPARDS&nbsp; · &nbsp;200+ BIRDS&nbsp; · &nbsp;UDAWALAWE&nbsp; · &nbsp;</span>
      </div>
      <StaggerContainer className="facts-inner" staggerDelay={0.15}>
        {[['Hundreds', 'of wild elephants', <Binoculars key="b" size={32} />], ['200+', 'bird species', <Bird key="bi" size={32} />], ['Leopards, crocs', 'buffalo & more', <PawPrint key="p" size={32} />], ['~3 hrs', 'from Colombo', <Clock3 key="c" size={32} />]].map(([a, b, icon]) => (
          <StaggerItem key={a as string} className="fact">
            <span style={{ color: 'var(--gold)', marginBottom: '8px' }}>{icon}</span>
            <strong>{a}</strong>
            <span>{b}</span>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>

    {/* ── About ── */}
    <section id="about" className="section about-section">
      <AnimatedSection className="about-image image-frame" direction="left" delay={0.1}>
        <Image src="/assets/gallery/Gallery16.jpeg" alt="Elephant standing beside a watering hole" fill sizes="(max-width: 768px) 100vw, 45vw" />
      </AnimatedSection>
      <AnimatedSection className="about-copy" direction="right" delay={0.2}>
        <SectionIntro eyebrow="A local point of view" title="The best sightings begin with listening." copy="Sanju Safari is a small, locally run operator built around the rhythm of the park. Our trackers know the back roads, the waterholes and when to wait." />
        <motion.blockquote
          initial={{ opacity: 0, x: -20, borderLeftColor: 'transparent' }}
          whileInView={{ opacity: 1, x: 0, borderLeftColor: 'var(--ember)' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true, margin: '-60px' }}
        >
          "We do not chase wildlife. We make space for it."
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          Every drive is private to your group, with room to slow down, ask questions and notice the details that make Udawalawe special.
        </motion.p>
        <motion.a
          className="text-link" href="#safaris"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          whileHover={{ x: 4 }}
        >
          See our safaris <ArrowRight />
        </motion.a>
      </AnimatedSection>
    </section>

    {/* ── Safaris / Packages ── */}
    <section id="safaris" className="section packages-section">
      <AnimatedSection>
        <SectionIntro eyebrow="Choose your pace" title="A safari for the way you travel." copy="Every outing is private, flexible and led by someone who knows this park home." />
      </AnimatedSection>
      <StaggerContainer className="package-grid" staggerDelay={0.12}>
        {packages.map((pack) => (
          <StaggerItem key={pack.title} direction="up">
            <TiltCard className="package-card glass-card">
              <div className="card-image">
                <Image src={pack.image} alt={pack.detail} fill sizes="(max-width: 768px) 86vw, 25vw" />
                <span className="duration"><Clock3 /> {pack.duration}</span>
              </div>
              <div className="package-body">
                <h3>{pack.title}</h3>
                <p>{pack.detail}</p>
                <span className="best-tag">{pack.best}</span>
                <ul>{pack.bullets.map((b) => <li key={b}><Check />{b}</li>)}</ul>
                <div className="package-footer">
                  <span className="package-capacity">
                    <Users size={13} /> Up to 6 guests
                  </span>
                  <motion.button onClick={() => enquiry(pack.title)} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                    Enquire <ArrowRight />
                  </motion.button>
                </div>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
      <motion.p
        className="fine-print"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        All safaris are private for up to 6 guests per jeep. Park entry fees are paid at the gate.
      </motion.p>
    </section>

    {/* ── Wildlife ── */}
    <section id="wildlife" className="section wildlife-section">
      <div className="wildlife-copy">
        <SectionIntro eyebrow="Read the landscape" title="Wildlife, on its own terms." copy="Udawalawe is open, bright and wonderfully unpredictable. Here is what you may find along the way." />
        <StaggerContainer className="wildlife-tabs" staggerDelay={0.08}>
          {[['Elephants', <Binoculars key="e" size={14} />], ['Leopard', <PawPrint key="l" size={14} />], ['Birds', <Bird key="b" size={14} />], ['Reptiles & Others', <Camera key="p" size={14} />]].map(([item, icon]) => (
            <StaggerItem key={item as string}>
              <motion.button
                className={wildlife === item ? 'active' : ''}
                onClick={() => setWildlife(item as string)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {icon} {item}
              </motion.button>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <AnimatePresence mode="wait">
          <motion.div
            className="wildlife-description"
            key={wildlife}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <h3>{wildlife}</h3>
            <p>{wildlifeCopy}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatedSection className="wildlife-image image-frame" direction="right" delay={0.2}>
        <Image
          src="/assets/hero/hero.png"
          alt="Wildlife in Udawalawe National Park"
          fill
          sizes="(max-width: 768px) 100vw, 42vw"
        />
      </AnimatedSection>
      <AnimatedSection className="season-bar">
        <div><span>Best time to visit</span><strong>January — September</strong></div>
        <div className="season-track"><span /><span /></div>
        <div className="season-labels"><span>Dry season</span><span>Intermittent rain</span><span>Green season</span></div>
      </AnimatedSection>
    </section>

    {/* ── Why us (features) ── */}
    <section className="section why-section">
      <AnimatedSection>
        <SectionIntro eyebrow="Why ride with us" title="Good days start with good company." />
      </AnimatedSection>
      <StaggerContainer className="feature-grid" staggerDelay={0.09}>
        {[['◌', 'Private jeeps', 'Your group, your pace, no shared rides.'], ['⌁', 'Local expert guides', 'Knowledge earned across years in the park.'], ['↗', 'Flexible pickup', 'From hotels around Udawalawe and beyond.'], ['♧', 'Ethical viewing', 'We keep wildlife calm, safe and respected.'], ['≈', 'Transparent quotes', 'Clear quotes with no surprise extras.'], ['◉', '24/7 WhatsApp support', 'A real person, before and after your drive.']].map(([icon, title, copy]) => (
          <StaggerItem key={title} direction="up">
            <motion.div
              className="feature glass-card"
              whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(255,193,94,0.12)' }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <span className="feature-icon">{icon}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>

    {/* ── Steps ── */}
    <section className="steps-section">
      <div className="section steps-inner">
        <AnimatedSection direction="left">
          <SectionIntro eyebrow="Simple from here" title="Four steps to the wild." />
        </AnimatedSection>
        <StaggerContainer className="steps" staggerDelay={0.12}>
          {[['01', 'Enquire', 'Tell us when you are coming.'], ['02', 'Confirm', 'We share a clear quote and plan.'], ['03', 'Pickup', 'Your guide meets you at your hotel.'], ['04', 'Safari', 'Settle in. We take care of the rest.']].map(([num, title, copy]) => (
            <StaggerItem key={num} direction="right">
              <motion.div
                className="step"
                whileHover={{ backgroundColor: 'rgba(18,38,28,0.85)' }}
                transition={{ duration: 0.25 }}
              >
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  {num}
                </motion.span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* ── Gallery ── */}
    <section id="gallery" className="section gallery-section">
      <div className="gallery-header-row">
        <AnimatedSection>
          <SectionIntro eyebrow="From the field" title="A glimpse of Udawalawe." />
        </AnimatedSection>
        <div className="gallery-nav-buttons">
          <button
            onClick={() => scrollGallery('left')}
            className="gallery-nav-btn"
            aria-label="Scroll left in gallery"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scrollGallery('right')}
            className="gallery-nav-btn"
            aria-label="Scroll right in gallery"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
      <div className="gallery-grid" ref={galleryRef}>
        {gallery.map((item, i) => (
          <motion.button
            className="gallery-item"
            key={`${item.src}-${i}`}
            onClick={() => setSelectedImage(item.src)}
            aria-label={`Open photo ${i + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
          >
            <Image src={item.src} alt={item.alt || `Udawalawe safari photo ${i + 1}`} fill sizes="(max-width: 768px) 78vw, 310px" />
          </motion.button>
        ))}
        {gallery.length === 0 && (
          <div style={{ flex: '0 0 100%', padding: '3rem 1rem', textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
            <ImageIcon size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
            <p>No images found in gallery.</p>
          </div>
        )}
      </div>
    </section>

    {/* ── Lightbox ── */}
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={() => setSelectedImage(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="lightbox-close"
            aria-label="Close image"
            onClick={() => setSelectedImage(null)}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <X />
          </motion.button>
          {gallery.length > 1 && (
            <>
              <button
                className="lightbox-nav-btn lightbox-prev"
                aria-label="Previous photograph"
                onClick={(e) => {
                  e.stopPropagation()
                  showPrevImage()
                }}
              >
                <ArrowLeft size={22} />
              </button>
              <button
                className="lightbox-nav-btn lightbox-next"
                aria-label="Next photograph"
                onClick={(e) => {
                  e.stopPropagation()
                  showNextImage()
                }}
              >
                <ArrowRight size={22} />
              </button>
              <div className="lightbox-counter">
                {currentImageIndex >= 0 ? `${currentImageIndex + 1} / ${gallery.length}` : ''}
              </div>
            </>
          )}
          <motion.div
            style={{ position: 'relative', width: '100%', height: '100%' }}
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Expanded safari photograph"
              fill
              sizes="90vw"
              priority
              style={{ objectFit: 'contain' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* ── Testimonials ── */}
    <section className="section testimonials-section">
      <div className="testimonial-heading">
        <AnimatedSection direction="left">
          <SectionIntro eyebrow="Kind words" title="The park stays with you." />
        </AnimatedSection>
        <AnimatedSection direction="right" delay={0.2} className="rating-badge">
          <Star /> 5.0<br /><small>TripAdvisor / Google</small>
        </AnimatedSection>
      </div>
      <StaggerContainer className="testimonials" staggerDelay={0.14}>
        {[['🇬🇧', 'Charlotte M.', 'United Kingdom', 'Our guide read the landscape beautifully. We saw elephants within minutes, but never felt rushed.'], ['🇦🇺', 'James R.', 'Australia', 'A thoughtful, well-run morning. The jeep was comfortable and the photography advice was excellent.'], ['🇩🇪', 'Nina K.', 'Germany', 'Exactly the quiet, local experience we hoped for. The team made our family feel completely at ease.']].map(([flag, name, country, quote]) => (
          <StaggerItem key={name as string} direction="up" className="h-full">
            <motion.article
              className="testimonial glass-card h-full flex flex-col"
              whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <div className="stars">★★★★★</div>
              <p className="flex-1">"{quote}"</p>
              <footer>
                <span>{flag}</span>
                <div><strong>{name}</strong><small>{country}</small></div>
              </footer>
            </motion.article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>

    {/* ── FAQ ── */}
    <section id="faq" className="section faq-section">
      <AnimatedSection direction="left">
        <SectionIntro eyebrow="Good to know" title="Questions, answered." />
      </AnimatedSection>
      <AnimatedSection direction="right" delay={0.2} className="faq-list">
        {faqAnswers.map((answer, i) => {
          const questions = ['What is the best time of day for a safari?', 'How long does a safari take?', 'What should I bring?', 'Are children welcome?', 'Are animal sightings guaranteed?', 'Are park entry fees included?', 'Which areas do you pick up from?', 'What is your cancellation policy?']
          return (
            <div className={`faq ${openFaq === i ? 'open' : ''}`} key={questions[i]}>
              <motion.button
                id={`faq-btn-${i}`}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                whileTap={{ scale: 0.99 }}
              >
                <span>{questions[i]}</span>
                <motion.span
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ display: 'inline-flex' }}
                >
                  <ChevronDown />
                </motion.span>
              </motion.button>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.p
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 22 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ overflow: 'hidden' }}
                  >
                    {answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </AnimatedSection>
    </section>

    {/* ── Contact ── */}
    <section id="contact" className="section contact-section">
      <AnimatedSection className="contact-form" direction="left">
        <SectionIntro eyebrow="Make a plan" title="Your day in the park starts here." copy="Send us a few details. We will reply on WhatsApp with availability and a clear quote." />
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              className="success-state"
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4 }}
            >
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, delay: 0.15 }}>
                <Check />
              </motion.span>
              <h3>Thank you — enquiry prepared!</h3>
              <p>Your details have been formatted for WhatsApp. If WhatsApp did not open automatically, tap below to send your enquiry directly.</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '16px' }}>
                <a
                  href={whatsappUrl || 'https://wa.me/94763080364'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-button"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                >
                  <MessageCircle size={17} /> Open WhatsApp
                </a>
                <button className="outline-dark" onClick={() => setSubmitted(false)}>Edit enquiry</button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onSubmit={handleBookingSubmit}
            >
              <div className="form-grid">
                <label><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={12}/> Name</span><input required name="name" placeholder="Your name" /></label>
                <label><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={12}/> Phone / WhatsApp</span><input required name="phone" placeholder="+94 ..." /></label>
                <label><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Compass size={12}/> Safari type</span><select id="safari-type" name="safari"><option>Morning Safari</option><option>Afternoon Safari</option><option>Full-Day Safari</option><option>Safari + ETH</option></select></label>
                <label><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={12}/> Date</span><input required type="date" name="date" min={minDate} /></label>
                <label><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={12}/> Guests</span><input required type="number" min="1" max="6" name="guests" placeholder="2" /></label>
                <label><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12}/> Pickup location</span><input name="pickup" placeholder="Hotel or town" /></label>
                <label className="full"><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MessageSquare size={12}/> Message</span><textarea name="message" rows={3} placeholder="Anything we should know?" /></label>
              </div>
              <MagnetButton type="submit" className="book-button">Continue on WhatsApp <Send size={16} /></MagnetButton>
            </motion.form>
          )}
        </AnimatePresence>
      </AnimatedSection>
      <AnimatedSection direction="right" delay={0.2} className="contact-details">
        <div className="contact-card">
          <p className="eyebrow">Find us in the field</p>
          <a href="tel:+94763080364"><Phone /> +94 76 308 0364</a>
          <a
            href={`https://wa.me/94763080364?text=${encodeURIComponent('Hello Sanju Safari! 👋 I would like to check jeep availability and rates for a safari in Udawalawe.')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle /> WhatsApp us
          </a>
          <a href="mailto:info@udawalawesafaris.lk"><Mail /> info@udawalawesafaris.lk</a>
          <p className="address"><strong>Udawalawe, Sri Lanka</strong><br />Daily, 05:00 — 21:00<br />Pickup around Udawalawe and nearby towns.</p>
        </div>
        <iframe title="Udawalawe National Park map" src="https://www.google.com/maps?q=Udawalawe%20National%20Park%20Sri%20Lanka&output=embed" loading="lazy" />
      </AnimatedSection>
    </section>

    {/* ── Footer ── */}
    <footer className="footer">
      <AnimatedSection className="footer-brand" direction="up" delay={0.1}>
        <a href="#home" className="brand" aria-label="Sanju Safari home">
          <div className="brand-logo-wrap">
            <Image
              src="/assets/logo/LogoW.png"
              alt="Sanju Safari Logo"
              width={58}
              height={67}
              className="brand-logo footer-logo"
            />
          </div>
          <span className="brand-text">Sanju<br /><em>Safari</em></span>
        </a>
        <p>Quiet roads. Wild places.<br />A local view of Udawalawe.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <a className="footer-location" href="#contact"><MapPin /> Udawalawe, Sri Lanka</a>
          <a className="footer-location" href="mailto:info@udawalawesafaris.lk"><Mail /> info@udawalawesafaris.lk</a>
        </div>
      </AnimatedSection>
      <AnimatedSection className="footer-links" direction="up" delay={0.2}>
        <p className="eyebrow">Explore</p>
        {[['Our story', '#about', <Info key="a" size={14} />], ['Safaris', '#safaris', <Compass key="s" size={14} />], ['Gallery', '#gallery', <ImageIcon key="g" size={14} />], ['Contact', '#contact', <Phone key="c" size={14} />]].map(([label, href, icon]) => (
          <motion.a key={label as string} href={href as string} whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {icon} {label}
          </motion.a>
        ))}
      </AnimatedSection>
      <AnimatedSection className="footer-social" direction="up" delay={0.3}>
        <p className="eyebrow">Follow along</p>
        <div>
          {[
            ['https://facebook.com/udawalalawesanjusafari', 'Facebook', <FaFacebookF key="fb" />],
            ['https://www.tripadvisor.com/', 'TripAdvisor', <FaTripadvisor key="ta" />],
            ['https://share.google/yk3sG5YKhAnwpd7uq', 'Google', <FaGoogle key="google" />],
          ].map(([href, label, icon]) => (
            <motion.a
              key={label as string} href={href as string} target={href !== '#contact' ? '_blank' : undefined}
              rel={href !== '#contact' ? 'noreferrer' : undefined}
              aria-label={label as string}
              whileHover={{ scale: 1.18, rotate: 8 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 350 }}
            >
              {icon}
            </motion.a>
          ))}
        </div>
        <span className="footer-social-note">Field notes, sightings and slow travel.</span>
      </AnimatedSection>
      <div className="footer-wordmark" aria-hidden="true">UDAWALAWE</div>
      <div className="footer-bottom">
        <span>© 2026 Sanju Safari. All rights reserved.</span>
        <span>Please respect wildlife. No feeding, no loud noise.</span>
        <span>
          Designed and developed by{' '}
          <a
            href="https://nexcy.lk"
            target="_blank"
            rel="noopener noreferrer"
            className="credit-link"
          >
            NexCy Technologies
          </a>
        </span>
      </div>
    </footer>

    <a
      className="whatsapp-float"
      href={`https://wa.me/94763080364?text=${encodeURIComponent('Hello Sanju Safari! 👋 I would like to enquire about a safari in Udawalawe National Park.')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle />
    </a>
  </main>
}
