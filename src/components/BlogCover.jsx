/* Article covers use the same dark photograph as the feature panels, the
   calculator field and the How it works panel, cropped differently per
   article. The earlier version drew glowing orbit rings in violet and blue,
   which was both off-palette and the only place on the site with a hue. */

const CROPS = [
  { position: '50% 30%', size: 'cover' },
  { position: '12% 22%', size: '180%' },
  { position: '72% 78%', size: '150%' },
]

export default function BlogCover({ variant = 0, featured = false }) {
  const crop = CROPS[variant % CROPS.length]

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#0B0C0F',
      backgroundImage: "url('/img/panel.jpg')",
      backgroundSize: featured ? 'cover' : crop.size,
      backgroundPosition: crop.position,
    }}>
      <div style={{
        position: 'absolute',
        top: 20,
        left: 24,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(255, 255, 255, 0.55)',
      }}>
        Nevra
      </div>
    </div>
  )
}
