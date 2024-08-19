import BeesRoutes from "./pages/index";
import { ModalContainer } from "./components/Confirm";
import { MessageContainer } from "./components/Message";
import I18n, { t } from "./components/i18n";
import CardProviders from "./providers/CardProviders";

function App() {
  return (
    <I18n>
      <CardProviders>
        <BeesRoutes />
        <ModalContainer />
        <MessageContainer />
        <a
          className="fixed right-0 top-[62%] flex flex-col items-center pt-2 pb-1 pl-2 rounded-l-lg bg-[#cccccc6e] z-9"
          target="_blank"
          href=" https://t.me/BeeCardHelp"
        >
          <img className="w-6 h-6" src="./tg.svg" alt="" />
          <span className="text-10px text-[#333]">{t("support")}</span>
        </a>
      </CardProviders>
    </I18n>
  );
}

export default App;
