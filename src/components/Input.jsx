export default function InputField({ label, type = "text", placeholder, value, onChange, icon, onIconClick }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-zinc-800">{label}</label>
            <div className="relative">
                <input
                    className="bg-slate-200 rounded-lg p-3 text-sm w-full focus:outline-2 focus:outline-offset-2 focus:outline-slate-300 placeholder:text-slate-500"
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