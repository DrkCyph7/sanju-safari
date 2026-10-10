'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, Camera, Check, ChevronDown, Clock3, Globe, MapPin, Menu, MessageCircle, Phone, Star, Video, X, Info, Compass, Image as ImageIcon, HelpCircle, CarFront, UserCheck, Binoculars, Bird, PawPrint, Trees, MessageSquare, CalendarCheck, User, Mail, Calendar, Users, Send, Tent } from 'lucide-react'
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'
import { SplitText } from '@/components/SplitText'
import { CountUp } from '@/components/CountUp'

const packages = [
  { title: 'Morning Safari', detail: 'First light, cool air, active wildlife.', duration: '3 hours', best: 'Best for first-time visitors', image: '/images/hero.png', price: '65', bullets: ['Private jeep & tracker', 'Park gate assistance', 'Hotel pickup available'] },
  { title: 'Afternoon Safari', detail: 'Warm light, waterholes and long shadows.', duration: '3 hours', best: 'Best for golden hour', image: '/images/elephant-1.png', price: '65', bullets: ['Private jeep & tracker', 'Flexible pickup', 'Sunset wildlife viewing'] },
  { title: 'Full-Day Safari', detail: 'A slower, deeper day in elephant country.', duration: '6 hours', best: 'Best for photographers', image: '/images/landscape.png', price: '120', bullets: ['Breakfast or lunch option', 'Private jeep & tracker', 'Multiple park zones'] },
  { title: 'Safari + ETH', detail: 'Wildlife and a visit to the Elephant Transit Home.', duration: 'Half day', best: 'Best for families', image: '/images/bird.png', price: '85', bullets: ['Private jeep & tracker', 'Transit Home visit', 'Hotel pickup available'] },
]
const gallery = [
  ['/images/hero.png', 'Elephants at sunrise', 'Elephants'], ['/images/elephant-1.png', 'Elephant by the water', 'Elephants'], ['/images/landscape.png', 'The road in', 'Landscapes'], ['/images/bird.png', 'Wetland birdlife', 'Birds'], ['/images/hero.png', 'Golden grassland', 'Landscapes'], ['/images/elephant-1.png', 'A quiet afternoon', 'Elephants'], ['/images/bird.png', 'Kingfisher in the wetland', 'Birds'], ['/images/landscape.png', 'Jeep on the park track', 'Jeeps'],
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
        initial={{ opacity: 0, y: 16, letterSpacing: '0.04em' }}
        animate={inView ? { opacity: 1, y: 0, letterSpacing: '0.16em' } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {eyebrow}
      </motion.p>
      <SplitText
        text={title}
        tag="h2"
        delay={0.1}
        stagger={0.02}
        blur={true}
      />
      {copy && (
        <motion.p
          className="intro-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {copy}
        </motion.p>
      )}
    </div>
  )
}

// Tilt card with glare
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 22 })
  const springY = useSpring(y, { stiffness: 200, damping: 22 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.article
      ref={ref as React.RefObject<HTMLElement>}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000, position: 'relative' }}
      whileHover={{ scale: 1.03 }}
      transition={{ scale: { duration: 0.25, ease: 'easeOut' } }}
    >
      {children}
      <motion.div
        style={{
          position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 20,
          background: useTransform(
            [springX, springY] as [typeof springX, typeof springY],
            ([sx, sy]: number[]) =>
              `radial-gradient(circle at ${(sx + 0.5) * 100}% ${(sy + 0.5) * 100}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
          ),
        }}
      />
    </motion.article>
  )
}

// Magnet button
function MagnetButton({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.button>
  )
}

// GlowCursor
function GlowCursor() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const springX = useSpring(x, { stiffness: 60, damping: 15 })
  const springY = useSpring(y, { stiffness: 60, damping: 15 })

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed', left: springX, top: springY,
        translateX: '-50%', translateY: '-50%',
        width: 400, height: 400, borderRadius: '50%', pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(circle, rgba(255,193,94,0.09) 0%, rgba(255,138,61,0.03) 45%, transparent 70%)',
        mixBlendMode: 'screen',
      }}
    />
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [wildlife, setWildlife] = useState('Elephants')
  const [filter, setFilter] = useState('All')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const visibleGallery = useMemo(() => filter === 'All' ? gallery : gallery.filter((item) => item[2] === filter), [filter])
  const enquiry = (safari = 'Morning Safari') => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); const select = document.getElementById('safari-type') as HTMLSelectElement | null; if (select) select.value = safari }
  const wildlifeCopy = wildlife === 'Elephants' ? "The park\u2019s gentle giants are its heartbeat. Watch family groups move between grassland, scrub and water." : wildlife === 'Leopard' ? 'Elusive and patient, leopards are sometimes seen resting low in shade or crossing the track at first light.' : wildlife === 'Birds' ? 'From painted storks to kingfishers, more than 200 species bring constant movement to the wetlands.' : 'Look closely for mugger crocodiles, water buffalo, monkeys and monitor lizards in the margins.'

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
      window.addEventListener('keydown', handleKeyDown)
      return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKeyDown) }
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

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
        <motion.span className="brand-mark" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }}>US</motion.span>
        <span>Sanju<br /><em>Safari</em></span>
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
      <MagnetButton className="book-button top-book" onClick={() => enquiry()}>
        Book <ArrowRight data-icon="inline-end" />
      </MagnetButton>
      <button
        className="menu-button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
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
              <span className="brand-mark">US</span>
              <span>Sanju<br /><em>Safari</em></span>
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
          <div className="menu-note">Private jeeps. Local knowledge. A quieter way into the wild.</div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* ── Hero ── */}
    <section id="home" className="hero">
      <Image src="/images/hero.png" alt="Elephants walking through golden grass at sunrise" fill priority sizes="100vw" className="hero-image" />
      <div className="hero-overlay" />
      <motion.div
        className="hero-orbit orbit-one"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="hero-orbit orbit-two"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <div className="hero-content">
        <motion.div
          className="glass-kicker"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <motion.span
            className="pulse-dot"
            animate={{ boxShadow: ['0 0 0 4px rgba(255,138,61,0.15)', '0 0 0 10px rgba(255,138,61,0)', '0 0 0 4px rgba(255,138,61,0.15)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Udawalawe National Park · Sri Lanka
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {['Into the', ''].map((line, li) => (
            <span key={li} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.2em', marginBottom: '-0.2em' }}>
              {line === '' ? (
                <motion.em
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ display: 'block', color: 'var(--gold)' }}
                >
                  Elephant Country.
                </motion.em>
              ) : (
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
        >
          Private jeep safaris shaped by local knowledge, quiet roads and a deep respect for wild places.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          <MagnetButton className="book-button" onClick={() => enquiry()}>Book your safari <ArrowRight /></MagnetButton>
          <motion.a className="outline-button" href="https://wa.me/94763080364" target="_blank" rel="noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <MessageCircle /> WhatsApp us
          </motion.a>
        </motion.div>
        <motion.div
          className="trust-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          {[['Private jeeps only', <CarFront key="c"/>], ['Expert local trackers', <UserCheck key="u"/>], ['Hotel pickup available', <MapPin key="m"/>]].map(([t, icon], i) => (
            <motion.span
              key={t as string}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 + i * 0.12, duration: 0.45 }}
            >
              {icon} {t}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <motion.a
        className="scroll-cue" href="#facts"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span>Scroll to explore</span>
        <ArrowDown />
      </motion.a>
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
        <Image src="/images/elephant-1.png" alt="Elephant standing beside a watering hole" fill sizes="(max-width: 768px) 100vw, 45vw" />
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
                  <strong>USD {pack.price}<small> / jeep</small></strong>
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
        Park entry fees extra. Prices per jeep, up to 6 guests.
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
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.4 }}
          >
            <h3>{wildlife}</h3>
            <p>{wildlifeCopy}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={wildlife}
          className="wildlife-image image-frame"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={wildlife === 'Birds' ? '/images/bird.png' : wildlife === 'Reptiles & Others' ? '/images/landscape.png' : '/images/hero.png'}
            alt={`${wildlife} in Udawalawe National Park`}
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
          />
        </motion.div>
      </AnimatePresence>
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
        {[['◌', 'Private jeeps', 'Your group, your pace, no shared rides.'], ['⌁', 'Local expert guides', 'Knowledge earned across years in the park.'], ['↗', 'Flexible pickup', 'From hotels around Udawalawe and beyond.'], ['♧', 'Ethical viewing', 'We keep wildlife calm, safe and respected.'], ['≈', 'Transparent pricing', 'Clear quotes with no surprise extras.'], ['◉', '24/7 WhatsApp support', 'A real person, before and after your drive.']].map(([icon, title, copy]) => (
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
      <AnimatedSection>
        <SectionIntro eyebrow="From the field" title="A glimpse of Udawalawe." />
      </AnimatedSection>
      <StaggerContainer className="filter-row" staggerDelay={0.06}>
        {[['All', <ImageIcon key="a" size={14}/>], ['Elephants', <Binoculars key="e" size={14}/>], ['Birds', <Bird key="b" size={14}/>], ['Landscapes', <Trees key="l" size={14}/>], ['Jeeps', <CarFront key="j" size={14}/>]].map(([item, icon]) => (
          <StaggerItem key={item as string}>
            <motion.button
              className={filter === item ? 'active' : ''}
              onClick={() => setFilter(item as string)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {icon} {item}
            </motion.button>
          </StaggerItem>
        ))}
      </StaggerContainer>
      <motion.div
        className="gallery-grid"
        layout
        transition={{ layout: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
      >
        <AnimatePresence mode="popLayout">
          {visibleGallery.map(([src, alt], i) => (
            <motion.button
              layout
              className={`gallery-item gallery-${i % 3}`}
              key={`${src}-${i}`}
              onClick={() => setSelectedImage(src)}
              aria-label={`Open ${alt}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.03, zIndex: 2 }}
            >
              <Image src={src} alt={alt} fill sizes="(max-width: 768px) 45vw, 25vw" />
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>

    {/* ── Lightbox ── */}
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer"
          onClick={() => setSelectedImage(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            aria-label="Close image"
            onClick={() => setSelectedImage(null)}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <X />
          </motion.button>
          <motion.div
            style={{ position: 'relative', width: '100%', height: '100%' }}
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={selectedImage} alt="Expanded safari photograph" fill sizes="90vw" style={{ objectFit: 'contain' }} />
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
              <AnimatePresence>
                {openFaq === i && (
                  <motion.p
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
              <h3>Thank you — message ready.</h3>
              <p>WhatsApp should open in a new tab. If it did not, message us directly and we will help plan your safari.</p>
              <button className="outline-dark" onClick={() => setSubmitted(false)}>Send another enquiry</button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); window.open('https://wa.me/94763080364?text=' + encodeURIComponent('Hello Sanju Safari, I would like to enquire about a safari.'), '_blank') }}
            >
              <div className="form-grid">
                <label><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={12}/> Name</span><input required name="name" placeholder="Your name" /></label>
                <label><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={12}/> Email</span><input required type="email" name="email" placeholder="you@example.com" /></label>
                <label><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={12}/> Phone / WhatsApp</span><input name="phone" placeholder="+94 ..." /></label>
                <label><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Compass size={12}/> Safari type</span><select id="safari-type" name="safari"><option>Morning Safari</option><option>Afternoon Safari</option><option>Full-Day Safari</option><option>Safari + ETH</option></select></label>
                <label><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={12}/> Date</span><input required type="date" name="date" /></label>
                <label><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={12}/> Guests</span><input required type="number" min="1" max="6" name="guests" placeholder="2" /></label>
                <label className="full"><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12}/> Pickup location</span><input name="pickup" placeholder="Hotel or town" /></label>
                <label className="full"><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MessageSquare size={12}/> Message</span><textarea name="message" rows={3} placeholder="Anything we should know?" /></label>
              </div>
              <MagnetButton className="book-button" onClick={() => {}}>Continue on WhatsApp <Send size={16} /></MagnetButton>
            </motion.form>
          )}
        </AnimatePresence>
      </AnimatedSection>
      <AnimatedSection direction="right" delay={0.2} className="contact-details">
        <div className="contact-card">
          <p className="eyebrow">Find us in the field</p>
          <a href="tel:+94763080364"><Phone /> +94 76 308 0364</a>
          <a href="https://wa.me/94763080364"><MessageCircle /> WhatsApp us</a>
          <p className="address"><strong>Udawalawe, Sri Lanka</strong><br />Daily, 05:00 — 21:00<br />Pickup around Udawalawe and nearby towns.</p>
        </div>
        <iframe title="Udawalawe National Park map" src="https://www.google.com/maps?q=Udawalawe%20National%20Park%20Sri%20Lanka&output=embed" loading="lazy" />
      </AnimatedSection>
    </section>

    {/* ── Footer ── */}
    <footer className="footer">
      <AnimatedSection className="footer-brand" direction="up" delay={0.1}>
        <a href="#home" className="brand" aria-label="Sanju Safari home">
          <span className="brand-mark">US</span><span>Sanju<br /><em>Safari</em></span>
        </a>
        <p>Quiet roads. Wild places.<br />A local view of Udawalawe.</p>
        <a className="footer-location" href="#contact"><MapPin /> Udawalawe, Sri Lanka</a>
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
            ['https://www.instagram.com/', 'Instagram', <Camera key="cam" />],
            ['https://facebook.com/udawalalawesanjusafari', 'Facebook', <Globe key="glob" />],
            ['https://www.tripadvisor.com/', 'TripAdvisor', <Star key="star" />],
            ['https://www.youtube.com/', 'YouTube', <Video key="vid" />],
            ['#contact', 'Contact us', <MessageCircle key="msg" />],
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
      </div>
    </footer>

    <motion.a
      className="whatsapp-float" href="https://wa.me/94763080364" aria-label="Chat on WhatsApp"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.12 }}
    >
      <MessageCircle />
    </motion.a>
  </main>
}

export const dynamic = 'force-static'
