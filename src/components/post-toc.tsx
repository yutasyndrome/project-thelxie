'use client';

import { BORDER_RADIUS } from '@/lib/constants';
import { TocItemType } from '@/types/toc';
import TocIcon from '@mui/icons-material/Toc';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

type Props = {
  tocItems: TocItemType[];
  onLinkClick?: (id: string) => void;
};

export default function PostToc({ tocItems, onLinkClick }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

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
        flexShrink: 0,
        position: 'sticky',
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
                overflow: 'hidden',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  minWidth: 0,
                  width: '100%',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    flexShrink: 0,
                    width: item.level === 2 ? 9 : 6,
                    height: item.level === 2 ? 9 : 6,
                    borderRadius: '50%',
                    background: '#2196f3',
                    marginRight: 8,
                    marginTop: item.level === 2 ? '0.36em' : '0.46em',
                    transition: 'background 0.2s, opacity 0.2s',
                    opacity: activeId === item.id ? 1 : 0.5,
                  }}
                />
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onLinkClick?.(item.id);
                    window.location.hash = item.id;
                  }}
                  style={{
                    color: 'inherit',
                    fontWeight: item.level === 2 ? 700 : 500,
                    textDecoration: 'none',
                    opacity: activeId === item.id ? 1 : 0.6,
                    transition: 'color 0.2s, opacity 0.2s',
                    wordBreak: 'break-word',
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  {item.text}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </Box>
  );
}
