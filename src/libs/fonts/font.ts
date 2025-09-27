import localFont from 'next/font/local';

export const vazirmatn = localFont({
    src: [
        {
            path: './vazirmatn/vazirmatn-thin.woff2',
            weight: '100',
            style: 'normal'
        },
        {
            path: './vazirmatn/vazirmatn-extra-light.woff2',
            weight: '200',
            style: 'normal'
        },
        {
            path: './vazirmatn/vazirmatn-light.woff2',
            weight: '300',
            style: 'normal'
        },
        {
            path: './vazirmatn/vazirmatn-regular.woff2',
            weight: '400',
            style: 'normal'
        },
        {
            path: './vazirmatn/vazirmatn-medium.woff2',
            weight: '500',
            style: 'normal'
        },
        {
            path: './vazirmatn/vazirmatn-semi-bold.woff2',
            weight: '600',
            style: 'normal'
        },
        {
            path: './vazirmatn/vazirmatn-bold.woff2',
            weight: '700',
            style: 'normal'
        },
        {
            path: './vazirmatn/vazirmatn-extra-bold.woff2',
            weight: '800',
            style: 'normal'
        },
        {
            path: './vazirmatn/vazirmatn-black.woff2',
            weight: '900',
            style: 'normal'
        }
    ],
    display: 'swap',
    variable: '--font-vazirmatn'
});

