import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dice5, Users, Smartphone, Trophy, Apple, Play, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LcrPage = () => {
  return (
    <>
      <Helmet>
        <title>LCR — Left Center Right Mobile Dice Game | Bizooma</title>
        <meta
          name="description"
          content="Play Left, Center, Right (LCR) — the fast, fun dice game now on mobile. Pass-and-play with friends and family. Free download for iOS and Android."
        />
        <link rel="canonical" href="https://legally-innovative-reimagined.lovable.app/lcr" />
      </Helmet>

      <Navbar />

      <main className="bg-background">
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-legal-primary via-legal-secondary to-legal-dark text-white overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                  <Dice5 className="w-12 h-12 text-legal-accent" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                LCR — Left, Center, Right
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
                The classic dice game you love, reimagined for mobile. Quick to learn,
                impossible to put down — perfect for game night, road trips, and family gatherings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-legal-accent hover:bg-legal-accent/90 text-legal-dark font-semibold text-lg px-8 py-4">
                  <Apple className="w-5 h-5 mr-2" /> Download for iOS
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-legal-primary text-lg px-8 py-4">
                  <Play className="w-5 h-5 mr-2" /> Get it on Android
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-legal-dark mb-4">Why You'll Love LCR Mobile</h2>
              <p className="text-lg text-muted-foreground">All the fun of the original dice game, with none of the lost chips.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Smartphone className="w-8 h-8 text-legal-primary mb-2" />
                  <CardTitle>Pass &amp; Play</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Hand the phone around the table — perfect for 3 to 12 players in person.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="w-8 h-8 text-legal-primary mb-2" />
                  <CardTitle>Family Friendly</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Easy enough for kids, fun enough for the whole family. Learn in 30 seconds.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Trophy className="w-8 h-8 text-legal-primary mb-2" />
                  <CardTitle>Track Wins</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Save player profiles, track wins, and crown the family champion over time.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How to Play */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-legal-dark mb-8 text-center">How to Play</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { n: "1", t: "Each player starts with 3 chips", d: "Tap to add players and the app deals everyone in." },
                { n: "2", t: "Roll the dice on your turn", d: "L = pass left, R = pass right, C = center pot, dot = keep." },
                { n: "3", t: "Last player with chips wins", d: "Winner takes the entire center pot. Play again!" },
              ].map((s) => (
                <div key={s.n} className="bg-card rounded-lg p-6 border">
                  <div className="w-10 h-10 rounded-full bg-legal-primary text-white flex items-center justify-center font-bold mb-3">{s.n}</div>
                  <h3 className="font-semibold text-legal-dark mb-2">{s.t}</h3>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support */}
        <section id="support" className="py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-legal-dark mb-6 text-center">Support</h2>
            <p className="text-muted-foreground text-center mb-8">
              Need help with LCR? We're here. Email us and we'll respond within 1–2 business days.
            </p>
            <div className="bg-card border rounded-lg p-6 text-center">
              <p className="font-semibold text-legal-dark">Email Support</p>
              <a href="mailto:support@bizooma.com" className="text-legal-primary hover:underline">
                support@bizooma.com
              </a>
            </div>
          </div>
        </section>

        {/* Privacy Policy */}
        <section id="privacy-policy" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Shield className="w-7 h-7 text-legal-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-legal-dark">Privacy Policy</h2>
            </div>
            <p className="text-sm text-muted-foreground text-center mb-8">Last updated: April 30, 2026</p>

            <div className="prose prose-slate max-w-none space-y-6 text-foreground">
              <div>
                <h3 className="text-xl font-semibold text-legal-dark mb-2">Overview</h3>
                <p>
                  This Privacy Policy describes how the LCR (Left, Center, Right) mobile application
                  ("the App", "we", "us") handles information when you use it. We built LCR to be a
                  simple, fun dice game — and we designed it to collect as little data as possible.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-legal-dark mb-2">Information We Do Not Collect</h3>
                <p>
                  The App does not require an account. We do not collect your name, email address,
                  phone number, contacts, photos, location, or any other personally identifiable
                  information. Player names you enter inside the App are stored only on your device.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-legal-dark mb-2">Information Stored on Your Device</h3>
                <p>
                  Game data — including player names, scores, win history, and your settings — is
                  stored locally on your device. This data never leaves your device unless you
                  choose to share it (for example, by sharing a screenshot). Uninstalling the App
                  removes this data.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-legal-dark mb-2">Analytics &amp; Crash Reporting</h3>
                <p>
                  We may use anonymized, aggregated analytics and crash reporting provided by Apple
                  (App Store Connect) and Google (Google Play Console) to understand app stability
                  and overall usage. This data is not linked to you personally and is governed by
                  the privacy policies of those platforms.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-legal-dark mb-2">Advertising</h3>
                <p>
                  LCR does not display third-party advertisements and does not share data with
                  advertising networks.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-legal-dark mb-2">Children's Privacy</h3>
                <p>
                  LCR is appropriate for all ages. We do not knowingly collect personal information
                  from children. Because the App does not collect personal information from any
                  user, it is suitable for family use.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-legal-dark mb-2">Your Choices</h3>
                <p>
                  Because all game data is stored on your device, you can delete it at any time by
                  clearing the App's data in your device settings or by uninstalling the App.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-legal-dark mb-2">Changes to This Policy</h3>
                <p>
                  We may update this Privacy Policy from time to time. Material changes will be
                  reflected by updating the "Last updated" date above and, where appropriate, by
                  in-app notice.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-legal-dark mb-2">Contact Us</h3>
                <p>
                  Questions about this Privacy Policy? Email{" "}
                  <a href="mailto:support@bizooma.com" className="text-legal-primary hover:underline">
                    support@bizooma.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default LcrPage;