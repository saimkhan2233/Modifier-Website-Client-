import { useEffect, useRef, useState } from "react";
import BrandLogo from "./components/BrandLogo";
import MaterialIcon from "./components/MaterialIcon";
import SectionHeading from "./components/SectionHeading";
import {
  aboutCopy,
  applications,
  benefits,
  challenges,
  contactItems,
  dashboardMetrics,
  features,
  heroSlides,
  howItWorks,
  impacts,
  marketGap,
  navItems,
  partners,
  valueProps,
} from "./data/content";
import "./styles.css";

export default function ModifierWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [visibleElements, setVisibleElements] = useState({});
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const rootRef = useRef(null);

  const activeHero = heroSlides[slideIndex];

  useEffect(() => {
    const links = [
      {
        id: "modifier-google-fonts",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap",
      },
      {
        id: "modifier-google-icons",
        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0",
      },
    ];

    links.forEach((link) => {
      if (!document.getElementById(link.id)) {
        const node = document.createElement("link");
        node.id = link.id;
        node.rel = "stylesheet";
        node.href = link.href;
        document.head.appendChild(node);
      }
    });
  }, []);

  useEffect(() => {
    const loaderTimer = window.setTimeout(() => setLoaderVisible(false), 2300);
    const slideTimer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % heroSlides.length);
    }, 4700);

    return () => {
      window.clearTimeout(loaderTimer);
      window.clearInterval(slideTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      for (const section of navItems.map((item) => item.id)) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.45) {
          setActiveSection(section);
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    rootRef.current?.querySelectorAll("[data-animate]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="modifier-site">
      <div className={`modifier-loader ${loaderVisible ? "" : "is-hidden"}`} aria-hidden={!loaderVisible}>
        <div className="modifier-loader__ring" />
        <div className="modifier-loader__spark" />
        <div className="modifier-loader__logo">
          <BrandLogo />
        </div>
      </div>

      <header className={`modifier-header ${activeSection !== "home" ? "modifier-header--light" : ""}`}>
        <button onClick={() => scrollToSection("home")} className="modifier-logo-button" aria-label="Go to home">
          <BrandLogo compact />
        </button>
        <button
          className={`modifier-menu-button ${isMenuOpen ? "is-open" : ""}`}
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <nav className={`modifier-nav ${isMenuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        <div className="modifier-nav__list">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              className={`modifier-nav__item ${activeSection === item.id ? "is-active" : ""}`}
              style={{ transitionDelay: isMenuOpen ? `${120 + index * 70}ms` : "0ms" }}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main>
        <section id="home" className="modifier-hero">
          <div className="modifier-hero__content" key={slideIndex}>
            <div className="modifier-hero__logo">
              <BrandLogo />
            </div>
            <p className="modifier-hero__eyebrow">{activeHero.eyebrow}</p>
            <h1 className="modifier-hero__title">{activeHero.title}</h1>
            <p className="modifier-hero__kicker">{activeHero.kicker}</p>
            <div className="modifier-hero__pager" aria-label="Hero slides">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  className={slideIndex === index ? "is-active" : ""}
                  onClick={() => setSlideIndex(index)}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>

          <button className="modifier-scroll" onClick={() => scrollToSection("about")}>
            <span className="modifier-scroll__mouse" />
            <span>Scroll</span>
          </button>
        </section>

        <section id="about" className="modifier-section modifier-section--white" data-animate>
          <div className={`modifier-container modifier-split ${visibleElements.about ? "is-visible" : ""}`}>
            <SectionHeading
              eyebrow="Digital Standee Solution"
              active={visibleElements.about}
              lines={["Intelligent", "Data Driven", "Engagement"]}
            />
            <div className="reveal modifier-copy-group" style={{ transitionDelay: "220ms" }}>
              {aboutCopy.map((copy) => (
                <p key={copy} className="modifier-copy">
                  {copy}
                </p>
              ))}
              <div className="modifier-values">
                <span className="modifier-value">Transparency</span>
                <span className="modifier-value">Objectivity</span>
                <span className="modifier-value">Commitment</span>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="modifier-section" data-animate>
          <div className={`modifier-container ${visibleElements.portfolio ? "is-visible" : ""}`}>
            <SectionHeading
              eyebrow="Market Gap"
              active={visibleElements.portfolio}
              lines={["Standard", "Standees vs", "AdPulse"]}
            />
            <div className="modifier-gap-table reveal">
              <div className="modifier-gap-table__head">What Brands Want</div>
              <div className="modifier-gap-table__head">Standard Standees</div>
              <div className="modifier-gap-table__head">AdPulse Standees</div>
              {marketGap.map((row) => (
                <div className="modifier-gap-table__row" key={row.want}>
                  <strong>{row.want}</strong>
                  <span>{row.standard}</span>
                  <span>{row.adpulse}</span>
                </div>
              ))}
            </div>
            <div className="modifier-benefits">
              {benefits.map((benefit, index) => (
                <article key={benefit} className="modifier-benefit reveal" style={{ transitionDelay: `${index * 70}ms` }}>
                  <MaterialIcon>check_circle</MaterialIcon>
                  <span>{benefit}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="modifier-section modifier-section--dark" data-animate>
          <div className={`modifier-container ${visibleElements.services ? "is-visible" : ""}`}>
            <SectionHeading
              eyebrow="Features and Capabilities"
              active={visibleElements.services}
              lines={["AI Powered", "Targeted", "Advertising"]}
            />
            <div className="modifier-card-grid">
              {features.map((feature, index) => (
                <article key={feature.title} className="modifier-card reveal" style={{ transitionDelay: `${index * 70}ms` }}>
                  <MaterialIcon>{feature.icon}</MaterialIcon>
                  <h3 className="modifier-card__title">{feature.title}</h3>
                  <p className="modifier-card__desc">{feature.desc}</p>
                </article>
              ))}
            </div>

            <div className="modifier-process">
              {howItWorks.map((step, index) => (
                <article key={step} className="modifier-process__item reveal" style={{ transitionDelay: `${420 + index * 80}ms` }}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </article>
              ))}
            </div>

            <div className="modifier-impact">
              {impacts.map((impact, index) => (
                <article key={impact.title} className="modifier-impact__item reveal" style={{ transitionDelay: `${760 + index * 85}ms` }}>
                  <MaterialIcon>{impact.icon}</MaterialIcon>
                  <h3>{impact.title}</h3>
                  <p>{impact.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="partners" className="modifier-section modifier-section--white" data-animate>
          <div className={`modifier-container ${visibleElements.partners ? "is-visible" : ""}`}>
            <SectionHeading
              eyebrow="Analytics Dashboard"
              active={visibleElements.partners}
              lines={["Real Time", "Audience", "Insights"]}
            />
            <div className="modifier-dashboard">
              {dashboardMetrics.map((metric, index) => (
                <article key={metric.label} className="modifier-dashboard__metric reveal" style={{ transitionDelay: `${index * 70}ms` }}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <p>{metric.desc}</p>
                </article>
              ))}
            </div>

            <div className="modifier-partner-wrap">
              <div>
                <p className="modifier-kicker reveal">Business Partners</p>
                <p className="modifier-copy reveal">
                  Built for brands, venues, and operators who need high-impact offline media with smarter triggering and useful campaign data.
                </p>
              </div>
              <div className="modifier-partners">
                {partners.map((partner, index) => (
                  <div key={partner} className="modifier-partner reveal" style={{ transitionDelay: `${index * 75}ms` }}>
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="modifier-section" data-animate id="applications">
          <div className={`modifier-container modifier-split ${visibleElements.applications ? "is-visible" : ""}`}>
            <SectionHeading
              eyebrow="Applications"
              active={visibleElements.applications}
              lines={["Ideal For", "High Footfall", "Locations"]}
            />
            <div className="modifier-applications reveal">
              {applications.map((application) => (
                <span key={application}>{application}</span>
              ))}
            </div>
            <div className="modifier-value-props reveal">
              {valueProps.map((value) => (
                <div key={value}>
                  <MaterialIcon>done_all</MaterialIcon>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="modifier-section modifier-section--white" data-animate>
          <div className={`modifier-container ${visibleElements.contact ? "is-visible" : ""}`}>
            <div className="modifier-contact">
              <div className="modifier-contact__info reveal">
                <SectionHeading eyebrow="For Queries" active={visibleElements.contact} lines={["Contact", "Modifier", "Today"]} />
                <div className="modifier-contact__list">
                  {contactItems.map((item) => (
                    <div key={item.label} className="modifier-contact__item">
                      <MaterialIcon>{item.icon}</MaterialIcon>
                      <div>
                        <p>{item.label}</p>
                        <strong>{item.value}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <form className="modifier-contact__form reveal" style={{ transitionDelay: "160ms" }}>
                <input className="modifier-field" type="text" placeholder="Your name" />
                <input className="modifier-field" type="email" placeholder="Your email address" />
                <input className="modifier-field" type="text" placeholder="Subject" />
                <textarea className="modifier-field" rows={5} placeholder="Your message" />
                <button className="modifier-submit" type="button">
                  Submit
                  <MaterialIcon>arrow_forward</MaterialIcon>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <button className="modifier-back-top" onClick={() => scrollToSection("home")} aria-label="Back to top">
        <MaterialIcon>keyboard_arrow_up</MaterialIcon>
      </button>

      <footer className="modifier-footer">
        <div className="modifier-footer__inner">
          <BrandLogo compact />
          <div className="modifier-footer__links">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
          <span>© 2026 Modifier Marketing Private Limited. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
