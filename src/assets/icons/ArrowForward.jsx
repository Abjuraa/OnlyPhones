export default function ArrowForward({color, size}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill={color} d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z" />
        </svg>
    )
}