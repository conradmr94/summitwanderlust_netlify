import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import privacy from './my-little-chef/privacy.md?raw';
import support from './my-little-chef/support.md?raw';
import terms from './my-little-chef/terms.md?raw';

const DOCS = { privacy, support, terms };

// The documents are our own Markdown files and use only headings, lists, paragraphs, bold and links.
function inline(text) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i} className="font-semibold text-stone-900">{inline(part.slice(2, -2))}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!link) return part;
    const className = 'text-amber-800 underline underline-offset-2 break-words';
    return link[2].startsWith('/')
      ? <Link key={i} to={link[2]} className={className}>{link[1]}</Link>
      : <a key={i} href={link[2]} className={className}>{link[1]}</a>;
  });
}

function block(text, key) {
  const heading = text.match(/^(#{1,3}) (.*)$/);
  if (heading) {
    const level = heading[1].length;
    const Tag = `h${level}`;
    const className = ['', 'text-4xl font-light mb-4', 'text-2xl font-semibold mt-10 mb-3', 'text-lg font-semibold mt-6 mb-2'][level];
    return <Tag key={key} className={className}>{inline(heading[2])}</Tag>;
  }
  const lines = text.split('\n');
  const ordered = /^\d+\. /.test(lines[0]);
  if (ordered || lines[0].startsWith('- ')) {
    const List = ordered ? 'ol' : 'ul';
    return (
      <List key={key} className={`${ordered ? 'list-decimal' : 'list-disc'} pl-6 my-3 space-y-2`}>
        {lines.map((line, i) => <li key={i}>{inline(line.replace(/^(- |\d+\. )/, ''))}</li>)}
      </List>
    );
  }
  return <p key={key} className="my-3">{inline(text)}</p>;
}

export default function MyLittleChefDoc({ doc }) {
  useEffect(() => { window.scrollTo(0, 0); }, [doc]);

  return (
    <div className="min-h-screen bg-amber-50 text-stone-900">
      <div className="sticky top-0 z-20 p-6 bg-amber-50/90 backdrop-blur-sm">
        <Link to="/my-little-chef" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900">
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          <span className="text-sm font-medium">My Little Chef</span>
        </Link>
      </div>
      <main className="max-w-3xl mx-auto px-6 py-8 pb-20 text-stone-700 leading-relaxed">
        {DOCS[doc].trim().split(/\n\n+/).map(block)}
      </main>
    </div>
  );
}
