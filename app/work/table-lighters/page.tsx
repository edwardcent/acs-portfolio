'use client';
import Nav from '@/components/Nav';
import Image from 'next/image';

// ─── Placeholder component ───────────────────────────────────────
function Placeholder({ filename, aspect = '4/3' }: { filename: string; aspect?: string }) {
  return (
    <div style={{
      aspectRatio: aspect,
      background: '#f0f0f0',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      width: '100%',
    }}>
      <span style={{ fontSize: '11px', color: '#999', fontFamily: 'monospace', textAlign: 'center', padding: '0 12px', wordBreak: 'break-all' }}>
        {filename}
      </span>
    </div>
  );
}

// ─── Shared styles ───────────────────────────────────────────────
const S = {
  page: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '80px 40px 120px',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  } as React.CSSProperties,

  // Project header
  headerRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '16px',
    padding: '12px 0',
    borderBottom: '1px solid #ccc',
    marginBottom: '32px',
  } as React.CSSProperties,
  headerTitle: { fontSize: '15px', fontWeight: '700', color: '#0a0a0a' } as React.CSSProperties,
  headerCat: { fontSize: '13px', color: '#999' } as React.CSSProperties,
  headerYear: { fontSize: '13px', color: '#999', marginLeft: 'auto' } as React.CSSProperties,

  // Hero grid: col 1 = 2 stacked images, cols 2-4 = 1 tall image each
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.3fr 1.3fr 1.9fr',
    gap: '8px',
    marginBottom: '64px',
  } as React.CSSProperties,
  heroCol1: { display: 'flex', flexDirection: 'column', gap: '8px' } as React.CSSProperties,

  // Section: text left ~48%, images right ~48%
  section: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    marginBottom: '72px',
    alignItems: 'start',
  } as React.CSSProperties,

  sectionHeading: {
    fontSize: '22px',
    fontWeight: '900',
    color: '#0a0a0a',
    marginBottom: '16px',
    letterSpacing: '-0.01em',
  } as React.CSSProperties,

  body: {
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#0a0a0a',
    marginBottom: '16px',
  } as React.CSSProperties,

  label: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: '6px',
    marginTop: '12px',
  } as React.CSSProperties,

  ul: {
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#0a0a0a',
    paddingLeft: '20px',
    marginBottom: '8px',
  } as React.CSSProperties,

  // Image grid within right column
  imgGrid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  } as React.CSSProperties,

  imgGrid1: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '8px',
  } as React.CSSProperties,

  img: {
    borderRadius: '8px',
    width: '100%',
    display: 'block',
    objectFit: 'cover',
  } as React.CSSProperties,
};

export default function TableLighters() {
  return (
    <>
      <Nav />
      <div style={S.page}>

        {/* ── Header ── */}
        <div style={S.headerRow}>
          <span style={S.headerTitle}>Table Lighter</span>
          <span style={S.headerCat}>product design, packaging, branding</span>
          <span style={S.headerYear}>2023–2026</span>
        </div>

        {/* ── Hero Grid ── */}
        {/* Col 1: 2 stacked (T2 reference + ACS logo)
            Col 2: concrete v1 upright
            Col 3: concrete v2 upright
            Col 4: aluminum pair (tall, dominant) */}
        <div style={S.heroGrid}>
          <div style={S.heroCol1}>
            <Placeholder filename="table-lighters/hero-braun-t2.jpg" aspect="4/3" />
            <Placeholder filename="table-lighters/hero-acs-logo.jpg" aspect="4/3" />
          </div>
          <Placeholder filename="table-lighters/hero-concrete-v1.jpg" aspect="3/4" />
          <Placeholder filename="table-lighters/hero-concrete-v2.jpg" aspect="3/4" />
          <Placeholder filename="table-lighters/hero-aluminum-pair.jpg" aspect="3/4" />
        </div>

        {/* ── REFERENCE / GOAL ── */}
        <div style={S.section}>
          <div>
            <h2 style={S.sectionHeading}>REFERENCE / GOAL</h2>
            <p style={S.body}>
              When looking to obtain one of the beautiful lighters designed by Dieter Rams, I realized that the age of these products meant they were more rarely working than not.
            </p>
            <p style={S.body}>
              I decided to make a tribute of sorts to his "T2" table lighter using a Bic as the ignition.
            </p>
            <p style={S.body}>My criteria for success with this product:</p>
            <ul style={S.ul}>
              <li>It should elevate the experience of owning a lighter</li>
              <li>I can produce it myself; using a removable Bic</li>
              <li>It must be robust last</li>
            </ul>
          </div>
          <div style={S.imgGrid2}>
            {/* Top: one wider image spanning both columns */}
            <div style={{ gridColumn: '1 / -1' }}>
              <Placeholder filename="table-lighters/ref-braun-t2-collection.jpg" aspect="16/9" />
            </div>
            <Placeholder filename="table-lighters/ref-braun-modern-lighters.jpg" aspect="4/3" />
            <Placeholder filename="table-lighters/ref-braun-t2-boxed.jpg" aspect="4/3" />
          </div>
        </div>

        {/* ── FIRST ATTEMPT ── */}
        <div style={S.section}>
          <div>
            <h2 style={S.sectionHeading}>FIRST ATTEMPT</h2>
            <p style={S.body}>
              I designed a rigid two-part mould which held the Bic in place for concrete to fill around it. After trial and error I designed a soft removable bic form that could be removed post pour. The post processing was tedious and not up to the finish was not up to par.
            </p>
            <p style={S.body}>
              This let me know that I was going in the right direction for the objects design, but needed to refine it in every way.
            </p>
            <p style={S.label}>Successes:</p>
            <ul style={S.ul}>
              <li>Overall dimensions locked in In-hand feel confirmed to be good</li>
              <li>Stamped cork base confirmed functional</li>
            </ul>
            <p style={S.label}>Issues:</p>
            <ul style={S.ul}>
              <li>Seam line from two part mould mould</li>
              <li>Radii and level of polish need revision</li>
              <li>Inconsistency of inner void</li>
            </ul>
          </div>
          <div style={S.imgGrid2}>
            <Placeholder filename="table-lighters/attempt1-concrete-front.jpg" aspect="3/4" />
            <Placeholder filename="table-lighters/attempt1-top-bic.jpg" aspect="1/1" />
            <Placeholder filename="table-lighters/attempt1-cork-base.jpg" aspect="1/1" />
            <Placeholder filename="table-lighters/attempt1-hollow.jpg" aspect="3/4" />
            <Placeholder filename="table-lighters/attempt1-parts.jpg" aspect="4/3" />
            <div /> {/* empty cell to balance grid */}
          </div>
        </div>

        {/* ── FIRST REVISION ── */}
        <div style={S.section}>
          <div>
            <h2 style={S.sectionHeading}>FIRST REVISION</h2>
            <p style={S.body}>
              I designed a new silicone mould system, and a 3D printed insert with an inner void that accommodates Bic's slight size variations. With a high level of polish achieved, I brought this version to market DTC and with some independent storefront placement in Toronto. Most sales came from high exposure TikToks I made talking about the product.
            </p>
            <p style={S.body}>
              I talked to some repeat buyers and learned the concrete chipped or broke entirely after falling or being struck. Customers didn't view this as faulty product since they were buying a second time. I pulled the product from all markets, stopped all production, and began designing a second revision.
            </p>
            <p style={S.label}>Successes:</p>
            <ul style={S.ul}>
              <li>Dialled in corner radii and exact form</li>
              <li>Simplified production process</li>
              <li>No more seam lines</li>
            </ul>
            <p style={S.label}>Issues:</p>
            <ul style={S.ul}>
              <li>Concrete proved too fragile</li>
              <li>I noticed users with small hands would benefit from/appreciate a mini version</li>
            </ul>
          </div>
          <div style={S.imgGrid2}>
            <Placeholder filename="table-lighters/rev1-concrete-polished.jpg" aspect="3/4" />
            <Placeholder filename="table-lighters/rev1-top-view.jpg" aspect="1/1" />
            <Placeholder filename="table-lighters/rev1-cork-stamp.jpg" aspect="3/4" />
            <Placeholder filename="table-lighters/rev1-tiktok.jpg" aspect="9/16" />
            <Placeholder filename="table-lighters/rev1-silicone-mould.jpg" aspect="4/3" />
            <Placeholder filename="table-lighters/rev1-3d-insert.jpg" aspect="4/3" />
          </div>
        </div>

        {/* ── FINAL PRODUCT ── */}
        <div style={S.section}>
          <div>
            <h2 style={S.sectionHeading}>FINAL PRODUCT</h2>
            <p style={S.body}>
              For this version I looked for a new material that could handle impact and was more environmentally friendly than concrete. I settled on aluminum — light, fully recyclable, and develops a unique patina with use. I made a mini version for individuals with small hands, and added a button that lets users poke the Bic out slightly from the bottom. I shifted from the stamped cork to wet-set debossed leather bases.
            </p>
            <p style={S.body}>
              I designed a new internal structure for the Bic that leverages the flex of 3D printed walls for a snug fit. The structure bolts into the aluminum body and houses the print-in-place magnetic button.
            </p>
            <p style={S.body}>
              I went through over 50 variations of the button, going between springs and magnets, because I wanted an interaction that was satisfying to use. The resulting button feel is addictive.
            </p>
            <p style={S.label}>Issues:</p>
            <ul style={S.ul}>
              <li>cost of machined aluminum higher than casted concrete - bringing the cost of the product up - worth it for the improved longevity.</li>
            </ul>
          </div>
          <div>
            <div style={{ ...S.imgGrid2, marginBottom: '8px' }}>
              <Placeholder filename="table-lighters/final-aluminum-pair.jpg" aspect="4/3" />
              <Placeholder filename="table-lighters/final-aluminum-side.jpg" aspect="4/3" />
            </div>
            <div style={{ ...S.imgGrid2, marginBottom: '8px' }}>
              <Placeholder filename="table-lighters/final-buttons-3d.jpg" aspect="1/1" />
              <Placeholder filename="table-lighters/final-leather-base.jpg" aspect="1/1" />
            </div>
            <div style={{ ...S.imgGrid1 }}>
              <Placeholder filename="table-lighters/final-technical-drawing.jpg" aspect="16/9" />
            </div>
          </div>
        </div>

        {/* ── FINAL PRODUCT large hero images ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '72px' }}>
          <Placeholder filename="table-lighters/final-hero-left.jpg" aspect="4/3" />
          <Placeholder filename="table-lighters/final-hero-right.jpg" aspect="4/3" />
        </div>

        {/* ── PACKAGING ── */}
        <div style={S.section}>
          <div>
            <h2 style={S.sectionHeading}>PACKAGING</h2>
            <p style={S.body}>
              The packaging starts the customer's hands-on interaction with the product; and in this case likely the company that made it.
            </p>
            <p style={S.body}>
              I wanted to design an unwrapping experience — the customer can either carefully remove the tabs, cradling the product like a baby chick, or rip through it in excitement to get to the object itself.
            </p>
            <p style={S.body}>
              The packaging says a lot: who made the product, where it was made, what it is, and a small message at the bottom: Crafted with pride by ACS.
            </p>
          </div>
          <div>
            <div style={{ ...S.imgGrid2, marginBottom: '8px' }}>
              <Placeholder filename="table-lighters/packaging-flat-layout.jpg" aspect="1/1" />
              <Placeholder filename="table-lighters/packaging-wrapped-side-a.jpg" aspect="1/1" />
            </div>
            <div style={S.imgGrid2}>
              <Placeholder filename="table-lighters/packaging-base-stamp.jpg" aspect="1/1" />
              <Placeholder filename="table-lighters/packaging-wrapped-side-b.jpg" aspect="1/1" />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
