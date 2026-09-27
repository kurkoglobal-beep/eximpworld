'use client';
import { useState } from 'react';
import { ipaProduct } from '@/lib/uk-products';
import { calculateSupply } from '@/lib/supply-planning';
export function SupplyPlanner() {
  const [annual, setAnnual] = useState('24000');
  const [packaging, setPackaging] = useState('IBC');
  const [months, setMonths] = useState(6);
  const result = calculateSupply(Number(annual), months, packaging);
  const format = (v: number) =>
    new Intl.NumberFormat('en-GB', { maximumFractionDigits: 1 }).format(v);
  return (
    <section className="section" id="supply-planner">
      <div className="uk-planner">
        <div>
          <p className="eyebrow text-blue-300">PLAN YOUR SUPPLY</p>
          <h2 className="section-title text-white mt-4">
            Supply planning
            <br />
            calculator.
          </h2>
          <p className="mt-5 text-slate-300 leading-7">
            Plan IPA volume and packaging around your production. Bring the
            estimate into your contract enquiry.
          </p>
          <p className="mt-5 text-xs text-slate-400 leading-6">
            Volume-based estimate with even monthly consumption. Nominal
            packaging capacities; actual fill levels, compatibility and delivery
            scheduling are confirmed in your quotation.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 sm:p-8 text-slate-800">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field sm:col-span-2">
              <span>Annual requirement (litres)</span>
              <input
                className="input"
                type="number"
                min="1"
                max="1000000000000"
                step="any"
                value={annual}
                onChange={(e) => setAnnual(e.target.value)}
              />
            </label>
            <label className="field">
              <span>Packaging</span>
              <select
                className="input"
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
              >
                {['IBC', 'Drum', 'Bulk'].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Contract horizon</span>
              <select
                className="input"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
              >
                {[3, 6, 12].map((n) => (
                  <option key={n} value={n}>
                    {n} months
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-6" aria-live="polite">
            {result ? (
              <dl className="uk-data">
                <div>
                  <dt>Estimated monthly requirement</dt>
                  <dd>{format(result.monthly)} L</dd>
                </div>
                <div>
                  <dt>Contract volume · {months} months</dt>
                  <dd>{format(result.contract)} L</dd>
                </div>
                <div>
                  <dt>Estimated packaging · contract total</dt>
                  <dd>
                    {result.packages === null
                      ? 'Bulk load plan on request'
                      : `${format(result.packages)} × ${result.capacity} L ${packaging}`}
                  </dd>
                </div>
              </dl>
            ) : (
              <p>
                Enter a positive annual volume to calculate your requirement.
              </p>
            )}
          </div>
          {result && (
            <a
              className="btn-primary mt-6"
              href={`/contact?product=${ipaProduct.id}&annual=${Number(annual)}&packaging=${packaging}&months=${months}`}
            >
              REQUEST CONTRACT PRICE →
            </a>
          )}
          <p className="mt-4 text-xs text-slate-500">
            No price estimate is generated.
          </p>
        </div>
      </div>
    </section>
  );
}
