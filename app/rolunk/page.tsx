'use client';

import { EnglishAbout } from '@/components/english-about';
import { HungarianAbout } from '@/components/hungarian-about';
import { useLocale } from '@/components/locale';

export default function About() {
  const { locale } = useLocale();
  return locale === 'en' ? <EnglishAbout /> : <HungarianAbout />;
}
