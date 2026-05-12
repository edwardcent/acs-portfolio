function Rect({ label, aspect = '1 / 1' }: { label: string; aspect?: string }) {
  return (
    <div style={{
      width: '100%',
      aspectRatio: aspect,
      background: '#e0ddd8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <span style={{ fontSize: '10px', color: '#aaa', fontFamily: 'monospace', textAlign: 'center', padding: '12px', wordBreak: 'break-all' }}>{label}</span>
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "'Arial Black', 'Arial Bold', Gadget, sans-serif",
      fontWeight: 900,
      fontSize: 'clamp(22px, 3.2vw, 40px)',
      lineHeight: 1.05,
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
      color: '#0a0a0a',
      margin: '0 0 16px',
    }}>{children}</h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#0a0a0a', margin: '0 0 14px' }}>{children}</p>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '14px', fontWeight: 700, color: '#0a0a0a', margin: '14px 0 4px' }}>{children}</p>;
}

function List({ items }: { items: string[] }) {
  return (
    <ul style={{ fontSize: '14px', lineHeight: 1.75, color: '#0a0a0a', paddingLeft: '20px', margin: '0 0 14px' }}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

const gap = '8px';
const sectionGap = '48px';
const sectionMb = '72px';

export default function TableLighters() {
  return (
    <div style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 40px 120px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      {/* Left ~35%: circular lighter image + ACS wordmark */}
      {/* Right ~65%: 3 tall portrait product shots */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: sectionGap, alignItems: 'end', marginBottom: sectionMb }}>
        <div>
          <Rect label="hero-acs-circle" aspect="1 / 1" />
          <div style={{
            fontFamily: "'Arial Black', 'Arial Bold', Gadget, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(36px, 6vw, 72px)',
            letterSpacing: '-0.03em',
            color: '#0a0a0a',
            lineHeight: 1,
            marginTop: '12px',
          }}>ACS</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap }}>
          <Rect label="hero-product-01" aspect="2 / 3" />
          <Rect label="hero-product-02" aspect="2 / 3" />
          <Rect label="hero-product-03" aspect="2 / 3" />
        </div>
      </div>

      {/* ── REFERENCE / GOAL ────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sectionGap, alignItems: 'start', marginBottom: sectionMb }}>
        <div>
          <Heading>Reference / Goal</Heading>
          <P>When looking to obtain one of the beautiful lighters designed by Dieter Rams, I realized that the age of these products meant they were more rarely working than not.</P>
          <P>I decided to make a tribute of sorts to his "T2" table lighter using a Bic as the ignition.</P>
          <P>My criteria for success with this product:</P>
          <List items={[
            'It should elevate the experience of owning a lighter',
            'I can produce it myself; using a removable Bic',
            'It must be robust',
          ]} />
        </div>
        {/* 1 wide landscape + 1 smaller square below */}
        <div style={{ display: 'flex', flexDirection: 'column', gap }}>
          <Rect label="ref-braun-t2-collection" aspect="16 / 9" />
          <div style={{ width: '55%' }}>
            <Rect label="ref-braun-t2-boxed" aspect="1 / 1" />
          </div>
        </div>
      </div>

      {/* ── FIRST ATTEMPT ───────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sectionGap, alignItems: 'start', marginBottom: sectionMb }}>
        <div>
          <Heading>First Attempt</Heading>
          <P>I designed a rigid two-part mould which held the Bic in place for concrete to fill around it. After trial and error I designed a soft removable bic form that could be removed post pour. The post processing was tedious and the finish was not up to par.</P>
          <P>This let me know that I was going in the right direction for the objects design, but needed to refine it in every way.</P>
          <Label>Successes:</Label>
          <List items={[
            'Overall dimensions locked in — in-hand feel confirmed to be good',
            'Stamped cork base confirmed functional',
          ]} />
          <Label>Issues:</Label>
          <List items={[
            'Seam line from two part mould',
            'Radii and level of polish need revision',
            'Inconsistency of inner void',
          ]} />
        </div>
        {/* 2×2 grid: portrait, square, portrait, small landscape */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap }}>
          <Rect label="attempt1-concrete-front" aspect="3 / 4" />
          <Rect label="attempt1-cork-base" aspect="1 / 1" />
          <Rect label="attempt1-hollow" aspect="3 / 4" />
          <Rect label="attempt1-parts" aspect="1 / 1" />
        </div>
      </div>

      {/* ── FIRST REVISION ──────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sectionGap, alignItems: 'start', marginBottom: sectionMb }}>
        <div>
          <Heading>First Revision</Heading>
          <P>I designed a new silicone mould system, and a 3D printed insert with an inner void that accommodates Bic's slight size variations. With a high level of polish achieved, I brought this version to market DTC and with some independent storefront placement in Toronto. Most sales came from high exposure TikToks I made talking about the product.</P>
          <P>I talked to some repeat buyers and learned the concrete chipped or broke entirely after falling or being struck. Customers didn't view this as faulty product since they were buying a second time. I pulled the product from all markets, stopped all production, and began designing a second revision.</P>
          <Label>Successes:</Label>
          <List items={[
            'Dialled in corner radii and exact form',
            'Simplified production process',
            'No more seam lines',
          ]} />
          <Label>Issues:</Label>
          <List items={[
            'Concrete proved too fragile',
            'I noticed users with small hands would benefit from/appreciate a mini version',
          ]} />
        </div>
        {/* 2-col sub-grid: 6 images (3 rows × 2 cols) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap }}>
          <Rect label="rev1-concrete-polished" aspect="3 / 4" />
          <Rect label="rev1-top-view" aspect="1 / 1" />
          <Rect label="rev1-cork-stamp" aspect="3 / 4" />
          <Rect label="rev1-tiktok" aspect="9 / 16" />
          <Rect label="rev1-silicone-mould" aspect="4 / 3" />
          <Rect label="rev1-3d-insert" aspect="4 / 3" />
        </div>
      </div>

      {/* ── FINAL PRODUCT ───────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sectionGap, alignItems: 'start', marginBottom: '24px' }}>
        <div>
          <Heading>Final Product</Heading>
          <P>For this version I looked for a new material that could handle impact and was more environmentally friendly than concrete. I settled on aluminum — light, fully recyclable, and develops a unique patina with use. I made a mini version for individuals with small hands, and added a button that lets users poke the Bic out slightly from the bottom. I shifted from the stamped cork to wet-set debossed leather bases.</P>
          <P>I designed a new internal structure for the Bic that leverages the flex of 3D printed walls for a snug fit. The structure bolts into the aluminum body and houses the print-in-place magnetic button.</P>
          <P>I went through over 50 variations of the button, going between springs and magnets, because I wanted an interaction that was satisfying to use. The resulting button feel is addictive.</P>
          <Label>Issues:</Label>
          <List items={[
            'Cost of machined aluminum higher than cast concrete — bringing the cost of the product up — worth it for the improved longevity.',
          ]} />
        </div>
        {/* Right column: 2 product shots, then button variants + leather base, then technical drawing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap }}>
            <Rect label="final-aluminum-regular" aspect="2 / 3" />
            <Rect label="final-aluminum-mini" aspect="2 / 3" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap }}>
            <Rect label="final-button-variants" aspect="1 / 1" />
            <Rect label="final-leather-base" aspect="1 / 1" />
          </div>
          <Rect label="final-technical-drawing" aspect="4 / 3" />
        </div>
      </div>
      {/* Full-width technical drawing spanning below both columns */}
      <div style={{ marginBottom: sectionMb }}>
        <Rect label="final-exploded-drawing" aspect="21 / 9" />
      </div>

      {/* ── PACKAGING ───────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: sectionGap, alignItems: 'start' }}>
        <div>
          <Heading>Packaging</Heading>
          <P>The packaging starts the customer's hands-on interaction with the product; and in this case likely the company that made it. I wanted to design an unwrapping experience — the customer can either carefully remove the tabs, cradling the product like a baby chick, or rip through it in excitement to get to the object itself.</P>
          <P>The packaging says a lot: who made the product, where it was made, what it is, and a small message at the bottom: Crafted with pride by ACS.</P>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap }}>
            <Rect label="packaging-box-front" aspect="1 / 1" />
            <Rect label="packaging-box-open" aspect="1 / 1" />
          </div>
          <Rect label="packaging-flat-layout" aspect="4 / 3" />
        </div>
      </div>

    </div>
  );
}
