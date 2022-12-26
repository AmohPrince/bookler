import React, { useContext } from "react";
import { AuthProvider } from "../App";
import { Assets } from "../Assets/Assets";

const UserProfileTabSmall = ({
  setActiveChoice,
  setMenuWide,
}: {
  setActiveChoice: React.Dispatch<React.SetStateAction<string>>;
  setMenuWide: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { profilePicture, userName } = useContext(AuthProvider);

  return (
    <div
      className="ml-5 rounded-full bg-white/40 backdrop-blur-lg w-44 pr-4 pl-1 pt-1 pb-1 text-white flex items-center justify-between cursor-pointer"
      onClick={() => {
        setActiveChoice("Profile");
        setMenuWide(false);
      }}
    >
      <img
        src={profilePicture!}
        alt="Profile pic"
        className="w-8 h-8 rounded-full"
      />
      <p className="text-xs">{userName}</p>
      <img src={Assets.DropDown} alt="Drop down" />
    </div>
  );
};

export default UserProfileTabSmall;
