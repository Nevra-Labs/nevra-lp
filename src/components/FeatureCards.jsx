import { ScoreSurface, CreditLineSurface, RateSurface, SourcesSurface } from './surfaces'

/* apxlending.com's "Why APX Lending?" cards, measured: 407px wide, white,
   1px #EFEFEF border, 12px radius, padded 0 4px 4px so the media inset sits
   4px inside the card edge. Copy block padded 24px, heading 24px/400, body
   16px at #666668.

   APX fills the media with a saturated blue gradient and floats a screenshot
   of the app on it. We stay monochrome per the brand: the same gradient in
   near-black with a diagonal sweep, and the live product surface floating on
   it instead of a screenshot. */

const CARDS = [
  {
    title: 'One payroll score.',
    body: 'Your recurring USDC and USDT inflows resolve into a single number a lender can act on. No FICO file, no bank history.',
    Surface: ScoreSurface,
    wide: true,
  },
  {
    title: 'A line you can draw on.',
    body: 'Not a loan you take once. Draw any part of your limit, any time, and repay from your next paycheck.',
    Surface: CreditLineSurface,
  },
  {
    title: 'Your score rises as you repay.',
    body: 'Every on-time repayment from your salary moves your score up, and your score sets your rate. Borrowing well makes it cheaper.',
    Surface: RateSurface,
  },
  {
    title: 'Your keys stay yours.',
    body: 'You connect read-only and stay non-custodial. We never take your keys or your funds.',
    Surface: SourcesSurface,
  },
]

export default function FeatureCards() {
  return (
    <div className="feature-grid">
      {CARDS.map(({ title, body, Surface, wide }) => (
        <article key={title} className={`feature-card ${wide ? 'feature-card-wide' : ''}`}>
          <div className="feature-card-text">
            <h3 className="feature-card-title">{title}</h3>
            <p className="feature-card-body">{body}</p>
          </div>

          <div className="feature-media">
            <div className="feature-surface">
              <Surface />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
