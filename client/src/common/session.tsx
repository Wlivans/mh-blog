const setSession = (key: string, value: string) => {
	sessionStorage.setItem(key, value);
};

const getSession = (key: string) => {
	return sessionStorage.getItem(key);
};

const removeSession = (key: string) => {
	return sessionStorage.removeItem(key);
};

const cleanSession = () => {
	return sessionStorage.clear();
};

export { setSession, getSession, removeSession, cleanSession };
