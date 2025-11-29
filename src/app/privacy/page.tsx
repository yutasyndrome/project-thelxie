import Container from '@/components/feature/container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy page description.',
};

export default function Privacy() {
  return (
    <main className="flex-1">
      <Container>
        <h1 className="mt-10 text-center text-4xl font-bold">Privacy Policy</h1>
      </Container>
    </main>
  );
}
