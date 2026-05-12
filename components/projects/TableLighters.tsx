// ─── Placeholder helpers ──────────────────────────────────────────────────────

function Img({ label, aspect = '4/3', radius = '12px' }: { label: string; aspect?: string; radius?: string }) {
  return (
    <div style={{
      width: '100%',
      aspectRatio: aspect,
      background: '#e0ddd8',
      borderRadius: radius,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <span style={{ fontSize: '10px', color: '#aaa', fontFamily: 'monospace', textAlign: 'center', padding: '12px', wordBreak: 'break-all' }}>
        {label}
      </span>
    </div>
  );
}

// ─── Typography ───────────────────────────────────────────────────────────────

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontWeight: 900,
      fontSize: 'clamp(22px, 3.2vw, 42px)',
      lineHeight: 1.05,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
      color: '#0a0a0a',
      margin: '0 0 20px',
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
    <ul style={{ fontSize: '14px', lineHeight: 1.75, color: '#0a0a0a', paddingLeft: '18px', margin: '0 0 14px' }}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TableLighters() {
  return (
    <div style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 40px 120px',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      {/* ── HERO: two side-by-side landscape images ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '64px' }}>
        <Img label="hero-left" aspect="4/3" radius="4px" />
        <Img label="hero-right" aspect="4/3" radius="4px" />
      </div>

      {/* ── REFERENCE / GOAL ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '72px' }}>
        <div>
          <Heading>Reference / Goal</Heading>
          <P>When looking through the work of Dieter Rams, I wanted to own something he designed. Prices for things credited to Rams are high, but I considered the prices for his lighter relatively reasonable; after searching through online listings I realized that the age of these products meant there was no guarantee they still worked, or how much longer they would.</P>
          <P>I decided to make a tribute of sorts to his T2 lighter using a Bic as the ignition.</P>
          <P>My criteria for success with this product:</P>
          <List items={[
            'It must be robust',
            'It should elevate the experience of owning a lighter',
            'I can produce it myself; using a removable Bic',
          ]} />
        </div>
        {/* Right: 2 overlapping rounded images top + 1 smaller below */}
        <div style={{ position: 'relative', height: '380px' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '60%' }}>
            <Img label="ref-t2-box" aspect="1/1" radius="20px" />
          </div>
          <div style={{ position: 'absolute', top: '8%', right: 0, width: '58%' }}>
            <Img label="ref-braun-lighters" aspect="4/3" radius="20px" />
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: '15%', width: '45%' }}>
            <Img label="ref-braun-cased" aspect="4/3" radius="4px" />
          </div>
        </div>
      </div>

      {/* ── FIRST ATTEMPT ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '72px' }}>
        <div>
          <Heading>First Attempt</Heading>
          <P>My first attempt used a two-part rigid 3D printed mould which held the Bic in place for concrete to fill around it. Several attempts at releasing the Bic post-pour led me to design a soft removable insert to fill the void instead of the lighter itself. This let me know that I was going in the right direction for the objects design, but needed to overhaul everything about it.</P>
          <Label>Successes:</Label>
          <List items={[
            'Overall dimensions locked in',
            'In-hand feel confirmed to be good',
            'Stamped cork base confirmed functional',
          ]} />
          <Label>Issues:</Label>
          <List items={[
            'Seam line from two part rigid mould',
            'Radii and level of polish need revision',
            'Inconsistency of inner void due to current mould design.',
          ]} />
        </div>
        {/* Right: 1 tall portrait left + 2 stacked right, then 2-wide bottom row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ gridRow: '1 / 2' }}>
            <Img label="attempt-front" aspect="3/4" radius="12px" />
          </div>
          <div style={{ gridRow: '1 / 2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Img label="attempt-top" aspect="1/1" radius="12px" />
            <Img label="attempt-cork" aspect="1/1" radius="12px" />
          </div>
          <div>
            <Img label="attempt-hollow" aspect="3/4" radius="12px" />
          </div>
          <div>
            <Img label="attempt-parts" aspect="4/3" radius="12px" />
          </div>
        </div>
      </div>

      {/* ── FIRST REVISION ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '72px' }}>
        <div>
          <Heading>First Revision</Heading>
          <P>For this version I designed a new silicone mould system, and a 3D printed insert that creates a consistent inner void which accommodates Bic size variations between factories. After gifting these to friends and selling them globally; I had people buying them for a second time after a few months. I talked to the repeat buyers and learned the concrete either chipped or broke entirely after falling or being struck.</P>
          <Label>Successes:</Label>
          <List items={[
            'Dialled in corner radii and exact form',
            'Simplified production process',
            'No more seam lines from new silicone mould',
          ]} />
          <Label>Issues:</Label>
          <List items={[
            'Less comfortable striking and removing the Bic for people with small hands (asking for a mini Bic version)',
            'Concrete proved too fragile',
          ]} />
        </div>
        <Img label="revision-polished" aspect="3/4" radius="12px" />
      </div>

      {/* ── FINAL PRODUCT ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '64px' }}>
        <div>
          <Heading>Final Product</Heading>
          <P>For this version I looked for a new material that could resist impact and wouldn't chip away over time. I settled on aluminum — light, recyclable, and developing a unique patina with use.</P>
          <P>I made a mini version for individuals with small hands. I also added a button that lets users poke the Bic out slightly from the bottom, making it easier to remove.</P>
          <P>I shifted from the cork to a leather, with wet-set debossed base. I designed a new internal sleeve for the Bic that leverages the flex of 3D printed walls. The sleeve bolts into the aluminum body and houses the print-in-place magnetic button. I went through over 50 variations of this button, testing springs and magnets, because I wanted an interaction that was satisfying to use. The button feel is addictive.</P>
        </div>
        {/* Right: 2 stacked landscape images + row of 4 small detail circles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Img label="final-aluminum-pair" aspect="4/3" radius="12px" />
          <Img label="final-aluminum-side" aspect="4/3" radius="12px" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            <Img label="final-btn-1" aspect="1/1" radius="50%" />
            <Img label="final-btn-2" aspect="1/1" radius="50%" />
            <Img label="final-btn-3" aspect="1/1" radius="50%" />
            <Img label="final-btn-4" aspect="1/1" radius="50%" />
          </div>
        </div>
      </div>

      {/* ── TECHNICAL DRAWING: full width ── */}
      <div style={{ marginBottom: '72px' }}>
        <Img label="technical-drawing" aspect="16/9" radius="4px" />
      </div>

      {/* ── PACKAGING ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        <div>
          <Heading>Packaging</Heading>
          <P>The packaging starts the customer's hands-on interaction with the product; and in this case likely the company that made it. I wanted to design an unwrapping experience — the customer can either carefully remove the tabs, cradling the product like a baby chick, or rip through it in excitement to get to the object itself.</P>
          <P>The packaging says a lot: who made the product, where it was made, what it is, and a small message at the bottom: Crafted with pride by ACS.</P>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Img label="packaging-main" aspect="4/3" radius="12px" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <Img label="packaging-detail-1" aspect="1/1" radius="12px" />
            <Img label="packaging-detail-2" aspect="1/1" radius="12px" />
          </div>
        </div>
      </div>

    </div>
  );
}
