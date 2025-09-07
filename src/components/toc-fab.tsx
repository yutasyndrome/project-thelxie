'use client';

import { BORDER_RADIUS } from '@/lib/constants';
import { TocItemType } from '@/types/toc';
import TocIcon from '@mui/icons-material/Toc';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import { useRef, useState } from 'react';
import PostToc from './post-toc';

type Props = {
  tocItems: TocItemType[];
};

export default function TocFab({ tocItems }: Props) {
  const [open, setOpen] = useState(false);
  const scrollTargetRef = useRef<string | null>(null);

  const handleTocLinkClick = (id: string) => {
    scrollTargetRef.current = id;
    setOpen(false);
  };

  const paperRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Fab
        color="primary"
        size="medium"
        sx={{
          position: 'fixed',
          right: 20,
          bottom: 20,
          zIndex: 1200,
        }}
        onClick={() => setOpen(true)}
      >
        <TocIcon />
      </Fab>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              borderTopLeftRadius: `${BORDER_RADIUS}px`,
              borderTopRightRadius: `${BORDER_RADIUS}px`,
              p: 0,
              width: '100vw',
              maxWidth: '100vw',
              left: 0,
              maxHeight: '90vh',
              overflowY: 'auto',
            },
            ref: paperRef,
          },
        }}
      >
        <PostToc tocItems={tocItems} onLinkClick={handleTocLinkClick} />
      </Drawer>
    </>
  );
}
