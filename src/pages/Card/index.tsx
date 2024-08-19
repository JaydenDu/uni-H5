import { useEffect, useState } from "react";
import Card from "./Card";
import { Link, useNavigate } from "react-router-dom";
import { getUserCards } from "../../request/home";
import OrderList, { EmptyOrderList } from "./OrderList";
import { cache } from "../../helpers/cache";
import Logout from "./Logout";
import { CardState } from "../Apply/const";
import { useCard } from "../../providers/CardProviders";
import TransferModal from "./TransferModal";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EllipsisUl } from "./Ellipsis";

declare let t: Function;

let cacheIndex = 0;

export default () => {
	const navigate = useNavigate();
	const [index, setIndex] = useState(cacheIndex);
	const [cards, setCards] = useState<any[]>([null]);
	const { allRights, fetchRights } = useCard();

	const fetchCardState = () => {
		cache("getUserCards", getUserCards, (result: any) => {
			if (result?.data) {
				setCards(result?.data);
			} else {
				setCards([null]);
			}
		});
	};

	const onSwiperChange = (i: number) => {
		setIndex(i);
		cacheIndex = i;
	};

	useEffect(() => {
		fetchCardState();
		fetchRights();
	}, []);

	const useRights = allRights?.reduce((a: any[], c: any) => {
		const hasApplied = cards.find((v: any) => v?.rightsId === c?.rightsId);
		if (c?.effect && !hasApplied) a.push(c);
		return a;
	}, []);
	const cardInfo = cards[index];
	const id = cardInfo?.id;
	const rightInfo =
		index >= cards.length ? useRights[index - cards.length] : null;

	return (
		<main className="w-full h-screen bg-white md:bg-[#F5F6F7] overflow-y-auto">
			<header className="w-full px-4 bg-white flex justify-between items-center h-56px">
				<button className="border-none">
					<div className="w-5 h-5"></div>
				</button>
				<h3 className="m-0 font-medium text-lg">{t("overview")}</h3>
				<Logout />
			</header>

			<div className="w-full md:max-w-980px md:mt-5 mx-auto bg-white md:pt-5 pb-5 text-sm">
				<section className="bg-white mx-auto">
					<Swiper
						effect={"coverflow"}
						grabCursor={true}
						centeredSlides={true}
						slidesPerView={"auto"}
						coverflowEffect={{
							scale: 0.8,
							rotate: 0,
							stretch: 0,
							depth: 100,
							modifier: 1,
							slideShadows: false,
						}}
						modules={[EffectCoverflow]}
						onSlideChange={(item) => onSwiperChange(item.activeIndex)}
					>
						{cards.map((item: any, i: number) => {
							const right = allRights.find(
								(r: any) => r?.rightsId === item?.rightsId,
							);
							const state = item?.cardState;
							const isHalfway =
								state === CardState.apply_passed ||
								state === CardState.inactive;
							const goApply = () =>
								navigate(`/Apply/${item?.rightsId}`, {
									state: { card: state, id: item?.id },
								});
							return (
								<SwiperSlide
									key={item?.rightsId}
									className="!w-[80%] !md:w-340px"
								>
									<Card
										info={item}
										coverStyle={right?.coverStyle}
										coverUrl={right?.coverUrl}
									>
										{isHalfway && (
											<button
												onClick={goApply}
												className="w-full h-11 absolute bottom-0 left-0 bg-[#0000004D] rounded-b-xl flex items-center"
											>
												<div className="text-white text-sm ml-4">
													{t("card...continue")}
												</div>
											</button>
										)}
									</Card>
								</SwiperSlide>
							);
						})}
						{useRights.map((v: any, i: number) => {
							return (
								<SwiperSlide key={v?.rightsId} className="!w-[80%] !md:w-340px">
									<Card
										key={v?.rightsId}
										info={{}}
										coverStyle={v?.coverStyle}
										coverUrl={v?.coverUrl}
										onApply={() => navigate(`/Reapply/${v?.rightsId}`)}
									/>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</section>

				<div className="px-4 mt-5 flex justify-between items-center">
					<div className="rounded-xl flex items-center">
						<span className="text-black font-medium text-20px mr-2">
							{cardInfo?.availableBalance ?? 0} USD
						</span>
						<div className="text-[#666] text-sm">{t("balance")}</div>
					</div>
					{cardInfo?.availableBalance > 0.1 &&
						cards.filter((v) => v?.cardNo)?.length > 1 && (
							<TransferModal
								id={cardInfo?.cardNo}
								cards={cards}
								onOk={fetchCardState}
							/>
						)}
				</div>

				<div className="w-full h-8px bg-[#F5F6F7] mt-4" />

				{cardInfo && (
					<>
						<EllipsisUl id={cardInfo?.id} />
						<div className="w-full h-8px bg-[#F5F6F7]" />
					</>
				)}

				<div className="px-4 font-medium mt-4">{t("features")}</div>

				<div className="flex justify-between text-[#333] text-sm mt-4 px-4">
					<Go
						disabled={!cardInfo?.cardNo}
						to={`/Recharge/${id}`}
						className="flex flex-col items-center text-[#333]"
					>
						<div className="w-6 h-6 i-bees-recharge" />
						<div className="mt-1">{t("topUp")}</div>
					</Go>
					<Link
						to={`/Equity/${cardInfo?.rightsId ?? rightInfo?.rightsId}`}
						className="flex flex-col items-center text-[#333]"
					>
						<div className="w-6 h-6 i-bees-equities" />
						<div className="mt-1">{t("cardBenefits")}</div>
					</Link>
					<Go
						disabled={!cardInfo?.cardNo}
						to={`/CardInfo/${id}`}
						className="flex flex-col items-center text-[#333]"
					>
						<div className="w-6 h-6 i-bees-info" />
						<div className="mt-1">{t("cardInfo")}</div>
					</Go>
					<a
						target="_blank"
						href="https://bee-network.notion.site/Mastering-Your-Bee-Card-A-Comprehensive-Usage-Guide-94f25aae0fc14186958967ac027662aa?pvs=4"
						className="flex flex-col items-center text-[#333]"
					>
						<div className="w-6 h-6 i-bees-guide" />
						<div className="mt-1">{t("userGuide")}</div>
					</a>
				</div>

				<div className="w-full h-8px bg-[#F5F6F7] my-5" />

				{cardInfo?.cardNo ? <OrderList id={id} /> : <EmptyOrderList />}
			</div>
		</main>
	);
};

const Go = ({ to, className, disabled, children }: any) => {
	if (disabled)
		return <div className={`${className} opacity-50`}>{children}</div>;
	return (
		<Link to={to} className={className}>
			{children}
		</Link>
	);
};
