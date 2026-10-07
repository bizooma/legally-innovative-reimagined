import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

/** CCPA / CPRA reference dialogs shown from the privacy band on /accessibility-layer (text unchanged). */
export default function PrivacyLawDialogs({ ccpaOpen, setCcpaOpen, cpraOpen, setCpraOpen }: { ccpaOpen: boolean; setCcpaOpen: (v: boolean) => void; cpraOpen: boolean; setCpraOpen: (v: boolean) => void }) {
  return (
    <>
      <Dialog open={ccpaOpen} onOpenChange={setCcpaOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>California Consumer Privacy Act</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
            <p>
              The California Consumer Privacy Act (CCPA) is a landmark data privacy law enacted in 2018 that grants California residents extensive rights over their personal information. Effective January 1, 2020, it established the most comprehensive consumer privacy framework in the United States, influencing privacy standards nationwide.
            </p>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Key facts</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Signed into law: June 28, 2018 (Assembly Bill 375)</li>
                <li>Effective date: January 1, 2020</li>
                <li>Primary enforcers: California Attorney General and California Privacy Protection Agency (CPPA)</li>
                <li>Major amendment: California Privacy Rights Act (effective 2023)</li>
                <li>Penalty range (2025 adjustment): $2,663 – $7,988 per violation</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Origins and legislative development</h3>
              <p>
                Sparked by a 2017 ballot initiative led by privacy advocate Alastair Mactaggart, lawmakers passed the CCPA as a legislative compromise to avoid a voter initiative. It was signed by Governor Jerry Brown in June 2018 and took effect January 1, 2020, with enforcement beginning July 1, 2020. The act was subsequently amended by multiple bills and expanded by the 2020 California Privacy Rights Act, which created the CPPA to oversee rulemaking and enforcement.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Core consumer rights</h3>
              <p className="mb-2">The CCPA grants California residents rights to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Know what personal data businesses collect, use, and share.</li>
                <li>Delete personal data held by businesses (with certain exceptions).</li>
                <li>Opt out of the sale or sharing of personal information.</li>
                <li>Correct inaccurate data and limit use of sensitive information (CPRA amendments).</li>
                <li>Be free from discrimination for exercising these rights.</li>
              </ul>
              <p className="mt-2">
                These rights apply broadly to for-profit entities meeting thresholds such as over $25 million in annual revenue or handling data of 100,000+ consumers or households.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Enforcement and penalties</h3>
              <p>
                Since 2023, enforcement has been shared by the California Attorney General and the CPPA. Businesses face administrative fines up to $7,988 per intentional violation or violations involving minors. Consumers also hold a limited private right of action for data breaches caused by inadequate security.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Subsequent amendments and evolution</h3>
              <p>
                Recent expansions include the Delete Act (Senate Bill 362), establishing the Delete Request and Opt-Out Platform (DROP) in 2026, and 2024 amendments addressing AI systems and neural data. California continues to update CCPA regulations to cover emerging technologies and automated decision-making by 2027.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={cpraOpen} onOpenChange={setCpraOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>California Privacy Rights Act</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
            <p>
              The California Privacy Rights Act (CPRA) is a 2020 state ballot initiative that significantly expanded the California Consumer Privacy Act. It strengthens privacy protections for residents and establishes new enforcement mechanisms, marking a major milestone in U.S. data privacy regulation.
            </p>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Key facts</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Enacted: November 2020 (Proposition 24)</li>
                <li>Effective date: January 1, 2023</li>
                <li>Primary agency: California Privacy Protection Agency</li>
                <li>Predecessor law: California Consumer Privacy Act (CCPA, 2018)</li>
                <li>Scope: Applies to businesses handling California residents' personal data</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Background and purpose</h3>
              <p>
                Voters approved the CPRA through Proposition 24 to enhance Californians' control over personal information. It arose from concerns that the earlier CCPA offered limited consumer rights and weak enforcement. The act aligns California's privacy standards more closely with global frameworks such as the General Data Protection Regulation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Major provisions</h3>
              <p>
                The CPRA introduces new consumer rights, including the ability to correct inaccurate data, limit the use of sensitive personal information, and opt out of cross-context behavioral advertising. It mandates stricter data minimization and retention rules and requires transparency in profiling and automated decision-making.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Enforcement and governance</h3>
              <p>
                A distinctive feature is the creation of the independent California Privacy Protection Agency (CPPA), empowered to implement regulations, investigate violations, and issue fines. The California Department of Justice retains authority for certain civil actions, reinforcing dual oversight.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Impact and significance</h3>
              <p>
                The CPRA has made California the first U.S. state with a dedicated privacy regulator, influencing nationwide corporate data practices. Many companies have adopted its standards as a baseline for U.S. privacy compliance, shaping legislative models in other states and prompting discussions of a potential federal privacy framework.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
