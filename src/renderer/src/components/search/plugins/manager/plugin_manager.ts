import { reactive, ref, toRefs } from "vue";
import searchManager from "./search";
import optionsManager from "./options";

const createPluginManager = (): any => {
    const state: any = reactive({
        appList: [],
        plugins: [],
        localPlugins: [],
        currentPlugin: {},
        pluginLoading: false,
    });
    const appList = ref([]);
    const initPlugins = async () => {
        // appList.value = await appSearch(nativeImage);
    };
    const openPlugin = (plugin: any) => {

    }
    const { searchValue, onSearch, setSearchValue, placeholder } = searchManager();
    const {
        options,
    } = optionsManager({
        searchValue,
        appList,
        openPlugin,
        currentPlugin: toRefs(state).currentPlugin,
    });
    return {
        ...toRefs(state),
        onSearch,
        options
    };
}

export default createPluginManager;