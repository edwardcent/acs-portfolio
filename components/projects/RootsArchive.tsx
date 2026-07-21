'use client';

// Images → public/images/roots/
// hero-01.png       beavers-09 (Figma: beavers-09 1)
// hero-02.png       mocks pre-21 (Figma: mocks_pre-21 1)
// hero-03.png       bird storefront (Figma: roots_bird_storefront-14 1)
// brief.png         beaver illustration drawing (Figma: Layer 0)
// ref-01.jpg        reference photo 1 (Figma: IMG_3547 1)
// ref-02.jpg        reference photo 2 (Figma: IMG_3542 2 1)
// ref-03.jpg        reference photo 3 (Figma: IMG_3537 1)
// ref-04.jpg        reference photo 4 (Figma: IMG_3543 1)
// ref-05.jpg        reference photo 5 (Figma: IMG_3549 1)
// ref-06.jpg        reference photo 6 (Figma: IMG_3551 1)
// dir-01.png        direction reference screenshot (Figma: Screenshot 2026-07-21...)
// dir-02.jpg        direction reference photo (Figma: IMG_3716 1)
// dial-01.jpg       logo option A (Figma: logos-08 1)
// dial-02.jpg       logo option B (Figma: logos-12 1)
// dial-03.jpg       logo option C (Figma: logos-10 1)
// dial-04.jpg       logo option D (Figma: logos-11 1)
// logo-02.jpg       logos-13 (secondary logo option)
// ig-01.jpg         instagram mockup 1 (Figma: logos-08 v2)
// ig-02.jpg         instagram mockup 2 (Figma: logos-12 v2)
// ig-03.jpg         instagram mockup 3 (Figma: logos-10 v2)
// ig-04.jpg         instagram mockup 4 (Figma: logos-11 v2)
// ig-05.jpg         instagram tall mockup 1 (Figma: logos-10 v3)
// ig-06.jpg         instagram tall mockup 2 (Figma: logos-10 v4)
// sign-01.jpg       signage mockup 1 (Figma: logos-08 v3)
// sign-02.jpg       signage mockup 2 (Figma: logos-12 v3)
// sign-03.jpg       signage mockup 3 (Figma: logos-10 signage)
// sign-04.jpg       signage mockup 4 (Figma: logos-11 v3)
// sign-05.jpg       signage mockup 5 (Figma: logos-11 v4)
// NOTE: hero-01.png is reused in "Final Logo" and "Final Deliverables"
//       hero-02.png and hero-03.png are reused in "Final Deliverables"

const B = '/images/roots';

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontWeight: 700, fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: 1.05,
      textTransform: 'uppercase', letterSpacing: '-0.01em',
      color: '#0a0a0a', margin: '0 0 14px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>{children}</h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#0a0a0a', margin: '0 0 12px' }}>{children}</p>;
}

function Img({ src, aspect = '1/1', fit = 'cover' }: {
  src: string; aspect?: string; fit?: 'cover' | 'contain';
}) {
  const label = src.split('/').pop() ?? src;
  return (
    <div style={{
      width: '100%', aspectRatio: aspect,
      background: '#e0ddd8', borderRadius: '12px', overflow: 'hidden',
      position: 'relative', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{
        fontSize: '11px', color: '#888', fontFamily: 'monospace',
        position: 'absolute', zIndex: 1, textAlign: 'center', padding: '4px',
        pointerEvents: 'none',
      }}>{label}</span>
      <img src={src} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: fit, display: 'block', zIndex: 2,
      }} />
    </div>
  );
}

function FullImg({ src }: { src: string }) {
  const label = src.split('/').pop() ?? src;
  return (
    <div style={{
      width: '100%', background: '#e0ddd8', borderRadius: '12px',
      minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <span style={{ fontSize: '11px', color: '#888', fontFamily: 'monospace' }}>{label}</span>
      <img src={src} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: 'auto',
        display: 'block', borderRadius: '12px',
      }} />
    </div>
  );
}

const MB = '64px';
const GAP = '40px';
const IGAP = '8px';

export default function RootsArchive() {
  return (
    <div className="tl-wrap" style={{
      maxWidth: '1100px', margin: '0 auto',
      padding: '0 40px 120px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: IGAP, marginBottom: MB }}>
        <Img src={`${B}/hero-01.png`} />
        <Img src={`${B}/hero-02.png`} />
        <Img src={`${B}/hero-03.png`} />
      </div>

      {/* ── BRIEF / INSPO ────────────────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'center', marginBottom: MB }}>
        <div>
          <H>Brief / Inspo</H>
          <P>Every time I read GAP across someone's chest walking around Toronto, I wish it said ROOTS instead.</P>
          <P>What if Roots hosted an annual "archive sale" in Canada's major cities, selling mainline product, not outlet runoff, like jjjjound's recent Entrepôt, Stussy's archive sales, or Aritzia's warehouse sale? Both jjjjound and Aritzia move serious volume doing this. Event-based shopping is a recent phenomenon, and consumers enjoy it more than a trip to an outlet mall. This project explores what the branding for such an event could look like.</P>
        </div>
        <Img src={`${B}/brief.png`} aspect="1/1" fit="contain" />
      </div>

      {/* ── PULLING REFERENCES ───────────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'start', marginBottom: MB }}>
        <div>
          <H>Pulling References</H>
          <P>The idea for this sale is a celebration of Roots, so I decided to look back through their archive of designs; logos, photographs, and graphics.</P>
          <P>I wanted a reference point that feels distinctly Roots, but needed it to be something that brings out an older Roots energy. Photos of celebrities wearing the brand in the 80s and 90s are a way to instantly bring up a nostalgic feeling, but clearing those images would likely be an issue. As a fan of the brand, this part was a lot of fun.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
          <Img src={`${B}/ref-01.jpg`} />
          <Img src={`${B}/ref-02.jpg`} />
          <Img src={`${B}/ref-03.jpg`} />
          <Img src={`${B}/ref-04.jpg`} />
          <Img src={`${B}/ref-05.jpg`} />
          <Img src={`${B}/ref-06.jpg`} />
        </div>
      </div>

      {/* ── FINDING DIRECTION ────────────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'center', marginBottom: MB }}>
        <div>
          <H>Finding Direction</H>
          <P>After finding a nice base of references in Roots reference books and some deep diving on their website and social media, I felt I had a solid starting ground — I needed something distinctively Roots, that isn't just their standard logo.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
          <Img src={`${B}/dir-01.png`} />
          <Img src={`${B}/dir-02.jpg`} />
        </div>
      </div>

      {/* ── DIALLING IT IN ───────────────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'start', marginBottom: MB }}>
        <div>
          <H>Dialling It In</H>
          <P>At this point I'm putting together options, while trying to decide if each city should have its own branding and playing with the idea of making a system for branding Roots' reference images.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
          <Img src={`${B}/dial-01.jpg`} />
          <Img src={`${B}/dial-02.jpg`} />
          <Img src={`${B}/dial-03.jpg`} />
          <Img src={`${B}/dial-04.jpg`} />
        </div>
      </div>

      {/* ── FINAL LOGO AND SYSTEM ────────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'center', marginBottom: MB }}>
        <div>
          <H>Final Logo and System</H>
          <P>I decided the circular Roots logo would be the best in terms of getting the information across, being bi-lingual, and being recognizably Roots, while still feeling fresh in aesthetic. The system I created for plugging in photos to be branded for the event would allow other options to be tested easily, and gives the option of having city-specific branding.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
          <Img src={`${B}/hero-01.png`} />
          <Img src={`${B}/logo-02.jpg`} />
        </div>
      </div>

      {/* ── MOCKUP IMAGES (INSTAGRAM) ────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'start', marginBottom: MB }}>
        <div>
          <H>Mockup Images (Instagram)</H>
          <P>I mentioned the issue of clearing photos, but I still played around with a handful before landing on the image with shoe boxes that feature loud Roots branding, and the beaver illustration in our Archive Sale logo. An issue I had with sourced photos was the overall layouts; but the look and feel still proved effective.</P>
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP, marginBottom: IGAP }}>
            <Img src={`${B}/ig-01.jpg`} />
            <Img src={`${B}/ig-02.jpg`} />
            <Img src={`${B}/ig-03.jpg`} />
            <Img src={`${B}/ig-04.jpg`} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
            <Img src={`${B}/ig-05.jpg`} aspect="9/16" />
            <Img src={`${B}/ig-06.jpg`} aspect="9/16" />
          </div>
        </div>
      </div>

      {/* ── MOCKUP IMAGES (SIGNAGE) ──────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'start', marginBottom: MB }}>
        <div>
          <H>Mockup Images (Signage)</H>
          <P>After seeing how these logos look large scale I had a better understanding of how they get information across.</P>
          <P>After deciding on the singular logo, and the system for promotional content, I thought of a sticker pack of the alternate logos that could be given as a gift with purchase.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
          <Img src={`${B}/sign-01.jpg`} />
          <Img src={`${B}/sign-02.jpg`} />
          <Img src={`${B}/sign-03.jpg`} />
          <Img src={`${B}/sign-04.jpg`} />
          <Img src={`${B}/hero-03.png`} />
          <Img src={`${B}/sign-05.jpg`} />
        </div>
      </div>

      {/* ── FINAL DELIVERABLES ───────────────────────────────────────── */}
      <div>
        <H>Final Deliverables</H>
        <div style={{ display: 'flex', flexDirection: 'column', gap: IGAP }}>
          <FullImg src={`${B}/hero-01.png`} />
          <FullImg src={`${B}/hero-02.png`} />
          <FullImg src={`${B}/hero-03.png`} />
        </div>
      </div>

    </div>
  );
}
