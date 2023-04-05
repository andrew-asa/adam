import { throttle } from "lodash";
import { ref, watch } from "vue";

const optionsManager = ({
    searchValue,
    appList,
    openPlugin,
    currentPlugin,
}) => {
    const optionsRef = ref([]);
    const getOptionsFromSearchValue = (value, strict = false) => {
        let options: any = [];
        return options;
    }

    // search Input operation
    const search = throttle((value) => {
        console.log(value);
        if (currentPlugin.value.name) return;
        // if (clipboardFile.value.length) return;
        if (!value) {
            optionsRef.value = [];
            return;
        }
        optionsRef.value = getOptionsFromSearchValue(value);
    }, 500);

    watch(searchValue, () => search(searchValue.value));

    return {
        options: optionsRef,
    }
}
export default optionsManager;