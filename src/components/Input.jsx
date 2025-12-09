export default function InputField({ label, type = "text", placeholder, value, onChange, icon, onIconClick }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-zinc-600">{label}</label>
            <div className="relative">
                <input
                    className="border border-slate-500 rounded-lg p-2 text-sm w-full focus:outline-2 focus:outline-offset-2 focus:outline-slate-300"
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />

                {icon && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-2 flex items-center"
                        onClick={onIconClick}
                    >
                        {icon}
                    </button>
                )}
            </div>
        </div>
    );
}