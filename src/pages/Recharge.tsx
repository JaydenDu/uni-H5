import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import QrCode from "../components/QrCode";
import SelectedTokenModal, { TokenType } from "./Apply/SelectedTokenModal";
import { getAllRights, getCardState } from "../request/home";
import Copy from "../components/Copy";
import { getChainAddress, getChainFee, getChainName } from "./Apply/Payment";
import { cache } from "../helpers/cache";
import { useParams } from "react-router-dom";

declare let t: Function;

export default () => {
	const [cardInfo, setCardInfo] = useState();
	const [rights, setAllRights] = useState<any[]>([]);
	const [visible, setVisible] = useState(false);
	const [selected, setSelected] = useState(TokenType.Tron);
	const { id } = useParams();

	const select = (item: TokenType) => {
		setSelected(item);
		setVisible(false);
	};

	const fetchRights = async () => {
		cache("getAllRights", getAllRights, (result: any) => {
			if (result?.data) {
				setAllRights(result?.data);
			}
		});
	};

	const fetchCardState = async () => {
		if (id)
			cache(
				`getCardState-${id}`,
				() => getCardState(id),
				(result: any) => {
					if (result?.data) {
						setCardInfo(result?.data);
					}
				},
			);
	};

	useEffect(() => {
		fetchCardState();
		fetchRights();
	}, []);

	const chain = selected;
	const address = getChainAddress(selected, cardInfo);
	const right = rights.find(
		(item: any) => item.rightsId === cardInfo?.rightsId,
	);
	const topUpFee = getChainFee(selected, right);

	return (
		<main className="w-full h-screen bg-[#F5F6F7] overflow-y-auto pb-5">
			<header className="w-full px-4 bg-white flex justify-between items-center h-56px">
				<BackButton />
				<h3 className="m-0 font-medium text-lg">{t("cardRecharge")}</h3>
				<div className="w-5 h-5 relative" />
			</header>

			<div className="w-full md:max-w-980px md:mt-5 mx-auto md:pt-5 pb-5">
				<section className="mt-4 px-4">
					<div className="font-medium text-sm mb-3 text-[#666]">
						{t("chooseTokenNetwork")}
					</div>

					<button
						onClick={() => setVisible(true)}
						className="w-full flex justify-between items-center p-3 rounded-8px text-sm bg-white"
					>
						<span className={selected ? "text-[#333]" : "text-[#666]"}>
							{getChainName(selected)}
						</span>
						<div className="w-4 h-4 i-bees-down?mask bg-black" />
					</button>
					<SelectedTokenModal
						rights={rights}
						onClose={() => setVisible(false)}
						onSelected={select}
						visible={visible}
						selected={selected ?? TokenType.Tron}
					/>
				</section>

				{address && (
					<section className="text-sm text-[#666] mt-5 mx-4 rounded-lg bg-white px-3 py-4">
						<div className="flex justify-center">
							<div className="border border-[#EDEDED] rounded-32px p-3">
								<QrCode className="w-126px h-126px" content={address} />
							</div>
						</div>

						<div className="font-medium mt-5 mb-3">{t("depositAddress")}</div>

						<div className="flex items-start mb-6">
							<div className="text-[#333000] text-sm font-medium break-all mr-2">
								{address}
							</div>
							<Copy content={address} />
						</div>

						<div className="p-3 text-xs bg-[#FFF7EA] rounded-lg border border-[#FBD978]">
							<div className="text-[#E19100] font-semibold">
								{t("importantNotice")}:
							</div>
							<div className="mt-2 text-[#E19100]">
								<p>- {t("thisAddressOnly...chain", { chain })}</p>
								<p>
									-{" "}
									{t("anAdditionalFund...deposits", { chain, usdt: topUpFee })}
								</p>
								<p>- {t("pleaseDoNot...thisAddress", { chain })}</p>
							</div>
							<div className="text-[#D15800] font-medium mt-1">
								{t("forExample")}:
							</div>
							<div className="text-[#D15800] font-medium">
								<p>{t("supposeYouVeSent50...USD")}</p>
							</div>
							<div className="mt-2 text-[#E19100]">
								<p>- {t("theMinimumTop-up...credited")}</p>
								<p>- {t("cross-chain...supported")}</p>
								<p>- {t("lossesDue...recovered")}</p>
								<p>- {t("theHandlingFee...benefitsPage")}</p>
							</div>
						</div>
					</section>
				)}
			</div>
		</main>
	);
};
