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
        // 搜索app列表
        // todo 再搜索 app
    const appPlugins = appList.value || [];
    const descMap = new Map();
    options = [
      ...options,
      ...appPlugins
        .filter((plugin) => {
          if (!descMap.get(plugin)) {
            descMap.set(plugin, true);
            let has = false;
            plugin.keyWords.some((keyWord) => {
              if (
                keyWord
                  .toLocaleUpperCase()
                  .indexOf(value.toLocaleUpperCase()) >= 0
              ) {
                has = keyWord;
                plugin.name = keyWord;
                return true;
              }
              return false;
            });
            return has;
          } else {
            return false;
          }
        })
        .map((plugin) => {
          return {
            ...plugin,
            zIndex: 1,
            click: () => {
              openPlugin(plugin);
            },
          };
        }),
    ];
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