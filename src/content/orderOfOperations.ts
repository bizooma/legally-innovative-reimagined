// All copy for /order-of-operations. Edit text here; layout lives in the page components.
// Inline **double asterisks** render as bold.

export type BodyBlock =
  | { type: "p"; text: string }
  | { type: "h4"; text: string };

export interface Pillar {
  num: string;
  title: string;
  claim: string;
  requires: string;
  unlocks: string;
  body: BodyBlock[];
  aside?: { label: string; text: string };
  move: string;
  signal: string;
}

export interface ChainNode {
  num: string;
  name: string;
  caption: string;
  longCaption: string;
}

export interface Blocker {
  label: string;
  text: string;
}

export interface ScheduleRow {
  issue: string;
  pillar: string;
  title: string;
  angle: string;
}

export const seo = {
  title: "Order of Operations | The Six-Pillar Law Firm Framework | Bizooma",
  description:
    "Six things a law firm has to build to survive AI, and the order they have to be built in. A sequenced framework with a 90-day move for each.",
  url: "https://bizooma.com/order-of-operations",
  author: "Joseph Murphy",
  publisher: "Bizooma",
};

export const hero = {
  eyebrow: "A Bizooma Framework",
  titleLead: "Order of",
  titleAccent: "Operations",
  lede: "Six things a law firm has to build to survive AI, and the order they have to be built in.",
  sub: "Most \u201cfuture of law\u201d frameworks hand you ten pillars and leave you to guess which one starts Monday. This is not a list. It is a dependency chain. Each pillar is only safe to build once the one before it exists, and skipping ahead produces exactly what most firms already have: a pilot nobody trusts, a knowledge base nobody updates, and a pricing model that quietly stopped working.",
  meta: ["Six pillars", "Built in sequence", "90-day move for each"],
};

export const chain = {
  heading: "The dependency chain",
  intro:
    "Two and three are sequential because an agent is only as trustworthy as the layer beneath it. Four runs parallel to three on the same foundation. Five needs a reason to exist and something to say. Six is last on purpose.",
  nodes: [
    { num: "01", name: "Pricing", caption: "The budget authorization", longCaption: "The budget authorization. Nothing else gets funded first." },
    { num: "02", name: "Knowledge", caption: "Craft plus outcome data", longCaption: "Craft layer plus outcome data. Needs 01 to be worth paying for." },
    { num: "03", name: "AI workforce", caption: "Internal, governed", longCaption: "Internal and governed. Needs 02 or it invents answers." },
    { num: "04", name: "Legibility", caption: "Outward, to machines", longCaption: "Outward, to machines. Runs parallel to 03 on the same foundation." },
    { num: "05", name: "Ownership", caption: "Audience and client", longCaption: "Audience and client relationship. Needs 01 and 04." },
    { num: "06", name: "Building", caption: "Last, and rarely", longCaption: "Custom software. Last on purpose, and rarely." },
  ] as ChainNode[],
};

export const argument = {
  eyebrow: "Why order matters more than the list",
  heading: "Every stalled AI program started in the middle.",
  paragraphs: [
    "The firms that tried first and got nothing almost all did the same thing: they bought a tool, pointed it at nothing in particular, and asked people to use it. The output needed so much checking that it was slower than doing the work. The pilot ended. The conclusion drawn was \u201cAI is overhyped,\u201d when the actual finding was **\u201cwe built the third floor before the second.\u201d**",
    "The same mistake runs the other direction too. Firms that start with custom software build an app on top of processes they have never measured, priced by a model they have not changed, filled with data they do not have. It gets used by four people and quietly dies.",
    "Sequence is the whole argument here. A knowledge layer without a pricing thesis is an unfunded hobby. An agent without a knowledge layer is a confident liar. A client portal without an owned audience is a feature nobody discovers. Custom software without measured workflows is a six-figure guess.",
    "What follows is six pillars, each with what it requires, what it unlocks, a move you can finish in ninety days, and the specific thing that tells you it worked. **No firm does all six in a year.** Most should be two pillars deep by the end of the next one, and that is a serious pace.",
  ],
};

const p = (text: string): BodyBlock => ({ type: "p", text });
const h4 = (text: string): BodyBlock => ({ type: "h4", text });

export const pillars: Pillar[] = [
  {
    num: "01",
    title: "Decide how you get paid",
    requires: "Nothing. Start here.",
    unlocks: "The budget for 02 through 06.",
    claim: "Pricing is not the last question. It is the budget authorization for everything else on this page.",
    body: [
      p("AI compresses the hours. That is the entire disruption, and it arrives as a revenue problem long before it arrives as a technology problem. A firm that bills hourly and gets thirty percent faster has just cut its own revenue thirty percent. Every efficiency you buy is a dollar you stop billing. **\u201cWe are piloting AI\u201d and \u201cwe bill by the hour\u201d cannot both be the plan for very long.**"),
      p("The fix is not abandoning the hour. It is moving a slice of revenue off it. Fixed fees on the work you have done two hundred times. Subscriptions for ongoing counsel. Monitoring retainers. Flat-rate compliance programs. Access tiers. Sell the outcome, the access, or the system, which are the things AI makes cheaper to deliver and no cheaper to value."),
      p("Contingency firms get a different version of this question, and should not pretend otherwise. If you are personal injury, your economics already decoupled fee from hours. Your version of pillar one is case selection and throughput: what a file actually costs to work today, what it would cost if intake and medical summarization took a third as long, and how many more files you could take without adding headcount."),
      h4("Why this is first"),
      p("Partnerships do not fund overhead. They fund revenue. Pillars two through six are capital expenditure against a return that does not exist until somebody names it, which is why they die in the budget meeting. Name the revenue thesis first and the rest becomes an investment with a number attached instead of an IT project with a champion."),
    ],
    move: "Pick one service line you have delivered at least fifty times. Pull the last twenty matters and chart actual hours against what you actually billed and collected. Publish a flat fee at the sixtieth percentile of that distribution. Instrument it from day one.",
    signal: "A prospective client can learn one of your prices without talking to you first.",
  },
  {
    num: "02",
    title: "Build the knowledge layer, and the outcome data under it",
    requires: "01.",
    unlocks: "03, 04, and honest pricing in 01.",
    claim: "Two assets, not one. Almost every firm builds the easy half and calls it done.",
    body: [
      p("Every firm has decades of work product scattered across SharePoint, Outlook, a shared drive nobody has pruned since 2014, and three partners\u2019 memories. Consolidating it into something retrievable is pillar two\u2019s obvious half: the briefs, the templates, the winning arguments, the deposition outlines, the intake checklists, the CLE material, the standard answers to the standard questions."),
      p("The half firms skip is the **outcome data**. Not the documents, the facts about what happened. What this matter type actually costs to run. How long it actually takes, end to end, including the waiting. What it settled for, in front of which judge, against which carrier, with which fact pattern, at which stage. That is the asset with real economic value, and it is the one that exists nowhere until you decide to capture it, because no system you own was designed to record it."),
      p("Notice the loop back to pillar one. You cannot price a fixed fee responsibly without this. Everyone who has ever lost money on flat work lost it because they priced from memory instead of from a distribution. The outcome layer is what turns pillar one from a gamble into underwriting."),
      h4("Governance goes in at the foundation"),
      p("Not bolted on in year two. Before the first document lands: who can retrieve what, what your ethical walls look like inside a retrieval system that does not understand walls by default, what leaves the building and under whose terms, how long things are kept, and what gets verified before it reaches a client. ABA Formal Opinion 512 sets the floor on competence, confidentiality, supervision, and fees. Your own state bar\u2019s opinions sit on top of it and are frequently narrower, so read yours rather than the national summary."),
    ],
    move: "Pick your highest-volume matter type. Capture ten structured fields on every file opened from here forward. Not retroactively, because that project never finishes and its failure will be used as evidence the whole idea was wrong. Ten fields, every new matter, no exceptions.",
    signal: "You can answer \u201cwhat does this usually cost and how long does it usually take\u201d with a distribution instead of a senior partner\u2019s recollection.",
  },
  {
    num: "03",
    title: "Put the AI workforce to work, on a leash",
    requires: "02.",
    unlocks: "The capacity that pays for 05 and 06.",
    claim: "This is where nearly every firm starts, and it is the single best explanation for why nearly every firm\u2019s program stalled.",
    body: [
      p("An assistant pointed at the open internet and a partner\u2019s vague prompt produces confident, plausible, unsourced work. Checking it costs more than doing it. That is not a verdict on the technology, it is a verdict on the inputs. **The same assistant pointed at your own governed corpus produces something a supervising attorney can actually verify against a citation**, which is the only version that survives contact with a real matter."),
      p("The realistic roster is narrower and duller than the hype: intake triage, matter opening, first-pass document review, research memo drafting, client status updates, billing narrative review, follow-up sequencing, regulatory and competitive monitoring. Each one gets a named human owner, a defined checkpoint, and a log. Not a committee, a name."),
      p("The governance here is not an IT policy. It is a supervision problem with a bar number attached. The live risk at most firms right now is not a rogue agent, it is staff on consumer accounts: client confidences typed into a chat window governed by somebody\u2019s personal terms of service, with no retention policy, no audit trail, and no way to answer a malpractice carrier\u2019s question about what happened. Approved systems, scoped permissions, logged use, documented verification, trained people, assessed vendors. Then you can go fast."),
    ],
    aside: {
      label: "On the audit",
      text: "Do not run a survey. A survey gets you the answer people think you want. Check expense reports, browser extensions, and the SSO log. You will find more than you expect, and the finding is the start of the policy, not a disciplinary matter.",
    },
    move: "Audit what your people are already using. Then approve two tools, retire the rest, and write the one-page acceptable-use policy before you build a single agent.",
    signal: "You can produce a log of every AI-assisted work product from last month and the name of the person who reviewed each one.",
  },
  {
    num: "04",
    title: "Make the firm legible to machines",
    requires: "02.",
    unlocks: "The demand that makes 05 worth owning.",
    claim: "Findable, citable, callable. Three different jobs, increasing in difficulty and in defensibility. Most firms attempt the first and stop.",
    body: [
      p("Search is becoming a conversation held without you in the room. The question is no longer whether you rank for \u201cJacksonville probate lawyer.\u201d It is whether, when somebody asks an assistant what to do about their mother\u2019s estate, your attorney is part of the answer."),
      p("**Findable** is table stakes: consistent entity data, structured markup, clean and identical profiles everywhere, an attorney who resolves to the same person across every source, questions answered in the language clients actually use rather than the language the statute uses."),
      p("**Citable** is the real work: original research, named experts, third-party corroboration. This is where the book goes, and the book is not the asset. A self-published title nobody references moves nothing. What moves a machine\u2019s association between a problem and a person is the citation graph the book produces, the press that covers it, the podcasts that book the author, the bar journals that review it, the sites that link to it as a source. Write the book to get cited, not to have written a book. An annual report with real proprietary numbers in it often gets cited harder than a book and takes a tenth as long."),
      p("**Callable** is the frontier, and it is where pillar two pays off a second time: eligibility checkers, deadline calculators, jurisdiction-specific lookups, case-readiness assessments, document analyzers, intake endpoints. As assistants shift from answering questions to taking actions, you want to be something they can invoke, not only something they can quote."),
    ],
    move: "Ask four different assistants the five questions your firm should own. Record not only whether you appear, but what they cite instead. Those citations are your actual competitive set, and they are usually not the firms you thought you were competing with.",
    signal: "You are the source the answer rests on, not an alternative listed at the end of it.",
  },
  {
    num: "05",
    title: "Own the relationship after the click",
    requires: "01 and 04.",
    unlocks: "The margin that funds 06.",
    claim: "Rent the first interaction. Own the second.",
    body: [
      p("Two sides of one problem. On the prospect side, most firms rent every relationship they have. The click is bought, the lead is bought, the directory listing is rented, and when the auction price rises the pipeline falls. The fix is not abandoning paid acquisition, it is converting every rented interaction into something owned: a subscriber, a reader, an attendee, a portal account, a referral relationship, a phone number with permission attached."),
      p("On the client side, the experience most firms deliver is call, email, PDF, signature request, invoice, silence. Clients do not know what is happening, and the only way to find out is to interrupt somebody who bills by the hour. A portal with real status, document upload, a plain-language explanation of what the next step means, proactive alerts, and a message thread changes the relationship from \u201ccall us when something happens\u201d to continuous presence. It also removes a meaningful share of the status calls nobody was billing for anyway."),
      p("One thing worth saying out loud, because the frameworks never do: **this is a new attack surface on the most sensitive data you hold.** Firms are targeted precisely because privileged material is leverage. A portal, a knowledge base, and a fleet of agents together multiply what a single intrusion is worth. Budget the security work as part of the build, not as a phase two that never arrives."),
    ],
    move: "Take the single most common \u201cwhat is happening with my case\u201d question and make it self-serve. One question, done properly, beats a full portal nobody logs into.",
    signal: "You can state what share of this month\u2019s new matters came from an audience you own rather than one you rented.",
  },
  {
    num: "06",
    title: "Build only what you cannot buy",
    requires: "03 and 05.",
    unlocks: "Advantage that compounds.",
    claim: "Buy. Configure. Then, rarely, build. This is the pillar every other framework puts first, and it is the one that wastes the most money when attempted early.",
    body: [
      p("Firms should not build their practice management system, their document management, their accounting, or their email. Those problems are solved, and the solved version is better than yours will be. Anything that is a commodity stays a commodity."),
      p("What is worth building is the narrow thing that is genuinely yours and genuinely absent from every vendor\u2019s roadmap: the workflow you run two hundred times a year that no product models. A medical treatment tracker. A beneficiary document-collection flow. A case-readiness scorer. A referral routing portal. These are usually thin, a few screens over the data you started capturing in pillar two, and the thinness is the point."),
      p("Here is the part nobody writing these frameworks will tell you. **Most internal software dies.** Not some of it. Most. It gets built by an enthusiastic partner, used by four people, abandoned when the champion gets busy, and maintained by nobody. That is not an argument against building. It is an argument for writing the kill criteria down before the first line of code, and for sizing the budget around the death rate rather than around the success story."),
      p("That is what makes this an R&D function rather than a project. A fixed monthly number, a named owner, and a quarterly cycle: one expensive workflow, one bad client experience, one new distribution channel, one product idea. Prototype all four. Kill three on purpose."),
    ],
    move: "Write down the one process you run most often that no software you own models. Run it manually, on paper, with a stopwatch, ten times. If it still hurts, build the thinnest possible version. If it stopped hurting, you just saved six figures by holding a stopwatch.",
    signal: "You killed something on schedule. Killing on schedule is the signal the function is real; a one hundred percent success rate means you are not trying anything.",
  },
];

export const blockersIntro = {
  eyebrow: "The part that is not a pillar",
  heading: "Four things that kill all six",
  lede: "None of these are technology problems, which is exactly why frameworks leave them out and firms keep hitting them.",
};

export const blockers: Blocker[] = [
  { label: "Compensation", text: "Origination-based formulas punish precisely this behavior. Every dollar into a knowledge layer, a portal, or an R&D budget comes out of this year\u2019s distribution, and the partner who funds it is rarely the partner who captures the return. **This is the actual reason these programs stall, not a shortage of vision.** If nothing in your compensation model rewards building a firm asset, nothing on this page survives its second budget meeting. Fix that first, or read this as a list of things that will not happen." },
  { label: "Ownership", text: "Each pillar needs a name next to it. A person, with time allocated and the answer expected of them. **\u201cThe technology committee\u201d is where initiatives go to be discussed quarterly until they expire.**" },
  { label: "Verification debt", text: "Every pillar above produces more output that a licensed human has to check. Add capacity without adding checking capacity and you have built a malpractice generator with excellent throughput. **The checkpoint is part of the workflow**, not a step somebody performs when they have a spare afternoon." },
  { label: "Patience", text: "Pillars two and four compound over years and show almost nothing in the first quarter. Firms that measure them quarterly cancel them in the second, usually right before the curve turns. Pick the metric that moves in year one and the metric that matters in year three, and say which is which out loud when you fund it." },
];

export const scheduleIntro = {
  eyebrow: "Route to Results",
  heading: "Where this goes from here",
  intro: "The rest of this year\u2019s newsletter works through the chain one link at a time. Each issue takes one pillar and goes deeper than a framework page can: the numbers, the failure modes, and the firms that got it right or expensively wrong.",
  linkLabel: "Subscribe to Route to Results",
  linkHref: "/route-to-results-newsletter",
};

export const schedule: ScheduleRow[] = [
  { issue: "Oct 13", pillar: "\u2014", title: "Your AI pilot did not fail. It started in the middle.", angle: "Launch the chain. The sequence argument, and why ten pillars means zero." },
  { issue: "Oct 20", pillar: "01", title: "The hour is the disruption", angle: "Efficiency as a revenue cut. Why pricing comes before technology." },
  { issue: "Oct 27", pillar: "01", title: "How to price flat work without losing money on it", angle: "The twenty-matter exercise. Pricing from a distribution, not a memory." },
  { issue: "Nov 3", pillar: "02", title: "The half of your knowledge base nobody builds", angle: "Outcome data as the asset. Ten fields, every new matter." },
  { issue: "Nov 10", pillar: "02", title: "Ethical walls do not survive a search box", angle: "Governance at the foundation. Opinion 512 as a floor, not a ceiling." },
  { issue: "Nov 17", pillar: "03", title: "What your staff is already doing with AI", angle: "The audit that is not a survey. Consumer accounts as the live risk." },
  { issue: "Nov 24", pillar: "03", title: "Ten agents worth building, and who owns each one", angle: "The dull, realistic roster. Checkpoints and logs by name." },
  { issue: "Dec 1", pillar: "04", title: "Ask four assistants about your practice area", angle: "Running the test live. Reading the citations as a competitive set." },
  { issue: "Dec 8", pillar: "04", title: "Write the book to get cited, not to have written it", angle: "The citation graph is the asset. Why the annual report may beat the book." },
  { issue: "Dec 15", pillar: "05", title: "Rent the first interaction, own the second", angle: "Converting paid clicks into owned relationships. The portal as deflection." },
  { issue: "Dec 22", pillar: "06", title: "Why most law firm software dies", angle: "Kill criteria up front. Budgeting around the death rate." },
  { issue: "Dec 29", pillar: "\u2014", title: "The comp problem", angle: "The four blockers, and what to put in the January partner meeting." },
];

export const close = {
  heading: "Two pillars deep by the end of next year is a serious pace.",
  paragraphs: [
    "Not six. Two. A firm that has moved one service line off the hour and started capturing structured outcome data on its highest-volume matter type is further along than a firm with an AI committee, a pilot, and a strategy deck.",
    "The chain is the point. Find the last link you actually finished, and start on the next one.",
  ],
  signature: "Bizooma \u00b7 Where Marketing Meets Code + AI \u00b7 Jacksonville, FL",
};
