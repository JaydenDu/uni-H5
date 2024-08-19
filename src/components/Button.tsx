type Props = {
    loading: boolean;
    disabled?: boolean;
    onClick: Function;
    children: React.ReactNode;
    className?: string;
};

export default ({ loading, disabled, onClick, children, className }: Props) => {
    const activeClass =
        "py-2.5 w-full bg-[#FFAC13] rounded-lg justify-center items-center inline-flex border-none text-white text-base font-semibold leading-normal";
    if (loading)
        return (
            <div className={`${activeClass} bg-opacity-50 ${className}`}>
                <div className="mr-4">
                    <div className="animate-spin">
                        <svg focusable="false" data-icon="loading" width="1em" height="1em" fill="#fff" aria-hidden="true" viewBox="0 0 1024 1024">
                            <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
                        </svg>
                    </div>
                </div>
                <span>{children}</span>
            </div>
        );
    if (disabled) return <div className={`${activeClass} bg-opacity-50 ${className}`}>{children}</div>;
    return (
        <button onClick={onClick} className={`${activeClass} ${className}`}>
            {children}
        </button>
    );
};
