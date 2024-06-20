import useWindowSize from "@hooks/useWindowSize";
import Image from "next/image";
import TrophyIcon from "@public/trophy.svg";
import DiamondIcon from "@public/diamond.svg";

type IconProp = "trophy" | "diamond";

type IconPlacementProp = "left" | "right";

type BadgeProps = {
    text: string;
    bgColor:
        | "success"
        | "warning"
        | "danger"
        | "info"
        | "gold"
        | "silver"
        | "bronze"
        | "blue"
        | "gray"
        | "gold-gradient"
        | "blue-gradient";
    iconPlacement?: IconPlacementProp;
    icon?: IconProp;
};

function Icon({ icon, iconPlacement }: { icon: IconProp; iconPlacement: IconPlacementProp }) {
    const { width = 0 } = useWindowSize();
    const mx = iconPlacement === "right" ? "ml-2" : iconPlacement === "left" ? "mr-2" : "";
    switch (icon) {
        case "trophy":
            return <Image src={TrophyIcon} alt="" className={`${mx} mx`} />;
        case "diamond":
            return <Image src={DiamondIcon} alt="" className={`${mx}`} />;
        default:
            return null;
    }
}

export default function Badge({ text, bgColor, icon, iconPlacement }: BadgeProps) {
    const twColor = () => {
        switch (bgColor) {
            case "success":
                return "bg-green-400";
            case "warning":
                return "bg-yellow-400";
            case "danger":
                return "bg-red-400";
            case "info":
                return "bg-blue-400";
            case "gold":
                return "bg-yellow-500";
            case "silver":
                return "bg-gray-300";
            case "bronze":
                return "bg-yellow-800";
            case "blue":
                return "bg-blue-400";
            case "gray":
                return "bg-gray-400";
            default:
                return "bg-transparent";
        }
    };

    const backgroundImage = () => {
        switch (bgColor) {
            case "gold-gradient":
                return "var(--gold-gradient)";
            case "blue-gradient":
                return "var(--blue-gradient)";
            default:
                return "bg-none";
        }
    };
    return (
        <div
            className={`flex items-center rounded-3xl ${twColor()} h-8 text-base font-semibold px-2 py-2 bg-tr`}
            style={{ color: "var(--black)", backgroundImage: backgroundImage() }}
        >
            {icon && iconPlacement === "left" ? <Icon icon={icon} iconPlacement="left" /> : null}
            {text}
            {icon && iconPlacement === "right" ? <Icon icon={icon} iconPlacement="right" /> : null}
        </div>
    );
}
