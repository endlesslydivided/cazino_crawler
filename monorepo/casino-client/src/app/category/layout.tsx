import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Link } from '@mui/joy';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Category games',
    description: 'Casino game description',
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
