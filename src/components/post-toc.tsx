import { TocItemType } from '@/types/toc';

function Toc({ tocItems }: { tocItems: TocItemType[] }) {
  return (
    <nav className="toc">
      <ul>
        {tocItems.map((item) => (
          <li key={item.id} style={{ marginLeft: item.level === 3 ? 16 : 0 }}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
