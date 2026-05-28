import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <main className="page">
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>KIDEM</div>
        <nav>
          <a href="#philosophy">The Vision</a>
          <a href="#collection">The Objects</a>
          <a href="#heritage">The Heritage</a>
          <a href="#contact">Inquiry</a>
        </nav>
      </header>

      {/* Hero Spread - Premium Magazine Cover */}
      <section className="spread hero-spread" id="top">
        <div className="hero-spread__copy">
          <div className="cover-info reveal">
            <span>Issue No. 01</span>
            <span>Est. Spain — Editorial Lifestyle</span>
            <span>2026 Edition</span>
          </div>
          
          <div className="hero-center">
            <div className="hero-title reveal">
              <h1 className="logo-hero">KIDEM</h1>
              <div className="hero-meta">
                <span className="line"></span>
                <p className="kicker">The Art of Spatial Curation</p>
                <span className="line"></span>
              </div>
            </div>
          </div>

          <div className="hero-bottom reveal">
            <div className="vertical-text">
              Spatial Design & Curated Objects
            </div>
            <div className="scroll-hint">
              <span className="scroll-text">Explore the Origin</span>
              <span className="scroll-bar"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Spread */}
      <section className="spread philosophy" id="philosophy">
        <div className="spread__content">
          <p className="kicker reveal">Philosophy</p>
          <h2 className="reveal">공간의 여백,<br/>그 안에 스며든 시간의 조각들.</h2>
          <p className="lead reveal">
            KIDEM은 단순히 물건을 선별하는 것에 그치지 않습니다.<br/>
            우리는 스페인의 따뜻한 햇살과 유럽의 고요한 골목에서 발견한 미학적인 영감을,<br/>
            당신의 일상에 스며들 수 있는 아름다운 조각들로 재구성합니다.<br/>
            공간이 내는 고유한 리듬과 당신의 호흡이 만나는 지점을 탐구합니다.
          </p>
          <div className="visual-container reveal">
            <img 
              src="/KakaoTalk_20230110_215608685.jpg" 
              alt="Philosophy Visual" 
              style={{ width: '100%', height: 'auto', boxShadow: 'var(--shadow)' }} 
            />
          </div>
          <div className="quote-container reveal">
            <p className="quote-animated">A good feeling fills the space.</p>
          </div>
        </div>
      </section>

      {/* Collection Spread */}
      <section className="spread collection" id="collection">
        <div className="spread__content">
          <div className="section-head reveal">
            <span className="kicker">The Curation</span>
            <h2>Essentials for<br/>Quiet Living.</h2>
          </div>
          <div className="collection-grid">
            <article className="item reveal">
              <div className="item__img">
                <img src="/KakaoTalk_20230110_224521382.jpg" alt="Ornate Light" />
              </div>
              <h3>01. Ornate Light</h3>
              <p>OBJECT / BAROQUE INTERIOR</p>
            </article>
            <article className="item reveal">
              <div className="item__img">
                <img src="/KakaoTalk_20230112_005735945_07.jpg" alt="Colorwashed Street" />
              </div>
              <h3>02. Colorwashed Street</h3>
              <p>ARCHITECTURE / URBAN PALETTE</p>
            </article>
            <article className="item reveal">
              <div className="item__img">
                <img src="/KakaoTalk_20230112_005735945_04.jpg" alt="Refined Essence" />
              </div>
              <h3>03. Refined Essence</h3>
              <p>SPATIAL / TACTILE STUDY</p>
            </article>
          </div>
        </div>
      </section>

      {/* Heritage Detail Spread */}
      <section className="spread detail-spread" id="heritage">
        <div className="detail__visual">
          <div className="visual-overlay"></div>
          <img 
            src="/KakaoTalk_20221223_190657427.jpg" 
            alt="Editorial Visual" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
        <div className="detail__content">
          <p className="kicker reveal">The Narrative</p>
          <h2 className="reveal">KIDEM :<br/>To Begin.</h2>
          <div className="narrative-body reveal">
            <p className="hebrew-meaning">
              동쪽과 근원의 의미를 담은 이름.
            </p>
            <p>
              공간에 새로운 감각을 더하는<br/>
              오브제를 선별합니다.
            </p>
            <p>
              진정한 럭셔리는 화려함이 아닌,<br/>
              사물과 공간이 이루는 완벽한 조화에 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="logo reveal">KIDEM</div>
        <div className="footer-nav reveal">
          <a href="mailto:jjongsu2005@naver.com">jjongsu2005@naver.com</a>
          <a href="https://www.instagram.com/kidem_studio/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <p className="copyright reveal">© 2026 KIDEM. Designed for the inspired home.</p>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)