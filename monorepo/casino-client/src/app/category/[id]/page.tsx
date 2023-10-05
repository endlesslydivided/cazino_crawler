import GamesListCard from '@/modules/game/widgets/Cards/GamesListCard';
import { Typography } from '@mui/joy';
import React from 'react';

interface CategoryPageProps {
    params: {
        id: string;
    };
    searchParams: {
        name: string;
        count: string;
    };
}

const CategoryPage: React.FC<CategoryPageProps> = ({
    params,
    searchParams,
}) => {
    return (
        <main>
            <Typography level="title-sm">{searchParams.name}</Typography>
            <Typography level="body-sm" noWrap>
                ({searchParams.count} games)
            </Typography>
            <GamesListCard categoryId={params.id} />
        </main>
    );
};

export default CategoryPage;
