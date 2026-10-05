import { useEffect, useRef, useState } from 'react'
import Career3D from '../Career3D'


const profileSteps = [
  {
    number: '01',
    title: 'Education',
    description:
      'Tell CareerAI where you are in your engineering journey.',
  },
  {
    number: '02',
    title: 'Interests',
    description:
      'Choose the areas of engineering that genuinely interest you.',
  },
  {
    number: '03',
    title: 'Technical Profile',
    description:
      'Add your skills, projects and technical experience.',
  },
  {
    number: '04',
    title: 'Career Direction',
    description:
      'Tell CareerAI where you want your career to go.',
  },
  {
    number: '05',
    title: 'Resume',
    description:
      'Upload your resume or continue without one.',
  },
]

/* =========================================================
   GALAXY → BLACK HOLE → BIG BANG CINEMATIC
   ========================================================= */

function GalaxyCinematic() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    let animationFrame
    let startTime = performance.now()

    let width = 0
    let height = 0
    let centerX = 0
    let centerY = 0

    const stars = []
    const galaxyParticles = []
    const dataParticles = []
    const explosionParticles = []
    const shockParticles = []

    const STAR_COUNT = 1200
    const GALAXY_COUNT = 850
    const DATA_COUNT = 260
    const EXPLOSION_COUNT = 1400
    const SHOCK_COUNT = 420

    const random = (min, max) =>
      Math.random() * (max - min) + min

    const resize = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2,
      )

      width = window.innerWidth
      height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr

      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0,
      )

      centerX = width / 2
      centerY = height / 2
    }

    /* -------------------------------------------------------
       STARS
       ------------------------------------------------------- */

    const createStars = () => {
      stars.length = 0

      for (let i = 0; i < STAR_COUNT; i += 1) {
        stars.push({
          x: random(0, 1),
          y: random(0, 1),
          size: random(0.35, 1.8),
          alpha: random(0.25, 0.95),
          twinkle: random(0.001, 0.004),
          phase: random(0, Math.PI * 2),
          depth: random(0.2, 1),
          blue: Math.random() > 0.28,
        })
      }
    }

    /* -------------------------------------------------------
       GALAXY PARTICLES
       ------------------------------------------------------- */

    const createGalaxyParticles = () => {
      galaxyParticles.length = 0

      for (let i = 0; i < GALAXY_COUNT; i += 1) {
        const arm = Math.floor(
          Math.random() * 5,
        )

        const radius = Math.pow(
          Math.random(),
          0.72,
        ) * Math.min(width, height) * 0.48

        const angle =
          arm *
            ((Math.PI * 2) / 5) +
          radius * 0.012 +
          random(-0.45, 0.45)

        galaxyParticles.push({
          radius,
          angle,
          size: random(0.3, 1.8),
          alpha: random(0.08, 0.65),
          speed: random(0.00008, 0.00028),
          depth: random(0.35, 1),
          phase: random(0, Math.PI * 2),
        })
      }
    }

    /* -------------------------------------------------------
       CAREER DATA PARTICLES
       ------------------------------------------------------- */

    const createDataParticles = () => {
      dataParticles.length = 0

      for (let i = 0; i < DATA_COUNT; i += 1) {
        const angle = random(
          0,
          Math.PI * 2,
        )

        const radius = random(
          Math.min(width, height) * 0.25,
          Math.max(width, height) * 0.7,
        )

        dataParticles.push({
          angle,
          radius,
          originalRadius: radius,
          size: random(0.8, 2.8),
          alpha: random(0.35, 0.95),
          speed: random(
            0.0004,
            0.0015,
          ),
          phase: random(0, Math.PI * 2),
        })
      }
    }

    /* -------------------------------------------------------
       BIG BANG PARTICLES
       ------------------------------------------------------- */

    const createExplosionParticles = () => {
      explosionParticles.length = 0

      for (
        let i = 0;
        i < EXPLOSION_COUNT;
        i += 1
      ) {
        const angle = random(
          0,
          Math.PI * 2,
        )

        const speed =
          Math.pow(
            Math.random(),
            0.42,
          ) *
          random(3, 14)

        explosionParticles.push({
          angle,
          speed,
          distance: random(0, 15),
          size: random(0.5, 3.1),
          alpha: random(0.35, 1),
          delay: random(0, 0.22),
          warmth: Math.random(),
        })
      }
    }

    /* -------------------------------------------------------
       SHOCKWAVE PARTICLES
       ------------------------------------------------------- */

    const createShockParticles = () => {
      shockParticles.length = 0

      for (
        let i = 0;
        i < SHOCK_COUNT;
        i += 1
      ) {
        shockParticles.push({
          angle: random(
            0,
            Math.PI * 2,
          ),
          distance: random(0, 20),
          speed: random(300, 850),
          size: random(0.7, 2.8),
          alpha: random(0.3, 1),
        })
      }
    }

    /* -------------------------------------------------------
       BACKGROUND
       ------------------------------------------------------- */

    const drawBackground = () => {
      ctx.fillStyle = '#010208'

      ctx.fillRect(
        0,
        0,
        width,
        height,
      )

      const nebula = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(width, height) * 0.72,
      )

      nebula.addColorStop(
        0,
        'rgba(61, 74, 180, 0.20)',
      )

      nebula.addColorStop(
        0.22,
        'rgba(65, 42, 160, 0.12)',
      )

      nebula.addColorStop(
        0.48,
        'rgba(28, 42, 100, 0.075)',
      )

      nebula.addColorStop(
        0.75,
        'rgba(8, 16, 45, 0.04)',
      )

      nebula.addColorStop(
        1,
        'rgba(0,0,0,0)',
      )

      ctx.fillStyle = nebula

      ctx.fillRect(
        0,
        0,
        width,
        height,
      )

      const sideGlow = ctx.createRadialGradient(
        width * 0.18,
        height * 0.32,
        0,
        width * 0.18,
        height * 0.32,
        width * 0.48,
      )

      sideGlow.addColorStop(
        0,
        'rgba(30, 75, 180, 0.06)',
      )

      sideGlow.addColorStop(
        1,
        'rgba(0,0,0,0)',
      )

      ctx.fillStyle = sideGlow

      ctx.fillRect(
        0,
        0,
        width,
        height,
      )
    }

    /* -------------------------------------------------------
       STARS
       ------------------------------------------------------- */

    const drawStars = (
      time,
      collapse,
    ) => {
      stars.forEach((star) => {
        const twinkle =
          star.alpha +
          Math.sin(
            time *
              star.twinkle +
              star.phase,
          ) *
            0.16

        let x =
          star.x * width

        let y =
          star.y * height

        if (collapse > 0) {
          const pull =
            Math.pow(
              1 - collapse,
              1.7,
            )

          x =
            centerX +
            (x - centerX) *
              pull

          y =
            centerY +
            (y - centerY) *
              pull
        }

        const alpha =
          Math.max(
            0,
            twinkle *
              (1 - collapse * 0.8),
          )

        ctx.beginPath()

        ctx.arc(
          x,
          y,
          star.size *
            (0.55 + star.depth),
          0,
          Math.PI * 2,
        )

        ctx.fillStyle = star.blue
          ? `rgba(170,205,255,${alpha})`
          : `rgba(255,255,255,${alpha})`

        ctx.fill()
      })
    }

    /* -------------------------------------------------------
       GALAXY SPIRAL
       ------------------------------------------------------- */

    const drawGalaxy = (
      time,
      collapse,
    ) => {
      ctx.save()

      ctx.translate(
        centerX,
        centerY,
      )

      ctx.rotate(
        time * 0.000025,
      )

      const scale =
        1 -
        collapse * 0.92

      galaxyParticles.forEach(
        (particle) => {
          particle.angle +=
            particle.speed

          const angle =
            particle.angle

          const radius =
            particle.radius *
            scale

          const x =
            Math.cos(angle) *
            radius

          const y =
            Math.sin(angle) *
            radius *
            0.42

          const pulse =
            Math.sin(
              time * 0.0015 +
                particle.phase,
            ) *
              0.25 +
            0.75

          const alpha =
            particle.alpha *
            pulse *
            (1 - collapse)

          if (alpha <= 0) return

          ctx.beginPath()

          ctx.arc(
            x,
            y,
            particle.size,
            0,
            Math.PI * 2,
          )

          ctx.fillStyle = `rgba(105,145,255,${alpha})`

          ctx.fill()
        },
      )

      ctx.restore()
    }

    /* -------------------------------------------------------
       BLACK HOLE
       ------------------------------------------------------- */

    const drawBlackHole = (
      time,
      visible,
      collapse,
    ) => {
      if (!visible) return

      const maxRadius =
        Math.min(
          width,
          height,
        ) * 0.23

      const radius =
        maxRadius *
        Math.min(
          1,
          0.65 +
            collapse * 0.5,
        )

      ctx.save()

      ctx.translate(
        centerX,
        centerY,
      )

      /* Outer gravitational glow */

      const outerGlow =
        ctx.createRadialGradient(
          0,
          0,
          radius * 0.35,
          0,
          0,
          radius * 1.8,
        )

      outerGlow.addColorStop(
        0,
        'rgba(115,125,255,0.22)',
      )

      outerGlow.addColorStop(
        0.3,
        'rgba(75,100,255,0.12)',
      )

      outerGlow.addColorStop(
        0.58,
        'rgba(95,50,220,0.055)',
      )

      outerGlow.addColorStop(
        1,
        'rgba(0,0,0,0)',
      )

      ctx.fillStyle =
        outerGlow

      ctx.beginPath()

      ctx.arc(
        0,
        0,
        radius * 1.8,
        0,
        Math.PI * 2,
      )

      ctx.fill()

      /* Accretion disk */

      ctx.save()

      ctx.scale(
        1,
        0.27,
      )

      const disk =
        ctx.createRadialGradient(
          0,
          0,
          radius * 0.45,
          0,
          0,
          radius,
        )

      disk.addColorStop(
        0,
        'rgba(255,255,255,0.98)',
      )

      disk.addColorStop(
        0.12,
        'rgba(190,210,255,0.96)',
      )

      disk.addColorStop(
        0.28,
        'rgba(95,140,255,0.88)',
      )

      disk.addColorStop(
        0.48,
        'rgba(105,65,255,0.54)',
      )

      disk.addColorStop(
        0.68,
        'rgba(100,50,220,0.18)',
      )

      disk.addColorStop(
        1,
        'rgba(0,0,0,0)',
      )

      ctx.fillStyle = disk

      ctx.beginPath()

      ctx.arc(
        0,
        0,
        radius,
        0,
        Math.PI * 2,
      )

      ctx.fill()

      ctx.restore()

      /* Rotating bright ring */

      ctx.save()

      ctx.scale(
        1,
        0.28,
      )

      ctx.beginPath()

      ctx.arc(
        0,
        0,
        radius * 0.76,
        time * 0.001,
        time * 0.001 +
          Math.PI * 1.7,
      )

      ctx.strokeStyle =
        'rgba(210,225,255,0.88)'

      ctx.lineWidth = 2.2

      ctx.shadowBlur = 18
      ctx.shadowColor =
        'rgba(110,140,255,0.8)'

      ctx.stroke()

      ctx.restore()

      /* Event horizon */

      const horizon =
        ctx.createRadialGradient(
          0,
          0,
          radius * 0.18,
          0,
          0,
          radius * 0.48,
        )

      horizon.addColorStop(
        0,
        '#000000',
      )

      horizon.addColorStop(
        0.82,
        '#000000',
      )

      horizon.addColorStop(
        1,
        'rgba(0,0,0,0)',
      )

      ctx.fillStyle = horizon

      ctx.beginPath()

      ctx.arc(
        0,
        0,
        radius * 0.53,
        0,
        Math.PI * 2,
      )

      ctx.fill()

      /* Orbiting sparks */

      for (
        let i = 0;
        i < 90;
        i += 1
      ) {
        const angle =
          time * 0.001 +
          i * 0.18

        const orbit =
          radius *
          (0.7 +
            ((i * 17) % 100) /
              400)

        const x =
          Math.cos(angle) *
          orbit

        const y =
          Math.sin(angle) *
          orbit *
          0.28

        ctx.beginPath()

        ctx.arc(
          x,
          y,
          0.8 +
            (i % 3) * 0.35,
          0,
          Math.PI * 2,
        )

        ctx.fillStyle =
          `rgba(170,200,255,${0.35 + (i % 5) * 0.1})`

        ctx.fill()
      }

      ctx.restore()
    }

    /* -------------------------------------------------------
       DATA SUCK INTO BLACK HOLE
       ------------------------------------------------------- */

    const drawDataCollapse = (
      time,
      progress,
    ) => {
      if (progress <= 0) return

      dataParticles.forEach(
        (particle) => {
          particle.angle +=
            particle.speed

          const pull =
            Math.pow(
              1 - progress,
              2.25,
            )

          const radius =
            particle.originalRadius *
            pull

          const angle =
            particle.angle +
            progress *
              Math.PI *
              5

          const x =
            centerX +
            Math.cos(angle) *
              radius

          const y =
            centerY +
            Math.sin(angle) *
              radius *
              0.72

          const alpha =
            particle.alpha *
            (1 -
              progress * 0.12)

          if (alpha <= 0) return

          /* particle */

          ctx.beginPath()

          ctx.arc(
            x,
            y,
            particle.size,
            0,
            Math.PI * 2,
          )

          ctx.fillStyle =
            `rgba(130,175,255,${alpha})`

          ctx.fill()

          /* motion trail */

          if (
            particle.size >
            1.5
          ) {
            const previousRadius =
              radius + 18

            const previousX =
              centerX +
              Math.cos(angle) *
                previousRadius

            const previousY =
              centerY +
              Math.sin(angle) *
                previousRadius *
                0.72

            ctx.beginPath()

            ctx.moveTo(
              previousX,
              previousY,
            )

            ctx.lineTo(
              x,
              y,
            )

            ctx.strokeStyle =
              `rgba(120,160,255,${alpha * 0.35})`

            ctx.lineWidth = 0.7

            ctx.stroke()
          }
        },
      )
    }

    /* -------------------------------------------------------
       BIG BANG
       ------------------------------------------------------- */

    const drawBigBang = (
      time,
      progress,
    ) => {
      if (progress <= 0) return

      /* expanding shockwave */

      const maxDistance =
        Math.max(
          width,
          height,
        ) * 0.95

      const distance =
        progress *
        maxDistance

      /* white core */

      const coreSize =
        Math.max(
          0,
          Math.min(
            width,
            height,
          ) *
            0.15 *
            (1 -
              Math.min(
                1,
                progress * 1.5,
              )),
        )

      if (coreSize > 0) {
        const core =
          ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            coreSize,
          )

        core.addColorStop(
          0,
          'rgba(255,255,255,1)',
        )

        core.addColorStop(
          0.25,
          'rgba(235,245,255,0.98)',
        )

        core.addColorStop(
          0.52,
          'rgba(145,180,255,0.72)',
        )

        core.addColorStop(
          1,
          'rgba(60,90,255,0)',
        )

        ctx.fillStyle = core

        ctx.beginPath()

        ctx.arc(
          centerX,
          centerY,
          coreSize,
          0,
          Math.PI * 2,
        )

        ctx.fill()
      }

      /* shockwave ring */

      if (distance > 2) {
        const ringAlpha =
          Math.max(
            0,
            0.95 -
              progress *
                0.72,
          )

        ctx.beginPath()

        ctx.arc(
          centerX,
          centerY,
          distance,
          0,
          Math.PI * 2,
        )

        ctx.strokeStyle =
          `rgba(190,220,255,${ringAlpha})`

        ctx.lineWidth =
          Math.max(
            1,
            8 *
              (1 -
                progress),
          )

        ctx.shadowBlur = 30
        ctx.shadowColor =
          'rgba(100,145,255,0.8)'

        ctx.stroke()

        ctx.shadowBlur = 0
      }

      /* second shockwave */

      if (distance > 100) {
        ctx.beginPath()

        ctx.arc(
          centerX,
          centerY,
          distance * 0.84,
          0,
          Math.PI * 2,
        )

        ctx.strokeStyle =
          `rgba(100,130,255,${Math.max(
            0,
            0.4 -
              progress * 0.35,
          )})`

        ctx.lineWidth = 2

        ctx.stroke()
      }

      /* explosion particles */

      explosionParticles.forEach(
        (particle) => {
          const localProgress =
            Math.max(
              0,
              progress -
                particle.delay,
            )

          if (
            localProgress <= 0
          ) {
            return
          }

          const particleDistance =
            particle.distance +
            particle.speed *
              localProgress *
              95

          const x =
            centerX +
            Math.cos(
              particle.angle,
            ) *
              particleDistance

          const y =
            centerY +
            Math.sin(
              particle.angle,
            ) *
              particleDistance

          const alpha =
            particle.alpha *
            Math.max(
              0,
              1 -
                progress *
                  0.72,
            )

          if (alpha <= 0) return

          const previousDistance =
            Math.max(
              0,
              particleDistance -
                18,
            )

          const previousX =
            centerX +
            Math.cos(
              particle.angle,
            ) *
              previousDistance

          const previousY =
            centerY +
            Math.sin(
              particle.angle,
            ) *
              previousDistance

          ctx.beginPath()

          ctx.moveTo(
            previousX,
            previousY,
          )

          ctx.lineTo(
            x,
            y,
          )

          ctx.strokeStyle =
            particle.warmth >
            0.5
              ? `rgba(190,210,255,${alpha * 0.65})`
              : `rgba(105,160,255,${alpha * 0.7})`

          ctx.lineWidth =
            particle.size

          ctx.stroke()
        },
      )

      /* expanding light */

      const lightStrength =
        Math.max(
          0,
          1 -
            Math.abs(
              progress -
                0.28,
            ) /
              0.28,
        )

      if (
        lightStrength > 0
      ) {
        const flash =
          ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            Math.max(
              width,
              height,
            ) * 0.95,
          )

        flash.addColorStop(
          0,
          `rgba(255,255,255,${lightStrength * 0.9})`,
        )

        flash.addColorStop(
          0.12,
          `rgba(210,230,255,${lightStrength * 0.7})`,
        )

        flash.addColorStop(
          0.32,
          `rgba(100,145,255,${lightStrength * 0.18})`,
        )

        flash.addColorStop(
          1,
          'rgba(0,0,0,0)',
        )

        ctx.fillStyle = flash

        ctx.fillRect(
          0,
          0,
          width,
          height,
        )
      }
    }

    /* -------------------------------------------------------
       FINAL DARK TRANSITION
       ------------------------------------------------------- */

    const drawFinalTransition = (
      progress,
    ) => {
      if (
        progress <
        0.84
      ) {
        return
      }

      const fade =
        (progress - 0.84) /
        0.16

      ctx.fillStyle =
        `rgba(1,2,8,${Math.min(
          0.92,
          fade * 0.92,
        )})`

      ctx.fillRect(
        0,
        0,
        width,
        height,
      )
    }

    /* -------------------------------------------------------
       MAIN RENDER
       ------------------------------------------------------- */

    const render = (time) => {
      const elapsed =
        time - startTime

      /*
       * Total cinematic = 6900ms
       *
       * 0.00 - 0.16
       * Galaxy reveal
       *
       * 0.16 - 0.58
       * Black hole + data collapse
       *
       * 0.58 - 1.00
       * BIG BANG + shockwave
       */

      const duration = 6900

      const progress =
        Math.min(
          1,
          elapsed /
            duration,
        )

      ctx.clearRect(
        0,
        0,
        width,
        height,
      )

      drawBackground()

      /* Galaxy stage */

      if (
        progress <
        0.68
      ) {
        const galaxyCollapse =
          Math.max(
            0,
            (progress -
              0.16) /
              0.48,
          )

        drawGalaxy(
          time,
          Math.min(
            1,
            galaxyCollapse,
          ),
        )

        drawStars(
          time,
          Math.min(
            1,
            galaxyCollapse *
              0.95,
          ),
        )
      }

      /* Black hole */

      if (
        progress <
        0.7
      ) {
        const blackHoleProgress =
          Math.min(
            1,
            Math.max(
              0,
              (progress -
                0.1) /
                0.58,
            ),
          )

        drawBlackHole(
          time,
          true,
          blackHoleProgress,
        )
      }

      /* Career data collapse */

      if (
        progress >=
          0.13 &&
        progress <
          0.64
      ) {
        const dataProgress =
          Math.min(
            1,
            Math.max(
              0,
              (progress -
                0.13) /
                0.51,
            ),
          )

        drawDataCollapse(
          time,
          dataProgress,
        )
      }

      /* Big Bang */

      if (
        progress >=
        0.56
      ) {
        const bangProgress =
          Math.min(
            1,
            Math.max(
              0,
              (progress -
                0.56) /
                0.44,
            ),
          )

        drawBigBang(
          time,
          bangProgress,
        )
      }

      drawFinalTransition(
        progress,
      )

      if (
        progress <
        1
      ) {
        animationFrame =
          requestAnimationFrame(
            render,
          )
      }
    }

    resize()

    createStars()
    createGalaxyParticles()
    createDataParticles()
    createExplosionParticles()
    createShockParticles()

    window.addEventListener(
      'resize',
      resize,
    )

    animationFrame =
      requestAnimationFrame(
        render,
      )

    return () => {
      window.removeEventListener(
        'resize',
        resize,
      )

      cancelAnimationFrame(
        animationFrame,
      )
    }
  }, [])

  return (
    <div className="signup-galaxy-cinematic">
      <canvas
        ref={canvasRef}
        className="signup-galaxy-canvas"
      />

      <div className="signup-cinematic-vignette" />

      <div className="signup-cinematic-label">
        CAREER INTELLIGENCE INITIALIZING
      </div>

      <div className="signup-cinematic-core-text">
        <span>PROFILE</span>
        <span>EDUCATION</span>
        <span>SKILLS</span>
        <span>PROJECTS</span>
        <span>ENTC</span>
        <span>CAREER</span>
        <span>AI</span>
        <span>INTELLIGENCE</span>
      </div>
    </div>
  )
}

export default function Signup() {const [step, setStep] =
    useState(1)

  const [profileStep, setProfileStep] =useState(0)

  const [completed, setCompleted] =useState(false)

  const [userId, setUserId] = useState(null)  

  

  const [resumeFile, setResumeFile] =
    useState(null)

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',

      college: '',
      university: '',
      city: '',
      year: '',
      branch: '',

      interests: '',
      targetRole: '',
      skills: '',
      projects: '',
      experience: '',
      expectations: '',
      about: '',
    })

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      }),
    )
  }
const handleAccountNext = async (event) => {
  event.preventDefault()

  if (
    formData.password !==
    formData.confirmPassword
  ) {
    alert(
      'Password and confirm password do not match.',
    )

    return
  }

  try {
    const response = await fetch(
      'http://127.0.0.1:8000/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      },
    )

    const data = await response.json()

    if (!response.ok) {
      alert(
        data.detail ||
        'Account creation failed.',
      )
      return
    }

    console.log(
  'Signup successful:',
  data,
)

setUserId(data.user.id)

setStep(2)

  } catch (error) {
    console.error(
      'Signup error:',
      error,
    )

    alert(
      'Unable to connect to CareerAI backend. Please make sure the backend is running.',
    )
  }
}
  const profileCompletion = () => {
    const fields = [
      formData.college,
      formData.university,
      formData.city,
      formData.year,
      formData.branch,
      formData.interests,
      formData.targetRole,
      formData.skills,
      formData.projects,
      formData.experience,
      formData.expectations,
      formData.about,
      resumeFile,
    ]

    const completedFields =
      fields.filter(Boolean).length

    return Math.round(
      (completedFields /
        fields.length) *
        100,
    )
  }

  const goNextProfileStep = () => {
    if (
      profileStep === 0
    ) {
      if (
        !formData.college ||
        !formData.university ||
        !formData.city ||
        !formData.year ||
        !formData.branch
      ) {
        alert(
          'Please complete your education details.',
        )

        return
      }
    }

    if (
      profileStep === 1
    ) {
      if (
        !formData.interests
      ) {
        alert(
          'Please add your engineering interests.',
        )

        return
      }
    }

    if (
      profileStep === 2
    ) {
      if (
        !formData.skills ||
        !formData.projects
      ) {
        alert(
          'Please add your skills and projects.',
        )

        return
      }
    }

    if (
      profileStep === 3
    ) {
      if (
        !formData.targetRole ||
        !formData.expectations
      ) {
        alert(
          'Please complete your career direction.',
        )

        return
      }
    }

    if (
      profileStep <
      profileSteps.length - 1
    ) {
      setProfileStep(
        (previous) =>
          previous + 1,
      )
    }
  }

  const goBackProfileStep = () => {
    if (
      profileStep === 0
    ) {
      setStep(1)
      return
    }

    setProfileStep(
      (previous) =>
        previous - 1,
    )
  }

  const handleResumeChange = (
    event,
  ) => {
    const file =
      event.target.files?.[0]

    if (!file) return

    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (
      !validTypes.includes(
        file.type,
      )
    ) {
      alert(
        'Please upload a PDF or DOCX file.',
      )

      return
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      alert(
        'Resume size should be below 5 MB.',
      )

      return
    }

    setResumeFile(file)
  }
const handleProfileSubmit = async (event) => {
  event.preventDefault()

  if (!userId) {
    alert('User account not found. Please create your account again.')
    return
  }

  try {
    const response = await fetch(
      'http://127.0.0.1:8000/profile',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,

          college: formData.college,
          university: formData.university,
          city: formData.city,
          engineering_year: formData.year,
          engineering_branch: formData.branch,

          engineering_interests: formData.interests,
          what_excites_you: formData.about,

          technical_skills: formData.skills,
          projects: formData.projects,
          experience: formData.experience,

          target_role: formData.targetRole,
          career_expectations: formData.expectations,
        }),
      },
    )

    const data = await response.json()

    if (!response.ok) {
      alert(
        data.detail ||
        'Career profile could not be saved.',
      )

      return
    }

    console.log(
      'Profile saved successfully:',
      data,
    )

    setCompleted(true)
  } catch (error) {
    console.error(
      'Profile save error:',
      error,
    )

    alert(
      'Unable to connect to CareerAI backend. Please make sure the backend is running.',
    )
  }
}
  const enterCareerAI = () => {
    window.location.href = '/'
  }

  if (completed) {
    return (
      <div className="signup-success-page">
        <div className="signup-success-space">
          <Career3D />
        </div>

        <div className="signup-success-overlay" />

        <div className="signup-success-content">
          <div className="signup-success-mark">
            <span>✓</span>
          </div>

          <div className="signup-success-status">
            <i />
            PROFILE INITIALIZED
          </div>

          <h1>
            Your career profile
            <br />
            is ready.
          </h1>

          <p className="signup-success-description">
            CareerAI now has the
            context it needs to
            understand your
            education, interests,
            technical profile and
            career direction.
          </p>

          <div className="signup-success-stats">
            <div>
              <strong>
                {profileCompletion()}%
              </strong>

              <span>
                PROFILE CONTEXT
              </span>
            </div>

            <div>
              <strong>
                {resumeFile
                  ? 'READY'
                  : '—'}
              </strong>

              <span>
                RESUME
              </span>
            </div>

            <div>
              <strong>
                AI
              </strong>

              <span>
                CAREER INTELLIGENCE
              </span>
            </div>
          </div>

          <button
            type="button"
            className="signup-success-button"
            onClick={
              enterCareerAI
            }
          >
            <span>
              Enter CareerAI
            </span>

            <span>
              →
            </span>
          </button>
        </div>
      </div>
    )
  }

  return (
  <div className="signup-page">
    <div className="signup-page-overlay" />

      <header className="signup-topbar">
        <button
          type="button"
          className="signup-brand"
          onClick={() => {
            window.location.href =
              '/'
          }}
        >
          <span className="signup-brand-mark">
            
          </span>

          <span>
            CareerAI
          </span>
        </button>

        <div className="signup-topbar-right">
          <span>
            Already have an account?
          </span>

          <button
            type="button"
            onClick={() => {
              window.location.href =
                '/login'
            }}
          >
            Log in
          </button>
        </div>
      </header>

      <main className="signup-main">
        <div className="signup-card-shell">
          <div className="signup-card">
            {step === 1 ? (
              <>
                <div className="signup-card-header">
                  <span className="signup-eyebrow">
                    CAREER INTELLIGENCE
                  </span>

                  <h1>
                    Create your
                    <br />
                    CareerAI account.
                  </h1>

                  <p>
                    Start building a
                    career profile
                    designed around
                    your engineering
                    journey.
                  </p>
                </div>

                <form
                  className="signup-form"
                  onSubmit={
                    handleAccountNext
                  }
                >
                  <div className="signup-field">
                    <label>
                      Full name
                    </label>

                    <input
                      name="name"
                      value={
                        formData.name
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Your name"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="signup-field">
                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="signup-two-column">
                    <div className="signup-field">
                      <label>
                        Password
                      </label>

                      <input
                        type="password"
                        name="password"
                        value={
                          formData.password
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="••••••••"
                        autoComplete="new-password"
                        required
                      />
                    </div>

                    <div className="signup-field">
                      <label>
                        Confirm password
                      </label>

                      <input
                        type="password"
                        name="confirmPassword"
                        value={
                          formData.confirmPassword
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="••••••••"
                        autoComplete="new-password"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="signup-primary-button"
                  >
                    <span>
                      Continue
                    </span>

                    <span>
                      →
                    </span>
                  </button>
                </form>

                <div className="signup-small-note">
                  By continuing, you
                  agree to the
                  CareerAI terms and
                  privacy policy.
                </div>
              </>
            ) : (
              <>
                <div className="signup-progress">
                  <div className="signup-progress-top">
                    <span>
                      BUILD YOUR PROFILE
                    </span>

                    <span>
                      {String(
                        profileStep +
                          1,
                      ).padStart(
                        2,
                        '0',
                      )}{' '}
                      / 05
                    </span>
                  </div>

                  <div className="signup-progress-track">
                    <div
                      className="signup-progress-fill"
                      style={{
                        width: `${
                          ((profileStep +
                            1) /
                            5) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="signup-profile-step">
                  <div className="signup-profile-step-meta">
                    <span>
                      {
                        profileSteps[
                          profileStep
                        ].number
                      }
                    </span>

                    <span>
                      {
                        profileSteps[
                          profileStep
                        ].title
                      }
                    </span>
                  </div>

                  <h1>
                    {
                      profileSteps[
                        profileStep
                      ].title
                    }
                    <br />
                    <span>
                      profile.
                    </span>
                  </h1>

                  <p>
                    {
                      profileSteps[
                        profileStep
                      ].description
                    }
                  </p>

                  {profileStep ===
                    0 && (
                    <div className="signup-profile-fields">
                      <div className="signup-two-column">
                        <div className="signup-field">
                          <label>
                            College
                          </label>

                          <input
                            name="college"
                            value={
                              formData.college
                            }
                            onChange={
                              handleChange
                            }
                            placeholder="College / Institute"
                          />
                        </div>

                        <div className="signup-field">
                          <label>
                            University
                          </label>

                          <input
                            name="university"
                            value={
                              formData.university
                            }
                            onChange={
                              handleChange
                            }
                            placeholder="University"
                          />
                        </div>
                      </div>

                      <div className="signup-two-column">
                        <div className="signup-field">
                          <label>
                            City
                          </label>

                          <input
                            name="city"
                            value={
                              formData.city
                            }
                            onChange={
                              handleChange
                            }
                            placeholder="City"
                          />
                        </div>

                        <div className="signup-field">
                          <label>
                            Engineering year
                          </label>

                          <select
                            name="year"
                            value={
                              formData.year
                            }
                            onChange={
                              handleChange
                            }
                          >
                            <option value="">
                              Select year
                            </option>

                            <option value="1st Year">
                              1st Year
                            </option>

                            <option value="2nd Year">
                              2nd Year
                            </option>

                            <option value="3rd Year">
                              3rd Year
                            </option>

                            <option value="4th Year">
                              4th Year
                            </option>

                            <option value="Graduate">
                              Graduate
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="signup-field">
                        <label>
                          Engineering branch
                        </label>

                        <input
                          name="branch"
                          value={
                            formData.branch
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="e.g. ENTC, CSE, Mechanical"
                        />
                      </div>
                    </div>
                  )}

                  {profileStep ===
                    1 && (
                    <div className="signup-profile-fields">
                      <div className="signup-field">
                        <label>
                          Engineering interests
                        </label>

                        <textarea
                          name="interests"
                          value={
                            formData.interests
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="e.g. Embedded Systems, Edge AI, Robotics, IoT..."
                          rows="5"
                        />
                      </div>

                      <div className="signup-field">
                        <label>
                          What excites you most?
                        </label>

                        <input
                          name="about"
                          value={
                            formData.about
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="Tell CareerAI what kind of engineering work you enjoy."
                        />
                      </div>
                    </div>
                  )}

                  {profileStep ===
                    2 && (
                    <div className="signup-profile-fields">
                      <div className="signup-field">
                        <label>
                          Technical skills
                        </label>

                        <textarea
                          name="skills"
                          value={
                            formData.skills
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="e.g. C, C++, Python, ESP32, STM32, Linux..."
                          rows="4"
                        />
                      </div>

                      <div className="signup-field">
                        <label>
                          Projects
                        </label>

                        <textarea
                          name="projects"
                          value={
                            formData.projects
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="Describe your important projects."
                          rows="4"
                        />
                      </div>

                      <div className="signup-field">
                        <label>
                          Experience
                        </label>

                        <input
                          name="experience"
                          value={
                            formData.experience
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="Internship, freelance, competition, etc."
                        />
                      </div>
                    </div>
                  )}

                  {profileStep ===
                    3 && (
                    <div className="signup-profile-fields">
                      <div className="signup-field">
                        <label>
                          Target role
                        </label>

                        <input
                          name="targetRole"
                          value={
                            formData.targetRole
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="e.g. Embedded AI Engineer"
                        />
                      </div>

                      <div className="signup-field">
                        <label>
                          What do you expect from CareerAI?
                        </label>

                        <textarea
                          name="expectations"
                          value={
                            formData.expectations
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="e.g. Find jobs, identify skill gaps, create roadmap..."
                          rows="5"
                        />
                      </div>
                    </div>
                  )}

                  {profileStep ===
                    4 && (
                    <div className="signup-resume-card">
                      <div className="signup-resume-icon">
                        ↑
                      </div>

                      <h2>
                        Add your resume.
                      </h2>

                      <p>
                        CareerAI can use
                        it to understand
                        your existing
                        experience and
                        identify skill
                        gaps.
                      </p>

                      <label className="signup-upload-box">
                        <input
                          type="file"
                          accept=".pdf,.docx"
                          onChange={
                            handleResumeChange
                          }
                        />

                        <span>
                          {resumeFile
                            ? resumeFile.name
                            : 'Upload PDF or DOCX'}
                        </span>

                        <small>
                          Maximum 5 MB
                        </small>
                      </label>

                      <button
                        type="button"
                        className="signup-skip-button"
                        onClick={
                          handleProfileSubmit
                        }
                      >
                        Skip for now →
                      </button>
                    </div>
                  )}

                  <div className="signup-profile-actions">
                    <button
                      type="button"
                      className="signup-back-button"
                      onClick={
                        goBackProfileStep
                      }
                    >
                      ← Back
                    </button>

                    {profileStep <
                    4 ? (
                      <button
                        type="button"
                        className="signup-primary-button"
                        onClick={
                          goNextProfileStep
                        }
                      >
                        <span>
                          Continue
                        </span>

                        <span>
                          →
                        </span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="signup-primary-button"
                        onClick={
                          handleProfileSubmit
                        }
                      >
                        <span>
                          Complete My Profile
                        </span>

                        <span>
                          →
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="signup-profile-footer">
                  CareerAI uses this
                  context to personalize
                  your career
                  intelligence.
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}