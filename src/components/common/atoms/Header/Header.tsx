import React from "react";
import { HeaderProps } from "./Header.types";

const Header = ({ title, description }: HeaderProps) => {
  return (
    <header>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </header>
  );
};

export default Header;
