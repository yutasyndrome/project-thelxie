import Container from '@/components/feature/container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Map',
  description: 'Interactive Map page description.',
};

export default function Map() {
  return (
    <main className="flex-1">
      <Container>
        <h1 className="mt-10 text-center text-4xl font-bold">
          Interactive Map
        </h1>
      </Container>
    </main>
  );
}
