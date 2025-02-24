import { addPropertyControls, ControlType } from "framer"

// Public Framer component
export default function StakingCard(props) {
    const { amount, theme = "light" } = props
    
    return (
        <div
            style={{
                padding: 20,
                borderRadius: 12,
                background: theme === "light" ? "#fff" : "#1a1a1a",
                color: theme === "light" ? "#000" : "#fff"
            }}
        >
            <h2>Stake Amount</h2>
            <p>{amount} TOKENS</p>
            <button>Stake Now</button>
        </div>
    )
}

// Public controls
addPropertyControls(StakingCard, {
    amount: {
        type: ControlType.Number,
        defaultValue: 100
    },
    theme: {
        type: ControlType.Enum,
        defaultValue: "light",
        options: ["light", "dark"]
    }
})
