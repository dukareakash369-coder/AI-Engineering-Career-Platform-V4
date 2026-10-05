import './App.css'
import Career3D from './Career3D'
import Login from './pages/Login'
import Signup from './pages/Signup'

const domains = [
  {
    icon: '⌘',
    title: 'Computer Science',
    description: 'Software · AI · Data · Cloud',
    paths: '28 career paths',
  },
  {
    icon: '◈',
    title: 'Electronics',
    description: 'Embedded · VLSI · IoT · Robotics',
    paths: '24 career paths',
  },
  {
    icon: '⚡',
    title: 'Electrical',
    description: 'Power · Control · Automation',
    paths: '18 career paths',
  },
  {
    icon: '⚙',
    title: 'Mechanical',
    description: 'Manufacturing · Design · Automotive',
    paths: '20 career paths',
  },
  {
    icon: '△',
    title: 'Civil',
    description: 'Construction · Infrastructure · Design',
    paths: '16 career paths',
  },
  {
    icon: '◎',
    title: 'AI & Data',
    description: 'Machine Learning · Analytics · AI',
    paths: '26 career paths',
  },
]

const intelligencePoints = [
  {
    number: '01',
    title: 'Understand your profile',
    description: 'We analyze your skills, projects and interests.',
  },
  {
    number: '02',
    title: 'Understand every job',
    description: 'AI studies job requirements and market demand.',
  },
  {
    number: '03',
    title: 'Connect the two intelligently',
    description: 'Get personalized matches and career insights.',
  },
]

const plans = [
  {
    name: 'FREE',
    title: 'Explore',
    description: 'Build your profile and discover personalized opportunities.',
    features: [
      'Basic career matching',
      'Limited AI insights',
      'Access to core features',
    ],
    action: 'Get Started Free →',
  },
  {
    name: 'PRO',
    title: 'Grow',
    description: 'Unlock deeper matching, skill intelligence and career insights.',
    features: [
      'Advanced AI matching',
      'Skill gap analysis',
      'Project recommendations',
      'Interview preparation',
    ],
    action: 'Start Pro Plan →',
    featured: true,
  },
  {
    name: 'PRO+',
    title: 'Accelerate',
    description: 'Advanced career intelligence, resume improvement and personalized roadmap.',
    features: [
      'Everything in Pro',
      'Resume optimization',
      'Personalized roadmap',
      '1:1 career guidance (optional)',
    ],
    action: 'Start Pro+ Plan →',
  },
]
function App() {
  if (window.location.pathname === '/login') {
    return <Login />
  }

  if (window.location.pathname === '/signup') {
    return <Signup />
  }


  return (
    <div className="app">

      {/* =========================================
          NAVBAR
      ========================================= */}

      <header className="navbar">

        <a href="#" className="brand">
          <div className="brand-mark">
            AI
          </div>

          <div>
            <div className="brand-name">
              CareerAI
            </div>

            <div className="brand-subtitle">
              Engineering Intelligence
            </div>
          </div>
        </a>

        <nav className="nav-links">
          <a href="#jobs">Jobs</a>
          <a href="#intelligence">Career Intelligence</a>
          <a href="#pricing">Plans</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-actions">
          <button 
          className="login-btn"
          onClick={() => {
            window.location.href = '/login'
          }}
          
          >
            Log in
          </button>

          <button className="signup-btn">
            Get Started
          </button>
        </div>

      </header>

      <main>

        {/* =========================================
            HERO
        ========================================= */}

        <section className="hero-section">
          <Career3D />

          <div className="hero-background-label">
            <span></span>
            CAREER INTELLIGENCE ENGINE
          </div>

          <div className="hero-content">

            <div className="hero-badge">
              <span className="status-dot"></span>
              AI-powered career intelligence for engineers
            </div>

            <h1>
              Find the right

              <span className="gradient-text">
                engineering
              </span>

              <span className="gradient-text">
                career.
              </span>
            </h1>

            <p className="hero-description">
              Discover jobs that actually match your skills,
              projects, experience and career goals — with AI
              that explains <strong>why you match.</strong>
            </p>

            <div className="hero-buttons">
              <button className="primary-btn">
                Build My Career Profile
                <span>→</span>
              </button>

              <button className="secondary-btn">
                Explore Jobs
              </button>
            </div>

            <div className="hero-trust">

              <div className="trust-item">
                <strong>AI Matching</strong>
                <span>Personalized jobs</span>
              </div>

              <div className="trust-divider"></div>

              <div className="trust-item">
                <strong>Skill Intelligence</strong>
                <span>Know what to improve</span>
              </div>

              <div className="trust-divider"></div>

              <div className="trust-item">
                <strong>Career Roadmap</strong>
                <span>Plan your next move</span>
              </div>

            </div>
          </div>

          {/* =========================================
              AI JOB MATCH
          ========================================= */}

          <div className="hero-preview">

            <div className="preview-glow"></div>

            <div className="match-card">

              <div className="card-top">

                <div>
                  <span className="small-label">
                    AI JOB MATCH
                  </span>

                  <h3>
                    Embedded Software Engineer
                  </h3>

                  <p>
                    Automotive Technology · Pune
                  </p>
                </div>

                <div className="match-score">
                  <span>87%</span>
                  <small>Match</small>
                </div>

              </div>

              <div className="match-line"></div>

              <div className="skills-section">
                <span className="section-label">
                  Matched Skills
                </span>

                <div className="skill-list">
                  <span>C</span>
                  <span>Embedded C</span>
                  <span>Python</span>
                  <span>ESP32</span>
                </div>
              </div>

              <div className="skills-section">
                <span className="section-label">
                  Skill Gap
                </span>

                <div className="skill-list missing">
                  <span>RTOS</span>
                  <span>AUTOSAR</span>
                </div>
              </div>

              <div className="why-match">
                <div className="why-icon">
                  ✦
                </div>

                <div>
                  <strong>Why this job?</strong>

                  <p>
                    Strong technical overlap with your
                    projects and embedded systems skills.
                  </p>
                </div>
              </div>

              <button className="view-job-btn">
                View Job Details →
              </button>

            </div>
          </div>
        </section>

        {/* =========================================
            ENGINEERING DOMAINS
        ========================================= */}

        <section
          className="domains-section"
          id="jobs"
        >

          <div className="section-heading">

            <span className="section-index">
              01 / ENGINEERING DOMAINS
            </span>

            <h2>
              Choose your engineering path.
            </h2>

            <p>
              Explore careers across engineering domains —
              and discover where your skills fit.
            </p>

          </div>

          <div className="domain-grid">

            {domains.map((domain) => (
              <article
                className="domain-card"
                key={domain.title}
              >

                <div className="domain-card-top">

                  <div className="domain-icon">
                    {domain.icon}
                  </div>

                  <span className="domain-arrow">
                    ↗
                  </span>

                </div>

                <div>
                  <h3>
                    {domain.title}
                  </h3>

                  <p>
                    {domain.description}
                  </p>
                </div>

                <div className="domain-card-bottom">

                  <span className="domain-paths">
                    {domain.paths}
                  </span>

                  <span className="explore-domain">
                    Explore paths →
                  </span>

                </div>

              </article>
            ))}

          </div>

          <div className="domains-cta">
            <button className="primary-btn">
              Explore all engineering domains
              <span>→</span>
            </button>
          </div>

        </section>

        {/* =========================================
            CAREER INTELLIGENCE
        ========================================= */}

        <section
          className="intelligence-section"
          id="intelligence"
        >

          <div className="intelligence-content">

            <span className="section-tag">
              02 / CAREER INTELLIGENCE
            </span>

            <h2>
              Your career is more than a
              <span className="gradient-text">
                resume.
              </span>
            </h2>

            <p>
              CareerAI understands your complete engineering
              profile — your education, skills, projects,
              experience, preferences and resume — to create
              a personalized career intelligence layer.
            </p>

            <div className="intelligence-points">

              {intelligencePoints.map((point) => (
                <div key={point.number}>

                  <span>
                    {point.number}
                  </span>

                  <div>
                    <strong>
                      {point.title}
                    </strong>

                    <small>
                      {point.description}
                    </small>
                  </div>

                </div>
              ))}

            </div>

          </div>

          <div className="intelligence-visual">

            <div className="intelligence-card">

              <div className="ai-orb">
                ✦
              </div>

              <h3>
                Career Intelligence
              </h3>

              <div className="intelligence-row">
                <span>Profile Strength</span>
                <strong>82%</strong>
              </div>

              <div className="progress">
                <div className="progress-fill"></div>
              </div>

              <div className="intelligence-row">
                <span>Job Compatibility</span>
                <strong>87%</strong>
              </div>

              <div className="progress">
                <div className="progress-fill second"></div>
              </div>

              <div className="career-next">

                <span>
                  YOUR NEXT MOVE
                </span>

                <strong>
                  Learn RTOS fundamentals
                </strong>

                <p>
                  Could improve your embedded
                  job compatibility.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================
            PRICING
        ========================================= */}

        <section
          className="pricing-section"
          id="pricing"
        >

          <div className="section-heading">

            <span className="section-index">
              03 / PLANS
            </span>

            <h2>
              Start free. Upgrade when you need more.
            </h2>

            <p>
              CareerAI will offer flexible plans for engineers
              at different stages of their career journey.
            </p>

          </div>

          <div className="pricing-preview">

            {plans.map((plan) => (
              <div
                className={`plan-card${plan.featured ? ' featured' : ''}`}
                key={plan.name}
              >

                {plan.featured && (
                  <span className="plan-badge">
                    MOST POPULAR
                  </span>
                )}

                <span>
                  {plan.name}
                </span>

                <h3>
                  {plan.title}
                </h3>

                <p>
                  {plan.description}
                </p>

                <div className="plan-features">
                  {plan.features.map((feature) => (
                    <span key={feature}>
                      {feature}
                    </span>
                  ))}
                </div>

                <button className="plan-action">
                  {plan.action}
                </button>

              </div>
            ))}

          </div>

        </section>

        {/* =========================================
            FINAL CTA
        ========================================= */}

        <section
          className="final-cta"
          id="about"
        >

          <div>

            <span className="section-tag">
              START YOUR JOURNEY
            </span>

            <h2>
              Stop searching randomly.
              <br />
              Start building your career intelligently.
            </h2>

            <p>
              Create your engineering profile and let
              CareerAI understand where you fit.
            </p>

            <button className="primary-btn">
              Create My Career Profile
              <span>→</span>
            </button>

          </div>

        </section>

      </main>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="footer">

        <div className="brand">

          <div className="brand-mark">
            AI
          </div>

          <div>
            <div className="brand-name">
              CareerAI
            </div>

            <div className="brand-subtitle">
              Engineering Intelligence
            </div>
          </div>

        </div>

        <p>
          AI-Powered Engineering Job Discovery,
          Matching & Career Intelligence
        </p>

        <span>
          © 2026 CareerAI
        </span>

      </footer>

    </div>
  )
}

export default App
