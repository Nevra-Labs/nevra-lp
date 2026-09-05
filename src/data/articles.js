export const articles = [
  {
    id: 'your-bank-cannot-read-your-paycheck',
    title: 'Your bank cannot read your paycheck',
    category: 'Perspective',
    date: 'September 5, 2026',
    readTime: '7 min read',
    excerpt:
      'The crypto credit conversation is always about collateral. The real gap sits upstream of it: millions of people earn verifiable income that no underwriting system knows how to open.',
    content: `
Someone earning eight thousand dollars a month in USDC, on time, every two weeks, for three years, gets declined for a credit card.

Not because the lender looked at the income and decided it was too small, or too volatile, or too risky. The lender never saw it. The income exists, it is verifiable, it is more auditable than almost any salary paid in dollars. It just does not arrive in a format any underwriting system knows how to open.

This is the part of the crypto credit problem nobody talks about. The conversation is always about collateral. The real gap is upstream of collateral. Before a lender can decide whether to trust you, it has to be able to read you. Millions of people earning real money are unreadable.

## How a lender actually reads income

Underwriting is not a judgment. It is a lookup.

When you apply for a loan, the system is not evaluating your character or your career. It is looking for a small set of specific artifacts, and it is checking whether they are present and consistent with each other.

It looks for a tax document that ties you to an employer. It looks for a bank account with recurring deposits that match that employer, in a predictable amount, on a predictable cadence, through a payment rail with a known counterparty. It looks for a file at a credit bureau that shows you have borrowed before and behaved a certain way. It looks for a duration on all of the above, because stability is measured in months of history, not in dollars.

Every one of those artifacts is a proxy. The tax document is a proxy for employment. The recurring deposit is a proxy for income. The bureau file is a proxy for repayment behavior. None of them are the underlying truth. They are the compressed, standardized representations of that truth, and the entire consumer credit system is built to read those representations and nothing else.

That system works extremely well for someone whose life produces those artifacts automatically. It fails completely for someone whose life produces the truth without the proxies.

## What stablecoin payroll looks like in that system

Now run a crypto-paid worker through the same lookup.

The tax document is missing or unrecognizable, because there is often no employer in the sense the form expects. The person is a contractor for a foundation, a DAO contributor, a freelancer paid by three protocols in four jurisdictions.

The bank deposits are missing, because the money never touched a bank. It landed in a wallet. If it eventually reaches a bank, it arrives as a lumpy off-ramp transfer from an exchange, which reads to the underwriter as an asset sale rather than as income. Selling assets is not a repayment source. It is a red flag.

The bureau file is thin or empty, because the person has been living outside the systems that report to bureaus.

The result is not a low score. Very often it is no score at all. And a lender confronted with no score does not price the risk higher. It declines, because declining is free and being wrong is not.

So the decline has almost nothing to do with the borrower's actual ability to repay. It is a formatting failure. The information a lender needs exists, in full, in higher resolution than a bank statement could ever provide. It is simply written in a language the reader does not speak.

## Thin file is not the same as no file

The credit industry has a name for people with little borrowing history: thin file. Roughly fifty million adults in the United States sit in that bucket, and there is a whole generation of fintechs built to serve them, mostly by looking at cash flow in a bank account instead of relying on the bureau alone.

Crypto-paid workers are a different category. They are not thin file. They are unformatted file.

The distinction matters because it changes what the fix is. A thin-file borrower needs a lender willing to look at a bank account instead of a bureau. The data is already in a readable place. Someone earning onchain needs something else entirely: a system that can read a new source and translate it into the same risk primitives the old system used. Not a more generous lender. A different reader.

This is why cash flow underwriting, on its own, does not solve it. Plaid on an empty checking account tells you very little about someone whose economic life happens somewhere else.

## What onchain income proves that a bank statement does not

Here is the part that should be obvious and somehow is not.

A bank statement is a summary produced by an intermediary. It tells you an amount and a date and a counterparty label that may or may not mean anything. You take the bank's word for it.

An onchain payment history is the primary record. You can verify that a specific address sent a specific amount to this person on a specific date, and you can do it yourself, without asking anyone's permission, going back years. You can check whether the sender is a real funded entity or a wallet created last week. You can see whether the payments have continued through a bear market. You can see whether the person holds the income or immediately spends it, whether they lever it, whether they have ever been liquidated.

For the specific question a lender is asking, which is whether money will keep arriving and whether this person handles obligations, an onchain record is not a worse input than a bank statement. It is a strictly better one. It is more granular, more verifiable, harder to fake, and available in real time rather than in monthly snapshots.

The reason nobody underwrites on it is not that the signal is weak. It is that reading it requires building an entirely new pipeline, and there is no regulatory or commercial pressure on incumbent lenders to build one for a population they do not believe is large enough yet.

We think they are wrong about the second part, and we are willing to do the first.

## How we read it

Nevra underwrites the income directly.

We verify identity, because a credit line to an anonymous address is not credit, it is a giveaway. Then we read the chain: how long income has been arriving, from where, how consistently, whether it survived a drawdown, and how the person has handled obligations onchain.

That is the entire input. We do not pull a credit score. We do not ask for a bank login. We do not weight a bureau file that someone else wrote and that we would simply have to trust. If it is not verified identity or onchain history, it does not enter the model.

That is a constraint, not a boast, and it costs us something. Someone whose onchain history is short is harder for us to read, even when the rest of their financial life is perfectly stable.

Neobank integrations are what close that gap, and they close it without walking the principle back. The accounts crypto-paid workers actually use are API-native and programmable, so the record they produce looks far more like a ledger than like a monthly statement: verifiable transaction by transaction, in real time, from the source rather than from a summary. Reading those directly would extend the same method to the part of someone's income that has already left the chain, instead of falling back on the proxies that failed to see them in the first place. It is the single change that would widen who we can underwrite the most.

From that we produce a line. The first lines are small on purpose. Not because we doubt the borrower, but because we doubt ourselves. No underwriting model is correct before it has seen repayments, and any lender who tells you otherwise is either lying or has not lost money yet. The line grows as the borrower repays, and repayment is recorded as a persistent, portable credit event rather than disappearing into our private database.

That is the whole product. Take income that already exists, make it legible, price it honestly, and let repayment compound into something the borrower owns.

## The bet

There is a version of the next ten years where a meaningful share of people are paid in stablecoins. Not because of ideology, but because it is faster, cheaper, and works across borders where the existing rails do not.

If that happens, the credit system as currently built simply does not see those people. Their income is real, their spending is real, their need to smooth cash flow between paydays is exactly as real as anyone else's, and the entire apparatus for extending them credit reads their financial life as a blank page.

Somebody has to write the reader.

---

*Nevra issues undercollateralized USDC credit lines underwritten on verified identity and onchain income. No credit score, no bank login. Lines are live in a small early cohort. If you are paid in stablecoins, [apply here](/apply).*
    `.trim(),
  },
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

**Income was invisible even when it was onchain.** Reading a balance is easy. Reading a salary means recognising that a particular address pays this person a particular amount on a particular cadence, and telling that apart from a transfer between someone's own wallets. Nobody had built that reader, so lenders fell back on the balance, which is the one thing that says nothing about whether you can repay.

Each gap was individually solvable, but solving all three at once meant combining identity verification, multi-wallet aggregation, and income detection in a single underwriting model. That is not a smart contract. That is a credit system.

## What fixing it actually takes

The pieces exist now. Identity can be verified once and bound to every wallet you own, so your history cannot be abandoned when it becomes inconvenient. Onchain data is indexed well enough to reconstruct years of behavior in seconds, and recurring income can be told apart from noise.

Put together, they produce something crypto has never had: a score. One number, built from verified identity and onchain history and nothing else, that answers the only question a lender actually has. Will this person pay it back?

With a score, the math changes. Collateral stops being a substitute for trust and becomes a complement to it. You post a fraction of what you draw, your rate reflects your record, and repaying on time makes the next draw cheaper. Behave well and the system notices. That feedback loop is the entire difference between a pawn shop and a bank.

## The part that stays crypto

None of this requires giving up what made crypto worth using. Your keys stay yours. Nothing about your bank is required, and no bureau is consulted. The score updates from behavior you can see and verify yourself, not from a file you cannot argue with. Liquidation exists, but as a last resort after your rate and limit have already adjusted, not as the first and only response.

Credit was never going to be solved by another collateral ratio. It gets solved by reading the history that fifteen years of crypto quietly wrote. That is what we built Nevra to do.

If you want to see what your history is worth, the apply button is at the top of the page.
    `.trim(),
  },
]
