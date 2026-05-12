// ─── Image placeholder ────────────────────────────────────────────────────────

function Img({ label, aspect = '1/1' }: { label: string; aspect?: string }) {
  return (
    <div style={{
      width: '100%',
      aspectRatio: aspect,
      background: '#e0ddd8',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <span style={{ fontSize: '9px', color: '#aaa', fontFamily: 'monospace', textAlign: 'center', padding: '8px', wordBreak: 'break-all', lineHeight: 1.4 }}>
        {label}
      </span>
    </div>
  );
}

// ─── Typography ───────────────────────────────────────────────────────────────

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontWeight: 700,
      fontSize: 'clamp(20px, 2.2vw, 28px)',
      lineHeight: 1.05,
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
      color: '#0a0a0a',
      margin: '0 0 14px',
    }}>
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#0a0a0a', margin: '0 0 12px' }}>{children}</p>;
}

function SL({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '14px', fontWeight: 700, color: '#0a0a0a', margin: '10px 0 2px' }}>{children}</p>;
}

function UL({ items }: { items: string[] }) {
  return (
    <ul style={{ fontSize: '14px', lineHeight: 1.75, color: '#0a0a0a', paddingLeft: '18px', margin: '0 0 10px' }}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

// ─── Layout constants ─────────────────────────────────────────────────────────

const SECTION_MB = '48px';
const IMG_GAP = '8px';
const COL_GAP = '40px';

// ─── Component ────────────────────────────────────────────────────────────────

export default function TableLighters() {
  return (
    <div style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 40px 120px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      {/* ── HERO ──────────────────────────────────────────────────────────────
          Col 1 (narrow): circle-clipped Braun box + ACS logo rect, stacked
          Col 2–3: tall portrait clips (concrete v1, v2)
          Col 4: large square (aluminum pair)
          Figma proportions: 266 : 327 : 327 : 523 → 1 : 1.23 : 1.23 : 1.97
      */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.23fr 1.23fr 1.97fr', gap: IMG_GAP, alignItems: 'stretch', marginBottom: SECTION_MB }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
          <Img label="hero-braun-box" aspect="1/1" />
          <Img label="hero-acs-logo" aspect="1/1" />
        </div>
        <Img label="hero-concrete-v1" aspect="2/3" />
        <Img label="hero-concrete-v2" aspect="2/3" />
        <Img label="hero-aluminum-pair" aspect="1/1" />
      </div>

      {/* ── REFERENCE / GOAL ──────────────────────────────────────────────────
          Left: text
          Right: 3 overlapping images using Figma's exact inset percentages
            img1 (Braun T2 box):       top 2.18%  left 3.49%  right 48.63% bottom 42.34%
            img2 (black+yellow lighters): top 22.18% left 47.97% right 3.46%  bottom 21.53%
            img3 (Braun cased):        top 62.40% left 14.65% right 47.36% bottom 5.41%
          Container aspect ratio from Figma: 745 × 643 ≈ 1.158
      */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>Reference / Goal</H>
          <P>When looking to obtain one of the beautiful lighters designed by Dieter Rams, I realized that the age of these products meant they were more rarely working than not.</P>
          <P>I decided to make a tribute of sorts to his "T2" table lighter using a Bic as the ignition.</P>
          <P>My criteria for success with this product:</P>
          <UL items={[
            'It should elevate the experience of owning a lighter',
            'I can produce it myself; using a removable Bic',
            'It must be robust',
          ]} />
        </div>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '745/643', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '2.18%', left: '3.49%', right: '48.63%', bottom: '42.34%', background: '#e0ddd8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '9px', color: '#aaa', fontFamily: 'monospace', textAlign: 'center', padding: '6px' }}>ref-t2-box</span>
          </div>
          <div style={{ position: 'absolute', top: '22.18%', left: '47.97%', right: '3.46%', bottom: '21.53%', background: '#e0ddd8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '9px', color: '#aaa', fontFamily: 'monospace', textAlign: 'center', padding: '6px' }}>ref-braun-lighters</span>
          </div>
          <div style={{ position: 'absolute', top: '62.40%', left: '14.65%', right: '47.36%', bottom: '5.41%', background: '#e0ddd8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '9px', color: '#aaa', fontFamily: 'monospace', textAlign: 'center', padding: '6px' }}>ref-braun-cased</span>
          </div>
        </div>
      </div>

      {/* ── FIRST ATTEMPT ─────────────────────────────────────────────────────
          Left: text
          Right: 2 sub-columns side by side
            Left sub: 2 stacked square clips (large concrete front + hollow)
            Right sub: 3 stacked squares (top-view, cork base, parts)
      */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>First Attempt</H>
          <P>I designed a rigid two-part mould which held the Bic in place for concrete to fill around it. After trial and error I designed a soft removable bic form that could be removed post pour. The post processing was tedious and the finish was not up to par.</P>
          <P>This let me know that I was going in the right direction for the objects design, but needed to refine it in every way.</P>
          <SL>Successes:</SL>
          <UL items={[
            'Overall dimensions locked in, in-hand feel confirmed to be good',
            'Stamped cork base confirmed functional',
          ]} />
          <SL>Issues:</SL>
          <UL items={[
            'Seam line from two part mould',
            'Radii and level of polish need revision',
            'Inconsistency of inner void',
          ]} />
        </div>
        <div style={{ display: 'flex', gap: IMG_GAP, alignItems: 'flex-start' }}>
          {/* Left sub: 2 stacked (large square + medium square) */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="attempt-front" aspect="1/1" />
            <Img label="attempt-hollow" aspect="1/1" />
          </div>
          {/* Right sub: 3 stacked squares */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="attempt-topview" aspect="1/1" />
            <Img label="attempt-cork" aspect="1/1" />
            <Img label="attempt-parts" aspect="1/1" />
          </div>
        </div>
      </div>

      {/* ── FIRST REVISION ────────────────────────────────────────────────────
          Left: text
          Right: 2 sub-columns
            Left sub: tall portrait + landscape + square
            Right sub: square + landscape + portrait
      */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: SECTION_MB }}>
        <div>
          <H>First Revision</H>
          <P>I designed a new silicone mould system, and a 3D printed insert with an inner void that accommodates Bic's slight size variations. With a high level of polish achieved, I brought this version to market DTC and with some independent storefront placement in Toronto. Most sales came from high exposure TikToks I made talking about the product.</P>
          <P>I talked to some repeat buyers and learned the concrete chipped or broke entirely after falling or being struck. Customers didn't view this as faulty product since they were buying a second time. I pulled the product from all markets, stopped all production, and began designing a second revision.</P>
          <SL>Successes:</SL>
          <UL items={[
            'Dialled in corner radii and exact form',
            'Simplified production process',
            'No more seam lines',
          ]} />
          <SL>Issues:</SL>
          <UL items={[
            'Concrete proved too fragile',
            'I noticed users with small hands would benefit from a mini version',
          ]} />
        </div>
        <div style={{ display: 'flex', gap: IMG_GAP, alignItems: 'flex-start' }}>
          {/* Left sub */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="revision-portrait-1" aspect="3/4" />
            <Img label="revision-landscape-1" aspect="4/3" />
            <Img label="revision-square-1" aspect="1/1" />
          </div>
          {/* Right sub */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="revision-square-2" aspect="1/1" />
            <Img label="revision-landscape-2" aspect="4/3" />
            <Img label="revision-portrait-2" aspect="3/4" />
          </div>
        </div>
      </div>

      {/* ── FINAL PRODUCT ─────────────────────────────────────────────────────
          Left: text
          Right col (vertical flex):
            Top grid (2 sub-cols):
              Left sub: square (lighters pair) + square (buttons array)
              Right sub: tall portrait (single lighter) + square (leather base)
            Bottom: technical drawing (landscape)
          Below the 2-col: full-width row of 2 large squares
      */}
      <div style={{ marginBottom: SECTION_MB }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start', marginBottom: IMG_GAP }}>
          <div>
            <H>Final Product</H>
            <P>For this version I looked for a new material that could handle impact and was more environmentally friendly than concrete. I settled on aluminum — light, fully recyclable, and develops a unique patina with use. I made a mini version for individuals with small hands, and added a button that lets users poke the Bic out slightly from the bottom. I shifted from the stamped cork to wet-set debossed leather bases.</P>
            <P>I designed a new internal structure for the Bic that leverages the flex of 3D printed walls for a snug fit. The structure bolts into the aluminum body and houses the print-in-place magnetic button.</P>
            <P>I went through over 50 variations of the button, going between springs and magnets, because I wanted an interaction that was satisfying to use. The resulting button feel is addictive.</P>
            <SL>Issues:</SL>
            <UL items={[
              'Cost of machined aluminum higher than casted concrete — bringing the cost of the product up. Worth it for the improved longevity.',
            ]} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            {/* Top: 2 sub-columns */}
            <div style={{ display: 'flex', gap: IMG_GAP, alignItems: 'flex-start' }}>
              {/* Left sub: 2 squares */}
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
                <Img label="final-lighters-pair" aspect="1/1" />
                <Img label="final-buttons-array" aspect="1/1" />
              </div>
              {/* Right sub: tall portrait + square */}
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
                <Img label="final-lighter-close" aspect="3/4" />
                <Img label="final-leather-base" aspect="1/1" />
              </div>
            </div>
            {/* Bottom: technical drawing spans full right column width */}
            <Img label="final-technical-drawing" aspect="4/3" />
          </div>
        </div>
        {/* Full-width 2-square row (Frame 45 in Figma) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: IMG_GAP }}>
          <Img label="final-extra-1" aspect="1/1" />
          <Img label="final-extra-2" aspect="1/1" />
        </div>
      </div>

      {/* ── PACKAGING ─────────────────────────────────────────────────────────
          Left: text
          Right: 2 sub-columns
            Left sub: landscape (411×348) + square (540×540)
            Right sub: square (302×302) + square (302×302)
      */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: COL_GAP, alignItems: 'start' }}>
        <div>
          <H>Packaging</H>
          <P>The packaging starts the customer's hands-on interaction with the product; and in this case likely the company that made it.</P>
          <P>I wanted to design an unwrapping experience — the customer can either carefully remove the tabs, cradling the product like a baby chick, or rip through it in excitement to get to the object itself.</P>
          <P>The packaging says a lot: who made the product, where it was made, what it is, and a small message at the bottom: Crafted with pride by ACS.</P>
        </div>
        <div style={{ display: 'flex', gap: IMG_GAP, alignItems: 'flex-start' }}>
          {/* Left sub: landscape + square */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="packaging-landscape" aspect="4/3" />
            <Img label="packaging-square-1" aspect="1/1" />
          </div>
          {/* Right sub: 2 squares */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: IMG_GAP }}>
            <Img label="packaging-square-2" aspect="1/1" />
            <Img label="packaging-square-3" aspect="1/1" />
          </div>
        </div>
      </div>

    </div>
  );
}
