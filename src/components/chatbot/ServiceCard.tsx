import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceCardData {
  title: string;
  description: string;
  highlights?: string[];
  price?: string;
  link?: string;
  icon?: string;
}

export function ServiceCard({ card }: { card: ServiceCardData }) {
  return (
    <div className="rounded-xl border border-border bg-background/80 backdrop-blur-sm p-4 space-y-3 hover:border-primary/40 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start gap-2">
        {card.icon && <span className="text-lg">{card.icon}</span>}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground text-sm leading-tight">{card.title}</h4>
          {card.price && (
            <span className="text-xs font-medium text-primary mt-0.5 inline-block">{card.price}</span>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
      {card.highlights && card.highlights.length > 0 && (
        <ul className="space-y-1">
          {card.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-foreground">
              <Check className="h-3 w-3 text-primary mt-0.5 shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
      {card.link && (
        <a
          href={card.link}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline group-hover:gap-1.5 transition-all"
        >
          Learn more <ArrowRight className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}

export function ServiceCardGrid({ cards }: { cards: ServiceCardData[] }) {
  return (
    <div className={cn(
      "grid gap-2 my-2",
      cards.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
    )}>
      {cards.map((card, i) => (
        <ServiceCard key={i} card={card} />
      ))}
    </div>
  );
}
