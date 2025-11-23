"use client";

import Image from "next/image";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  email: string;
  size?: number;
  onClick?: () => void;
  className?: string;
}

const getInitials = (email: string, name?: string | null): string => {
  if (name && name.length > 0) {
    return name.charAt(0).toUpperCase();
  }
  return email.charAt(0).toUpperCase();
};

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  name,
  email,
  size = 48,
  onClick,
  className,
}) => {
  const initials = getInitials(email, name);
  const style = {
    height: `${size}px`,
    width: `${size}px`,
    fontSize: `${size * 0.4}px`,
  };

  return (
    <div
      className={`
        relative flex shrink-0 overflow-hidden rounded-full items-center justify-center 
        font-semibold select-none bg-blue-500 text-white border-blue-500 border-2 
        ${className}
      `}
      style={style}
      onClick={onClick}
    >
      {src ? (
        <Image
          src={src}
          width={size}
          height={size}
          alt={name || "User Avatar"}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span className="tracking-wider">{initials}</span>
      )}
    </div>
  );
};

export default UserAvatar;
