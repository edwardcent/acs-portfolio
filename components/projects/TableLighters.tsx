export default function TableLighters() {
  const slug = 'table-lighters';

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px 80px' }}>

      {/* HERO — 4 images across */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', marginBottom: '64px' }}>
        {['hero-01','hero-02','hero-03','hero-04'].map(name => (
          <Placeholder key={name} label={name} slug={slug} ratio="4/3" />
        ))}
      </div>

      {/* REFERENCE / GOAL */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '64px' }}>
        <div>
          <SectionHeading>Reference / Goal</SectionHeading>
          <Body>When looking through the work of Dieter Rams, I wanted to own something he designed. Prices for things credited to Rams are high, but I considered the prices for his lighter relatively reasonable; after searching through online listings I realized that the age of these products meant there was no guarantee they still worked, or how much longer they would.</Body>
          <Body bold>I decided to make a tribute of sorts to his T2 lighter using a Bic as the ignition.</Body>
          <Body bold>My criteria for success with this product:</Body>
          <ul style={{ fontSize: '13px', lineHeight: '1.8', color: '#333', paddingLeft: '16px' }}>
            <li>It must be robust</li>
            <li>It should elevate the experience of owning a lighter</li>
            <li>I can produce it myself; using a removable Bic</li>
          </ul>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
          <Placeholder label="ref-01" slug={slug} ratio="1/1" />
          <Placeholder label="ref-02" slug={slug} ratio="1/1" />
          <Placeholder label="ref-03" slug={slug} ratio="1/1" />
          <Placeholder label="ref-04" slug={slug} ratio="1/1" />
        </div>
      </div>

      <Divider />

      {/* FIRST ATTEMPT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
          <Placeholder label="attempt-01" slug={slug} ratio="1/1" />
          <Placeholder label="attempt-02" slug={slug} ratio="1/1" />
          <Placeholder label="attempt-03" slug={slug} ratio="1/1" />
          <Placeholder label="attempt-04" slug={slug} ratio="1/1" />
        </div>
        <div>
          <SectionHeading>First Attempt</SectionHeading>
          <Body>My first attempt <span style={{ fontWeight: 600 }}>used a two-part rigid 3D printed mould</span> which held the Bic in place for concrete to fill around it. Several attempts at releasing the Bic post-pour led me to design a <span style={{ fontWeight: 600 }}>soft removable insert to fill the void</span> instead of the Bic itself — allowing me to cast the body and insert the Bic after.</Body>
        </div>
      </div>

      <Divider />

      {/* SECOND ATTEMPT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '64px' }}>
        <div>
          <SectionHeading>Second Attempt</SectionHeading>
          <Body>The second attempt focused on refining the removable insert system and improving surface finish. Multiple pours tested different concrete mixes and release agents.</Body>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
          <Placeholder label="second-01" slug={slug} ratio="1/1" />
          <Placeholder label="second-02" slug={slug} ratio="1/1" />
          <Placeholder label="second-03" slug={slug} ratio="1/1" />
          <Placeholder label="second-04" slug={slug} ratio="1/1" />
        </div>
      </div>

      <Divider />

      {/* FINAL PRODUCT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
          <Placeholder label="final-01" slug={slug} ratio="1/1" />
          <Placeholder label="final-02" slug={slug} ratio="1/1" />
          <Placeholder label="final-03" slug={slug} ratio="1/1" />
          <Placeholder label="final-04" slug={slug} ratio="1/1" />
        </div>
        <div>
          <SectionHeading>Final Product</SectionHeading>
          <Body>Machined aluminum body, leather base stamped "Made in Toronto, Canada." Two sizes — regular and mini. First run of 25 regular and 35 mini units. Magnet-based push-button ejection mechanism.</Body>
        </div>
      </div>

      <Divider />

      {/* PROCESS — technical drawings */}
      <div style={{ marginBottom: '64px' }}>
        <SectionHeading>Process</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginTop: '20px' }}>
          <Placeholder label="process-01" slug={slug} ratio="3/2" />
          <Placeholder label="process-02" slug={slug} ratio="3/2" />
        </div>
      </div>

      <Divider />

      {/* PACKAGING */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '64px' }}>
        <div>
          <SectionHeading>Packaging</SectionHeading>
          <Body>Custom packaging designed for the DTC product line. Kraft box with stamped label, tissue paper, and product card.</Body>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
          <Placeholder label="packaging-01" slug={slug} ratio="1/1" />
          <Placeholder label="packaging-02" slug={slug} ratio="1/1" />
          <Placeholder label="packaging-03" slug={slug} ratio="1/1" />
          <Placeholder label="packaging-04" slug={slug} ratio="1/1" />
        </div>
      </div>

      {/* RELEASE — full width */}
      <div style={{ marginBottom: '64px' }}>
        <SectionHeading>Release</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', marginTop: '20px' }}>
          <Placeholder label="release-01" slug={slug} ratio="4/3" />
          <Placeholder label="release-02" slug={slug} ratio="4/3" />
          <Placeholder label="release-03" slug={slug} ratio="4/3" />
        </div>
      </div>

    </div>
  );
}

function Placeholder({ label, slug, ratio }: { label: string; slug: string; ratio: string }) {
  return (
    <div style={{
      aspectRatio: ratio,
      background: '#e8e6e2',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4px',
    }}>
      <span style={{ fontSize: '10px', color: '#999', letterSpacing: '0.06em', fontFamily: 'monospace' }}>
        {slug}/
      </span>
      <span style={{ fontSize: '10px', color: '#666', letterSpacing: '0.06em', fontFamily: 'monospace', fontWeight: 600 }}>
        {label}.png
      </span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: 'clamp(24px, 4vw, 44px)',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
      lineHeight: '1.05',
      marginBottom: '16px',
      color: '#0a0a0a',
    }}>
      {children}
    </h2>
  );
}

function Body({ children, bold }: { children: React.ReactNode; bold?: boolean }) {
  return (
    <p style={{
      fontSize: '13px',
      lineHeight: '1.75',
      color: '#333',
      marginBottom: '12px',
      fontWeight: bold ? 600 : 400,
    }}>
      {children}
    </p>
  );
}

function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '0 0 64px' }} />;
}
