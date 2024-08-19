import { ReactNode, useEffect } from "react";
import BackButton from "../components/BackButton";

type Props = {
  bread: string;
  children: ReactNode;
};

export default ({ bread, children }: Props) => {
  useEffect(() => {}, []);

  return (
    <main className="w-full h-screen bg-[#F5F6F7] overflow-y-auto">
      <header className="w-full px-4 bg-white flex justify-between items-center h-56px">
        <BackButton />
        <h3 className="m-0 font-medium text-lg">{bread}</h3>
        <div className="w-5 h-5 relative"></div>
      </header>
      <div className="w-full md:max-w-980px md:mt-5 mx-auto bg-white md:pt-5 pb-5">
        {children}
      </div>
    </main>
  );
};
