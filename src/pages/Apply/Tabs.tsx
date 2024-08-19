export enum TabType {
  Form = 0,
  Payment,
  Results,
}
type Props = {
  active: TabType;
};
declare let t: Function;
export default ({ active }: Props) => {
  const tabClass = (a: TabType) => {
    const base =
      "w-6 h-6 rounded-full border text-sm flex justify-center items-center mb-3";
    const activeClass =
      a <= active
        ? "border-[#FFAC13] text-[#FFAC13]"
        : "border-[#ccc] text-[#999]";
    return `${base} ${activeClass}`;
  };

  const tabLineClass = (a: TabType) => {
    const base = "flex-1 h-1px mx-3 mt-3";
    const activeClass = a <= active ? "bg-[#FFAC13]" : "bg-[#ccc]";
    return `${base} ${activeClass}`;
  };

  const tabTextClass = (a: TabType) => {
    return a <= active ? "text-[#FFAC13]" : "text-[#999]";
  };

  return (
    <section className="w-full pb-1 box-border text-left text-sm">
      <div className="flex justify-between">
        <div className="flex flex-col items-center justify-center">
          <button className={tabClass(TabType.Form)}>1</button>
          <span className={tabTextClass(TabType.Form)}>{t("information")}</span>
        </div>
        <div className={tabLineClass(TabType.Payment)}></div>
        <div className="flex flex-col items-center justify-center">
          <button className={tabClass(TabType.Payment)}>2</button>
          <span className={tabTextClass(TabType.Payment)}>
            {t("depositCrypto")}
          </span>
        </div>
        <div className={tabLineClass(TabType.Results)}></div>
        <div className="flex flex-col items-center justify-center">
          <button className={tabClass(TabType.Results)}>3</button>
          <span className={tabTextClass(TabType.Results)}>{t("submit")}</span>
        </div>
      </div>
    </section>
  );
};
