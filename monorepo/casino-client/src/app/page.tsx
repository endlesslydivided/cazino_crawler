import { getManyCategories } from '@/modules/category/api/getManyCategories';
import { Category } from '@/modules/category/types/model';
import CategoriesList from '@/modules/category/widgets/Lists/CategoriesList';
import { Typography } from '@mui/joy';

const Index = async () => {
    const categories: Category[] = await getManyCategories({});

    return (
        <main>
            <Typography>All categories</Typography>

            {categories ? (
                <CategoriesList categories={categories} />
            ) : (
                'Error occured during fetch'
            )}
        </main>
    );
};

export default Index;
