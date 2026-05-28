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
          <a href="#philosophy">Philosophy</a>
          <a href="#collection">Collection</a>
          <a href="#editorial">Journal</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Hero Spread */}
      <section className="spread hero-spread" id="top">
        <div className="spline-container">
          <spline-viewer url="https://prod.spline.design/Pe2ow20vSg2vj7iU/scene.splinecode" />
        </div>
        <div className="hero-spread__copy">
          <p className="kicker reveal">Est. Spain — Editorial Lifestyle</p>
          <p className="scroll-hint">Discover More</p>
        </div>
      </section>

      {/* Philosophy Spread */}
      <section className="spread philosophy" id="philosophy">
        <div className="spread__content">
          <p className="kicker reveal">Our Ethos</p>
          <h2 className="reveal">The Art of<br/>Spatial Rhythm.</h2>
          <p className="lead reveal">
            KIDEM은 고요함 속에서 피어나는 아름다움을 믿습니다. 
            스페인의 여유로운 정서와 유럽의 정교한 미학이 만나는 지점에서, 
            우리는 당신의 일상을 하나의 작품으로 만드는 오브제들을 제안합니다.
          </p>
          <img 
            src="/KakaoTalk_20230110_215608685.jpg" 
            alt="Philosophy Visual" 
            className="reveal" 
            style={{ width: '100%', maxWidth: '1000px', marginTop: '80px', height: 'auto', boxShadow: 'var(--shadow)' }} 
          />
        </div>
      </section>

      {/* Collection Spread */}
      <section className="spread collection" id="collection">
        <div className="spread__content">
          <div className="section-head reveal">
            <p className="kicker">The Collection</p>
            <h2>Objects for<br/>Quiet Living.</h2>
          </div>
          <div className="collection-grid">
            <article className="item reveal">
              <div className="item__img">
                <img src="/KakaoTalk_20230110_224521382.jpg" alt="Collection Item 01" />
              </div>
              <h3>01. Sculptural Form</h3>
              <p>Object / Inflatable Texture</p>
            </article>
            <article className="item reveal">
              <div className="item__img">
                <img src="/KakaoTalk_20230112_005735945_07.jpg" alt="Collection Item 02" />
              </div>
              <h3>02. Mineral Vessel</h3>
              <p>Tableware / Natural Stone</p>
            </article>
            <article className="item reveal">
              <div className="item__img">
                <img src="/KakaoTalk_20230112_005735945_04.jpg" alt="Collection Item 03" />
              </div>
              <h3>03. Editorial Glass</h3>
              <p>Living / Hand-blown</p>
            </article>
          </div>
        </div>
      </section>

      {/* Editorial Spread */}
      <section className="spread detail-spread" id="editorial">
        <div className="detail__visual">
          <img 
            src="/KakaoTalk_20221223_190657427.jpg" 
            alt="Editorial Visual" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.4' }} 
          />
        </div>
        <div className="detail__content">
          <p className="kicker reveal">Heritage</p>
          <h2 className="reveal">Beyond the<br/>Ordinary.</h2>
          <p className="reveal">
            '케뎀'은 단순히 과거가 아닌, 이미 우리 앞에 와 있는 미래를 뜻합니다. 
            KIDEM이 선별한 소품들은 당신의 공간에 새로운 에너지를 불어넣고, 
            가장 개인적인 장소에서 가장 풍요로운 감각을 깨울 것입니다. 
            진정한 럭셔리는 화려함이 아닌, 사물과 공간이 이루는 완벽한 조화에 있습니다.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="logo reveal">KIDEM</div>
        <div className="footer-nav reveal">
          <a href="#">Instagram</a>
          <a href="#">Pinterest</a>
          <a href="#">Stockists</a>
          <a href="#">Shop Now</a>
        </div>
        <p className="copyright reveal">© 2025 KIDEM. All rights reserved.</p>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)