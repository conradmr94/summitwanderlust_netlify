import { Link } from 'react-router-dom';
import { ArrowLeft, ChefHat, Search, Share2, ShoppingBasket } from 'lucide-react';

const features = [
  [ChefHat, 'Cook step by step', 'One step per screen, read aloud if you like, with timers that keep running as you move on.'],
  [Search, 'Find something to cook', 'Browse collections, pick a mood, search by ingredient, or take a photo of a dish.'],
  [Share2, 'Make it and share it', 'Write or paste your own recipes, make your own version of others, and post them for other cooks.'],
  [ShoppingBasket, 'Works with Yammoing', 'Link Yammoing to send ingredients to your shopping list and cooked meals to your log.'],
];

const links = [['Support', 'support'], ['Privacy Policy', 'privacy'], ['Terms of Service', 'terms']];

export default function MyLittleChef() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100 text-stone-900">
      <div className="sticky top-0 z-20 p-6 bg-amber-50/80 backdrop-blur-sm">
        <Link to="/" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors">
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <header className="max-w-2xl mx-auto text-center mb-16">
          <img src="/my-little-chef/icon.png" alt="" width="112" height="112" className="mx-auto mb-6 rounded-3xl shadow-lg" />
          <p className="text-sm uppercase tracking-[0.24em] text-amber-800 mb-3">Guided cooking for iPhone</p>
          <h1 className="text-5xl md:text-6xl font-light mb-5">My Little Chef</h1>
          <p className="text-lg text-stone-600 leading-relaxed mb-7">Find a recipe, cook it one step at a time, and make it your own.</p>
          <p className="inline-flex rounded-full bg-amber-200 px-6 py-3 font-medium">Coming soon to the App Store</p>
        </header>
        <ul className="grid gap-5 sm:grid-cols-2 mb-16">
          {features.map(([Icon, title, text]) => (
            <li key={title} className="bg-white/80 rounded-3xl p-7 shadow-sm border border-stone-200">
              <Icon className="w-6 h-6 text-amber-700 mb-4" aria-hidden="true" />
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <p className="text-stone-600 leading-relaxed">{text}</p>
            </li>
          ))}
        </ul>
        <nav aria-label="My Little Chef help and policies" className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {links.map(([label, path]) => (
            <Link key={path} to={`/my-little-chef/${path}`} className="text-stone-700 underline underline-offset-4 hover:text-amber-800">{label}</Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
