import React from "react";
import { Button } from "../ui/button";

type Props = {
    children: React.ReactNode;
    size: "default" | "sm" | "lg" | "icon" | null | undefined;
    type: "submit" | "reset" | "button" | undefined;
    variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "fixedDefault" | "fixedSecondary" | null | undefined;
    onClick: (event: React.FormEvent) => void;
};

const SelectionButton = ({ children, size = "default", type = "button", variant = "default", onClick }: Props) => {
    return (
        <Button size={size} type={type} variant={variant} onClick={onClick}>
            {children}
        </Button>
    );
};

export default SelectionButton;
