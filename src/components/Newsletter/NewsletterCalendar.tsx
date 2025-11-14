import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { newsletterTopics } from "./newsletterData";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { ExternalLink, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";

export const NewsletterCalendar = () => {
  return (
    <div className="space-y-12">
      {/* Timeline Header */}
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-foreground mb-3">
          2025 Newsletter Schedule
        </h3>
        <p className="text-lg text-muted-foreground">
          Every Tuesday at 9:00 AM EST - Legal marketing insights delivered weekly
        </p>
      </div>

      {/* Tuesday Timeline */}
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-muted" />
          
          {/* Newsletter Cards */}
          <div className="space-y-6">
            {newsletterTopics.map((topic, index) => {
              const date = parseISO(topic.date);
              const isPublished = topic.isPublished;
              
              return (
                <div key={topic.date} className="relative pl-16">
                  {/* Timeline Dot */}
                  <div className={cn(
                    "absolute left-0 w-14 h-14 rounded-full border-4 border-background flex items-center justify-center shadow-lg",
                    isPublished 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {isPublished ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <CalendarIcon className="w-6 h-6" />
                    )}
                  </div>

                  {/* Newsletter Card */}
                  <Card className={cn(
                    "transition-all hover:shadow-xl border-2",
                    isPublished 
                      ? "border-primary/20 hover:border-primary/40 bg-gradient-to-br from-background to-primary/5" 
                      : "border-border/50 hover:border-border"
                  )}>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-muted-foreground">
                            {format(date, "EEEE, MMMM d, yyyy")}
                          </div>
                          <CardTitle className="text-xl leading-tight">
                            {topic.topic}
                          </CardTitle>
                        </div>
                        {isPublished ? (
                          <Badge className="bg-primary text-primary-foreground shrink-0">
                            Published
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="shrink-0">
                            Upcoming
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {topic.description}
                      </p>
                      
                      {isPublished && topic.link && (
                        <Button 
                          asChild
                          className="w-full sm:w-auto"
                        >
                          <a 
                            href={topic.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            Read Newsletter
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground pt-8 border-t border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="font-medium">Published - Click to Read</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground shadow-lg">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <span className="font-medium">Coming Soon</span>
        </div>
      </div>
    </div>
  );
};
