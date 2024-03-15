import Image from "next/image";

const LetterAvatar = ({ username, dimension }: { username: string, dimension?: number }) => {
    const size = dimension ?? 50;
    return <Image
        width={size}
        height={size}
        className="rounded-full"
        loader={() => `https://ui-avatars.com/api/?name=${username}&background=random&size=${size}`}
        src={`https://ui-avatars.com/api/?name=${username}&background=random&size=${size}`}
        alt={`${username}'s avatar`}
    />
}

export default LetterAvatar;