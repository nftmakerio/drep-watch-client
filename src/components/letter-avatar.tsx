import Image from "next/image";

const LetterAvatar = ({
  username,
  dimension,
  rounded,
  src,
}: {
  username: string;
  dimension?: number;
  rounded?: boolean;
  src?: string | null;
}) => {
  const size = dimension ?? 50;
  return (
    <Image
      width={size}
      height={size}
      className={`${rounded ? "rounded-full" : "rounded-xl"}`}
      src={
        src
          ? src
          : `https://ui-avatars.com/api/?name=${username}&background=random&size=${size}`
      }
      alt={`${username}'s avatar`}
      unoptimized
      onError={(e) => {
        e.currentTarget.src = `https://ui-avatars.com/api/?name=${username}&background=random&size=${size}`;
      }}
    />
  );
};

export default LetterAvatar;
