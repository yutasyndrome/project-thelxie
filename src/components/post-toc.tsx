'use client';

import { BORDER_RADIUS } from '@/lib/constants';
import { TocItemType } from '@/types/toc';
import TocIcon from '@mui/icons-material/Toc';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

export default function Toc({ tocItems }: { tocItems: TocItemType[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // スクロール連動でアクティブ見出しを判定
  useEffect(() => {
    const handler = () => {
      let currentId: string | null = null;
      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        if (el && window.scrollY + 80 >= el.offsetTop) {
          currentId = item.id;
        }
      }
      setActiveId(currentId);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [tocItems]);

  return (
    <Box
      sx={{
        width: 260,
        flexShrink: 0,
        position: 'sticky',
        top: 96,
        alignSelf: 'flex-start',
        color: 'text.primary',
        backgroundColor: 'background.paper',
        borderRadius: `${BORDER_RADIUS}px`,
        p: 2,
      }}
    >
      <nav className="toc">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TocIcon />
          <Typography variant="h4" sx={{ ml: 1 }}>
            Table of Contents
          </Typography>
        </Box>
        <ul style={{ listStyle: 'none', padding: 0, margin: 4 }}>
          {tocItems.map((item) => (
            <li
              key={item.id}
              style={{
                marginLeft: item.level === 3 ? 16 : 0,
                position: 'relative',
                marginBottom: 8,
              }}
            >
              {/* カスタムマーカー */}
              <span
                style={{
                  display: 'inline-block',
                  width: item.level === 2 ? 9 : 6,
                  height: item.level === 2 ? 9 : 6,
                  borderRadius: '50%',
                  background: '#2196f3',
                  marginRight: 8,
                  verticalAlign: 'middle',
                  transition: 'background 0.2s, opacity 0.2s',
                  opacity: activeId === item.id ? 1 : 0.5,
                }}
              />
              <a
                href={`#${item.id}`}
                style={{
                  color: 'inherit',
                  fontWeight: item.level === 2 ? 700 : 500,
                  textDecoration: 'none',
                  opacity: activeId === item.id ? 1 : 0.6,
                  transition: 'color 0.2s, opacity 0.2s',
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Box>
  );
}
