import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { newsletterTopics, NewsletterTopic } from "./newsletterData";
import { format, isSameDay, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { ExternalLink, Calendar as CalendarIcon } from "lucide-react";

export const NewsletterCalendar = () => {
  const getTopicForDate = (date: Date): NewsletterTopic | undefined => {
    return newsletterTopics.find(topic => 
      isSameDay(parseISO(topic.date), date)
    );
  };

  const renderDay = (date: Date) => {
    const topic = getTopicForDate(date);
    const day = format(date, "d");
    
    if (topic) {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center font-medium",
            topic.isPublished 
              ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
              : "bg-accent text-accent-foreground"
          )}>
            {day}
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
            <div className="w-1 h-1 rounded-full bg-primary"></div>
          </div>
        </div>
      );
    }
    
    return <span>{day}</span>;
  };

  const months = [
    { month: 9, year: 2025, name: "October" },
    { month: 10, year: 2025, name: "November" },
    { month: 11, year: 2025, name: "December" },
  ];

  return (
    <div className="space-y-12">
      {/* Calendar Grid */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            2025 Newsletter Schedule
          </h3>
          <p className="text-muted-foreground">
            Every Tuesday at 9:00 AM EST - Click on highlighted dates to read past newsletters
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {months.map(({ month, year, name }) => (
            <Card key={`${month}-${year}`} className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-center">{name} {year}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  month={new Date(year, month, 1)}
                  className="pointer-events-auto"
                  modifiers={{
                    newsletter: newsletterTopics
                      .filter(t => {
                        const topicDate = parseISO(t.date);
                        return topicDate.getMonth() === month && topicDate.getFullYear() === year;
                      })
                      .map(t => parseISO(t.date)),
                  }}
                  components={{
                    Day: ({ day, modifiers }) => {
                      const topic = getTopicForDate(day.date);
                      if (topic && topic.isPublished && topic.link) {
                        return (
                          <a
                            href={topic.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full h-full"
                          >
                            {renderDay(day.date)}
                          </a>
                        );
                      }
                      return renderDay(day.date);
                    },
                  }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter List */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Upcoming Topics
          </h3>
          <p className="text-muted-foreground">
            See what's coming in our weekly legal marketing insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsletterTopics.map((topic) => (
            <Card 
              key={topic.date}
              className={cn(
                "border-border/50 transition-all hover:border-primary/50",
                topic.isPublished && "hover:shadow-lg"
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="w-4 h-4" />
                    {format(parseISO(topic.date), "MMM d, yyyy")}
                  </div>
                  {topic.isPublished ? (
                    <Badge variant="default" className="text-xs">Published</Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">Upcoming</Badge>
                  )}
                </div>
                <CardTitle className="text-lg leading-tight">
                  {topic.isPublished && topic.link ? (
                    <a 
                      href={topic.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      {topic.topic}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    topic.topic
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {topic.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            7
          </div>
          <span>Published (Click to Read)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-medium">
            14
          </div>
          <span>Upcoming Topic</span>
        </div>
      </div>
    </div>
  );
};
