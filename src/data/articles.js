export const articles = [
  {
    id: 'what-goes-into-your-nevra-score',
    title: 'What goes into your Nevra score',
    category: 'Product',
    date: 'July 7, 2026',
    readTime: '4 min read',
    excerpt:
      'One number decides your rate and your credit line. Here is exactly what feeds it, what does not, and how to move it up.',
    content: `
Every lender scores you. Banks read your salary and your payment history. DeFi protocols read nothing at all, which is why they ask everyone for the same oversized collateral. Nevra sits in between: one score, built from both halves of your financial life, that decides how much you can draw and at what rate.

This post explains what actually goes into that number.

## The two halves of the score

Your Nevra score blends two data sources that have never been read together.

**Your onchain history.** Wallet age, repayment behavior on lending protocols, liquidation history, the depth and consistency of your activity. Ten thousand dollars that has moved through DeFi positions for four years says more about you than a fresh wallet holding the same amount.

**Your offchain cash flow.** Through a read-only bank connection, we look at income regularity, balance stability, and spending patterns. No credentials stored, no write access, no transaction-level snooping beyond what scoring requires.

Neither half is enough on its own. A crypto-native borrower often has a thin bank file and a rich wallet. A recent arrival to crypto has the opposite. Reading both means a thin file on one side can be carried by strength on the other.

## What moves the score up

The inputs are boring on purpose. The score rewards the same things a good underwriter would.

- Repaying draws on time, every time
- Keeping utilization comfortably below your limit
- A wallet that ages without liquidations
- Steady income landing in your linked account
- History: the longer we can read, the more we can trust

## What does not count

Just as important is what we ignore.

- **Token picks.** We do not care what you hold, only how you manage it.
- **Portfolio size alone.** A large balance with erratic behavior scores worse than a modest one managed well.
- **Your traditional credit score.** No FICO pull, no legacy bureaus. Your history speaks for itself.

## The score is alive

A credit bureau updates you monthly, from behind a wall. Your Nevra score updates as your behavior does. Repay a draw and it moves. Let a wallet age another quarter and it moves. The score card in your dashboard shows the number, the trend, and the exact factors pushing it in either direction, so improving it is never a guessing game.

Rates follow the same logic. As the score climbs, your rate drops and your credit line grows. There is no application to refill and no committee to convince. The system already knows.

## Why this matters

Overcollateralized lending treats every borrower as a stranger. Post 150 to borrow 100, no matter who you are or how you have behaved. That is not credit, it is a pawn shop with better branding.

A real score changes the deal. Post less than you draw, pay a rate you earned, and watch both improve as you do. That is the entire product, and the score is the engine under it.

If you want to see your own number, verification takes a few minutes. The apply button is at the top of the page.
    `.trim(),
  },
  {
    id: 'crypto-backed-loans-explained',
    title: 'How crypto-backed loans work',
    category: 'Education',
    date: 'June 28, 2026',
    readTime: '5 min read',
    excerpt:
      'Borrowing against your crypto holdings lets you access liquidity without selling. Here is everything you need to know before you apply.',
    content: `
Holding crypto long-term is a conviction trade. But life does not pause while markets mature: unexpected expenses arrive, opportunities knock, and sometimes you simply need cash. Selling your position means realising a taxable event and giving up future upside. Crypto-backed loans offer a third path.

## What is a crypto-backed loan?

A crypto-backed loan is a secured loan where your digital assets (Bitcoin, Ethereum, or other accepted collateral) serve as security. You deposit collateral, receive a cash or stablecoin disbursement, and repay principal plus interest over an agreed term. At repayment, your collateral is returned in full.

The lender never takes ownership of your assets outright. They hold them in custody as a lien, similar to how a bank holds a title deed during a mortgage.

## Why borrow instead of sell?

There are three strong reasons.

**You keep your upside.** If you believe your assets will appreciate, selling to cover a short-term need destroys that compounding. A loan lets you access value today and reclaim the full position tomorrow.

**Tax efficiency.** In most jurisdictions, a loan is not a taxable event. Selling is. The precise treatment depends on your country and situation (always consult a tax professional), but for many borrowers the difference is material.

**Speed.** On-chain collateral can be verified and locked in minutes. Nevra can disburse funds the same day your collateral is confirmed, compared to weeks for traditional secured lending.

## How does the Loan-to-Value ratio work?

The Loan-to-Value (LTV) ratio is the proportion of your collateral's current market value that you can borrow. If your collateral is worth €10,000 and Nevra offers a 60% LTV, you can borrow up to €6,000.

LTV matters for two reasons:

1. **Initial eligibility.** It determines how much you can access at origination.
2. **Margin calls.** If your collateral's value drops and LTV rises above a threshold (typically 80%), you will be asked to top up collateral or partially repay the loan to bring it back within limits.

Nevra monitors collateral value in real time and notifies you before a margin call is triggered, giving you time to act.

## What happens if I cannot repay?

In the event of default, the lender liquidates enough collateral to cover the outstanding balance. Any surplus is returned to you. This is why choosing a conservative LTV at origination matters: it gives you a buffer against volatility before liquidation territory is reached.

## Who is this for?

Crypto-backed loans are best suited for people who:

- Hold significant digital assets and want to avoid selling
- Have a short-to-medium-term cash need (months, not decades)
- Understand the volatility of their collateral and can manage margin risk
- Live in a jurisdiction where the product is available

## Getting started with Nevra

Nevra is designed for crypto-native borrowers who are comfortable managing a position. The application takes minutes, collateral is assessed on-chain, and funds move fast. There are no legacy banking forms, no branch visits, and no credit score checks. Your collateral speaks for itself.

If you are ready to access liquidity without losing your position, the apply button is at the top of the page.
    `.trim(),
  },
]
