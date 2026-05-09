import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle2, MessageSquare, Video, PenTool, Globe, ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-20 pointer-events-none">
            <div className="w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center bg-transparent relative z-10">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm bg-slate-100 text-slate-700 hover:bg-slate-200">
              ✨ The #1 Approval Workflow for Agencies
            </Badge>
            <h1 className="font-display mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
              Get client feedback and approvals without messy email threads.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-600">
              Upload work, share one review link, collect comments, and get client approval faster. Designed for creative agencies and freelancers.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="rounded-full h-14 px-8 text-base shadow-lg shadow-indigo-600/20">Start Free</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-base bg-white">View Demo</Button>
              </Link>
            </div>
          </div>
          
          {/* Dashboard Preview Mockup */}
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-16 relative">
             <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10 bottom-0 h-40 mt-auto"></div>
            <div className="rounded-xl border border-slate-200/60 bg-white/50 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-slate-900/5">
              <div className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Project: YouTube Intro Edit</h2>
                    <p className="text-sm text-slate-500 mt-1">Client: Sarah Johnson</p>
                  </div>
                  <Badge variant="warning" className="text-sm px-3 py-1">Pending Review</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-2">
                    <div className="aspect-video rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                       <Video className="h-12 w-12 text-slate-300" />
                    </div>
                  </div>
                  <div className="flex flex-col h-full">
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2 mb-4">
                      <MessageSquare className="h-4 w-4" /> Comments (4)
                    </h3>
                    <div className="flex-1 space-y-4 mb-6">
                      <div className="bg-slate-50 p-3 rounded-lg text-sm">
                        <span className="font-semibold block text-slate-900">Sarah Johnson</span>
                        <span className="text-slate-600">Could we make the transition at 0:05 a bit faster?</span>
                      </div>
                      <div className="bg-indigo-50 p-3 rounded-lg text-sm border border-indigo-100">
                        <span className="font-semibold block text-indigo-900">You</span>
                        <span className="text-indigo-800">Done! I&apos;ve updated the link with the new version.</span>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-auto">
                       <Button className="w-full" variant="outline">Request Changes</Button>
                       <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Approve</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow effect back */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[120px] -z-10 rounded-full pointer-events-none"></div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold tracking-tight text-center text-slate-900 sm:text-4xl">
              Client feedback is usually a mess.
            </h2>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="bg-white border-slate-100 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800">Feedback gets lost in email threads</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">&quot;Wait, which version did you attach in the last email?&quot; Searching through dozens of replies is a waste of time.</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-slate-100 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800">Clients send unclear revision notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">&quot;Make it pop more&quot; or random screenshots in WhatsApp leave you guessing what actually needs changing.</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-slate-100 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800">Approvals take too long</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">Projects stall because getting a simple &quot;Yes, this is approved&quot; from a busy client is surprisingly difficult.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
             <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  One review link for every project.
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Stop juggling tools. Give your clients a professional, branded experience where they can review your work easily.
                </p>
             </div>
             
             <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="mx-auto h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                     <span className="text-xl font-bold text-indigo-600">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">Upload or paste your work</h3>
                  <p className="text-slate-600 leading-relaxed">Add your video, design file, or link to the project. ApproveKit automatically creates a beautiful review portal.</p>
                </div>
                <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="mx-auto h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                     <span className="text-xl font-bold text-indigo-600">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">Clients review instantly</h3>
                  <p className="text-slate-600 leading-relaxed">Send them the private link. They can view, comment, and collaborate without ever creating an account.</p>
                </div>
                <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="mx-auto h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                     <span className="text-xl font-bold text-indigo-600">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">Get clear approvals</h3>
                  <p className="text-slate-600 leading-relaxed">Clients click a single button to request changes or approve the work. You get notified instantly.</p>
                </div>
             </div>
          </div>
        </section>
        
        {/* Trust/Target Section */}
        <section className="py-20 border-y border-slate-100 bg-slate-50/50">
           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-center text-slate-800 mb-12">
                Built for fast-moving creative teams.
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                 <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm">
                    <Video className="h-5 w-5 text-indigo-500" />
                    <span className="font-medium text-slate-700">Video Editors</span>
                 </div>
                 <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm">
                    <Globe className="h-5 w-5 text-indigo-500" />
                    <span className="font-medium text-slate-700">Web Designers</span>
                 </div>
                 <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm">
                    <PenTool className="h-5 w-5 text-indigo-500" />
                    <span className="font-medium text-slate-700">Agencies</span>
                 </div>
                 <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                    <span className="font-medium text-slate-700">Freelancers</span>
                 </div>
              </div>
           </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Simple, transparent pricing
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              <Card className="bg-slate-50 border-slate-200">
                <CardHeader>
                  <CardTitle className="text-xl">Starter</CardTitle>
                  <div className="mt-4 flex items-baseline text-4xl font-extrabold text-slate-900">
                    $29<span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
                  </div>
                  <CardDescription className="pt-2">For freelancers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex gap-x-3 text-slate-700"><CheckCircle2 className="h-5 w-5 text-indigo-600"/><span>10 active projects</span></li>
                    <li className="flex gap-x-3 text-slate-700"><CheckCircle2 className="h-5 w-5 text-indigo-600"/><span>Unlimited client comments</span></li>
                    <li className="flex gap-x-3 text-slate-700"><CheckCircle2 className="h-5 w-5 text-indigo-600"/><span>Private review links</span></li>
                    <li className="flex gap-x-3 text-slate-700"><CheckCircle2 className="h-5 w-5 text-indigo-600"/><span>Basic dashboard</span></li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-white hover:bg-slate-100 text-slate-900 border-slate-200" variant="outline">Start Free Trial</Button>
                </CardFooter>
              </Card>

              <Card className="border-indigo-600 shadow-xl relative transform md:-translate-y-4 bg-white ring-1 ring-indigo-600">
                <div className="absolute top-0 flex w-full justify-center -mt-3 text-xs">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full font-bold tracking-widest uppercase text-[10px]">Most Popular</span>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-indigo-900">Studio</CardTitle>
                  <div className="mt-4 flex items-baseline text-4xl font-extrabold text-slate-900">
                    $79<span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
                  </div>
                  <CardDescription className="pt-2">For small agencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex gap-x-3 text-slate-700"><CheckCircle2 className="h-5 w-5 text-indigo-600"/><span>50 active projects</span></li>
                    <li className="flex gap-x-3 text-slate-700"><CheckCircle2 className="h-5 w-5 text-indigo-600"/><span>Custom branding</span></li>
                    <li className="flex gap-x-3 text-slate-700"><CheckCircle2 className="h-5 w-5 text-indigo-600"/><span>Email notifications</span></li>
                    <li className="flex gap-x-3 text-slate-700"><CheckCircle2 className="h-5 w-5 text-indigo-600"/><span>Revision history</span></li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Start Free Trial</Button>
                </CardFooter>
              </Card>

              <Card className="bg-slate-50 border-slate-200">
                <CardHeader>
                  <CardTitle className="text-xl">Agency</CardTitle>
                  <div className="mt-4 flex items-baseline text-4xl font-extrabold text-slate-900">
                    $149<span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
                  </div>
                  <CardDescription className="pt-2">For growing teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex gap-x-3 text-slate-700"><CheckCircle2 className="h-5 w-5 text-indigo-600"/><span>Unlimited projects</span></li>
                    <li className="flex gap-x-3 text-slate-700"><CheckCircle2 className="h-5 w-5 text-indigo-600"/><span>Team members</span></li>
                    <li className="flex gap-x-3 text-slate-700"><CheckCircle2 className="h-5 w-5 text-indigo-600"/><span>Priority support</span></li>
                    <li className="flex gap-x-3 text-slate-700"><CheckCircle2 className="h-5 w-5 text-indigo-600"/><span>Advanced client portal</span></li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-white hover:bg-slate-100 text-slate-900 border-slate-200" variant="outline">Start Free Trial</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-slate-50">
           <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-3xl font-bold tracking-tight text-center text-slate-900 mb-12">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                 <details className="group border border-slate-200 rounded-lg p-6 bg-white open:bg-slate-50/50 transition-colors shadow-sm">
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900">
                       Do clients need to create an account?
                       <span className="transition group-open:rotate-180">
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                       </span>
                    </summary>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                       No, clients can review using a private link. The less friction, the faster you get your approvals.
                    </p>
                 </details>
                 <details className="group border border-slate-200 rounded-lg p-6 bg-white open:bg-slate-50/50 transition-colors shadow-sm">
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900">
                       Can I use this for video, design, or website projects?
                       <span className="transition group-open:rotate-180">
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                       </span>
                    </summary>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                       Yes, you can upload files directly or paste links to Figma, Frame.io, staging sites, or anywhere else your work lives.
                    </p>
                 </details>
                 <details className="group border border-slate-200 rounded-lg p-6 bg-white open:bg-slate-50/50 transition-colors shadow-sm">
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900">
                       Is this for freelancers or agencies?
                       <span className="transition group-open:rotate-180">
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                       </span>
                    </summary>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                       Both. ApproveKit scales from solo freelancers sending off a quick logo revision to 20-person agencies managing dozens of active campaigns.
                    </p>
                 </details>
                 <details className="group border border-slate-200 rounded-lg p-6 bg-white open:bg-slate-50/50 transition-colors shadow-sm">
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900">
                       Can I connect Stripe later?
                       <span className="transition group-open:rotate-180">
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                       </span>
                    </summary>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                       Yes, payments can be connected later. We&apos;re launching billing features soon to let you tie approvals directly to final invoice payments.
                    </p>
                 </details>
              </div>
           </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden bg-white border-t border-slate-100">
           <div className="absolute inset-0 bg-indigo-600"></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                 Ready to simplify client approvals?
              </h2>
              <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">
                 Create your first review link in minutes. No credit card required for the free trial.
              </p>
              <Link href="/signup">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-50 shadow-lg shadow-indigo-900/20 rounded-full h-14 px-8 text-lg">
                  Start Free Trial
                </Button>
              </Link>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
