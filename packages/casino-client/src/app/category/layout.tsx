import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Link } from '@mui/joy';
import type { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Category games',
    description: 'Category games list',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Link href="/">
                <IconButton>
                    <ArrowBackIcon />
                </IconButton>
            </Link>
            {children}
        </>
    );
}
