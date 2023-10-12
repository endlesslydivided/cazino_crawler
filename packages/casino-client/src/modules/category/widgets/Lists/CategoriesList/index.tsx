import { Category } from '@/modules/category/types/model';
import { CATEGORY_ID_ROUTE } from '@/share/consts/routes';
import { List, ListItem, ListItemContent, Typography } from '@mui/joy';
import Link from 'next/link';

interface CategoriesListProps {
    categories: Category[];
}

const CategoriesList: React.FC<CategoriesListProps> = async ({
    categories,
}) => {
    return (
        <List>
            {categories.map((item) => {
                return (
                    <Link
                        key={item.id}
                        href={{
                            pathname: CATEGORY_ID_ROUTE(item.id),
                            query: {
                                name: item.name,
                                count: item._count.games,
                            },
                        }}
                    >
                        <ListItem key={item.id}>
                            <ListItemContent>
                                <Typography level="title-sm">
                                    {item.name}
                                </Typography>
                                <Typography level="body-sm" noWrap>
                                    {item._count.games} games
                                </Typography>
                            </ListItemContent>
                        </ListItem>
                    </Link>
                );
            })}
        </List>
    );
};

export default CategoriesList;
