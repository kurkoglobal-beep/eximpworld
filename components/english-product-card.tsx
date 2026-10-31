import LocaleLink from '@/components/locale-link';
import { ArrowRight, FileDown } from 'lucide-react';
import { productDetails, productSlug, type Product } from '@/lib/products';
import { informationSheetFor, informationSheetHref } from '@/lib/product-information';
import { translatedTerm } from '@/lib/language';

export function EnglishProductCard({ product }: { product: Product }) {
  const sheet = informationSheetFor(product.cas);
  const additional = sheet?.additional;
  return (
    <article className="group flex min-h-[270px] min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl motion-reduce:transform-none">
      <div className="flex items-center justify-between gap-3">
        <span className="status">{additional ? 'Enquire' : 'Available'}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{translatedTerm(product.category, true)}</span>
      </div>
      <h2 className="mt-7 text-xl font-bold text-[#1E293B]">
        {additional ? product.en : <LocaleLink className="hover:text-[#2563EB] focus-visible:outline-2" href={`/termekek/${productSlug(product)}`}>{product.en}</LocaleLink>}
      </h2>
      <p className="mt-2 text-xs font-semibold text-slate-400">CAS {product.cas}</p>
      <p className="mt-4 text-sm leading-6 text-slate-500">{additional ? sheet.applications : productDetails(product, true).summary}</p>
      <p className="mt-4 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">Packaging: <span className="text-[#1E293B]">{sheet ? 'Confirmed individually at quotation stage' : 'IBC (1000 L) · 200 L drum'}</span></p>
      {additional ? (
        <details className="mt-5 text-sm text-slate-600">
          <summary className="cursor-pointer font-bold text-[#2563EB] focus-visible:outline-2">View product information</summary>
          <dl className="mt-4 space-y-2 text-xs leading-5">
            <div><dt className="font-semibold">Synonyms</dt><dd>{sheet.synonyms}</dd></div>
            <div><dt className="font-semibold">EC number / formula</dt><dd>{sheet.ec} / {sheet.formula}</dd></div>
            {sheet.properties.map(([label, value]) => <div key={label}><dt className="font-semibold">{label}</dt><dd>{value}</dd></div>)}
          </dl>
          <p className="mt-3 text-xs leading-5">{sheet.note}</p>
        </details>
      ) : <LocaleLink href={`/termekek/${productSlug(product)}`} className="mt-5 flex items-center gap-2 text-xs font-bold text-[#2563EB]">Open technical profile <ArrowRight size={14} /></LocaleLink>}
      <div className="mt-auto space-y-3 pt-6">
        {sheet && <a href={informationSheetHref(sheet.slug)} download aria-label={`Download Product Information (PDF) - ${sheet.name}`} className="flex items-center gap-2 rounded-lg border border-[#bd9553]/50 bg-[#faf7f0] px-3 py-3 text-xs font-semibold leading-5 text-[#102940] transition hover:bg-[#f1e8d5] focus-visible:outline-2 focus-visible:outline-offset-2">
          <FileDown size={19} className="shrink-0" aria-hidden="true" />Download Product Information (PDF)
        </a>}
        <LocaleLink href={`/kapcsolat?product=${encodeURIComponent(additional ? sheet.slug : product.hu)}`} className="flex items-center gap-2 text-xs font-bold text-[#2563EB]">Request a quote <ArrowRight size={14} /></LocaleLink>
      </div>
    </article>
  );
}
