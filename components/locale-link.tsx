"use client";
import type { ComponentProps } from 'react';
import { useLocale } from './locale';
import { languageHref } from '@/lib/language';
export default function LocaleLink({href, ...props}: ComponentProps<'a'>) {
 const {locale} = useLocale();
 return <a {...props} href={href ? languageHref(href, locale) : href} />;
}
