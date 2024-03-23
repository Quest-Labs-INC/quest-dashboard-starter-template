export const uploadSVG = (color1, color2) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
    >
        <path
            d="M26.178 8.82147L21.178 3.82147C20.8655 3.50902 20.4416 3.3335 19.9997 3.3335C19.5578 3.3335 19.1339 3.50902 18.8214 3.82147L13.8214 8.82147C13.5178 9.13581 13.3498 9.55682 13.3536 9.99381C13.3574 10.4308 13.5327 10.8488 13.8417 11.1578C14.1507 11.4669 14.5687 11.6421 15.0057 11.6459C15.4427 11.6497 15.8637 11.4817 16.178 11.1781L18.333 9.02314V28.3331C18.333 28.7752 18.5086 29.1991 18.8212 29.5117C19.1338 29.8242 19.5577 29.9998 19.9997 29.9998C20.4417 29.9998 20.8657 29.8242 21.1782 29.5117C21.4908 29.1991 21.6664 28.7752 21.6664 28.3331V9.02314L23.8214 11.1781C24.1357 11.4817 24.5567 11.6497 24.9937 11.6459C25.4307 11.6421 25.8487 11.4669 26.1577 11.1578C26.4667 10.8488 26.642 10.4308 26.6458 9.99381C26.6496 9.55682 26.4816 9.13581 26.178 8.82147Z"
            fill={color1 || "#9035FF"}
        />
        <path
            d="M30 15H21.6667V28.3333C21.6667 28.7754 21.4911 29.1993 21.1785 29.5118C20.8659 29.8244 20.442 30 20 30C19.558 30 19.134 29.8244 18.8215 29.5118C18.5089 29.1993 18.3333 28.7754 18.3333 28.3333V15H10C8.67432 15.0013 7.40332 15.5285 6.46593 16.4659C5.52853 17.4033 5.00132 18.6743 5 20V31.6667C5.00132 32.9923 5.52853 34.2633 6.46593 35.2007C7.40332 36.1381 8.67432 36.6653 10 36.6667H30C31.3257 36.6653 32.5967 36.1381 33.5341 35.2007C34.4715 34.2633 34.9987 32.9923 35 31.6667V20C34.9987 18.6743 34.4715 17.4033 33.5341 16.4659C32.5967 15.5285 31.3257 15.0013 30 15Z"
            fill={color2 || "#D1ACFF"}
        />
    </svg>
);
