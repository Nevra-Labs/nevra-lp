export const articles = [
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
