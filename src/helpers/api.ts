import { getLessee } from "./lessee";
import { tracker } from "./openreplay";
import { querystringify } from "./querstring";

const HOST = import.meta.env.VITE_BEE_HOST;

let authorization = localStorage.getItem("card-token");

const request = async (
	url: string,
	method: string,
	body?: any,
	headers?: any,
): Promise<any> => {
	try {
		const hs = {
			"invite-code": getLessee(),
			"Content-Type": "application/json",
			...headers,
		};
		if (authorization) hs.authorization = authorization;
		const result = await fetch(url, {
			method,
			body,
			headers: hs,
		});
		const data = await result.json();
		if (data.code === 10005) {
			removeAuth();
			location.replace("#/Login");
		} else if (data.code !== 200) {
			tracker.handleError(new Error("api failed"), data);
		}
		return data;
	} catch (error: any) {
		tracker.handleError(error);
		return error;
	}
};

export const isAuth = () => !!authorization;

export const removeAuth = () => {
	authorization = null;
	localStorage.removeItem("card-token");
};

export const initializeApi = (jwt: string) => {
	if (jwt) {
		authorization = jwt;
		localStorage.setItem("card-token", jwt);
	}
};

export const get = (path: string, data = {}) => {
	const params = querystringify(data, true);
	return request(`${HOST}${path}${params}`, "GET");
};

export const post = (path: string, data = {}, headers?: any) => {
	const body = JSON.stringify(data);
	return request(`${HOST}${path}`, "POST", body, headers);
};

export const joinUrl = (path: string) =>
	`${HOST}${path}${querystringify({ inviteCode: getLessee(), host: location.host }, true)}`;
