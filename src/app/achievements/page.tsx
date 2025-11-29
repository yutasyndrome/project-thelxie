import Container from '@/components/feature/container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'Achievements page description.',
};

export default function Achievements() {
  return (
    <main className="flex-1">
      <Container>
        <h1 className="mt-10 text-center text-4xl font-bold">Achievements</h1>
      </Container>
    </main>
  );
}
