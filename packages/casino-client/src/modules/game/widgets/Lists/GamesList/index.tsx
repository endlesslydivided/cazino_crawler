import { Game } from '@/modules/game/types/model';
import CircularLoader from '@/share/components/CircularLoader';
import { API_URI } from '@/share/consts/api';
import {
    Box,
    Card,
    List,
    ListDivider,
    ListItem,
    ListItemContent,
    Typography,
} from '@mui/joy';
import Image from 'next/image';

interface GamesListProps {
    data: Game[];
    loading: boolean;
}

const GamesList: React.FC<GamesListProps> = ({ data, loading }) => {
    return (
        <Box
            sx={{
                marginY: '10px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <List
                orientation="horizontal"
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                {data.map((item) => {
                    return (
                        <ListItem
                            sx={{
                                textAlign: 'center',
                                width: '140px',
                                paddingY: '7px',
                            }}
                            key={item.id}
                        >
                            <Card sx={{ height: '85%' }}>
                                <ListItemContent>
                                    <Image
                                        height={100}
                                        width={100}
                                        src={item.iconUrl}
                                        alt={''}
                                    />
                                    <Typography
                                        level="title-md"
                                        variant="plain"
                                    >
                                        {item.name}
                                    </Typography>
                                </ListItemContent>
                            </Card>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};

export default GamesList;
