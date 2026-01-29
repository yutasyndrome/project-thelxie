import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UpdateIcon from '@mui/icons-material/Update';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import nextConfig from '../../next.config';

export default function PostMeta({
  author,
  date,
  update,
}: {
  author: { name: string; avatar: string };
  date: string;
  update: string;
}) {
  const BASE_PATH = nextConfig.basePath || '';

  const AuthorInfo = ({
    author,
    BASE_PATH,
  }: {
    author: { name: string; avatar: string };
    BASE_PATH: string;
  }) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
      }}
    >
      <Avatar
        alt={author.name}
        src={`${BASE_PATH}${author.avatar}`}
        sx={{ width: 24, height: 24 }}
      />
      <Typography variant="caption">{author.name}</Typography>
    </Box>
  );

  const DateInfo = ({
    icon,
    value,
  }: {
    icon: React.ReactNode;
    value: string;
  }) => (
    <Typography
      variant="caption"
      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
    >
      {icon}
      {value}
    </Typography>
  );

  return (
    <>
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'row',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <AuthorInfo author={author} BASE_PATH={BASE_PATH} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <DateInfo
            icon={<AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />}
            value={date}
          />
          {update && (
            <DateInfo
              icon={<UpdateIcon sx={{ fontSize: 16, mr: 0.5 }} />}
              value={update}
            />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <DateInfo
            icon={<AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />}
            value={date}
          />
          {update && (
            <DateInfo
              icon={<UpdateIcon sx={{ fontSize: 16, mr: 0.5 }} />}
              value={update}
            />
          )}
        </Box>
        <AuthorInfo author={author} BASE_PATH={BASE_PATH} />
      </Box>
    </>
  );
}
