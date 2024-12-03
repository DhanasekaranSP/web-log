import React, { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
    children: ReactNode;
}

export const LandingPage: React.FC<LayoutProps> = ({ children }) => (
    <>
        <Header />
        <main>{children}</main>
    </>
);

