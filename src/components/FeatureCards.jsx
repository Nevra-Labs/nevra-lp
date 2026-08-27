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
    title: 'One score, from two histories.',
    body: 'Your wallet history and your bank cash flow, read together and resolved into a single number. Both sides count, so a thin file on one can be carried by the other.',
    Surface: ScoreSurface,
    wide: true,
  },
  {
    title: 'A line you can draw on.',
    body: 'Not a loan you take once. Draw any part of your limit, any time, and repay on your own schedule.',
    Surface: CreditLineSurface,
  },
  {
    title: 'Your rate falls as you repay.',
    body: 'Every on-time repayment moves your score, and your score sets your rate. Borrowing well makes borrowing cheaper.',
    Surface: RateSurface,
  },
  {
    title: 'Your keys stay yours.',
    body: 'Bank access is read-only and runs through Plaid. We never see your credentials, and never take custody.',
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
