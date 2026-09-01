import { useEffect } from 'react'
import Nav from '../components/Nav'
import '../responsive.css'

/* block.xyz/bitcoin/roadmap, in Nevra's palette: one dark sheet, one hairline
   between rows, a large title with its status and tags inline on the same
   baseline. Theirs opens each row into a detail panel; ours does not, so the
   rows are plain list items rather than buttons and everything worth knowing
   sits on the line itself. */

const UPDATED = 'Updated September 1, 2026'

/* Four horizons rather than three: live, announced, and vision are genuinely
   different promises, and collapsing the last two would read as a commitment
   to things that only exist in the whitepaper today. */
const GROUPS = [
  {
    status: 'progress',
    label: 'In progress',
    items: [
      { title: 'Closed beta, USDC loans on Solana', area: 'Borrow', when: 'Q3 2026' },
      { title: 'Small lines, no collateral, to learn real repayment', area: 'Risk', when: 'Q3 2026' },
      { title: 'Onchain score in the app', area: 'Underwriting', when: 'Q3 2026' },
    ],
  },
  {
    status: 'next',
    label: 'Next',
    items: [
      { title: 'KYC and AML, once', area: 'Compliance', when: 'Q4 2026' },
      { title: 'Bank linking to score income the chain cannot see', area: 'Underwriting', when: 'Q4 2026' },
      { title: 'A revolving line you draw against anytime', area: 'Borrow', when: 'Q4 2026' },
      { title: 'APR that falls after on-time repayments', area: 'Pricing', when: 'Q4 2026' },
      { title: 'Larger limits once default rates are observed', area: 'Risk', when: 'Q1 2027' },
      { title: 'Open lending, out of closed beta', area: 'GTM', when: 'Q1 2027' },
      { title: 'Ethereum, Base and Robinhood Chain', area: 'Chains', when: 'Q1 2027' },
    ],
  },
  {
    status: 'later',
    label: 'Later',
    items: [
      { title: 'Two-tranche USDC supply pool, senior and junior', area: 'Capital', when: '2027' },
      { title: 'Dutch-auction recovery with licensed collections', area: 'Recovery', when: '2027' },
      { title: 'Soulbound credit identity with ZK proofs', area: 'Identity', when: '2027' },
      { title: 'Underwriting on recurring income alone', area: 'Underwriting', when: '2027' },
      { title: 'Credit for businesses and DAOs', area: 'Vertical', when: '2027' },
      { title: 'Credit for autonomous agents', area: 'Vertical', when: '2027' },
      { title: 'A score and recovery layer offchain lenders can use', area: 'Vision', when: '2027' },
    ],
  },
  {
    status: 'shipped',
    label: 'Shipped',
    items: [
      { title: 'Onchain score v0, from wallet history in seconds', area: 'Underwriting', when: 'Q2 2026' },
      { title: 'Read-only wallet connection, Phantom and Solflare', area: 'App', when: 'Q2 2026' },
      { title: 'Email onboarding', area: 'App', when: 'Q2 2026' },
      { title: 'Whitepaper', area: 'Docs', when: 'Q2 2026' },
    ],
  },
]

export default function Roadmap() {
  useEffect(() => {
    document.title = 'Roadmap | Nevra'
    // The frame, the navbar and the page all read the same tokens, so one
    // class on the body turns the whole viewport dark instead of leaving a
    // light gutter around a dark sheet.
    document.body.classList.add('theme-dark')
    return () => {
      document.body.classList.remove('theme-dark')
      document.title = 'Nevra | Real credit for crypto-native people'
    }
  }, [])

  const total = GROUPS.reduce((n, g) => n + g.items.length, 0)

  return (
    <div className="roadmap-page">
      <Nav />

      <main className="roadmap">
        <header className="roadmap-head">
          <div>
            <h1 className="roadmap-title">Nevra Roadmap</h1>
            <p className="roadmap-lede">
              Stablecoin payroll already works. Credit against that income does not:
              banks cannot see it, and DeFi asks you to post more than you borrow.
              Here is what we are building to close that gap. {total} items, updated
              as they move.
            </p>
          </div>
          <span className="roadmap-updated">{UPDATED}</span>
        </header>

        {GROUPS.map(group => (
          <section key={group.status} className="roadmap-group">
            <div className="roadmap-group-head">
              <h2 className="roadmap-group-title">{group.label}</h2>
              <span className="roadmap-count">{group.items.length}</span>
            </div>

            <ul className="roadmap-list">
              {group.items.map(item => (
                <li key={item.title} className="roadmap-row">
                  <h3 className="roadmap-row-title">{item.title}</h3>
                  <span className={`roadmap-pill roadmap-status is-${group.status}`}>
                    <span className="roadmap-dot" aria-hidden />
                    {group.label}
                  </span>
                  <span className="roadmap-pill">{item.area}</span>
                  <span className="roadmap-pill roadmap-when">{item.when}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="roadmap-note">
          The beta is deliberately small: we would rather learn real repayment
          behaviour than post a large number. Everything under Later is designed
          in the whitepaper and not yet built. Dates are targets, not commitments,
          and nothing here is a credit offer.
        </p>
      </main>
    </div>
  )
}
