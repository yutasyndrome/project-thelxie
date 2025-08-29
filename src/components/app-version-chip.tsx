import { APP_VERSION } from '@/lib/constants';
import SellIcon from '@mui/icons-material/Sell';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

export default function AppVersionChip() {
  const theme = useTheme();

  return (
    <Chip
      icon={
        <SellIcon
          color="inherit"
          sx={{
            color: theme.palette.primary.main,
          }}
        />
      }
      label={'v' + APP_VERSION}
      size="small"
      sx={{
        display: 'inline-flex',
        width: 'auto',
        maxWidth: 'none',
      }}
    />
  );
}
