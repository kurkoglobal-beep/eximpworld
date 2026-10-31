'use client';
import { useLocale } from '@/components/locale';
import { EnglishContact } from '@/components/english-contact';
import { HungarianContact } from '@/components/hungarian-contact';
export default function Contact() {
  const { locale } = useLocale();
  return locale === 'en' ? <EnglishContact /> : <HungarianContact />;
}
