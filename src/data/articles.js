export const articles = [
  {
    id: 'why-crypto-never-solved-credit',
    title: 'Why crypto never solved credit',
    category: 'Perspective',
    date: 'July 7, 2026',
    readTime: '5 min read',
    excerpt:
      'Fifteen years of financial innovation, and you still cannot borrow against your reputation onchain. Here is why credit stayed broken, and what it takes to fix it.',
    content: `
Crypto rebuilt almost every piece of finance. Payments, exchanges, market making, savings, derivatives: all of it runs onchain today, often better than the traditional version. Credit is the exception. Fifteen years in, the standard way to borrow against crypto is still to lock up more money than you take out.

That is not credit. That is a deposit with extra steps.

## The overcollateralization trap

DeFi lending works like this: post $150 of collateral, borrow $100. The protocol never needs to know who you are, because if you disappear, it simply keeps your collateral. Anonymity is preserved and the system stays solvent.

It is an elegant design, and it deserves credit for what it enabled: permissionless leverage, instant liquidity, composable money markets. But look at what it cannot do. It cannot lend to someone who needs money, because by definition you must already have more than you are asking for. The person overcollateralized lending serves best is the person who needs it least.

Real credit moves value in the other direction. It gives you access to money you do not have yet, priced against the likelihood that you will pay it back. That likelihood lives in your history, not in your wallet balance.

## Why nobody read the history

The strange part is that the history was always there. A wallet is the most honest financial record ever created. Every repayment, every liquidation, every position, timestamped and public, going back years. Traditional lenders would pay fortunes for data this clean.

So why did no one underwrite with it? Three reasons.

**Anonymity cuts both ways.** A wallet proves what happened, but not who it happened to. Without identity, a defaulter just opens a new wallet and starts fresh. Underwriting is pointless if the borrower can reset their record for free.

**One wallet is not one life.** People hold five wallets, three exchanges, and a bank account. Any single slice of that undersells them. Scoring one wallet is like scoring one of your pockets.

**The offchain half was invisible.** Salaries, rent, savings: the signals that carry most consumer lending live in bank accounts, not onchain. A lender reading only the chain sees half a borrower, and prices the missing half as risk.

Each gap was individually solvable, but solving all three at once meant combining identity verification, multi-wallet aggregation, and bank data in a single underwriting model. That is not a smart contract. That is a credit system.

## What fixing it actually takes

The pieces exist now. Identity can be verified once and bound to every wallet you own, so your history cannot be abandoned when it becomes inconvenient. Bank connections are read-only and standardized. Onchain data is indexed well enough to reconstruct years of behavior in seconds.

Put together, they produce something crypto has never had: a score. One number that reads your entire financial life, onchain and off, and answers the only question a lender actually has. Will this person pay it back?

With a score, the math changes. Collateral stops being a substitute for trust and becomes a complement to it. You post a fraction of what you draw, your rate reflects your record, and repaying on time makes the next draw cheaper. Behave well and the system notices. That feedback loop is the entire difference between a pawn shop and a bank.

## The part that stays crypto

None of this requires giving up what made crypto worth using. Your keys stay yours. Bank access stays read-only. The score updates from behavior you can see, not from a bureau you cannot argue with. Liquidation exists, but as a last resort after your rate and limit have already adjusted, not as the first and only response.

Credit was never going to be solved by another collateral ratio. It gets solved by reading the history that fifteen years of crypto quietly wrote. That is what we built Nevra to do.

If you want to see what your history is worth, the apply button is at the top of the page.
    `.trim(),
  },
]
