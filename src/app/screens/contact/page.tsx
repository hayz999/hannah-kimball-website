import { getContactInfo } from "@/lib/data";
import ContactClient from "./ContactClient";

export const revalidate = 60;

const description =
  "Get in touch with Hannah Kimball for performance, composition, and choral directing inquiries.";

export const metadata = {
  title: "Contact",
  description,
  openGraph: {
    title: "Contact | Hannah Kimball",
    description,
    url: "/contact",
  },
};

export default async function ContactPage() {
  const contact = await getContactInfo();
  return <ContactClient contact={contact} />;
}
