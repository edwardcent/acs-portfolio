'use client';

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

type ImgProps = {
  src: string;
  aspect?: string;
  fit?: 'cover' | 'contain';
  crop?: React.CSSProperties;
  position?: string;
};

function Img({ src, aspect = '1/1', fit = 'cover', crop, position = 'center' }: ImgProps) {
  const imgStyle: React.CSSProperties = crop
    ? { position: 'absolute', display: 'block', maxWidth: 'none', ...crop }
    : { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: fit, objectPosition: position, display: 'block' };

  return (
    <div style={{
      width: '100%', aspectRatio: aspect,
      background: '#fff', borderRadius: '12px', overflow: 'hidden',
      position: 'relative', flexShrink: 0,
    }}>
      <img src={src} alt="" style={imgStyle} />
    </div>
  );
}

function FullImg({ src }: { src: string }) {
  return (
    <img src={src} alt="" style={{
      width: '100%', height: 'auto', display: 'block',
      borderRadius: '12px', background: '#fff',
    }} />
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
        <Img src={`${B}/hero-01.png`} fit="contain" />
        <FullImg src={`${B}/hero-02.png`} />
        <Img src={`${B}/hero-03.png`} crop={{ height: '120.95%', left: '-10.32%', top: '-10.47%', width: '120.69%' }} />
      </div>

      {/* ── BRIEF / INSPO ────────────────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'center', marginBottom: MB }}>
        <div>
          <H>Brief / Inspo</H>
          <P>Every time I read GAP across someone's chest walking around Toronto, I wish it said ROOTS instead.</P>
          <P>What if Roots hosted an annual "archive sale" in Canada's major cities, selling mainline product, not outlet runoff, like jjjjound's recent Entrepôt, Stussy's archive sales, or Aritzia's warehouse sale? Both jjjjound and Aritzia move serious volume doing this. Event-based shopping is a recent phenomenon, and consumers enjoy it more than a trip to an outlet mall. This project explores what the branding for such an event could look like.</P>
        </div>
        <Img src={`${B}/brief.png`} fit="contain" />
      </div>

      {/* ── PULLING REFERENCES ───────────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'start', marginBottom: MB }}>
        <div>
          <H>Pulling References</H>
          <P>The idea for this sale is a celebration of Roots, so I decided to look back through their archive of designs; logos, photographs, and graphics.</P>
          <P>I wanted a reference point that feels distinctly Roots, but needed it to be something that brings out an older Roots energy. Photos of celebrities wearing the brand in the 80s and 90s are a way to instantly bring up a nostalgic feeling, but clearing those images would likely be an issue. As a fan of the brand, this part was a lot of fun.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
          {/* ref-01–02: Figma had left/width crops on the (now pre-rotated) portraits */}
          <Img src={`${B}/ref-01.jpeg`} fit="cover" position="center 20%" />
          <Img src={`${B}/ref-02.jpeg`} fit="cover" position="center 20%" />
          <Img src={`${B}/ref-03.jpeg`} crop={{ height: '141.73%', left: '-2.92%', top: '0.02%', width: '106.06%' }} />
          <Img src={`${B}/ref-04.jpeg`} fit="cover" />
          <Img src={`${B}/ref-05.jpeg`} fit="cover" position="center 20%" />
          <Img src={`${B}/ref-06.jpeg`} fit="cover" />
        </div>
      </div>

      {/* ── FINDING DIRECTION ────────────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'center', marginBottom: MB }}>
        <div>
          <H>Finding Direction</H>
          <P>After finding a nice base of references in Roots reference books and some deep diving on their website and social media, I felt I had a solid starting ground — I needed something distinctively Roots, that isn't just their standard logo.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
          <Img src={`${B}/dir-01.png`} fit="cover" />
          <Img src={`${B}/dir-02.jpeg`} crop={{ height: '144.52%', left: '0', top: '-22.26%', width: '100%' }} />
        </div>
      </div>

      {/* ── DIALLING IT IN ───────────────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'start', marginBottom: MB }}>
        <div>
          <H>Dialling It In</H>
          <P>At this point I'm putting together options, while trying to decide if each city should have its own branding and playing with the idea of making a system for branding Roots' reference images.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
          <Img src={`${B}/dial-01.png`} fit="contain" />
          <Img src={`${B}/dial-02.png`} fit="contain" />
          <Img src={`${B}/dial-03.png`} fit="contain" />
          <Img src={`${B}/dial-04.png`} fit="contain" />
        </div>
      </div>

      {/* ── FINAL LOGO AND SYSTEM ────────────────────────────────────── */}
      <div className="tl-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: GAP, alignItems: 'center', marginBottom: MB }}>
        <div>
          <H>Final Logo and System</H>
          <P>I decided the circular Roots logo would be the best in terms of getting the information across, being bi-lingual, and being recognizably Roots, while still feeling fresh in aesthetic. The system I created for plugging in photos to be branded for the event would allow other options to be tested easily, and gives the option of having city-specific branding.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
          <Img src={`${B}/hero-01.png`} fit="contain" />
          <Img src={`${B}/logo-02.png`} fit="contain" />
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
            <Img src={`${B}/ig-01.png`} fit="contain" />
            <Img src={`${B}/ig-02.png`} fit="contain" />
            <Img src={`${B}/ig-03.png`} fit="contain" />
            <Img src={`${B}/ig-04.png`} fit="contain" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IGAP }}>
            <Img src={`${B}/ig-05.png`} aspect="9/16" fit="cover" />
            <Img src={`${B}/ig-06.png`} aspect="9/16" fit="cover" />
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
          <Img src={`${B}/sign-01.png`} fit="cover" />
          <Img src={`${B}/sign-02.png`} fit="cover" />
          <Img src={`${B}/sign-03.png`} fit="cover" />
          <Img src={`${B}/sign-04.png`} fit="cover" />
          <Img src={`${B}/hero-03.png`} crop={{ height: '115.59%', left: '-5.47%', top: '-8.05%', width: '115.59%' }} />
          <Img src={`${B}/sign-05.png`} fit="cover" />
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
