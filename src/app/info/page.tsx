import Container from '@/components/feature/container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Information',
  description: 'Information page description.',
};

export default function Information() {
  return (
    <main className="flex-1">
      <Container>
        <h1 className="mt-10 text-center text-4xl font-bold">Information</h1>
      </Container>
    </main>
  );
}
