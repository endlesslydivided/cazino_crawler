import { Box, CircularProgress } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';

export interface CircularLoaderProps {
    sx?: SxProps;
}
const CircularLoader: React.FC<CircularLoaderProps> = ({ sx }) => {
    return (
        <Box
            sx={{
                ...sx,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                textAlign: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default CircularLoader;
