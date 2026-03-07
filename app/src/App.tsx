import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // Scroll to section handler
  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('.section-pinned, .section-flowing');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Animations
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set('#hero .hero-image', { x: 0, opacity: 1 });
            gsap.set('#hero .hero-headline', { x: 0, opacity: 1 });
            gsap.set('#hero .hero-divider', { scaleY: 1 });
            gsap.set('#hero .hero-bottom', { y: 0, opacity: 1 });
          }
        }
      });
      triggersRef.current.push(heroTl.scrollTrigger!);

      // Hero EXIT animation (70%-100%)
      heroTl.fromTo('#hero .hero-headline',
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      heroTl.fromTo('#hero .hero-image',
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );
      heroTl.fromTo('#hero .hero-divider',
        { scaleY: 1 },
        { scaleY: 0, transformOrigin: 'bottom', ease: 'power2.in' },
        0.7
      );
      heroTl.fromTo('#hero .hero-bottom',
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Section 2: Through the Lens
      const lensTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#lens',
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });
      triggersRef.current.push(lensTl.scrollTrigger!);

      lensTl.fromTo('#lens .lens-bg',
        { scale: 1.08, opacity: 0.6 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );
      lensTl.fromTo('#lens .lens-headline',
        { x: '-18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );
      lensTl.fromTo('#lens .lens-cta',
        { x: '6vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.12
      );
      // EXIT
      lensTl.fromTo('#lens .lens-bg',
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.7
      );
      lensTl.fromTo('#lens .lens-headline',
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      lensTl.fromTo('#lens .lens-cta',
        { x: 0, opacity: 1 },
        { x: '6vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Section 3: About
      const isMobile = window.innerWidth < 768;

      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#about',
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });
      triggersRef.current.push(aboutTl.scrollTrigger!);

      if (!isMobile) {
        // Desktop: horizontal slide animations
        aboutTl.fromTo('#about .about-image',
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );
        aboutTl.fromTo('#about .about-content',
          { x: '18vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        );
        aboutTl.fromTo('#about .about-divider',
          { scaleY: 0 },
          { scaleY: 1, transformOrigin: 'top', ease: 'none' },
          0
        );
        aboutTl.fromTo('#about .about-experience',
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12
        );
        // EXIT
        aboutTl.fromTo('#about .about-image',
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0.2, ease: 'power2.in' },
          0.7
        );
        aboutTl.fromTo('#about .about-content',
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
        aboutTl.fromTo('#about .about-experience',
          { y: 0, opacity: 1 },
          { y: '8vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
      } else {
        // Mobile: gentle fade-in only
        aboutTl.fromTo('#about .about-content',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        );
        aboutTl.fromTo('#about .about-image',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        );
        // EXIT
        aboutTl.fromTo('#about .about-content',
          { y: 0, opacity: 1 },
          { y: -20, opacity: 0, ease: 'power2.in' },
          0.7
        );
        aboutTl.fromTo('#about .about-image',
          { y: 0, opacity: 1 },
          { y: -20, opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      // Section 4: Education
      const eduTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#education',
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });
      triggersRef.current.push(eduTl.scrollTrigger!);

      if (!isMobile) {
        // Desktop: horizontal slide animations
        eduTl.fromTo('#education .edu-image',
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );
        eduTl.fromTo('#education .edu-content',
          { x: '18vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        );
        eduTl.fromTo('#education .edu-divider',
          { scaleY: 0 },
          { scaleY: 1, transformOrigin: 'top', ease: 'none' },
          0
        );
        // EXIT
        eduTl.fromTo('#education .edu-image',
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0.2, ease: 'power2.in' },
          0.7
        );
        eduTl.fromTo('#education .edu-content',
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      } else {
        // Mobile: gentle fade-in only
        eduTl.fromTo('#education .edu-content',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        );
        eduTl.fromTo('#education .edu-image',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        );
        // EXIT
        eduTl.fromTo('#education .edu-content',
          { y: 0, opacity: 1 },
          { y: -20, opacity: 0, ease: 'power2.in' },
          0.7
        );
        eduTl.fromTo('#education .edu-image',
          { y: 0, opacity: 1 },
          { y: -20, opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      // Section 5: Previous Work (Light Grid)
      const workTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#work-grid',
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });
      triggersRef.current.push(workTl.scrollTrigger!);

      workTl.fromTo('#work-grid .work-title',
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      workTl.fromTo('#work-grid .work-img-a',
        { x: '-30vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );
      workTl.fromTo('#work-grid .work-img-b',
        { x: '30vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );
      workTl.fromTo('#work-grid .work-img-c',
        { y: '40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );
      workTl.fromTo('#work-grid .work-img-d',
        { y: '40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );
      // EXIT
      workTl.fromTo('#work-grid .work-title',
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      workTl.fromTo('#work-grid .work-image',
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Section 6: Featured Work
      const featuredTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#featured',
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });
      triggersRef.current.push(featuredTl.scrollTrigger!);

      featuredTl.fromTo('#featured .featured-image',
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      featuredTl.fromTo('#featured .featured-caption',
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );
      featuredTl.fromTo('#featured .featured-list',
        { x: '18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.12
      );
      featuredTl.fromTo('#featured .featured-cta',
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0.18
      );
      // EXIT
      featuredTl.fromTo('#featured .featured-image',
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );
      featuredTl.fromTo('#featured .featured-caption',
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      featuredTl.fromTo('#featured .featured-list',
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Section 7: Two Project Split


      // Section 8: Get In Touch (Full-bleed)
      const touchTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#touch',
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });
      triggersRef.current.push(touchTl.scrollTrigger!);

      touchTl.fromTo('#touch .touch-bg',
        { scale: 1.08, opacity: 0.6 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );
      touchTl.fromTo('#touch .touch-headline',
        { x: '-18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );
      touchTl.fromTo('#touch .touch-cta',
        { x: '6vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.12
      );
      // EXIT
      touchTl.fromTo('#touch .touch-bg',
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.7
      );
      touchTl.fromTo('#touch .touch-headline',
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Section 9: Contact Details (Split)
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#contact-split',
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });
      triggersRef.current.push(contactTl.scrollTrigger!);

      contactTl.fromTo('#contact-split .contact-info',
        { x: '-18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      contactTl.fromTo('#contact-split .contact-image',
        { x: '55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      contactTl.fromTo('#contact-split .contact-divider',
        { scaleY: 0 },
        { scaleY: 1, transformOrigin: 'top', ease: 'none' },
        0
      );
      // EXIT
      contactTl.fromTo('#contact-split .contact-info',
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      contactTl.fromTo('#contact-split .contact-image',
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      // Section 10: Footer (Flowing)
      gsap.fromTo('#footer .footer-left',
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: '#footer',
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.6,
          }
        }
      );
      gsap.fromTo('#footer .footer-right',
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: '#footer',
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.6,
          }
        }
      );

    }, mainRef);

    // Intro animation for hero
    const introTl = gsap.timeline({ delay: 0.3 });
    introTl.fromTo('#hero .hero-image',
      { x: '-12vw', opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out', stagger: 0.12 }
    );
    introTl.fromTo('#hero .hero-divider',
      { scaleY: 0 },
      { scaleY: 1, duration: 0.8, ease: 'power2.out', transformOrigin: 'top' },
      0.2
    );
    introTl.fromTo('#hero .hero-headline span',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.04 },
      0.3
    );
    introTl.fromTo('#hero .hero-bottom',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      0.6
    );

    return () => {
      ctx.revert();
      triggersRef.current.forEach(st => st.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <>
      <div ref={mainRef} className="relative">
        {/* Grain Overlay */}
        <div className="grain-overlay" />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 w-full z-50 px-[6vw] py-6 flex justify-between items-center mix-blend-difference">
          <div className="label-text text-text-primary cursor-pointer" onClick={() => scrollToSection(0)}>
            DEVANSH MEHROTRA
          </div>
          <button
            className="label-text text-text-primary hover:text-silver transition-colors"
            onClick={() => setMenuOpen(true)}
          >
            MENU
          </button>
        </nav>



        {/* Section 1: Hero */}
        <section id="hero" className="section-pinned bg-dark z-10 gap-8">
          <div className="relative md:absolute md:left-[6vw] md:top-[10vh] w-full md:w-[40vw] h-[30vh] md:h-[34vh] hero-image order-2 md:order-none">
            <div className="absolute inset-0 bg-black/5 blur-[30px] rounded-full mix-blend-multiply glow-effect" />
            <img
              src="/hero_creative_top.png"
              alt="Abstract Video Editing Glow"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-105 pointer-events-none"
            />
            <div className="relative w-full h-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.15)] rounded-lg md:rounded-none">
              <img
                src="/hero_creative_top.png"
                alt="Abstract Video Editing and Web Design"
                className="w-full h-full object-cover image-hover opacity-90"
              />
            </div>
          </div>
          <div className="relative md:absolute md:left-[6vw] md:top-[48vh] w-full md:w-[40vw] h-[30vh] md:h-[42vh] hero-image order-3 md:order-none hidden md:block">
            <div className="absolute inset-0 bg-black/5 blur-[30px] rounded-full mix-blend-multiply glow-effect" />
            <img
              src="/hero_creative_bottom.png"
              alt="Abstract Posters Glow"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-105 pointer-events-none"
            />
            <div className="relative w-full h-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.15)] rounded-lg md:rounded-none">
              <img
                src="/hero_creative_bottom.png"
                alt="Abstract Posters and Packaging"
                className="w-full h-full object-cover image-hover opacity-90"
              />
            </div>
          </div>
          <div className="hidden md:block absolute left-[52vw] top-[12vh] w-[1px] h-[76vh] hero-divider hairline-v" />
          <div className="relative md:absolute md:left-[54vw] md:top-[18vh] w-full md:w-[40vw] hero-headline order-1 md:order-none text-center md:text-left pt-12 md:pt-0">
            <h1 className="text-text-primary">
              <span className="headline-xl block">CREATIVE</span>
              <span className="headline-lg block mt-2 text-text-primary">TECHNOLOGIST</span>
            </h1>
          </div>
          <div className="relative md:absolute md:right-[6vw] md:bottom-[6vh] hero-bottom order-4 md:order-none mt-8 md:mt-0 text-center md:text-right">
            <button
              className="label-text text-text-primary link-underline cursor-pointer"
              onClick={() => scrollToSection(6)}
            >
              WORK WITH ME
            </button>
          </div>
        </section>

        {/* Section 2: Through the Lens */}
        <section id="lens" className="section-pinned bg-dark z-20 gap-8">
          <div className="absolute inset-0 lens-bg">
            <div className="absolute inset-0 bg-black/5 blur-[30px] mix-blend-multiply glow-effect" />
            <img
              src="/lens_portrait.jpg"
              alt="Photographer Glow"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-105 pointer-events-none"
            />
            <div className="relative w-full h-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.15)]">
              <img
                src="/lens_portrait.jpg"
                alt="Photographer"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-dark/90 via-dark/50 to-transparent" />
            </div>
          </div>
          <div className="relative md:absolute md:left-[6vw] md:top-[10vh] lens-headline mt-auto md:mt-0 z-10">
            <h2 className="headline-xl text-text-primary">
              <span className="block">THROUGH</span>
              <span className="block">THE LENS</span>
            </h2>
          </div>
          <div className="relative md:absolute md:right-[6vw] md:bottom-[10vh] lens-cta mt-8 md:mt-0 z-10">
            <button
              className="label-text text-text-primary link-underline cursor-pointer flex items-center gap-2"
              onClick={() => scrollToSection(4)}
            >
              VIEW SELECTED WORK <span>→</span>
            </button>
          </div>
        </section>

        {/* Section 3: About */}
        <section id="about" className="section-pinned section-light z-30">
          <div className="order-2 md:order-none relative md:absolute md:left-[54vw] md:top-[14vh] w-full md:w-[40vw] about-content mb-6 md:mb-0">
            <h2 className="headline-lg text-dark mb-3 md:mb-8">ABOUT ME</h2>
            <p className="body-text text-dark/80 leading-relaxed">
              I'm a multidisciplinary creative working at the intersection of design and technology.
              From video editing and posters to frontend websites and presentation design, I enjoy
              crafting visuals that are both aesthetic and functional. My goal is simple — transform
              ideas into impactful visual experiences.
            </p>
          </div>
          <div className="hidden md:block absolute left-[52vw] top-[12vh] w-[1px] h-[76vh] about-divider hairline-v" />
          <div className="order-1 md:order-none relative md:absolute md:left-[6vw] md:top-[14vh] w-full md:w-[40vw] h-[40vh] md:h-[72vh] about-image mb-4 md:mb-0">
            <div className="absolute inset-0 bg-black/5 blur-[30px] rounded-full mix-blend-multiply glow-effect" />
            <img
              src="/about_creative_process.png"
              alt="Creative Process Glow"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-105 pointer-events-none grayscale-[0.2]"
            />
            <div className="relative w-full h-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.15)] rounded-lg md:rounded-none">
              <img
                src="/about_creative_process.png"
                alt="Creative Process Collage"
                className="w-full h-full object-cover image-hover grayscale-[0.2] opacity-90"
              />
            </div>
          </div>
        </section>

        {/* Section 4: Education */}
        <section id="education" className="section-pinned section-light z-40">
          <div className="order-2 md:order-none relative md:absolute md:left-[54vw] md:top-[14vh] w-full md:w-[40vw] edu-content mb-4 md:mb-0">
            <h2 className="headline-lg text-dark mb-3 md:mb-10">EDUCATION</h2>
            <div className="mb-2 md:mb-8">
              <p className="body-text text-dark font-medium mb-1">Senior & Secondary School</p>
              <p className="label-text text-dark/60 text-[10px] md:text-xs">2007–2023, Tagore Public School</p>
            </div>
            <div className="mb-4 md:mb-12">
              <p className="body-text text-dark font-medium mb-1">BBA–IBM</p>
              <p className="label-text text-dark/60 text-[10px] md:text-xs">2024–2027, United University</p>
            </div>

            <h2 className="headline-lg text-dark mb-3 md:mb-8 mt-2 md:mt-4">EXPERIENCE</h2>
            <div>
              <p className="body-text text-dark font-medium mb-1">Mutual Fund Analyst</p>
              <p className="label-text text-dark/60 text-[10px] md:text-xs">2025–1mo, KPSL Distributors PVT LTD</p>
            </div>
          </div>
          <div className="hidden md:block absolute left-[52vw] top-[12vh] w-[1px] h-[76vh] edu-divider hairline-v" />
          <div className="order-1 md:order-none relative md:absolute md:left-[6vw] md:top-[14vh] w-full md:w-[40vw] h-[40vh] md:h-[72vh] edu-image mb-4 md:mb-0">
            <div className="absolute inset-0 bg-black/5 blur-[30px] rounded-full mix-blend-multiply glow-effect" />
            <img
              src="/education_creative.png"
              alt="Education Concept Glow"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-105 pointer-events-none grayscale-[0.2]"
            />
            <div className="relative w-full h-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.15)] rounded-lg md:rounded-none">
              <img
                src="/education_creative.png"
                alt="Education Concept Collage"
                className="w-full h-full object-cover image-hover grayscale-[0.2] opacity-90"
              />
            </div>
          </div>
        </section>

        {/* Section 5: Previous Work (Light Grid) */}
        <section id="work-grid" className="section-pinned section-light z-50 gap-6">
          <div className="relative md:absolute md:left-[6vw] md:top-[10vh] work-title mb-4 md:mb-0">
            <h2 className="headline-lg text-dark">
              <span className="block">WORK</span>
            </h2>
          </div>
          <div className="relative md:absolute md:left-[6vw] md:top-[26vh] w-full md:w-[46vw] h-[25vh] md:h-[30vh] work-image work-img-a mb-4 md:mb-0">
            <div className="absolute inset-0 bg-black/5 blur-[30px] rounded-full mix-blend-multiply glow-effect" />
            <img
              src="/project_air_dj.png"
              alt="Air-DJ Project Glow"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-105 pointer-events-none"
            />
            <div className="relative w-full h-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.15)] rounded-lg md:rounded-none">
              <img
                src="/project_air_dj.png"
                alt="Air-DJ Project"
                className="w-full h-full object-cover image-hover grayscale-[0.2] opacity-90"
              />
            </div>
            <p className="label-text text-dark/70 mt-2 md:mt-3 relative z-10">2024 — AIR-DJ</p>
          </div>
          <div className="relative md:absolute md:left-[54vw] md:top-[14vh] w-full md:w-[40vw] h-[25vh] md:h-[42vh] work-image work-img-b mb-4 md:mb-0">
            <div className="absolute inset-0 bg-black/5 blur-[30px] rounded-full mix-blend-multiply glow-effect" />
            <img
              src="/project_sentiment_ai.png"
              alt="SentimentAI Project Glow"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-105 pointer-events-none"
            />
            <div className="relative w-full h-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.15)] rounded-lg md:rounded-none">
              <img
                src="/project_sentiment_ai.png"
                alt="SentimentAI Project"
                className="w-full h-full object-cover image-hover grayscale-[0.2] opacity-90"
              />
            </div>
            <p className="label-text text-dark/70 mt-2 md:mt-3 relative z-10">2024 — SENTIMENT AI</p>
          </div>
          <div className="relative md:absolute md:left-[18vw] md:top-[62vh] w-full md:w-[34vw] h-[25vh] md:h-[26vh] work-image work-img-c mb-4 md:mb-0 hidden md:block">
            <div className="absolute inset-0 bg-black/5 blur-[30px] rounded-full mix-blend-multiply glow-effect" />
            <img
              src="/project_algorithm_study.png"
              alt="Algorithm Study Glow"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-105 pointer-events-none"
            />
            <div className="relative w-full h-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.15)] rounded-lg md:rounded-none">
              <img
                src="/project_algorithm_study.png"
                alt="Algorithm Study"
                className="w-full h-full object-cover image-hover grayscale-[0.2] opacity-90"
              />
            </div>
            <p className="label-text text-dark/70 mt-2 md:mt-3 relative z-10">2025 — Algorithm Study</p>
          </div>
          <div className="relative md:absolute md:left-[58vw] md:top-[62vh] w-full md:w-[36vw] h-[25vh] md:h-[26vh] work-image work-img-d hidden md:block">
            <div className="absolute inset-0 bg-black/5 blur-[30px] rounded-full mix-blend-multiply glow-effect" />
            <img
              src="/education_creative.png"
              alt="Data Visuals Glow"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-105 pointer-events-none"
            />
            <div className="relative w-full h-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.15)] rounded-lg md:rounded-none">
              <img
                src="/education_creative.png"
                alt="Data Visuals"
                className="w-full h-full object-cover image-hover grayscale-[0.2] opacity-90"
              />
            </div>
            <p className="label-text text-dark/70 mt-2 md:mt-3 relative z-10">2025 — Data Visuals</p>
          </div>
        </section>

        {/* Section 6: Featured Work */}
        <section id="featured" className="section-pinned bg-dark z-[60] gap-8">
          <div className="relative md:absolute md:left-[6vw] md:top-[14vh] w-full md:w-[62vw] h-[40vh] md:h-[56vh] featured-image order-2 md:order-none">
            <div className="absolute inset-0 bg-black/5 blur-[30px] rounded-full mix-blend-multiply glow-effect" />
            <img
              src="/featured_resin_patterns.jpg"
              alt="Resin patterns Glow"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-105 pointer-events-none"
            />
            <div className="relative w-full h-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.15)] rounded-lg md:rounded-none">
              <img
                src="/featured_resin_patterns.jpg"
                alt="Resin patterns"
                className="w-full h-full object-cover image-hover opacity-90"
              />
            </div>
          </div>
          <div className="relative md:absolute md:left-[6vw] md:top-[72vh] featured-caption order-3 md:order-none mt-4 md:mt-0">
            <p className="label-text text-text-secondary">2024 — Resin Patterns by Artist Chun Hei Kim</p>
            <p className="body-text text-text-primary mt-2 md:mt-4 max-w-full md:max-w-[52vw]">
              "The Croalstead Building was a joy to capture because whichever angle I chose to shoot from,
              there was always a new pattern to witness."
            </p>
          </div>
          <div className="relative md:absolute md:left-[72vw] md:top-[14vh] w-full md:w-[22vw] featured-list order-1 md:order-none pt-8 md:pt-0">
            <h3 className="font-display text-2xl md:text-3xl text-text-primary mb-4 md:mb-6">SELECTED WORK</h3>
            <ul className="space-y-3">
              {[
                { name: '01 — Air-DJ', url: 'https://github.com/newone-prog/Air-DJ' },
                { name: '02 — SentimentAI', url: 'https://sentimentai-kappa.vercel.app' },
                { name: '03 — System Architecture', url: '#' },
                { name: '04 — Hardware Prototyping', url: '#' },
                { name: '05 — Algorithm Study', url: '#' }
              ].map((item) => (
                <li key={item.name} className="label-text text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                  <a href={item.url} target={item.url !== '#' ? '_blank' : undefined} rel={item.url !== '#' ? 'noopener noreferrer' : undefined} className="block w-full">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative md:absolute md:right-[6vw] md:bottom-[10vh] featured-cta order-4 md:order-none mt-8 md:mt-0 text-center md:text-right">
            <button
              className="label-text text-text-primary link-underline cursor-pointer"
              onClick={() => scrollToSection(9)}
            >
              OPEN FOR COLLABS
            </button>
          </div>
        </section>


        {/* Section 8: Get In Touch (Full-bleed) */}
        <section id="touch" className="section-pinned bg-dark z-[80] gap-8">
          <div className="absolute inset-0 touch-bg">
            <div className="absolute inset-0 bg-black/5 blur-[30px] mix-blend-multiply glow-effect" />
            <img
              src="/work_singular_path.jpg"
              alt="Contact Glow"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-105 pointer-events-none"
            />
            <div className="relative w-full h-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.15)]">
              <img
                src="/work_singular_path.jpg"
                alt="Contact"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-dark/90 via-dark/40 to-transparent" />
            </div>
          </div>
          <div className="relative md:absolute md:left-[6vw] md:top-[10vh] touch-headline mt-auto md:mt-0 z-10">
            <p className="label-text text-text-secondary mb-2 md:mb-4">DEVANSH MEHROTRA</p>
            <h2 className="headline-xl text-text-primary">
              <span className="block">GET IN</span>
              <span className="block">TOUCH</span>
            </h2>
          </div>
          <div className="relative md:absolute md:right-[6vw] md:bottom-[10vh] touch-cta mt-8 md:mt-0 z-10">
            <button
              className="label-text text-text-primary link-underline cursor-pointer flex items-center gap-2"
              onClick={() => scrollToSection(9)}
            >
              SEND A MESSAGE <span>→</span>
            </button>
          </div>
        </section>

        {/* Section 9: Contact Details (Split) */}
        <section id="contact-split" className="section-pinned bg-dark z-[90] gap-8">
          <div className="relative md:absolute md:left-[6vw] md:top-[14vh] w-full md:w-[40vw] contact-info order-2 md:order-none">
            <h2 className="headline-lg text-text-primary mb-8 md:mb-12">
              <span className="block">GET IN</span>
              <span className="block">TOUCH</span>
            </h2>
            <div className="mb-6 md:mb-8">
              <p className="label-text text-text-secondary mb-1 md:mb-2">Email</p>
              <p className="body-text text-text-primary break-all">[DEVANSHMEHROTRA2190@GMAIL.COM]</p>
            </div>
            <div className="mb-6 md:mb-8">
              <p className="label-text text-text-secondary mb-1 md:mb-2">Location</p>
              <p className="body-text text-text-primary">Prayagraj, Uttar Pradesh</p>
              <p className="body-text text-text-primary">India</p>
            </div>
            <button
              className="label-text text-text-primary link-underline cursor-pointer mt-2 md:mt-4"
              onClick={() => scrollToSection(9)}
            >
              OPEN FOR COLLABS
            </button>
          </div>
          <div className="hidden md:block absolute left-[52vw] top-[12vh] w-[1px] h-[76vh] contact-divider hairline-v" />
          <div className="relative md:absolute md:left-[54vw] md:top-[14vh] w-full md:w-[40vw] h-[40vh] md:h-[72vh] contact-image order-1 md:order-none pt-8 md:pt-0 mb-4 md:mb-0">
            <div className="absolute inset-0 bg-black/5 blur-[30px] rounded-full mix-blend-multiply glow-effect" />
            <img
              src="/contact_aerial_boat.jpg"
              alt="Aerial boat Glow"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-105 pointer-events-none"
            />
            <div className="relative w-full h-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.15)] rounded-lg md:rounded-none">
              <img
                src="/contact_aerial_boat.jpg"
                alt="Aerial boat"
                className="w-full h-full object-cover image-hover opacity-90"
              />
            </div>
          </div>
        </section>

        {/* Section 10: Footer */}
        <section id="footer" className="section-flowing min-h-screen bg-dark z-[100] px-[6vw] py-[10vh] flex flex-col">
          <div className="flex-1 flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
              <div className="footer-left">
                <h2 className="headline-lg text-text-primary mb-6">
                  <span className="block">LET'S BUILD</span>
                  <span className="block">SOMETHING</span>
                </h2>
                <p className="body-text-lg text-text-secondary mb-10 max-w-md">
                  Available for freelance projects, creative collaborations, and visual direction.
                </p>
                <div className="space-y-4">
                  <p className="body-text text-text-primary">hello@reallygreatsite.com</p>
                  <p className="body-text text-text-primary">+1 (555) 000-0000</p>
                  <p className="body-text text-text-primary">123 Anywhere St., Any City</p>
                </div>
              </div>
              <div className="footer-right">
                <form className="space-y-6">
                  <div>
                    <label className="label-text text-text-secondary block mb-2">Name</label>
                    <input type="text" className="w-full bg-transparent border border-white/20 p-4 text-text-primary focus:border-white/60 transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="label-text text-text-secondary block mb-2">Email</label>
                    <input type="email" className="w-full bg-transparent border border-white/20 p-4 text-text-primary focus:border-white/60 transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="label-text text-text-secondary block mb-2">Message</label>
                    <textarea className="w-full h-32 resize-none bg-transparent border border-white/20 p-4 text-text-primary focus:border-white/60 transition-colors" placeholder="Tell me about your project..."></textarea>
                  </div>
                  <button
                    type="button"
                    className="btn-primary w-full md:w-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Thanks for your message! This is a demo form.");
                    }}
                  >
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex gap-8">
              {['Instagram', 'Behance', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-text text-text-secondary hover:text-text-primary transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
            <p className="label-text text-text-secondary">© 2026 Devansh Mehrotra</p>
          </div>
        </section>
      </div>

      {/* Menu Overlay */}
      {menuOpen && (
        <div className="menu-overlay">
          <button
            className="absolute top-6 right-[6vw] label-text text-text-primary hover:text-silver transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            CLOSE
          </button>
          <div className="flex flex-col items-center gap-8">
            <button
              className="font-display text-5xl md:text-7xl text-text-primary hover:text-silver transition-colors"
              onClick={() => scrollToSection(2)}
            >
              About
            </button>
            <button
              className="font-display text-5xl md:text-7xl text-text-primary hover:text-silver transition-colors"
              onClick={() => scrollToSection(3)}
            >
              Education/Experience
            </button>
            <button
              className="font-display text-5xl md:text-7xl text-text-primary hover:text-silver transition-colors"
              onClick={() => scrollToSection(4)}
            >
              Projects
            </button>
            <button
              className="font-display text-5xl md:text-7xl text-text-primary hover:text-silver transition-colors"
              onClick={() => scrollToSection(9)}
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
