import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditProgressIndicatorProps {
  currentStep: 1 | 2 | 3;
  isRunning?: boolean;
}

export const AuditProgressIndicator = ({ currentStep, isRunning }: AuditProgressIndicatorProps) => {
  const steps = [
    { number: 1, label: "Business Context", icon: Circle },
    { number: 2, label: "Audit Running", icon: PlayCircle },
    { number: 3, label: "Results Ready", icon: CheckCircle2 },
  ];

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const Icon = step.icon;

          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-all",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && !isRunning && "bg-primary/20 text-primary ring-2 ring-primary",
                    isCurrent && isRunning && "bg-primary text-primary-foreground animate-pulse",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Icon className={cn("w-5 h-5", isCurrent && isRunning && "animate-spin")} />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 text-center font-medium transition-colors",
                    (isCompleted || isCurrent) ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-[2px] flex-1 mx-2 transition-colors",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
