export default function InputForm({ type, value, onChange, checked, name }) {
    return (
        <input
            className="border border-slate-400 p-2 rounded-lg text-sm"
            type={type}
            value={value}
            checked={checked}
            onChange={onChange}
            name={name}
        />
    )
}