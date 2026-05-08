export default function TableLighters() {
  const s = 'table-lighters';

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px 80px' }}>

      {/* HERO — 4 images: top-left stacked 2, then 3 tall images */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr 2fr', gap: '2px', marginBottom: '48px' }}>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '2px' }}>
          <Img label="hero-01" s={s} />
          <Img label="hero-02" s={s} />
        </div>
        <Img label="hero-03" s={s} tall />
        <Img label="hero-04" s={s} tall />
        <Img label="hero-05" s={s} tall />
      </div>

      {/* REFERENCE / GOAL */}
      <SectionHeading>Reference / Goal</SectionHeading>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '64px' }}>
        <div>
          <P><B>When looking through the work of Dieter Rams</B>, I wanted to own something he designed. Prices for things credited to Rams are high, but I considered the prices for his lighter relatively reasonable; after searching through online listings I realized that the age of these products meant there was no guarantee they still worked, or how much longer they would.</P>
          <P><B>I decided to make a tribute of sorts to his T2 lighter using a Bic as the ignition.</B></P>
          <P><B>My criteria for success with this product:</B></P>
          <BulletList items={[
            'It must be robust',
            'It should elevate the experience of owning a lighter',
            'I can produce it myself; using a removable Bic',
          ]} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '2px' }}>
          <Img label="ref-01" s={s} />
          <Img label="ref-02" s={s} />
          <Img label="ref-03" s={s} />
          <Img label="ref-04" s={s} />
        </div>
      </div>

      {/* FIRST ATTEMPT */}
      <SectionHeading>First Attempt</SectionHeading>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '64px' }}>
        <div>
          <P>My first attempt <B>used a two-part rigid 3D printed mould</B> which held the Bic in place for concrete to fill around it. Several attempts at releasing the Bic post-pour led me to design a <B>soft removable insert to fill the void</B> instead of the lighter itself. This let me know that I was going in the <B>right direction for the objects design, but needed to overhaul everything about it.</B></P>
          <P><B>Successes:</B></P>
          <BulletList items={[
            'Overall dimensions locked in',
            'In-hand feel confirmed to be good',
            'Stamped cork base confirmed functional',
          ]} />
          <P><B>Issues:</B></P>
          <BulletList items={[
            'Seam line from two part rigid mould',
            'Radii and level of polish need revision',
            'Inconsistency of inner void due to current mould design.',
          ]} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: '2px' }}>
          <Img label="attempt-01" s={s} />
          <Img label="attempt-02" s={s} />
          <Img label="attempt-03" s={s} />
          <Img label="attempt-04" s={s} />
        </div>
      </div>

      {/* SECOND ATTEMPT */}
      <SectionHeading>Second Attempt</SectionHeading>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '64px' }}>
        <div>
          <P>For this version <B>I designed a new silicone mould system</B>, and <B>a 3D printed insert that creates a consistent inner void</B> which accommodates Bic size variations between factories. After gifting these to friends and selling them globally; I had people buying them for a second time after a few months. <B>I talked to the repeat buyers and learned the concrete either chipped or broke entirely after falling or being struck.</B></P>
          <P><B>Successes:</B></P>
          <BulletList items={[
            'Dialled in corner radii and exact form',
            'Simplified production process',
            'No more seam lines from new silicone mould',
          ]} />
          <P><B>Issues:</B></P>
          <BulletList items={[
            'Less comfortable striking and removing the Bic for people with small hands (asking for a mini Bic version)',
            'Concrete proved too fragile',
          ]} />
        </div>
        <Img label="second-01" s={s} tall />
      </div>

      {/* FINAL PRODUCT — 4 across, then text + image */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', marginBottom: '32px' }}>
        <Img label="final-01" s={s} />
        <Img label="final-02" s={s} />
        <Img label="final-03" s={s} />
        <Img label="final-04" s={s} />
      </div>

      <SectionHeading>Final Product</SectionHeading>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '64px' }}>
        <div>
          <P>For this version I looked for a new material that could resist impact and wouldn't chip away over time. <B>I settled on aluminum</B> — light, recyclable, and developing a unique patina with use.</P>
          <P>I <B>made a mini version for individuals with small hands</B>. I also <B>added a button that lets users poke the Bic out slightly</B> from the bottom, making it easier to remove.</P>
          <P>I shifted from the cork to a <B>leather, with wet-set debossed base.</B> I designed a <B>new internal sleeve for the Bic</B> that leverages the flex of 3D printed walls. The sleeve <B>bolts into the aluminum body</B> and houses the print-in-place <B>magnetic button</B>. I went through over 50 variations of this button, testing springs and magnets, because I wanted an interaction that was satisfying to use. <B>The button feel is addictive.</B></P>
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '2px' }}>
          <Img label="final-05" s={s} />
          <Img label="final-06" s={s} />
        </div>
      </div>

      {/* TECHNICAL DRAWING + image side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '64px' }}>
        <Img label="drawing-01" s={s} />
        <Img label="drawing-02" s={s} />
      </div>

      {/* PACKAGING */}
      <SectionHeading>Packaging</SectionHeading>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '48px' }}>
        <div>
          <P>The packaging <B>starts the customer's hands-on interaction</B> with the product; and in this case likely the company that made it. I wanted to design an unwrapping experience — the customer can either carefully remove the tabs, cradling the product like a baby chick, <B>or rip through it in excitement</B> to get to the object itself.</P>
          <P><B>The packaging says</B> a lot: who made the product, where it was made, what it is, and a small message at the bottom: <B>Crafted with pride by ACS.</B></P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
          <Img label="packaging-01" s={s} />
          <Img label="packaging-02" s={s} />
        </div>
      </div>

      {/* PACKAGING — 3 images bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
        <Img label="packaging-03" s={s} />
        <Img label="packaging-04" s={s} />
        <Img label="packaging-05" s={s} />
      </div>

    </div>
  );
}

function Img({ label, s, tall }: { label: string; s: string; tall?: boolean }) {
  return (
    <div style={{
      aspectRatio: tall ? '3/4' : '4/3',
      background: '#e8e6e2',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '3px',
    }}>
      <span style={{ fontSize: '9px', color: '#bbb', fontFamily: 'monospace', letterSpacing: '0.04em' }}>{s}/</span>
      <span style={{ fontSize: '10px', color: '#888', fontFamily: 'monospace', fontWeight: 600 }}>{label}.png</span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: 'clamp(28px, 5vw, 52px)',
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
      lineHeight: '1.0',
      marginBottom: '16px',
      color: '#0a0a0a',
    }}>
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '14px', lineHeight: '1.75', color: '#0a0a0a', marginBottom: '14px' }}>
      {children}
    </p>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return <strong style={{ fontWeight: 700 }}>{children}</strong>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ marginBottom: '14px', paddingLeft: '0', listStyle: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: '14px', lineHeight: '1.75', color: '#0a0a0a', display: 'flex', gap: '8px' }}>
          <span style={{ flexShrink: 0 }}>▪</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
