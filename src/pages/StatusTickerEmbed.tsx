import { Helmet } from "react-helmet-async";
import { StatusTickerEmbed as StatusTickerEmbedWidget } from "@/components/status-ticker/StatusTickerEmbed";

const StatusTickerEmbed = () => {
  return (
    <>
      <Helmet>
        <title>Status Ticker Embed</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <StatusTickerEmbedWidget />
      </div>
    </>
  );
};

export default StatusTickerEmbed;
