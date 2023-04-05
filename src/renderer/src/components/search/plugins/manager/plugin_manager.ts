import { reactive, ref, toRefs } from "vue";
import searchManager from "./search";

const createPluginManager = (): any => {
    const state: any = reactive({
        appList: [],
        plugins: [],
        localPlugins: [],
        currentPlugin: {},
        pluginLoading: false,
    });
    const appList = ref([]);
    const { searchValue, onSearch, setSearchValue, placeholder } = searchManager();
    return {
        ...toRefs(state),
        onSearch
    };
}

export default createPluginManager;