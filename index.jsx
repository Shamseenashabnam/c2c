


import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function AiMarketingLanding() {
  const [email, setEmail] = useState('')
  const [businessType, setBusinessType] = useState('Local Shop')
  const [goal, setGoal] = useState('More customers')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Placeholder: call your backend AI endpoint here to generate website + marketing plan
  async function handleGenerate() {
    setLoading(true)
    setResult(null)
    try {
      // Example payload: { email, businessType, goal }
      // Replace the setTimeout with a real API call to your AI service
      await new Promise((r) => setTimeout(r, 1200))
      const fakeResponse = {
        siteUrl: `https://your-company.com/${businessType.toLowerCase().replace(/\s+/g,'-')}-starter`,
        plan: `3 social posts/week, 1 local ad campaign with ₹1000/week budget, website with menu/contact and online-order button`,
        posts: [
          `Grand opening special — 20% off today!`,
          `Try our best-selling item — order online now.`,
          `We're now accepting online orders and phone pre-orders!`
        ]
      }
      setResult(fakeResponse)
      setShowModal(true)
    } catch (e) {
      console.error(e)
      alert('Something went wrong. Try again later.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white text-slate-800">
      <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold">AI</div>
          <div>
            <h1 className="text-lg font-semibold">AiGrow — Digital Marketing for Small Business</h1>
            <p className="text-xs text-slate-500">Simple. Affordable. AI-driven.</p>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <a className="text-sm hover:underline" href="#features">Features</a>
          <a className="text-sm hover:underline" href="#pricing">Pricing</a>
          <button
            onClick={() => window.scrollTo({ top: 9999, behavior: 'smooth' })}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm"
          >Get Started</button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {/* Hero */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
          <div>
            <motion.h2 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl font-extrabold leading-tight">
              Grow your business online — without the headache
            </motion.h2>
            <p className="mt-4 text-slate-600">An all-in-one AI assistant that builds your website, writes posts, runs ads, and shows simple analytics. Perfect for SMEs, freelancers and startups.</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })} className="px-5 py-3 rounded-md bg-indigo-600 text-white font-medium">Get Started Free</button>
              <a href="#features" className="px-5 py-3 rounded-md border border-slate-200 text-sm flex items-center justify-center">See Features</a>
            </div>

            <div className="mt-6 text-sm text-slate-500">
              <strong>Trusted by:</strong> Local cafés, salons, tutors & independent professionals.
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
              <h3 className="font-semibold text-lg">Quick demo — generate a starter plan</h3>
              <p className="text-sm text-slate-500 mt-1">Tell us about your business and we’ll create a starter website + 3 social posts.</p>

              <div id="generator" className="mt-4 space-y-3">
                <label className="text-sm">Business type</label>
                <select className="w-full px-3 py-2 rounded-md border" value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
                  <option>Local Shop</option>
                  <option>Bakery</option>
                  <option>Salon</option>
                  <option>Freelancer</option>
                  <option>Restaurant</option>
                </select>

                <label className="text-sm">Primary goal</label>
                <select className="w-full px-3 py-2 rounded-md border" value={goal} onChange={(e) => setGoal(e.target.value)}>
                  <option>More customers</option>
                  <option>More online orders</option>
                  <option>More bookings</option>
                </select>

                <label className="text-sm">Email (optional)</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-md border" placeholder="owner@myshop.com" />

                <div className="flex gap-2">
                  <button onClick={handleGenerate} disabled={loading} className="flex-1 px-4 py-2 rounded-md bg-teal-500 text-white font-medium disabled:opacity-60">{loading ? 'Generating...' : 'Create My Starter Site'}</button>
                  <button onClick={() => { setBusinessType('Local Shop'); setGoal('More customers'); setEmail('') }} className="px-4 py-2 rounded-md border">Reset</button>
                </div>

                {result && (
                  <div className="mt-3 p-3 bg-slate-50 rounded"> 
                    <p className="text-sm">Preview plan: <strong>{result.plan}</strong></p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-12">
          <h3 className="text-2xl font-semibold">What AiGrow does</h3>
          <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-3">
            <FeatureCard title="AI Website Builder" desc="Create a responsive website with one click. Auto-generated content and images for your business." />
            <FeatureCard title="Content & Social" desc="AI writes posts, suggests hashtags, and schedules for best times." />
            <FeatureCard title="Smart Ads" desc="Create local ads with optimized targeting and budget suggestions." />
          </div>
        </section>

        {/* Simple Pricing */}
        <section id="pricing" className="py-12">
          <h3 className="text-2xl font-semibold">Pricing that fits small budgets</h3>
          <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-3">
            <PlanCard title="Free" price="₹0/mo" bullets={["Starter website","3 AI posts/month","Basic analytics"]} />
            <PlanCard title="Starter" price="₹499/mo" bullets={["Custom domain","Daily social posts","Ad campaign setup"]} popular />
            <PlanCard title="Pro" price="₹1499/mo" bullets={["Managed campaigns","Priority support","Advanced analytics"]} />
          </div>
        </section>

        {/* Footer / Contact */}
        <footer className="py-10 border-t mt-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-6xl mx-auto">
            <div>
              <h4 className="font-semibold">AiGrow</h4>
              <p className="text-sm text-slate-500">Helping small businesses grow with AI.</p>
            </div>
            <div className="flex gap-4">
              <a className="text-sm hover:underline" href="#">Privacy</a>
              <a className="text-sm hover:underline" href="#">Terms</a>
              <a className="text-sm hover:underline" href="#">Contact</a>
            </div>
          </div>
        </footer>
      </main>

      {/* Modal: Show generated plan */}
      {showModal && result && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-xl bg-white rounded-2xl p-6">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold">Your Starter Plan is Ready</h4>
              <button onClick={() => setShowModal(false)} className="text-slate-500">Close</button>
            </div>
            <div className="mt-4 grid gap-3">
              <p className="text-sm">Website: <a className="text-indigo-600 underline" href={result.siteUrl} target="_blank" rel="noreferrer">{result.siteUrl}</a></p>
              <p className="text-sm">Plan: {result.plan}</p>
              <div>
                <h5 className="font-medium">Suggested posts</h5>
                <ul className="list-disc ml-5 mt-2 text-sm">
                  {result.posts.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>

              <div className="flex gap-2 mt-4">
                <button onClick={() => alert('Export as website + start ad campaign (hook to backend)')} className="px-4 py-2 rounded-md bg-indigo-600 text-white">Publish Starter Site</button>
                <button onClick={() => alert('Open social scheduler (implement)')} className="px-4 py-2 rounded-md border">Schedule Posts</button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

function FeatureCard({ title, desc }) {
  return (
    <div className="p-5 bg-white rounded-lg shadow-sm">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-slate-500 mt-2">{desc}</p>
    </div>
  )
}

function PlanCard({ title, price, bullets, popular }) {
  return (
    <div className={`p-6 rounded-2xl ${popular ? 'ring-2 ring-indigo-100 bg-gradient-to-br from-white to-indigo-50' : 'bg-white shadow-sm'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-semibold">{title}</h5>
          <p className="text-2xl font-bold mt-2">{price}</p>
        </div>
        {popular && <div className="text-sm px-3 py-1 bg-indigo-600 text-white rounded">Popular</div>}
      </div>
      <ul className="mt-4 text-sm space-y-1">
        {bullets.map((b, i) => <li key={i}>• {b}</li>)}
      </ul>
      <div className="mt-4">
        <button className="w-full px-4 py-2 rounded-md bg-indigo-600 text-white">Choose {title}</button>
      </div>
    </div>
  )
}

