import { reactive, toRefs } from 'vue';

const searchManager = () => {
    const state = reactive({
        searchValue: '',
        placeholder: '',
    });

    // search Input operation
    const onSearch = (e) => {
        const value = e;
        console.log(value)
        state.searchValue = value;
    };

    const setSearchValue = (value: string) => {
        state.searchValue = value;
    };

    return {
        ...toRefs(state),
        onSearch,
        setSearchValue,
    };
};

export default searchManager;
