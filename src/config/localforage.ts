import localForage from 'localforage';

const localforageStore = localForage.createInstance({
	name: 'app-storage',
	version: 1.0,
});

export default localforageStore;
