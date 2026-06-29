import { getContactInfo } from '@/lib/data';
import ContactClient from './ContactClient';

export const revalidate = 60;

export const metadata = {
  title: 'Contact | Hannah Kimball',
};

export default async function ContactPage() {
  const contact = await getContactInfo();
  return <ContactClient contact={contact} />;
}
