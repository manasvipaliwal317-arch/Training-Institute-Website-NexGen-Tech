import { redirect } from 'next/navigation';

interface PageProps {
  searchParams: Promise<{ course?: string }>;
}

export default async function RegisterRedirectPage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const course = resolved?.course ? `?course=${encodeURIComponent(resolved.course)}` : '';
  redirect(`/enroll${course}`);
}
