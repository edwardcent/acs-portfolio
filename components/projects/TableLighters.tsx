// ─── Placeholders ─────────────────────────────────────────────────────────────

function Circle({ label }: { label: string }) {
  return (
    <div style={{
      width: '100%',
      aspectRatio: '1 / 1',
      borderRadius: '50%',
      background: '#e0ddd8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <span style={{ fontSize: '10px', color: '#aaa', fontFamily: 'monospace', textAlign: 'center', padding: '16px', wordBreak: 'break-all' }}>{label}</span>
    </div>
  );
}

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

// ─── Typography ───────────────────────────────────────────────────────────────

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "'Arial Black', 'Arial Bold', Gadget, sans-serif",
      fontWeight: 900,
      fontSize: 'clamp(22px, 3.6vw, 44px)',
      lineHeight: 1.05,
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
      color: '#0a0a0a',
      margin: '0 0 20px',
    }}>{children}</h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#0a0a0a', margin: '0 0 16px' }}>{children}</p>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '15px', fontWeight: 700, color: '#0a0a0a', margin: '16px 0 4px 0' }}>{children}</p>;
}

function List({ items }: { items: string[] }) {
  return (
    <ul style={{ fontSize: '15px', lineHeight: 1.75, color: '#0a0a0a', paddingLeft: '20px', margin: '0 0 16px' }}>
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

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      {/*
        4 overlapping circles of decreasing size arranged left-to-right.
        Sizes derived from Illustrator (as % of 1366px artboard width):
          circle 1: 333px ≈ 24%
          circle 2: 581px ≈ 43%  ← dominant, centre-left
          circle 3: 520px ≈ 38%
          circle 4: 463px ≈ 34%
        Circles bleed above the artboard top and overlap each other heavily.
      */}
      <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '72px', overflow: 'visible' }}>
        <div style={{ width: '24%', flexShrink: 0, marginRight: '-8%', zIndex: 1 }}>
          <Circle label="hero-01" />
        </div>
        <div style={{ width: '43%', flexShrink: 0, marginRight: '-10%', zIndex: 2 }}>
          <Circle label="hero-02" />
        </div>
        <div style={{ width: '38%', flexShrink: 0, marginRight: '-5%', zIndex: 3 }}>
          <Circle label="hero-03" />
        </div>
        <div style={{ width: '34%', flexShrink: 0, zIndex: 4 }}>
          <Circle label="hero-04" />
        </div>
      </div>

      {/* ── REFERENCE / GOAL ────────────────────────────────────────── */}
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
        {/*
          Right column: 2 circular clip groups (377px, 354px) side-by-side,
          then a smaller raster image below.
        */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Circle label="ref-01" />
            <Circle label="ref-02" />
          </div>
          <div style={{ width: '55%' }}>
            <Rect label="ref-03" aspect="4 / 3" />
          </div>
        </div>
      </div>

      {/* ── FIRST ATTEMPT ───────────────────────────────────────────── */}
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
        {/*
          Right column: group of 5 images — 4 circles in a 2×2 grid + 1 wide rect below.
        */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <Circle label="attempt1-01" />
            <Circle label="attempt1-02" />
            <Circle label="attempt1-03" />
            <Circle label="attempt1-04" />
          </div>
          <Rect label="attempt1-05" aspect="16 / 9" />
        </div>
      </div>

      {/* ── SECOND ATTEMPT ──────────────────────────────────────────── */}
      {/*
        Top: text left + 1 large circle right (745px in Illustrator, overflows artboard edge).
        Bottom: 4 smaller circles (306–379px) spread across the full width.
      */}
      <div style={{ marginBottom: '72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '24px' }}>
          <div>
            <Heading>Second Attempt</Heading>
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
          <Circle label="second-01" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          <Circle label="second-02" />
          <Circle label="second-03" />
          <Circle label="second-04" />
          <Circle label="second-05" />
        </div>
      </div>

      {/* ── FINAL PRODUCT ───────────────────────────────────────────── */}
      {/*
        Top: text left + 3 stacked square images right (all ~393×393px in Illustrator).
        Bottom: 1 wide group (~835px wide, ~80% of page) spanning most of the width.
      */}
      <div style={{ marginBottom: '72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '24px' }}>
          <div>
            <Heading>Final Product</Heading>
            <P>For this version I looked for a new material that could resist impact and wouldn't chip away over time. I settled on aluminum — light, recyclable, and developing a unique patina with use.</P>
            <P>I made a mini version for individuals with small hands. I also added a button that lets users poke the Bic out slightly from the bottom, making it easier to remove.</P>
            <P>I shifted from the cork to a leather, with wet-set debossed base. I designed a new internal sleeve for the Bic that leverages the flex of 3D printed walls. The sleeve bolts into the aluminum body and houses the print-in-place magnetic button. I went through over 50 variations of this button, testing springs and magnets, because I wanted an interaction that was satisfying to use. The button feel is addictive.</P>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Rect label="final-01" aspect="1 / 1" />
            <Rect label="final-02" aspect="1 / 1" />
            <Rect label="final-03" aspect="1 / 1" />
          </div>
        </div>
        <div style={{ width: '80%' }}>
          <Rect label="final-wide" aspect="3 / 2" />
        </div>
      </div>

      {/* ── PACKAGING ───────────────────────────────────────────────── */}
      {/*
        Left: heading + body text.
        Right: portrait rect (clip group 497×421px) at top, then 2 small squares
        side-by-side, then a large circle (676px) at the bottom.
      */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        <div>
          <Heading>Packaging</Heading>
          <P>The packaging starts the customer's hands-on interaction with the product; and in this case likely the company that made it. I wanted to design an unwrapping experience — the customer can either carefully remove the tabs, cradling the product like a baby chick, or rip through it in excitement to get to the object itself.</P>
          <P>The packaging says a lot: who made the product, where it was made, what it is, and a small message at the bottom: Crafted with pride by ACS.</P>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Rect label="packaging-01" aspect="4 / 3" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <Rect label="packaging-02" aspect="1 / 1" />
            <Rect label="packaging-03" aspect="1 / 1" />
          </div>
          <Circle label="packaging-04" />
        </div>
      </div>

    </div>
  );
}
