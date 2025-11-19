import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAllProviderIncidents } from "@/hooks/useProviderIncidents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, Wrench, CheckCircle2, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const IncidentHistory = () => {
  const { data: incidents, isLoading } = useAllProviderIncidents(100);

  const getIncidentIcon = (type: string, severity: string) => {
    if (type === 'maintenance') {
      return { icon: Wrench, color: 'text-blue-500' };
    }
    
    switch (severity) {
      case 'critical':
        return { icon: AlertCircle, color: 'text-red-500' };
      case 'major':
        return { icon: AlertTriangle, color: 'text-orange-500' };
      default:
        return { icon: AlertTriangle, color: 'text-yellow-500' };
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      case 'major':
        return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20';
      default:
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
      case 'outage':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      default:
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
      case 'monitoring':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
      case 'identified':
        return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20';
      default:
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
    }
  };

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return 'Ongoing';
    
    if (minutes < 60) return `${Math.round(minutes)}m`;
    if (minutes < 1440) return `${Math.round(minutes / 60)}h`;
    return `${Math.round(minutes / 1440)}d`;
  };

  return (
    <>
      <Helmet>
        <title>Provider Incident History | Bizooma</title>
        <meta 
          name="description" 
          content="View the complete incident history for all cloud providers, including outages, degradations, and maintenance windows." 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Incident History
                </h1>
                <p className="text-xl text-muted-foreground">
                  Complete timeline of outages, degradations, and maintenance windows across all providers
                </p>
              </div>
            </div>
          </section>

          {/* Incidents List */}
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-5xl">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
                  <p className="mt-4 text-muted-foreground">Loading incident history...</p>
                </div>
              ) : incidents && incidents.length > 0 ? (
                <div className="space-y-4">
                  {incidents.map((incident: any) => {
                    const { icon: Icon, color } = getIncidentIcon(incident.incident_type, incident.severity);
                    const isResolved = incident.status === 'resolved';
                    const provider = incident.provider;

                    return (
                      <Card 
                        key={incident.id}
                        className={`transition-all duration-200 hover:shadow-md border-l-4 ${
                          isResolved ? 'border-l-green-500' : 'border-l-orange-500'
                        }`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-4">
                            {/* Provider Logo */}
                            <div 
                              className="w-12 h-12 rounded-lg flex items-center justify-center bg-background border-2 shadow-sm flex-shrink-0"
                              style={{ borderColor: provider.brand_color + '40' }}
                            >
                              <img 
                                src={provider.logo_url || `/provider-logos/${provider.slug}.svg`}
                                alt={`${provider.name} logo`}
                                className="w-8 h-8 object-contain"
                              />
                            </div>

                            {/* Incident Icon */}
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                              isResolved ? 'bg-green-500/10' : 'bg-orange-500/10'
                            }`}>
                              {isResolved ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              ) : (
                                <Icon className={`w-5 h-5 ${color}`} />
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                  <CardTitle className="text-lg mb-1">
                                    {incident.title}
                                  </CardTitle>
                                  <p className="text-sm text-muted-foreground">
                                    {provider.name}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${getTypeColor(incident.incident_type)} border-0`}
                                  >
                                    {incident.incident_type}
                                  </Badge>
                                  {incident.incident_type !== 'maintenance' && (
                                    <Badge 
                                      variant="outline" 
                                      className={`text-xs ${getSeverityColor(incident.severity)} border-0`}
                                    >
                                      {incident.severity}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent>
                          {incident.description && (
                            <p className="text-sm text-muted-foreground mb-3">
                              {incident.description}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>
                                {formatDistanceToNow(new Date(incident.started_at), { addSuffix: true })}
                              </span>
                            </div>
                            
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getStatusColor(incident.status)} border-0`}
                            >
                              {incident.status}
                            </Badge>

                            {incident.duration_minutes !== null && (
                              <span className="font-medium">
                                Duration: {formatDuration(incident.duration_minutes)}
                              </span>
                            )}

                            {incident.affected_services && incident.affected_services.length > 0 && (
                              <span className="text-xs">
                                Affected: {incident.affected_services.join(', ')}
                              </span>
                            )}
                          </div>

                          {isResolved && incident.resolved_at && (
                            <div className="mt-3 text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>
                                Resolved {formatDistanceToNow(new Date(incident.resolved_at), { addSuffix: true })}
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <p className="text-lg font-medium">No incidents reported</p>
                  <p className="text-sm mt-2">All providers are operating smoothly</p>
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default IncidentHistory;
