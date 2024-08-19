import { useEffect } from "react";
import BackButton from "../components/BackButton";

export default () => {
    useEffect(() => {}, []);

    return (
        <main className="w-full">
            <header className="w-full px-4 bg-white flex justify-between items-center h-56px">
                <BackButton />
                <h3 className="m-0 font-medium text-lg">{t("userGuide")}</h3>
                <div className="w-5 h-5"></div>
            </header>
            <section className="mt-4 px-4">
                <div className="mt-4 text-left">
                    <div className="text-black text-sm">1. {t("usageScenariosOfBeeCard")}</div>
                    <div className="text-black text-sm mt-4">2. {t("beeCardRiskControlRules")}</div>
                    <div className="text-black text-sm mt-4">3. {t("beeCardOpeningTutorial")}</div>
                    <div className="text-black text-sm mt-4">4. {t("cardholderAgreementOfBeeCard")}</div>
                </div>
            </section>
        </main>
    );
};
