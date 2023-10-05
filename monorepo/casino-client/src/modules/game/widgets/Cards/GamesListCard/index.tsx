'use client';

import { getManyGamesByCategoryId } from '@/modules/game/api/getGamesByCategoryId';
import CircularLoader from '@/share/components/CircularLoader';
import useFetch from '@/share/hooks/useFetch';
import { Box, Button } from '@mui/joy';

import GamesList from '../../Lists/GamesList';

interface GamesListCardProps {
    categoryId: string;
}

const GamesListCard: React.FC<GamesListCardProps> = ({ categoryId }) => {
    const handlePaginationChange = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setFilters((p) => ({ ...p, skip: value }));
    };

    const { loading, data, initFetch, setFilters, count, filters } = useFetch({
        fetch: getManyGamesByCategoryId,
        config: {
            url: `/${categoryId}/games`,
        },
    });
    return (
        <Box
            sx={{
                marginY: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <GamesList data={data} loading={loading} />
            {loading ? (
                <CircularLoader />
            ) : data.length !== count ? (
                <Button
                    onClick={(e) =>
                        handlePaginationChange(e, filters.take + filters.skip)
                    }
                >
                    Load more
                </Button>
            ) : null}
        </Box>
    );
};

export default GamesListCard;
