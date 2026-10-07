// All copy for /order-of-operations/nonprofits. Mirrors src/content/orderOfOperations.ts.
// Inline **double asterisks** render as bold.
import type { Pillar, ChainNode, Blocker, BodyBlock } from "./orderOfOperations";

export const seo = {
  title: "Order of Operations for Nonprofits | The Six-Pillar Framework | Bizooma",
  description:
    "Six things a nonprofit has to build to make AI count for something, and the order they have to be built in. A sequenced framework with a 90-day move for each.",
  url: "https://bizooma.com/order-of-operations/nonprofits",
  author: "Joseph Murphy",
  publisher: "Bizooma",
};

export const hero = {
  eyebrow: "A Bizooma Framework \u00b7 For Nonprofits",
  titleLead: "Order of",
  titleAccent: "Operations",
  lede: "Six things a nonprofit has to build to make AI count for something, and the order they have to be built in.",
  sub: "This is the same framework we publish for law firms, with one pillar turned inside out. For a firm, AI efficiency is a threat to revenue. For you it is the only new program budget you are likely to get this year \u2014 and the whole question is whether you spend it on purpose.",
  meta: ["Six pillars", "Built in sequence", "90-day move for each"],
};

export const chain = {
  heading: "The dependency chain",
  intro:
    "Two and three are sequential because an assistant is only as trustworthy as the material underneath it. Four runs parallel to three on the same foundation. Five needs a reason to exist and something to say. Six is last on purpose.",
  nodes: [
    { num: "01", name: "Capacity", caption: "Where the freed hours go", longCaption: "Where the freed hours go. Decide before you automate." },
    { num: "02", name: "Knowledge", caption: "Craft plus outcome data", longCaption: "Craft layer plus outcome data. The half funders keep asking for." },
    { num: "03", name: "AI workforce", caption: "Internal, governed", longCaption: "Internal and governed. Needs 02 or it invents answers." },
    { num: "04", name: "Legibility", caption: "Outward, to machines", longCaption: "Outward, to machines. Runs parallel to 03 on the same foundation." },
    { num: "05", name: "Ownership", caption: "Donors and the people you serve", longCaption: "Donors and the people you serve. Needs 01 and 04." },
    { num: "06", name: "Building", caption: "Last, and rarely", longCaption: "Custom software. Last on purpose, and rarely." },
  ] as ChainNode[],
};

export const argument = {
  eyebrow: "Why order matters more than the list",
  heading: "Efficiency that nobody allocated is efficiency nobody funds again.",
  paragraphs: [
    "Most AI advice written for nonprofits is a list of tools and a promise about time saved. The time saved is real. What almost never gets decided is where it goes \u2014 and hours that are not allocated in advance get quietly reabsorbed into email, meetings and the work that was already late.",
    "A year later nobody can point to what the efficiency bought. The next request for budget, or for a staff member\u2019s time to run the next phase, has no evidence behind it. The program did not fail because the technology failed. It failed because nobody wrote down what the hours were for.",
    "Sequence is the rest of the argument. A knowledge layer without a capacity decision is an unfunded side project. An assistant without a knowledge layer is a confident liar. A donor portal without an owned audience is a feature nobody discovers. Custom software without measured workflows is a grant you will wish you had spent on staff.",
    "What follows is six pillars, each with what it requires, what it unlocks, a move you can finish in ninety days, and the thing that tells you it worked. No organization does all six in a year. Two pillars deep by the end of the next one is a serious pace.",
  ],
};

const p = (text: string): BodyBlock => ({ type: "p", text });
const h4 = (text: string): BodyBlock => ({ type: "h4", text });

export const pillars: Pillar[] = [
  {
    num: "01",
    title: "Decide where the freed hours go",
    requires: "Nothing. Start here.",
    unlocks: "The case for funding 02 through 06.",
    claim: "For a law firm, AI efficiency is a threat to revenue. For you it is the only new program budget you are likely to get this year.",
    body: [
      p("A firm that bills by the hour and gets thirty percent faster has cut its own revenue thirty percent. That is the forcing function behind every decision a law firm makes about this technology, and it is genuinely frightening for them. You do not have that problem. Grants and gifts do not shrink because your team got faster. Every hour you free is an hour you keep."),
      p("That is better news than the sector usually gets, and it comes with a trap. Capacity that is freed without being allocated does not become a new program. It becomes more email, longer meetings, and the backlog that was already there. The grants manager who saves six hours a week does not start a new initiative with them unless someone decided, in advance and in writing, that she would."),
      p("So pillar one is not a pricing decision, the way it is for a firm. It is an allocation decision, and it has to happen before the automation, not after. Name the program, the expansion, the fundraising activity or the role those hours will fund. Attach a person to it. Put it where your board and your funders can see it."),
      h4("Why this is first"),
      p("Because it is also your funding argument. Infrastructure is the hardest thing in this sector to get paid for, and \u201cwe became more efficient\u201d has never moved a funder. \u201cAutomating intake freed four hours a week, which is how we added Saturday hours\u201d is a different sentence, and it is the one that funds pillars two through six. If you cannot say what the efficiency bought, you will not be given more."),
    ],
    move: "Pick one task your team repeats weekly. Measure the hours it actually consumes this month \u2014 measure, do not estimate. Then write down, with a name attached, what those hours will do instead once it is automated. One sentence, where your board can see it.",
    signal: "You can describe what a specific automation bought in programs, services or dollars raised \u2014 not in hours saved.",
  },
  {
    num: "02",
    title: "Build the knowledge layer, and the outcome data under it",
    requires: "01.",
    unlocks: "03, 04, and every grant report you will write.",
    claim: "Funders have been asking for outcomes for a decade. Most organizations still answer with activity counts.",
    body: [
      p("Every nonprofit has years of material scattered across a shared drive, a staff member\u2019s inbox and the memory of whoever has been there longest. Program descriptions, eligibility criteria, intake scripts, grant boilerplate, the standard answers to the standard questions, the policies, the reporting language that worked last time. Consolidating that into something retrievable is pillar two\u2019s obvious half, and it pays off immediately in grant writing alone."),
      p("The half that gets skipped is the outcome data. Not what you did \u2014 what changed. Not meals served, but what happened to the families who received them. Not attendance, but where a participant was six and twelve months later. That is the asset with real value, and it exists nowhere until you decide to capture it, because no system you own was designed to record it."),
      p("The payoff here is more direct than it is for a law firm. Every serious funder asks for outcomes, most organizations answer with activity because it is what they can produce, and the ones that can answer properly are the ones who get renewed. The outcome layer is not a reporting chore. It is the difference between a grant and a relationship."),
      h4("Governance goes in at the foundation"),
      p("Not bolted on later. Beneficiary data is frequently more sensitive than donor data, and if you serve minors, people in crisis, or anyone whose circumstances could harm them if disclosed, assume a higher bar than your sector peers apply. Before the first record lands: who can retrieve what, what leaves the building and under whose terms, how long it is kept, what gets verified before it reaches a funder or a board packet, and what your grant agreements already say about where data may be processed. Read those clauses. Most people have not."),
    ],
    move: "Pick your highest-volume program. Capture ten structured fields on every participant from here forward. Not retroactively \u2014 that project never finishes, and its failure gets used as evidence the whole idea was wrong. Ten fields, every new participant, no exceptions.",
    signal: "You can answer \u201cwhat changed for the people we served\u201d with data rather than an anecdote about one person.",
  },
  {
    num: "03",
    title: "Put the AI workforce to work, on a leash",
    requires: "02.",
    unlocks: "The capacity that pays for 05 and 06.",
    claim: "The failure mode is identical to the one law firms hit. You have fewer people available to catch it.",
    body: [
      p("An assistant pointed at the open internet and a vague prompt produces confident, plausible, unsourced work. Checking it costs more than doing it yourself. That is not a verdict on the technology, it is a verdict on the inputs. The same assistant pointed at your own programs, your own eligibility rules and your own reporting language produces something a staff member can actually verify \u2014 which is the only version that survives a real grant deadline."),
      p("The realistic roster is narrower and duller than the sector\u2019s conference agenda suggests: donor acknowledgement and segmentation, grant research and first drafts, volunteer scheduling and reminders, answering the same program questions without a person doing it each time, intake triage, impact report drafting, board packet preparation. Each one gets a named human owner, a defined checkpoint, and a log. Not a committee, a name."),
      p("The governance driver is different from a law firm\u2019s but no softer. You are handling donor records, beneficiary information that may be health- or minor-adjacent, and grant agreements that sometimes restrict where data can be processed. The live risk is not a rogue agent, it is staff and volunteers on personal consumer accounts: beneficiary details typed into a chat window governed by someone\u2019s individual terms of service, with no retention policy and no audit trail. That is a smaller team improvising, which is more exposure, not less."),
    ],
    aside: {
      label: "On the audit",
      text: "Do not run a survey. A survey gets you the answer people think you want. Check the expense reports, the browser extensions, and what volunteers are using on their own devices. You will find more than you expect, and the finding is the start of a policy, not a disciplinary matter.",
    },
    move: "Audit what staff and volunteers are already using. Then approve two tools, retire the rest, and write the one-page acceptable-use policy before you build a single workflow.",
    signal: "You can produce a log of every AI-assisted piece of work from last month and the name of the person who reviewed it.",
  },
  {
    num: "04",
    title: "Make the organization legible to machines",
    requires: "02.",
    unlocks: "The demand that makes 05 worth owning.",
    claim: "Two different people are asking an assistant about you: someone who needs help, and someone deciding where to give. You are probably invisible to both.",
    body: [
      p("Search is becoming a conversation held without you in the room. Someone describes their situation \u2014 behind on rent, caring for a parent, looking for an after-school place \u2014 and an assistant answers. Whether your organization is in that answer is now a more important question than where you rank for your own name."),
      p("**Findable** is table stakes: consistent information everywhere, structured data, clean profiles, and programs described in the words people actually use. Someone types \u201chelp paying rent\u201d, not \u201cemergency financial assistance program\u201d. The gap between your language and theirs is the single most common reason a nonprofit is invisible to the people it exists to serve."),
      p("**Citable** is the real work, and nonprofits are sitting on more of it than they realize. You have program knowledge, population expertise and outcome data that nobody outside your sector has written down in a form anything can cite. Most of it is locked in annual report PDFs that nothing links to. An annual outcomes report, published as a page rather than a download, cites harder than almost anything else you could write."),
      p("**Callable** matters more here than it does for law firms, and this is where pillar two pays off twice. Eligibility checkers. Service finders. Document-readiness tools. Application status lookups. \u201cAm I eligible\u201d is the most common question you get and the most expensive one to answer by phone, and it is exactly the kind of thing an assistant can be given the ability to answer on your behalf."),
    ],
    move: "Ask four different assistants the five questions someone who needs your help would ask, and the five a funder researching your cause would ask. Record not only whether you appear, but who gets cited instead. That list is your real competitive set, and it is usually not the organizations you benchmark against.",
    signal: "You are the source the answer rests on, not an alternative mentioned at the end of it.",
  },
  {
    num: "05",
    title: "Own the relationship after the click",
    requires: "01 and 04.",
    unlocks: "The margin that funds 06.",
    claim: "Rent the first interaction. Own the second.",
    body: [
      p("Two sides, same problem. On the donor side, most organizations rent every relationship they have. The ad is bought, the giving-day platform takes its cut and keeps the relationship, the event list lives in someone\u2019s spreadsheet. When the platform changes its terms or the ad price rises, the pipeline falls and nothing was accumulating underneath."),
      p("The fix is not abandoning paid acquisition or platforms. It is converting each rented interaction into something you own: an email subscriber, a recurring gift, a portal account, a volunteer, a monthly donor who did not need to be re-acquired. Acquisition is the expensive half and retention is the cheap half, and the sector reliably invests in the wrong one \u2014 because acquisition is visible in a campaign report and retention is not visible anywhere unless you build the thing that shows it."),
      p("On the service side, the people you serve usually have the worst experience of anyone who interacts with you. Call during office hours, wait, explain the situation again to whoever answers, call back to find out what happened. A portal with application status, document upload, plain-language explanations of what the next step means, and proactive updates changes that \u2014 and removes a meaningful share of calls your team is absorbing unfunded."),
      p("One thing worth saying out loud: this is a new attack surface on data about people who cannot afford a breach. Donor records plus beneficiary information plus a fleet of assistants multiplies what a single intrusion is worth, and nonprofits are targeted precisely because attackers assume the defenses are thin. Budget the security work into the build, not into a phase two that never arrives."),
    ],
    move: "Take the single most common \u201cwhat is happening with my application\u201d or \u201cdid my gift go through\u201d question and make it self-serve. One question answered properly beats a portal nobody logs into.",
    signal: "You can state what share of this month\u2019s giving came from an audience you own rather than one you rented.",
  },
  {
    num: "06",
    title: "Build only what you cannot buy",
    requires: "03 and 05.",
    unlocks: "Advantage that compounds.",
    claim: "Buy. Configure. Then, rarely, build. And in this sector, \u201cfree\u201d is the most expensive word in the sentence.",
    body: [
      p("You should not build your CRM, your accounting, your email, or your donation processing. Those are solved, the solved versions are better than yours will be, and most of them have nonprofit pricing."),
      p("The sector-specific trap is different from a law firm\u2019s. It is the donated or deeply discounted enterprise platform that arrives free and costs you a staff member. A system you cannot configure without a consultant is not free; it has a salary attached, paid in someone\u2019s time rather than in license fees. Count that cost before you accept the grant of software, not after it has become the thing nobody can leave."),
      p("What is worth building is the narrow thing that is genuinely yours and absent from every vendor\u2019s roadmap: eligibility screening against your specific program rules, a volunteer matching flow that reflects how you actually schedule, a document-collection process for the particular paperwork your participants struggle with. These are thin \u2014 a few screens over the data you started capturing in pillar two \u2014 and the thinness is the point."),
      p("Here is the part nobody writes down. Most internal software dies. Not some of it, most. And it dies faster in this sector, because the champion is usually one staff member, and when that person leaves, the thing they built becomes an unmaintained dependency nobody understands. That is not an argument against building. It is an argument for writing the kill criteria before the first line of code, and for never building anything that only one person can run."),
    ],
    move: "Write down the one process you run most often that no software you own models. Run it manually, on paper, with a stopwatch, ten times. If it still hurts, build the thinnest possible version \u2014 and name the second person who will know how it works. If it stopped hurting, you just saved a grant.",
    signal: "You killed something on schedule, and nothing you kept depends on a single person.",
  },
];

export const blockersIntro = {
  eyebrow: "The part that is not a pillar",
  heading: "Four things that kill all six",
  lede: "None of these are technology problems, which is exactly why the conference sessions leave them out and organizations keep hitting them.",
};

export const blockers: Blocker[] = [
  { label: "Restricted funding", text: "This is the structural blocker, and it is the sector\u2019s version of a law firm\u2019s compensation problem. Grant money is restricted to programs. Everything on this page is infrastructure, which is the category funders have spent decades declining to pay for. The programs stall for budget reasons, not vision reasons. You have three options and only three: name this work inside a program grant where it honestly belongs, fund it from unrestricted revenue, or find a funder who already understands capacity building. Pretending it will happen in the margins is the fourth option and it is the one most organizations pick." },
  { label: "Ownership", text: "Each pillar needs a name beside it. A person, with hours allocated and the answer expected of them. In a nonprofit the default is that everything lands on the executive director, which is the same as nobody owning it. \u201cWe\u2019ll look at it as a team\u201d is where initiatives go to be discussed quarterly until they expire." },
  { label: "Verification debt", text: "Every pillar above produces more output that a human has to check, and you have fewer humans than the firms do. Add capacity without adding checking capacity and you have built a machine for sending confident, wrong information to funders and the people you serve. The checkpoint is part of the workflow, not something a staff member does when they have a spare afternoon." },
  { label: "Board patience", text: "Pillars two and four compound over years and show almost nothing in the first quarter. Boards measure quarterly, turn over every few years, and reasonably ask what the last investment produced. Decide up front which metric moves in year one and which matters in year three, and say which is which out loud at the meeting where you ask for the money." },
];

export const close = {
  heading: "Two pillars deep by the end of next year is a serious pace.",
  paragraphs: [
    "Not six. Two. An organization that has decided where its freed hours go, and started capturing real outcome data on its largest program, is further along than one with an AI task force and a strategy deck.",
    "The chain is the point. Find the last link you actually finished, and start on the next one.",
  ],
  signature: "Bizooma \u00b7 Where Marketing Meets Code + AI \u00b7 Jacksonville, FL",
};
