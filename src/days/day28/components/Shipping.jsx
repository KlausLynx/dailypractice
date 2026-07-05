import { useMemo, useState } from "react";
import { Truck, Zap, Rocket, Gift, Check } from "lucide-react";

const COLORS = {
    ink: "#1D3557",
    paper: "#F5F1E6",
    cardBg: "#FFFFFF",
    stamp: "#C1440E",
    muted: "#6B7280",
    border: "#D8D2C4",
};

const ICONS = {
    standard: Truck,
    express: Zap,
    overnight: Rocket,
    free: Gift,
};

export default function Shipping() {
    const SHIPPING_OPTIONS = useMemo(
        () => [
        {
            id: "standard",
            name: "Standard Shipping",
            price: 4.99,
            estimatedDays: "5-7 business days",
            description: "Delivered by regular ground carrier",
        },
        {
            id: "express",
            name: "Express Shipping",
            price: 12.99,
            estimatedDays: "2-3 business days",
            description: "Faster delivery via priority carrier",
        },
        {
            id: "overnight",
            name: "Overnight Shipping",
            price: 24.99,
            estimatedDays: "1 business day",
            description: "Next-day delivery, order before 2pm",
        },
        {
            id: "free",
            name: "Free Shipping",
            price: 0,
            estimatedDays: "7-10 business days",
            description: "Free on orders over $50",
        },
        ],
        []
    );

    const [selectedId, setSelectedId] = useState("standard");

    return (
        <div
        className="max-w-xl mx-auto p-6 rounded-xl"
        style={{ backgroundColor: COLORS.cardBg }}
        >
        <div className="mb-5">
            <p
            className="text-xs font-mono tracking-widest uppercase mb-1"
            style={{ color: COLORS.muted }}
            >
            Choose a method
            </p>
            <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: COLORS.ink }}
            >
            Shipping
            </h2>
        </div>

        <div className="flex flex-col gap-3">
            {SHIPPING_OPTIONS.map(({ id, name, price, estimatedDays, description }) => {
            const Icon = ICONS[id];
            const isSelected = selectedId === id;

            return (
                <button
                key={id}
                type="button"
                onClick={() => setSelectedId(id)}
                aria-pressed={isSelected}
                className="relative flex items-center gap-4 p-4 text-left rounded-lg w-full transition-all duration-150"
                style={{
                    backgroundColor: COLORS.cardBg,
                    border: `2px solid ${isSelected ? COLORS.stamp : COLORS.border}`,
                    boxShadow: isSelected ? `0 0 0 3px ${COLORS.stamp}22` : "none",
                }}
                >
                {isSelected && (
                    <div
                    className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white"
                    style={{
                        backgroundColor: COLORS.stamp,
                        width: 24,
                        height: 24,
                        transform: "rotate(12deg)",
                    }}
                    >
                    <Check size={14} />
                    </div>
                )}

                <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                    width: 44,
                    height: 44,
                    backgroundColor: isSelected ? COLORS.stamp : COLORS.paper,
                    color: isSelected ? "#FFFFFF" : COLORS.ink,
                    }}
                >
                    <Icon size={20} />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="font-bold" style={{ color: COLORS.ink }}>
                    {name}
                    </p>
                    <p className="text-sm truncate" style={{ color: COLORS.muted }}>
                    {description}
                    </p>
                    <p
                    className="text-xs font-mono mt-1"
                    style={{ color: COLORS.muted }}
                    >
                    {estimatedDays}
                    </p>
                </div>

                <div className="text-right flex-shrink-0 pl-2">
                    <p
                    className="font-mono font-bold text-lg"
                    style={{ color: price === 0 ? COLORS.stamp : COLORS.ink }}
                    >
                    {price === 0 ? "FREE" : `$${price.toFixed(2)}`}
                    </p>
                </div>
                </button>
            );
            })}
        </div>
        </div>
    );
}