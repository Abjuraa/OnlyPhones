export default function SelectForm({ value, onChange, options, placeholder }) {
    return (
        <select
            className="border border-slate-400 p-2 rounded-lg"
            value={value}
            onChange={onChange}
        >
            <option disabled>{placeholder}</option>

            {options.map((c) => (
                <option key={c.value} value={c.value}>
                    {c.label}
                </option>
            ))}
        </ select>
    )
}