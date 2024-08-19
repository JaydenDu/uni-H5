type Props = {
    titles: string[];
    value: number;
};

const Steps = ({ titles, value }: Props) => {
    return (
        <div className="flex items-center justify-between">
            {titles.map((title, i) => {
                return (
                    <>
                        {i <= value ? (
                            <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full text-white flex items-center justify-center text-xs bg-[#ffc04d] mr-2">{i + 1}</div>
                                <span className="text-sm text-[#ffc04d]">{title}</span>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full text-[#999] border border-[#999] flex items-center justify-center text-xs mr-2">
                                    {i + 1}
                                </div>
                                <span className="text-sm text-[#999]">{title}</span>
                            </div>
                        )}
                        {i < titles.length - 1 && <div className="border-b border-[#999] border-dashed flex-1 mx-1" />}
                    </>
                );
            })}
        </div>
    );
};

export default Steps;
